import { redirect } from "next/navigation"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
  const { shorturl } = await params

  const client = await clientPromise
  const db = client.db("bitlink")
  const collection = db.collection("url")

  const doc = await collection.findOne({ shorturl })

  if (doc) {
    // Fire-and-forget click tracking, then redirect
    await collection.updateOne({ shorturl }, { $inc: { clicks: 1 } })
    redirect(doc.url)
  }

  return (
    <main className="bg-purple-100 min-h-[80vh] flex items-center justify-center">
      <div className="text-center flex flex-col gap-4 items-center px-6">
        <h1 className="text-3xl font-bold">Link not found</h1>
        <p className="text-gray-600">
          The short link <span className="font-mono">/{shorturl}</span> doesn&apos;t exist or has expired.
        </p>
        <Link href="/generate">
          <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white">
            Create a new link
          </button>
        </Link>
      </div>
    </main>
  )
}
