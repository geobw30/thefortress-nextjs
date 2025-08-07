import { isAdmin } from '@/lib/adminAuth'
import mongoose from 'mongoose'
import Gallery from '@/models/Gallery'

export async function GET(request) {
  try {
    // Check if user is admin
    const authResult = await isAdmin()
    
    if (authResult.error) {
      return new Response(
        JSON.stringify({ error: authResult.error }),
        { status: authResult.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Count gallery images
    const count = await Gallery.countDocuments()

    // Return success response
    return new Response(
      JSON.stringify({ count }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Gallery stats error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}