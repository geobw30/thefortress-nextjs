import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function isAdmin() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return {
        error: 'Unauthorized',
        status: 401
      }
    }
    
    if (!session.user.isAdmin) {
      return {
        error: 'Forbidden: Admin access required',
        status: 403
      }
    }
    
    return {
      session,
      error: null,
      status: 200
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return {
      error: 'Internal server error',
      status: 500
    }
  }
}