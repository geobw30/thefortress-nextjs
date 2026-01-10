import React from "react";

const DonatePage = () => {
  const donationOptions = [
    { amount: "$30", description: "Buys a Mother and Baby Value Kit" },
    { amount: "$50", description: "" },
    { amount: "$100", description: "" },
    { amount: "$150", description: "" },
  ];

  return (
    <div className="py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Support Our Mission</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Your donation helps us continue our vital work in the lives of girls
            and women in the communities we serve.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 fade-in">
            <div className="card p-5 mb-[30%]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Your Support Matters
              </h2>
              <p className="text-black mb-6">
                Every contribution, no matter the size, makes a meaningful
                impact in the lives of those we serve. Your generosity helps us
                provide education, healthcare, and economic opportunities to
                girls and women in need.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  How to donate
                </h3>
                <p className="text-black">
                  You can send your donations through{" "}
                  <b>bank transfer to our account</b>, <b>PayPal</b> or the{" "}
                  <b>Commission Ministers Network</b>.
                </p>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-2xl font-semibold text-black mb-6">
                Other Ways to Give
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-black">
                    Monthly recurring donation
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-black">
                    Corporate matching gifts
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-black">Planned giving</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-black">In-kind donations</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-3 text-black">Fundraising events</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/2 fade-in">
            <div className="card sticky top-8 p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Donate Now
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Suggested Donations
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {donationOptions.map((option, index) => (
                    <button
                      key={index}
                      className="border-2 border-primary text-primary hover:bg-primary font-semibold py-4 rounded-lg transition duration-300"
                    >
                      <div className="font-bold text-lg">{option.amount}</div>
                      <div className="text-sm">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  Donate Through:
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.paypal.com/paypalme/TheFortressUg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <img
                      src="/images/btn-paypal-donate.png"
                      style={{ height: "150px" }}
                      alt="PayPal Donate"
                    />
                  </a>
                  <a
                    href="https://cmnetwork.denarionline.com/Donate/?missionary=Fortress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <img
                      src="/images/btn-cmn-donate.png"
                      style={{ height: "60px", width: "200px" }}
                      alt="Commission Ministers Network"
                    />
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 text-black">
                <h4 className="text-lg font-medium text-black mb-3">
                  Bank Transfer Details
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Account Name:</span>
                      <span>THE FORTRESS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Account Number:</span>
                      <span>9030017088199</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">SWIFT Code:</span>
                      <span>SBICUGKX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bank:</span>
                      <span>
                        <img
                          src="/images/stanbic-bank-logo.png"
                          alt="Stanbic Bank (U) Limited"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
