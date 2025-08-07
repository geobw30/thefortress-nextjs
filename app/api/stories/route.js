import mongoose from 'mongoose'
import Story from '@/models/Story'

export async function GET(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Fetch stories
    const stories = await Story.find({})
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })

    // Return success response
    return new Response(
      JSON.stringify({ stories }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Stories fetch error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}