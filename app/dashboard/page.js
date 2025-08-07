'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {session?.user?.name}</span>
            <button
              onClick={() => router.push('/')}
              className="btn-secondary text-gray-900"
            >
              Back to Site
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Gallery Uploads
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'stories'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Stories
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="card p-6">
          {activeTab === 'overview' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
              <p className="text-gray-600 mb-6">
                Welcome to your dashboard. Here you can manage your gallery uploads and stories.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <div className="text-gray-600">Gallery Images</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5</div>
                  <div className="text-gray-600">Stories</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24</div>
                  <div className="text-gray-600">Days Active</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('gallery')}
                    className="btn-primary"
                  >
                    Upload Gallery Image
                  </button>
                  <button 
                    onClick={() => setActiveTab('stories')}
                    className="btn-primary"
                  >
                    Share Your Story
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Gallery Uploads</h2>
              <p className="text-gray-600 mb-4">
                View and manage your gallery uploads.
              </p>
              
              <div className="mb-6">
                <button 
                  onClick={() => router.push('/gallery')}
                  className="btn-primary"
                >
                  Upload New Image
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="card overflow-hidden">
                    <div className="bg-secondary border-2 border-dashed w-full h-48 flex items-center justify-center">
                      <span className="text-gray-500">My Image {item}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">My Gallery Image {item}</h3>
                      <p className="text-sm text-gray-500">Uploaded on 2023-06-{10 + item}</p>
                      <div className="mt-2 flex space-x-2">
                        <button className="text-primary text-sm hover:underline">Edit</button>
                        <button className="text-red-600 text-sm hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Stories</h2>
              <p className="text-gray-600 mb-4">
                View and manage your stories.
              </p>
              
              <div className="mb-6">
                <button 
                  onClick={() => router.push('/stories')}
                  className="btn-primary"
                >
                  Share New Story
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">My Community Experience</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2023-06-15</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Volunteer Journey</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">2023-06-10</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>
              <p className="text-gray-600 mb-6">
                Update your profile information.
              </p>
              
              <form className="space-y-6">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    defaultValue={session?.user?.name}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    defaultValue={session?.user?.email}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="form-input"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default DashboardPage