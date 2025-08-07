import React from 'react'

const ImpactSection = () => {
  const impactStats = [
    { number: "50,000+", label: "Lives Impacted" },
    { number: "15", label: "Communities Served" },
    { number: "100+", label: "Water Wells Built" },
    { number: "5", label: "Countries Active" }
  ]

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title text-white">Our Impact</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
          <p className="section-subtitle text-white">
            Through our programs and partnerships, we've made a significant difference in communities across East Africa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-700 rounded-lg p-8 fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Transforming Communities</h3>
              <p className="mb-4">
                Our comprehensive approach addresses the root causes of poverty and inequality, 
                creating sustainable solutions that empower communities to thrive.
              </p>
              <p>
                From building schools and health clinics to providing clean water and agricultural support, 
                we're committed to creating lasting change that benefits generations to come.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-secondary border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">Impact Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection