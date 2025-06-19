"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, Save, RotateCcw, Settings } from "lucide-react"

export default function AIAgentPage() {
  const [prompt, setPrompt] = useState(`You are a helpful AI assistant for social media management. Your role is to:

1. Generate engaging replies to tweets
2. Create thoughtful comments on posts  
3. Craft compelling quote tweets
4. Maintain a professional and friendly tone
5. Stay relevant to the conversation topic

Guidelines:
- Keep responses concise (under 280 characters for tweets)
- Use appropriate hashtags when relevant
- Avoid controversial topics
- Be authentic and add value to conversations
- Match the tone of the original post

Example scenarios:
- Reply to: "Just launched my new startup!"
- Comment on: "What's your favorite productivity tip?"
- Quote tweet: "AI is changing everything..."`)

  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [testScenario, setTestScenario] = useState("reply")

  const testScenarios = [
    {
      type: "reply",
      label: "Reply to Tweet",
      example: "Just launched my new startup! Excited to see where this journey takes me 🚀 #entrepreneur #startup",
    },
    {
      type: "comment",
      label: "Comment on Post",
      example:
        "What's your favorite productivity tip? I'm always looking for ways to optimize my workflow and get more done in less time.",
    },
    {
      type: "quote",
      label: "Quote Tweet",
      example:
        "AI is changing everything we know about content creation. The future is here and it's incredible to witness this transformation.",
    },
  ]

  const handleTest = async () => {
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const scenario = testScenarios.find((s) => s.type === testScenario)
      let mockResult = ""

      switch (testScenario) {
        case "reply":
          mockResult =
            "Congratulations on your launch! 🎉 Wishing you all the best on this exciting entrepreneurial journey. The startup world needs more passionate founders like you! #StartupLife"
          break
        case "comment":
          mockResult =
            "Time-blocking has been a game-changer for me! I dedicate specific hours to different tasks and it's amazing how much more focused and productive I become. What about you? 📅✨"
          break
        case "quote":
          mockResult =
            "Absolutely agree! The pace of AI innovation is breathtaking. We're witnessing a fundamental shift in how content is created, curated, and consumed. Exciting times ahead for creators and businesses alike! 🤖✨"
          break
        default:
          mockResult = "This is a sample AI-generated response based on your prompt and the selected scenario."
      }

      setResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  const handleSave = () => {
    // Save prompt logic here
    console.log("Saving prompt:", prompt)
  }

  const handleReset = () => {
    setPrompt("")
    setResult("")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Agent Testing</h2>
          <p className="text-muted-foreground">
            Test and refine your AI agent prompts for automated social media interactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Prompt
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel - Prompt Input */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Agent Prompt</CardTitle>
            <CardDescription>Configure your AI agent's behavior and response style</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex-1">
              <Textarea
                placeholder="Enter your AI agent prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-full min-h-[400px] resize-none"
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Test Scenario</h4>
              <div className="flex flex-wrap gap-2">
                {testScenarios.map((scenario) => (
                  <Badge
                    key={scenario.type}
                    variant={testScenario === scenario.type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setTestScenario(scenario.type)}
                  >
                    {scenario.label}
                  </Badge>
                ))}
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Example scenario:</p>
                <p className="text-sm">{testScenarios.find((s) => s.type === testScenario)?.example}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleTest} disabled={isLoading} className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                {isLoading ? "Testing..." : "Test Prompt"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Results */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
            <CardDescription>Preview how your AI agent will respond to the selected scenario</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 p-4 bg-muted rounded-lg min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground">Generating AI response...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{testScenarios.find((s) => s.type === testScenario)?.label}</Badge>
                    <span className="text-xs text-muted-foreground">{result.length}/280 characters</span>
                  </div>
                  <p className="text-sm leading-relaxed">{result}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p className="text-center">Click "Test Prompt" to see how your AI agent responds</p>
                </div>
              )}
            </div>

            {result && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Response Analysis</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length:</span>
                    <span>{result.length} chars</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tone:</span>
                    <span>Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hashtags:</span>
                    <span>{(result.match(/#\w+/g) || []).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emojis:</span>
                    <span>
                      {
                        (
                          result.match(
                            /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                          ) || []
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
