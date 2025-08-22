import React from "react";

const ImpactPage = () => {
  const impactStats = [
    { number: "3400+", label: "Girls Empowered in Life Skills" },
    { number: "320+", label: "Young Mothers Rescued" },
    { number: "1870+", label: "Mama Kits Distributed" },
    { number: "650+", label: "Re-Usable Sanitary Kits Donated" },
    { number: "450+", label: "Community Outreaches" },
    { number: "580+", label: "Medical Support" },
    { number: "479+", label: "Girls Counselled" },
    { number: "298+", label: "Family Reunifications" },
  ];

  const stories = [
    {
      title: "Building Futures Through Education",
      excerpt:
        "How our scholarship program helped Maria become the first in her family to attend university.",
      image: "/images/story1.jpg",
    },
    {
      title: "Clean Water Transforms a Community",
      excerpt:
        "The story of how a single well brought clean water to 500 families in rural Kenya.",
      image: "/images/story2.jpg",
    },
    {
      title: "Healthcare Access Saves Lives",
      excerpt:
        "Our mobile clinic program provides critical medical care to remote villages.",
      image: "/images/story3.jpg",
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Our Impact</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Through our programs and partnerships, we've made a significant
            difference in the lives of girls and women.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl mb-2 font-extrabold text-primary">
                {stat.number}
              </div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16 fade-in">
          <h2 className="section-title text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition duration-300"
              >
                <div className="bg-secondary border-2 border-dashed w-full h-48 flex items-center justify-center">
                  <span className="text-gray-500">Story Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                  <button className="text-primary font-semibold hover:text-blue-800 transition duration-300">
                    Read Full Story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-8 fade-in">
          <h2 className="section-title text-center">Annual Report</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            <div className="md:w-1/2 w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                2023 Impact Report
              </h3>
              <p className="text-gray-600 mb-6">
                Our annual report details the impact of our programs, financial
                transparency, and future goals. Download the full report to
                learn more about our work.
              </p>
              <button className="btn-primary">Download Report (PDF)</button>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-secondary border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">Annual Report Cover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
