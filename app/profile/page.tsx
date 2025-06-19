import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, LinkIcon, Edit } from "lucide-react"

export default function ProfilePage() {
  const profile = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Digital marketer & content creator. Passionate about technology and social media trends. Building the future one tweet at a time.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    joinDate: "March 2019",
    following: 1234,
    followers: 45200,
    tweets: 2847,
    avatar: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=200&width=600",
    verified: true,
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card>
        <div className="relative">
          <div
            className="h-48 w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"
            style={{
              backgroundImage: `url(${profile.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Avatar className="absolute -bottom-16 left-6 h-32 w-32 border-4 border-background">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
            <AvatarFallback className="text-2xl">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardContent className="pt-20">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                {profile.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{profile.username}</p>
              <p className="text-sm max-w-md">{profile.bio}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={profile.website} className="text-blue-600 hover:underline">
                    {profile.website.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {profile.joinDate}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="font-bold">{profile.following.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold">{profile.followers.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{profile.tweets.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">Tweets</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your account performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Average Engagement Rate</span>
              <span className="font-bold">4.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Growth</span>
              <span className="font-bold text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Top Performing Tweet</span>
              <span className="font-bold">2.3K likes</span>
            </div>
            <div className="flex justify-between">
              <span>Average Daily Tweets</span>
              <span className="font-bold">3.2</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-sm">Reached 45K followers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <span className="text-sm">Tweet went viral (10K+ retweets)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span className="text-sm">Featured in trending topics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-orange-500 rounded-full" />
              <span className="text-sm">Highest engagement month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
