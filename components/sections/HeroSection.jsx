import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="video-container">
          <video 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
          Welcome to The Fortress
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto fade-in">
          Empowering communities through education, healthcare, and sustainable development
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
          <button className="btn-primary">
            Learn More
          </button>
          <button className="btn-secondary text-gray-900">
            Donate Now
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection