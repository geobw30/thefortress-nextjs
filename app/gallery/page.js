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
  
  // Lightbox modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Lightbox functions
  const openModal = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
    setIsModalOpen(true)
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setCurrentIndex(0)
    // Re-enable background scrolling
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return

      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, currentIndex, galleryImages])
  
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
            Explore images from our work in communities we serve.
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
          {galleryImages.map((image, index) => (
            <div
              key={image._id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => openModal(image, index)}
            >
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
        
        {/* Lightbox Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Modal content */}
            <div
              className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white text-4xl z-10"
                onClick={closeModal}
              >
                &times;
              </button>
              
              {/* Navigation buttons */}
              <button
                className="absolute left-4 text-white text-5xl z-10"
                onClick={goToPrevious}
              >
                &#8249;
              </button>
              
              <button
                className="absolute right-4 text-white text-5xl z-10"
                onClick={goToNext}
              >
                &#8250;
              </button>
              
              {/* Image display */}
              <div className="max-w-full max-h-full flex items-center justify-center">
                <img
                  src={selectedImage?.imageUrl}
                  alt={selectedImage?.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                <h3 className="text-xl font-semibold">{selectedImage?.title}</h3>
                <p className="text-gray-300">{selectedImage?.description}</p>
                <p className="text-xs mt-1 text-gray-400">
                  Uploaded by {selectedImage?.uploadedBy?.name} |
                  Image {currentIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
        
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