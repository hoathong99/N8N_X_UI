const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface ProfileAPIResponse {
  _id: string
  userName: string
  createAt: string
  expireAt: string
  expireDays: number
  twitterAPIkey: string
  clientID: string
  clientSecret: string
  agentPrompt: string
  cursor: string
  nextCursor: string
  userId: string
}

class APIService {
  static async get(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("API GET error")
    return res.json()
  }


  static async fetchUserProfile(): Promise<ProfileAPIResponse> {
    const response = await fetch(`${BASE_URL}profile`)
    if (!response.ok) {
      throw new Error("Failed to fetch user profile")
    }
    return response.json()
  }


  static async updateUserProfile(profile: Partial<ProfileAPIResponse>) {
    const testURL = "https://cris2163.app.n8n.cloud/webhook-test/profile";
    const res = await fetch(`${BASE_URL}profile`, {
      // const res = await fetch(testURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
    if (!res.ok) throw new Error("Failed to update profile")
    return res.json()
  }



  // Add more methods (post, put, delete) as needed
}

export default APIService