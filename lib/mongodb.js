// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Add MONGODB_URI to .env.local')
}

let client
let clientPromise

// Cache the connection across invocations in every environment (including
// production on serverless platforms like Vercel), not just development.
// Without this, each request opens a brand new connection, which floods
// MongoDB Atlas and causes intermittent SSL/connection errors under load.
if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export default clientPromise