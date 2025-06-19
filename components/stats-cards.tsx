import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Heart, TrendingUp } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Tweets",
      value: "2,847",
      change: "+12%",
      icon: MessageSquare,
    },
    {
      title: "Followers",
      value: "45.2K",
      change: "+5.2%",
      icon: Users,
    },
    {
      title: "Engagement",
      value: "8.9K",
      change: "+18%",
      icon: Heart,
    },
    {
      title: "Impressions",
      value: "234K",
      change: "+23%",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
