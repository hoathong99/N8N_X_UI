
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import APIService from "../APIService/APIService"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const USER_NAME = "Cris.Twendee"
const USER_TAG = "@0xCris2163"

export default function TweetsPage() {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
  const [quoteFilter, setQuoteFilter] = useState<"" | "true" | "false">("")
  const [isTweetedFilter, setIsTweetedFilter] = useState<"" | "true" | "false">("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [debounceMap, setDebounceMap] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true)
      try {
        const data = await APIService.get("workingtweets")
        setTweets(data)
      } catch (error) {
        // handle error (optional)
      } finally {
        setLoading(false)
      }
    }
    fetchTweets()
  }, [])

  const handleProcessTweets = async () => {
    setShowConfirm(false)
    try {
      await APIService.triggerQuoteTweet()
      alert("Tweet processing triggered successfully.")
    } catch (err) {
      console.error(err)
      alert("Failed to trigger tweet processing.")
    }
  }

  const filteredTweets = tweets.filter((tweet) => {
    let pass = true
    if (quoteFilter !== "") {
      pass = pass && String(tweet.quote) === quoteFilter
    }
    if (isTweetedFilter !== "") {
      pass = pass && String(tweet.isTweeted) === isTweetedFilter
    }
    return pass
  })

  const getBadges = (tweet: any) => (
    <div className="flex gap-2">
      {tweet.quote ? (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          To Quote
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Not To Quote
        </Badge>
      )}
      {tweet.isTweeted ? (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Tweeted
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
          Not Tweeted
        </Badge>
      )}
    </div>
  )

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tweets Management</h2>
        <Button onClick={() => setShowConfirm(true)}>Trigger Quoting</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tweets</CardTitle>
          <CardDescription>Manage your published, scheduled, and draft tweets, quote number decides how many to-quote tweet will randomly be chosen to be quoted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            {/* Filter by quote */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Quote</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={quoteFilter}
                onChange={e => setQuoteFilter(e.target.value as "" | "true" | "false")}
              >
                <option value="">All</option>
                <option value="true">To Quote</option>
                <option value="false">Not To Quote</option>
              </select>
            </div>
            {/* Filter by isTweeted */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Tweeted</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={isTweetedFilter}
                onChange={e => setIsTweetedFilter(e.target.value as "" | "true" | "false")}
              >
                <option value="">All</option>
                <option value="true">Tweeted</option>
                <option value="false">Not Tweeted</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-4">
              {filteredTweets.map((tweet: any) => (
                <Card key={tweet._id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{USER_NAME}</span>
                            <span className="text-muted-foreground">{USER_TAG}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground text-sm">{formatDate(tweet.date)}</span>
                          </div>
                          {getBadges(tweet)}
                        </div>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                console.log("quote state before click:", tweet.quote)
                                if (tweet.quote) {
                                  console.log("Calling NotQuote...")
                                  await APIService.NotQuote(tweet._id)
                                } else {
                                  console.log("Calling Quote...")
                                  await APIService.Quote(tweet._id)
                                }
                                setTweets((prev) =>
                                  prev.map((t) =>
                                    t._id === tweet._id ? { ...t, quote: !tweet.quote } : t
                                  )
                                )
                              } catch (err) {
                                alert("Failed to update quote status")
                                console.error(err)
                              }
                            }}
                          >
                            {tweet.quote ? "Do Not Quote" : "Quote"}
                          </Button> */}
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={debounceMap[tweet._id]}
                            onClick={async () => {
                              if (debounceMap[tweet._id]) return

                              setDebounceMap((prev) => ({ ...prev, [tweet._id]: true }))
                              setTimeout(() => {
                                setDebounceMap((prev) => {
                                  const { [tweet._id]: _, ...rest } = prev
                                  return rest
                                })
                              }, 4000)

                              try {
                                if (tweet.quote) {
                                  await APIService.NotQuote(tweet._id)
                                } else {
                                  await APIService.Quote(tweet._id)
                                }

                                setTweets((prev) =>
                                  prev.map((t) =>
                                    t._id === tweet._id ? { ...t, quote: !tweet.quote } : t
                                  )
                                )
                              } catch (err) {
                                alert("Failed to update quote status")
                                console.error(err)
                              }
                            }}
                          >
                            {tweet.quote ? "Do Not Quote" : "Quote"}
                          </Button>
                        </div>
                      </div>

                      {/* AI generated comment */}
                      <div>
                        <span className="font-semibold text-xs text-muted-foreground">AI Comment:</span>
                        {tweet.Text && tweet.Text.trim() !== "" ? (
                          <p className="text-sm leading-relaxed">{tweet.Text}</p>
                        ) : (
                          <p className="text-sm leading-relaxed text-gray-400 italic">No comment</p>
                        )}
                      </div>

                      {/* Expandable tweetText */}
                      {tweet.tweetText && (
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
                            className={`text-xs text-muted-foreground border-l-2 pl-2 mt-2 italic pr-8 transition-all duration-200 ${expanded[tweet._id] ? "" : "line-clamp-2"
                              }`}
                            style={{
                              maxHeight: expanded[tweet._id] ? "none" : "2.8em",
                              overflow: expanded[tweet._id] ? "visible" : "hidden",
                            }}
                          >
                            {tweet.tweetText}
                          </div>
                        </div>
                      )}
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
            <DialogTitle>Quote Tweets</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will start quoting all To Quote. Are you sure?
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
