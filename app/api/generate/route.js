import clientPromise from "@/lib/mongodb"
import { generateShortCode } from "@/lib/shortcode"

// Paths that a short URL must never collide with, since they're real routes in the app
const RESERVED_PATHS = ["generate", "about", "contact", "api", "github", "favicon.ico"]

function isValidUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const url = (body.url || "").trim()
    let shorturl = (body.shorturl || "").trim()

    if (!url) {
      return Response.json(
        { success: false, error: true, message: "Please enter a URL." },
        { status: 400 }
      )
    }

    if (!isValidUrl(url)) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Please enter a valid URL, including http:// or https://",
        },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("bitlink")
    const collection = db.collection("url")

    if (shorturl) {
      if (RESERVED_PATHS.includes(shorturl.toLowerCase())) {
        return Response.json(
          { success: false, error: true, message: "That short URL is reserved, please choose another." },
          { status: 400 }
        )
      }

      const existing = await collection.findOne({ shorturl })
      if (existing) {
        return Response.json(
          { success: false, error: true, message: "That short URL is already taken." },
          { status: 409 }
        )
      }
    } else {
      // No custom code given, generate a random one that isn't already taken
      let attempts = 0
      let candidate = generateShortCode(6)
      while (await collection.findOne({ shorturl: candidate })) {
        candidate = generateShortCode(6)
        attempts += 1
        if (attempts > 5) {
          return Response.json(
            { success: false, error: true, message: "Could not generate a unique short URL, please try again." },
            { status: 500 }
          )
        }
      }
      shorturl = candidate
    }

    await collection.insertOne({
      url,
      shorturl,
      clicks: 0,
      createdAt: new Date(),
    })

    return Response.json({
      success: true,
      error: false,
      message: "URL generated successfully!",
      shorturl,
    })
  } catch (err) {
    console.error(err)
    return Response.json(
      { success: false, error: true, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
