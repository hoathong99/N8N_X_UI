import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "John Doe",
    action: "liked your tweet",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Jane Smith",
    action: "retweeted your post",
    time: "5 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Mike Johnson",
    action: "followed you",
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Sarah Wilson",
    action: "commented on your tweet",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    user: "Alex Brown",
    action: "mentioned you in a tweet",
    time: "20 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback>
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
