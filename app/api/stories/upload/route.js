import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import mongoose from 'mongoose'
import Story from '@/models/Story'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    // Get session to verify authentication
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Parse form data
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')
    const imageFile = formData.get('image')

    // Validate input
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let imageUrl = null

    // Upload image to Cloudinary if provided
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'thefortress/stories',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          }
        ).end(buffer)
      })

      imageUrl = uploadResult.secure_url
    }

    // Save story to database
    const newStory = new Story({
      title,
      content,
      imageUrl,
      author: session.user.name,
      uploadedBy: session.user.id,
    })

    await newStory.save()

    // Return success response
    return new Response(
      JSON.stringify({ 
        message: 'Story uploaded successfully',
        story: newStory 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Story upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}