import React from 'react'

const AboutPage = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center fade-in">
          <h1 className="section-title">About The Fortress</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="min-h-screen flex flex-col md:flex-row items-center gap-8 mb-16 fade-in">
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-4xl">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              The Fortress is a non-profit ( Non Governmental Organisation)
              committed to championing the cause of the girl child and women:
              enabling them to overcome their odds and maximize their potential,
              transforming their lives and as a result, their families and
              communities.
            </p>
            <p className="text-gray-600 mb-6">
              We work with vulnerable girls, mothers, victims of crisis/ teenage
              pregnancy, child marriage, Gender Based Violance(GBV), abuse as
              well as HIV AIDS. We rehabilitate, rescue, empower, train in
              skills and provide counselling and unconditional love! By
              investing in the girl child and women today, we are building a
              brighter future for everyone tomorrow!
            </p>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-secondary border-2 border-dashed rounded-xl w-full h-64 md:h-96 flex items-center justify-center">
              <span className="text-gray-500">About Image</span>
            </div>
          </div>
        </div>
        
        <div className="min-h-screen mb-16 fade-in">
          <h2 className="section-title text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center card p-6">
                <div className="bg-secondary border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                <p className="text-primary">Executive Director</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-secondary rounded-lg p-8 fade-in">
          <h2 className="section-title text-center">Our History</h2>
          <div className="space-y-6 mt-8">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">2010 - Founding</h3>
              <p className="text-gray-600">
                The Fortress was founded with a mission to provide sustainable solutions to communities in need.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">2013 - First Major Project</h3>
              <p className="text-gray-600">
                Launched our first comprehensive education program in rural Kenya, building 5 schools.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">2016 - Expansion</h3>
              <p className="text-gray-600">
                Expanded operations to Uganda and Tanzania, increasing our reach to 20,000 beneficiaries.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">2020 - Digital Transformation</h3>
              <p className="text-gray-600">
                Integrated technology into our programs, improving efficiency and impact measurement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage