const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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

  // Add more methods (post, put, delete) as needed
}

export default APIService