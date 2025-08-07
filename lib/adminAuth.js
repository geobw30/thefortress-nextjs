import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function isAdmin(req, res, next) {
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
    status: 200
  }
}