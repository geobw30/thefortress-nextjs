import React from 'react'

const ValuesSection = () => {
  const values = [
    {
      title: "Compassion",
      description: "We approach every individual with empathy and understanding, recognizing the inherent dignity of all people.",
      icon: "❤️"
    },
    {
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our actions and partnerships.",
      icon: "🛡️"
    },
    {
      title: "Sustainability",
      description: "We create long-term solutions that empower communities to thrive independently.",
      icon: "🌱"
    },
    {
      title: "Collaboration",
      description: "We believe in the power of partnerships to create meaningful and lasting change.",
      icon: "🤝"
    }
  ]

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Our Core Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            These principles guide everything we do in our mission to empower communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition duration-300 fade-in">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection