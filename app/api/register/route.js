import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/User'

export async function POST(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Parse request body
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false // Default to false for new users
    })

    // Save user to database
    await newUser.save()

    // Return success response
    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}