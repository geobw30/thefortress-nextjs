import React from 'react'

const DonateSection = () => {
  const donationOptions = [
    { amount: "$25", description: "Provides clean water for a family for a month" },
    { amount: "$50", description: "Supplies educational materials for a classroom" },
    { amount: "$100", description: "Supports healthcare services for 10 people" },
    { amount: "$250", description: "Funds a month of teacher training" }
  ]

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Support Our Mission</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Your donation helps us continue our vital work in communities that need it most.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 fade-in">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Make a Difference Today</h3>
            <p className="text-gray-600 mb-6">
              Every contribution, no matter the size, makes a meaningful impact in the lives of those we serve. 
              Your generosity helps us provide education, healthcare, clean water, and economic opportunities 
              to communities in need.
            </p>
            <p className="text-gray-600 mb-6">
              All donations are tax-deductible and go directly toward funding our programs and services.
            </p>
            <div className="card">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Ways to Give</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>One-time donation</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Monthly recurring donation</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Corporate matching gifts</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Planned giving</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 fade-in">
            <div className="card">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Donate Now</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">Suggested Donations</h4>
                <div className="grid grid-cols-2 gap-4">
                  {donationOptions.map((option, index) => (
                    <button 
                      key={index} 
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                      <div className="font-bold">{option.amount}</div>
                      <div className="text-sm">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="form-label" htmlFor="custom-amount">
                  Or enter a custom amount:
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    $
                  </span>
                  <input 
                    type="number" 
                    id="custom-amount" 
                    className="form-input rounded-none rounded-r-md" 
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <button className="w-full btn-primary">
                Donate Securely
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Your donation is secure and tax-deductible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonateSection