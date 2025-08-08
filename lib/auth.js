import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await mongoose.connect(process.env.MONGODB_URI)

        // Find user by email
        const user = await User.findOne({ email: credentials.email })

        // If user doesn't exist or password doesn't match
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.isAdmin = token.isAdmin
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)