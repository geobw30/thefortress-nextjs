'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  // Close mobile menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              The Fortress
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              About
            </Link>
            <Link href="/programs" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Programs
            </Link>
            <Link href="/impact" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Impact
            </Link>
            <Link href="/gallery" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Gallery
            </Link>
            <Link href="/stories" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Stories
            </Link>
            <Link href="/donate" className="text-gray-800 hover:text-primary font-medium transition duration-300">
              Donate
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : session ? (
              <>
                <Link href="/dashboard" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                  Dashboard
                </Link>
                {session.user.isAdmin && (
                  <Link href="/admin" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  className="text-gray-800 hover:text-primary font-medium transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-primary focus:outline-none transition duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                About
              </Link>
              <Link href="/programs" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Programs
              </Link>
              <Link href="/impact" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Impact
              </Link>
              <Link href="/gallery" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Gallery
              </Link>
              <Link href="/stories" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Stories
              </Link>
              <Link href="/donate" className="text-gray-800 hover:text-primary font-medium transition duration-300">
                Donate
              </Link>
              
              <div className="pt-4 border-t">
                {status === 'loading' ? (
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : session ? (
                  <>
                    <Link href="/dashboard" className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300">
                      Dashboard
                    </Link>
                    {session.user.isAdmin && (
                      <Link href="/admin" className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300">
                        Admin
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="block text-gray-800 hover:text-primary font-medium transition duration-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300">
                      Login
                    </Link>
                    <Link href="/register" className="inline-block btn-primary">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header