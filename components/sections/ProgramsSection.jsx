import React from 'react'

const ProgramsSection = () => {
  const programs = [
    {
      title: "Education Initiative",
      description: "Building schools and providing educational resources to underserved communities.",
      image: "/images/education.jpg"
    },
    {
      title: "Healthcare Access",
      description: "Establishing health clinics and providing medical care to remote areas.",
      image: "/images/healthcare.jpg"
    },
    {
      title: "Clean Water Projects",
      description: "Installing water wells and sanitation systems in communities without access to clean water.",
      image: "/images/water.jpg"
    },
    {
      title: "Economic Empowerment",
      description: "Supporting small businesses and providing microfinance opportunities.",
      image: "/images/economy.jpg"
    }
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Our Programs</h2>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button className="text-primary font-semibold hover:text-blue-800 transition duration-300">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection