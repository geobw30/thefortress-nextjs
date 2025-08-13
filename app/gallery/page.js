'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { data: session, status } = useSession()

  // Fetch gallery images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery')
        const data = await response.json()
        
        if (response.ok) {
          setGalleryImages(data.images)
        } else {
          setError(data.error || 'Failed to fetch images')
        }
      } catch (err) {
        setError('Failed to fetch images')
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
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
      formData.append('description', description)
      formData.append('image', imageFile)

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Add the new image to the gallery
        setGalleryImages([data.image, ...galleryImages])
        // Reset form
        setTitle('')
        setDescription('')
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
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Our Gallery</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Explore images from our work in communities across East Africa.
          </p>
          
          {/* Upload button for authenticated users */}
          {status === 'authenticated' && (
            <div className="mt-8">
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="btn-primary"
              >
                {showUploadForm ? 'Cancel Upload' : 'Upload Image'}
              </button>
            </div>
          )}
        </div>
        
        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-secondary rounded-lg p-6 mb-12 fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload New Image</h2>
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
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="form-input w-full"
                ></textarea>
              </div>
              
              <div>
                <label className="form-label">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
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
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Gallery Images */}
        {error && !showUploadForm && (
          <div className="mb-4 alert-error">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image._id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/images/placeholder.jpg'
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition duration-300 p-4">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                  <p className="text-xs mt-2 text-gray-300">Uploaded by {image.uploadedBy?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {galleryImages.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No images found in the gallery.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryPage