"use client"

import { useEffect, useRef, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X } from "lucide-react"
import APIService, { ProfileAPIResponse } from "../APIService/APIService"

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileAPIResponse | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<Partial<ProfileAPIResponse>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    APIService.fetchUserProfile()
      .then((data) => {
        setProfile(data)
        setFormData(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (field: keyof ProfileAPIResponse, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      const updated = await APIService.updateUserProfile(formData)
      setProfile(updated)
      setEditMode(false)
    } catch (err) {
      console.error(err)
      alert("Failed to update profile.")
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData(profile)
    }
    setEditMode(false)
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!profile) return <div className="p-8 text-red-500">Failed to load profile.</div>

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground text-sm">Manage your account settings and API credentials</p>
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>This data is used for authentication and agent logic.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EditableField
            label="Twitter User Name"
            value={formData.userName || ""}
            editable={editMode}
            onChange={(val) => handleChange("userName", val)}
          />
          <EditableField
            label="Client ID"
            value={formData.clientID || ""}
            editable={editMode}
            onChange={(val) => handleChange("clientID", val)}
          />
          <EditableField
            label="Client Secret"
            value={formData.clientSecret || ""}
            editable={editMode}
            onChange={(val) => handleChange("clientSecret", val)}
          />
          <EditableField
            label="TwitterAPI.io Key"
            value={formData.twitterAPIkey || ""}
            editable={editMode}
            onChange={(val) => handleChange("twitterAPIkey", val)}
          />
          <EditableField
            label="Agent Prompt"
            value={formData.agentPrompt || ""}
            editable={editMode}
            multiline
            onChange={(val) => handleChange("agentPrompt", val)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <EditableField
              label="Created At"
              value={new Date(formData.createAt || "").toLocaleString()}
              editable={false}
            />
            <div className="flex flex-col justify-end text-sm text-muted-foreground text-center sm:text-left pt-6">
              <div className="font-semibold text-foreground">{formData.expireDays} days</div>
              <div>Between every following(s) recalibration</div>
            </div>
            <EditableField
              label="Expire At"
              value={new Date(formData.expireAt || "").toLocaleString()}
              editable={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function EditableField({
  label,
  value,
  editable,
  multiline = false,
  onChange,
}: {
  label: string
  value: string
  editable: boolean
  multiline?: boolean
  onChange?: (value: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFocus = () => {
    textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>

      {editable && onChange ? (
        multiline ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            className="h-64 resize-y overflow-auto rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter your agent prompt..."
          />
        ) : (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )
      ) : multiline ? (
        <pre className="whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-sm text-foreground font-sans max-h-96 overflow-auto">
          {value || <i>Empty</i>}
        </pre>
      ) : (
        <p className="text-sm text-foreground">{value || <i>Empty</i>}</p>
      )}
    </div>
  )
}


