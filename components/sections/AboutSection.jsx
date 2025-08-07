import React from 'react'

const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">About The Fortress</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 fade-in">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              The Fortress is dedicated to creating sustainable change in underserved communities 
              through education, healthcare, and economic empowerment initiatives. We believe that 
              every individual deserves access to basic necessities and opportunities for growth.
            </p>
            <p className="text-gray-600 mb-6">
              Founded in 2010, we have impacted over 50,000 lives across rural communities in East Africa, 
              providing access to clean water, education, and healthcare services.
            </p>
            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-secondary border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">About Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection