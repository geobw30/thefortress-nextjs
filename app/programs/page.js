import React from 'react'

const ProgramsPage = () => {
  const programs = [
    {
      title: "Education Initiative",
      description: "Building schools and providing educational resources to underserved communities.",
      image: "/images/education.jpg",
      impact: "5,000+ students educated",
      goal: "Expand to 10,000 students by 2025"
    },
    {
      title: "Healthcare Access",
      description: "Establishing health clinics and providing medical care to remote areas.",
      image: "/images/healthcare.jpg",
      impact: "15 clinics established",
      goal: "Reach 50,000 patients annually"
    },
    {
      title: "Clean Water Projects",
      description: "Installing water wells and sanitation systems in communities without access to clean water.",
      image: "/images/water.jpg",
      impact: "150+ wells installed",
      goal: "Provide water access to 50,000 people"
    },
    {
      title: "Economic Empowerment",
      description: "Supporting small businesses and providing microfinance opportunities.",
      image: "/images/economy.jpg",
      impact: "1,000+ entrepreneurs supported",
      goal: "Create 5,000 sustainable jobs"
    }
  ]

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Our Programs</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            We focus on comprehensive solutions that address the root causes of poverty and inequality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="card hover:shadow-lg transition duration-300 fade-in">
              <div className="bg-secondary border-2 border-dashed w-full h-48 flex items-center justify-center">
                <span className="text-gray-500">Program Image</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{program.title}</h2>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">Impact:</span>
                    <span className="text-gray-600">{program.impact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Goal:</span>
                    <span className="text-gray-600">{program.goal}</span>
                  </div>
                </div>
                <button className="text-primary font-semibold hover:text-blue-800 transition duration-300">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-secondary rounded-lg p-8 fade-in">
          <h2 className="section-title text-center">Get Involved</h2>
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Our Programs</h3>
              <p className="text-gray-600 mb-4">
                Your donation helps us continue our vital work in communities that need it most. 
                Every contribution, no matter the size, makes a meaningful impact.
              </p>
              <button className="btn-primary">
                Donate Now
              </button>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Volunteer With Us</h3>
              <p className="text-gray-600 mb-4">
                Join our team of dedicated volunteers who are making a difference in communities across East Africa. 
                From professional skills to hands-on work, we have opportunities for everyone.
              </p>
              <button className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Volunteer Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramsPage