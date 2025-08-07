import mongoose from 'mongoose'
import Gallery from '@/models/Gallery'

export async function GET(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Fetch gallery images
    const galleryImages = await Gallery.find({})
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })

    // Return success response
    return new Response(
      JSON.stringify({ images: galleryImages }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}