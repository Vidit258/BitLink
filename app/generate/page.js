"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Generate = () => {
  const [url, setUrl] = useState("")
  const [shorturl, setShorturl] = useState("")
  const [generated, setGenerated] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    setError("")
    setGenerated("")
    setCopied(false)

    if (!url.trim()) {
      setError("Please enter a URL to shorten.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), shorturl: shorturl.trim() }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || "Something went wrong.")
        return
      }

      const host = process.env.NEXT_PUBLIC_HOST || window.location.origin
      setGenerated(`${host}/${result.shorturl}`)
      setUrl("")
      setShorturl("")
    } catch (err) {
      console.error(err)
      setError("Could not reach the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

const copyToClipboard = () => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(generated)
  } else {
    const textarea = document.createElement("textarea")
    textarea.value = generated
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    try {
      document.execCommand("copy")
    } catch (err) {
      console.error("Copy failed:", err)
    }
    document.body.removeChild(textarea)
  }
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}

  return (
    <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
      <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
      <div className='flex flex-col gap-2'>
        <input
          type="text"
          value={url}
          className='px-4 py-2 focus:outline-purple-600 rounded-md'
          placeholder='Enter your URL (e.g. https://example.com)'
          onChange={e => setUrl(e.target.value)}
        />

        <input
          type="text"
          value={shorturl}
          className='px-4 py-2 focus:outline-purple-600 rounded-md'
          placeholder='Custom short URL text (optional)'
          onChange={e => setShorturl(e.target.value)}
        />

        <button
          onClick={generate}
          disabled={loading}
          className='bg-purple-500 disabled:opacity-60 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white'
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {generated && (
        <div className="flex flex-col gap-2">
          <span className='font-bold text-lg'>Your Link</span>
          <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2">
            <code className="flex-1 truncate">
              <Link target="_blank" href={generated}>{generated}</Link>
            </code>
            <button
              onClick={copyToClipboard}
              className="text-sm shrink-0 bg-purple-500 text-white rounded-md px-3 py-1 font-bold"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Generate
