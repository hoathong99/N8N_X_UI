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
import { Edit, Save, X } from "lucide-react"
import APIService, { encodeToBase64, ProfileAPIResponse } from "../APIService/APIService"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileAPIResponse | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

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

  const confirmSave = async () => {
    setShowConfirm(false)
    try {
      const updated = await APIService.updateUserProfile(formData)
      setProfile(updated)
      setEditMode(false)
    } catch (err) {
      console.error(err)
      alert("Failed to update profile.")
    }
  }

  const handleSave = () => {
    const requiredFields = ["userName", "clientID", "clientSecret", "twitterAPIkey", "agentPrompt"]
    for (const field of requiredFields) {
      if (!formData[field as keyof ProfileAPIResponse]) {
        alert(`Field "${field}" is required.`)
        return
      }
    }
    setShowConfirm(true)
  }

  const handleCancel = () => {
    if (profile) {
      setFormData(profile)
    }
    setEditMode(false)
  }

  const handleFetchCursorKey = async () => {
    try {
      const key = await APIService.fetchTwitterCursor(formData)
      setFormData((prev) => ({ ...prev, twitterAPIio_2ndCursor: key }))
    } catch (err) {
      console.error(err)
      alert("Failed to fetch cursor key.")
      setFormData((prev) => ({ ...prev, twitterAPIio_2ndCursor: "" }))
    }
  }

  const handleOpenAuthWindow = () => {
    const clientId = formData.clientID
    if (!clientId) return alert("Client ID is required.")

    const state = "xyz"
    const codeChallenge = "challenge123"

    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=https://oauth.n8n.cloud/oauth2/callback&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`

    window.open(url, "_blank", "noopener,noreferrer,width=600,height=700")
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
          <EditableField label="Twitter User Name" value={formData.userName || ""} editable={editMode} onChange={(val) => handleChange("userName", val)} />
          <EditableField label="Client ID" value={formData.clientID || ""} editable={editMode} onChange={(val) => handleChange("clientID", val)} />
          <EditableField label="Client Secret" value={formData.clientSecret || ""} editable={editMode} onChange={(val) => handleChange("clientSecret", val)} />

          {/* <EditableField
            label="Xauthorize"
            value={formData.xauthorize || ""}
            editable={false}
            button={editMode ? (
              <Button
                type="button"
                onClick={async () => {
                  try {
                    if (!formData.clientID || !formData.clientSecret) {
                      alert("Client ID and Client Secret are required")
                      return
                    }
                    const base64 = encodeToBase64(formData.clientID, formData.clientSecret)
                    setFormData((prev: any) => ({ ...prev, xauthorize: base64 }))
                  } catch (err) {
                    console.error(err)
                    alert("Failed to generate base64.")
                  }
                }}
              >
                Generate
              </Button>
            ) : undefined}
          /> */}
{/* 
          <EditableField
            label="Xauthorize"
            value={formData.xauthorize || ""}
            editable={false}
          />

          {editMode && (
            <div className="flex gap-2 items-end">
              <Button
                variant="outline"
                onClick={async () => {
                  if (!formData.clientID || !formData.clientSecret) {
                    alert("Client ID and Client Secret are required")
                    return
                  }
                  try {
                    const base64 = encodeToBase64(formData.clientID, formData.clientSecret)
                    setFormData((prev: any) => ({ ...prev, xauthorize: base64 }))
                  } catch (err) {
                    console.error(err)
                    alert("Failed to generate Xauthorize")
                  }
                }}
              >
                Generate Xauthorize
              </Button>
            </div>
          )} */}

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <EditableField
                label="X Authorize"
                value={formData.xAuthorize || ""}
                editable={false}
              />
            </div>
            {editMode && (
              <div className="flex gap-2 items-end">
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!formData.clientID || !formData.clientSecret) {
                      alert("Client ID and Client Secret are required")
                      return
                    }
                    try {
                      const base64 = encodeToBase64(formData.clientID, formData.clientSecret)
                      setFormData((prev: any) => ({ ...prev, xAuthorize: base64 }))
                    } catch (err) {
                      console.error(err)
                      alert("Failed to generate XAuthorize")
                    }
                  }}
                >
                  Generate Xauthorize
                </Button>
              </div>
            )}
          </div>

          {editMode && formData.clientID && (
            <div className="flex flex-col gap-2">
              <Button type="button" onClick={handleOpenAuthWindow}>Open Twitter OAuth Window</Button>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">Authorization Code</label>
                  <Input value={formData.authorizationCode || ""} onChange={(e) => handleChange("authorizationCode", e.target.value)} placeholder="Paste code from Twitter callback URL" />
                </div>
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!formData.authorizationCode || !formData.clientID || !formData.clientSecret) {
                      alert("Missing code, client ID, or client secret")
                      return
                    }
                    try {
                      const token = await APIService.exchangeTwitterCode(
                        formData.authorizationCode,
                        formData.clientID,
                        formData.clientSecret
                      )
                      setFormData((prev: any) => ({ ...prev, refreshToken: token }))
                    } catch (err) {
                      alert("Failed to fetch refresh token.")
                      console.error(err)
                    }
                  }}
                >
                  Get Refresh Token
                </Button>
              </div>
            </div>
          )}

          <EditableField label="Refresh Token" value={formData.refreshToken || ""} editable={false} />

          <EditableField label="TwitterAPI.io Key" value={formData.twitterAPIkey || ""} editable={editMode} onChange={(val) => handleChange("twitterAPIkey", val)} button={editMode ? (<Button type="button" onClick={handleFetchCursorKey}>Get TwitterAPI cursor Key</Button>) : null} />
          <EditableField label="TwitterAPI cursor Key" value={formData.twitterAPIio_2ndCursor || ""} editable={false} />
          <EditableField label="Agent Prompt" value={formData.agentPrompt || ""} editable={editMode} multiline onChange={(val) => handleChange("agentPrompt", val)} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <EditableField label="Created At" value={new Date(formData.createAt || "").toLocaleString()} editable={false} />
            <div className="flex flex-col justify-end text-sm text-muted-foreground text-center sm:text-left pt-6">
              <div className="font-semibold text-foreground">{formData.expireDays} days</div>
              <div>Between every following(s) recalibration</div>
            </div>
            <EditableField label="Expire At" value={new Date(formData.expireAt || "").toLocaleString()} editable={false} />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This will affect the current quote process.<br />
            <b>Do this only before 9 A.M and after 1 P.M</b> to avoid weird quotes.
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSave}>Confirm Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EditableField({
  label,
  value,
  editable,
  multiline = false,
  onChange,
  button,
}: {
  label: string
  value: string
  editable: boolean
  multiline?: boolean
  onChange?: (value: string) => void
  button?: React.ReactNode
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const handleFocus = () => textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })

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
          <div className="flex gap-2">
            <Input value={value} onChange={(e) => onChange(e.target.value)} />
            {button}
          </div>
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
