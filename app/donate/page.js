import React from 'react'

const DonatePage = () => {
  const donationOptions = [
    { amount: "$30", description: "Buys a Mother and Baby Value Kit" },
    { amount: "$50", description: "" },
    { amount: "$100", description: "" },
    { amount: "$150", description: "" }
  ]

  return (
    <div className="py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Support Our Mission</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Your donation helps us continue our vital work in communities that need it most.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 fade-in">
            <div className="card mb-8 p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Your Support Matters</h2>
              <p className="text-gray-600 mb-6">
                Every contribution, no matter the size, makes a meaningful impact in the lives of those we serve. 
                Your generosity helps us provide education, healthcare, clean water, and economic opportunities 
                to communities in need.
              </p>
              <p className="text-gray-600 mb-6">
                All donations are tax-deductible and go directly toward funding our programs and services.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Commitment to Transparency</h3>
                <p className="text-gray-600">
                  We are committed to using your donations effectively and efficiently. 90% of all donations 
                  go directly to our programs, while only 10% supports administrative costs.
                </p>
              </div>
            </div>
            
            <div className="card p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Ways to Give</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">Monthly recurring donation</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">Corporate matching gifts</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">Planned giving</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">In-kind donations</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">Fundraising events</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 fade-in">
            <div className="card sticky top-8 p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Donate Now</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Suggested Donations</h3>
                <div className="grid grid-cols-2 gap-4">
                  {donationOptions.map((option, index) => (
                    <button 
                      key={index} 
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 rounded-lg transition duration-300"
                    >
                      <div className="font-bold text-lg">{option.amount}</div>
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
              
              <div className="mb-6">
                <label className="form-label">
                  Donation Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border-2 border-primary text-primary font-semibold py-3 rounded-lg transition duration-300">
                    One-time
                  </button>
                  <button className="border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary font-semibold py-3 rounded-lg transition duration-300">
                    Monthly
                  </button>
                </div>
              </div>
              
              <button className="w-full btn-primary">
                Donate Securely
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Your donation is secure and tax-deductible. We accept all major credit cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatePage