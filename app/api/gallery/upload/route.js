import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import mongoose from 'mongoose'
import Gallery from '@/models/Gallery'
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
    const description = formData.get('description')
    const imageFile = formData.get('image')

    // Validate input
    if (!title || !imageFile) {
      return new Response(
        JSON.stringify({ error: 'Title and image are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Convert file to buffer
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'thefortress/gallery',
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

    // Save image data to database
    const newGalleryImage = new Gallery({
      title,
      description,
      imageUrl: uploadResult.secure_url,
      uploadedBy: session.user.id,
    })

    await newGalleryImage.save()

    // Return success response
    return new Response(
      JSON.stringify({ 
        message: 'Image uploaded successfully',
        image: newGalleryImage 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Gallery upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}