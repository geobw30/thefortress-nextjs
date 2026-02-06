import mongoose from 'mongoose'
import Story from '@/models/Story'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Connect to MongoDB helper
async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI)
  }
}

// GET - Fetch all stories
export async function GET(request) {
  try {
    await connectDB()

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

// POST - Create a new story
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await connectDB()

    const body = await request.json()
    const { title, content, author, imageUrl } = body

    if (!title || !content || !author) {
      return new Response(
        JSON.stringify({ error: 'Title, content, and author are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const story = new Story({
      title,
      content,
      author,
      imageUrl: imageUrl || '',
      uploadedBy: session.user.id,
    })

    await story.save()

    return new Response(
      JSON.stringify({ message: 'Story created successfully', story }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Story creation error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// PUT - Update a story
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await connectDB()

    const body = await request.json()
    const { id, title, content, author, imageUrl } = body

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Story ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const story = await Story.findById(id)

    if (!story) {
      return new Response(
        JSON.stringify({ error: 'Story not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin or the owner of the story
    if (!session.user.isAdmin && story.uploadedBy.toString() !== session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Not authorized to update this story' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Update fields
    if (title) story.title = title
    if (content) story.content = content
    if (author) story.author = author
    if (imageUrl !== undefined) story.imageUrl = imageUrl

    await story.save()

    return new Response(
      JSON.stringify({ message: 'Story updated successfully', story }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Story update error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// DELETE - Delete a story
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Story ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const story = await Story.findById(id)

    if (!story) {
      return new Response(
        JSON.stringify({ error: 'Story not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin or the owner of the story
    if (!session.user.isAdmin && story.uploadedBy.toString() !== session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Not authorized to delete this story' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await Story.findByIdAndDelete(id)

    return new Response(
      JSON.stringify({ message: 'Story deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Story deletion error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}