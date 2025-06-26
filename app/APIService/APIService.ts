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
  userId: string,
  twitterAPIio_2ndCursor: string,
  refreshToken: string,
  xAuthorize: string,
  quoteNumber: number,
}

const testURL = "https://cris2163.app.n8n.cloud/webhook-test/";

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
    const res = await fetch(`${BASE_URL}profile`, {
      // const res = await fetch(`${testURL}profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
    if (!res.ok) throw new Error("Failed to update profile")
    return res.json()
  }

  static async NotQuote(_id: string) {
    const res = await fetch(`${BASE_URL}disableQuote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
    if (!res.ok) throw new Error("Failed to update quote")
    // Optional: remove if response body not needed
    try {
      return await res.json()
    } catch {
      return {}
    }
  }

  static async Quote(_id: string) {
    const res = await fetch(`${BASE_URL}enableQuote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
    if (!res.ok) throw new Error("Failed to update quote")
    // Optional: remove if response body not needed
    try {
      return await res.json()
    } catch {
      return {}
    }
  }

  static async fetchTwitterCursor(data: Partial<ProfileAPIResponse>) {

    const res = await fetch(`${BASE_URL}ValidateCursor`, {
      // const res = await fetch(`${testURL}ValidateCursor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to fetch cursor key.")
    const result = await res.json()
    return result.twitterAPIio_2ndCursor as string
  }

  // Add more methods (post, put, delete) as needed

  static async exchangeTwitterCode(code: string, clientId: string, clientSecret: string): Promise<string> {
    const authHeader = encodeToBase64(clientId, clientSecret);

    const res = await fetch(`${BASE_URL}getrefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorize: authHeader,
        clientId,
        code,
      }),
    })

    if (!res.ok) {
      throw new Error("Failed to get refresh token")
    }

    const data = await res.json()
    return data.refreshToken;
  }

  static async triggerProcessTweet() {
    const res = await fetch(`${BASE_URL}13746b8f-f2a2-4f07-ac99-5b2daf236137`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("API GET error")
    return res.json()
  }

  static async triggerQuoteTweet() {
    const res = await fetch(`${BASE_URL}393696b0-945b-4952-8370-9ae83528922a`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("API GET error")
    return res.json()
  }

}

export default APIService

export function encodeToBase64(clientId: string, clientSecret: string) {
  const combined = `${clientId}:${clientSecret}`;
  const base64 = Buffer.from(combined).toString("base64");
  return base64;
}

