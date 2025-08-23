import { isAdmin } from '@/lib/adminAuth'
import mongoose from 'mongoose'
import Story from '@/models/Story'

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic'

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

    // Count stories
    const count = await Story.countDocuments()

    // Return success response
    return new Response(
      JSON.stringify({ count }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Stories stats error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}