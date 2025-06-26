"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import APIService from "../APIService/APIService"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function InputTweetsManager() {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const fetchInputTweets = async () => {
      setLoading(true)
      try {
        const data = await APIService.get("dailyworkingtweets")
        setTweets(data)
      } catch (error) {
        console.error("Failed to load input tweets.", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInputTweets()
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleProcessTweets = async () => {
    setShowConfirm(false)
    try {
      await APIService.triggerProcessTweet()
      alert("Tweet processing triggered successfully.")
    } catch (err) {
      console.error(err)
      alert("Failed to trigger tweet processing.")
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Input Tweets</h2>
        <Button onClick={() => setShowConfirm(true)}>Process Tweets</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Tweets</CardTitle>
          <CardDescription>These tweets are queued for analysis and processing</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-4">
              {tweets.map((tweet: any) => (
                <Card key={tweet._id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={tweet.author.profilePicture} alt={tweet.author.userName} />
                      <AvatarFallback>{tweet.author.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{tweet.author.name}</span>
                        <span className="text-muted-foreground">@{tweet.author.userName}</span>
                      </div>
                      <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        View Original Tweet
                      </a>
                      <p className="text-sm leading-relaxed">{tweet.text}</p>
                      {tweet.profile_bio?.description && (
                        <div className="text-xs text-muted-foreground border-l-2 pl-2 italic">
                          {tweet.profile_bio.description}
                        </div>
                      )}
                      {tweet.text && tweet.text.length > 200 && (
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-1 py-0 h-6 absolute right-0 top-0 z-10"
                            onClick={() => toggleExpand(tweet._id)}
                            aria-label={expanded[tweet._id] ? "Collapse" : "Expand"}
                          >
                            {expanded[tweet._id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                          <div
                            className={`text-xs text-muted-foreground border-l-2 pl-2 mt-2 italic pr-8 transition-all duration-200 ${expanded[tweet._id] ? "" : "line-clamp-2"}`}
                            style={{
                              maxHeight: expanded[tweet._id] ? "none" : "2.8em",
                              overflow: expanded[tweet._id] ? "visible" : "hidden",
                            }}
                          >
                            {tweet.text}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Followers: {tweet.author.followers}</Badge>
                        <Badge variant="outline">Tweets: {tweet.author.statusesCount}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Tweets</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will start processing all currently visible tweets. Are you sure?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button onClick={handleProcessTweets}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
