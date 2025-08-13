'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const StoriesPage = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { data: session, status } = useSession()

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()
        
        if (response.ok) {
          setStories(data.stories)
        } else {
          setError(data.error || 'Failed to fetch stories')
        }
      } catch (err) {
        setError('Failed to fetch stories')
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const response = await fetch('/api/stories/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Add the new story to the list
        setStories([data.story, ...stories])
        // Reset form
        setTitle('')
        setContent('')
        setImageFile(null)
        setShowUploadForm(false)
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError('Upload failed')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-16 px-4 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Stories & Testimonials</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Read inspiring stories from the communities we serve and those who support our mission.
          </p>
          
          {/* Upload button for authenticated users */}
          {status === 'authenticated' && (
            <div className="mt-8">
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="btn-primary"
              >
                {showUploadForm ? 'Cancel Upload' : 'Share Your Story'}
              </button>
            </div>
          )}
        </div>
        
        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-secondary rounded-lg p-6 mb-12 fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Story</h2>
            {error && (
              <div className="mb-4 alert-error">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="6"
                  className="form-input"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="form-label">Image (Optional)</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="form-input"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Submitting...' : 'Submit Story'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Stories */}
        {error && !showUploadForm && (
          <div className="mb-4 alert-error">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story._id} className="card hover:shadow-lg transition duration-300">
              {story.imageUrl && (
                <img 
                  src={story.imageUrl} 
                  alt={story.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/images/placeholder.jpg'
                  }}
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{story.title}</h2>
                <p className="text-gray-600 mb-4">{story.content.substring(0, 150)}{story.content.length > 150 ? '...' : ''}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 font-medium">{story.author}</p>
                    <p className="text-gray-500 text-sm">{new Date(story.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button className="text-primary font-semibold hover:text-blue-800 transition duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {stories.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No stories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoriesPage