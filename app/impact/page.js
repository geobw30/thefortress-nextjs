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
      title: "Dream come true!",
      excerpt:
        "I was born a Muslim and lived a muslim my entire life until I got a chance to be rescued at the fortress. During my childhood at around the age of 7years I was raped by my uncle who was an HIV victim but i somehow escaped contracting the HIV. My mother who was a very busy lady with work had little time with us as children and always we felt ...",
      image: "/images/success-1.jpg",
      id: 1
    },
    {
      title: "Prevention is better than cure",
      excerpt:
        "Prevention is better than cure is a very old saying/ proverb but thinking about it really, it’s so true. As the Fortress, we have seen the transformation of every young mother that we rescue, rehabilitation and empower in different ways. However, in addition to that, we realize that we need to put an extra effort in prevention of teenange pregnancy ...",
      image: "/images/success-2.jpg",
      id: 2
    },
    {
      title: "The Joy of the Harvest",
      excerpt:
        "Part of our National Anthem says “ Oh Uganda the land that feeds us, with SUN and fertlie crops Grown…Now that we are older, we realize that indeed Uganda is blessed with beautifull weather and fertile soil. Well at the Fortress, we get to grow vegetables, maize, sugar cane, beans and planted several fruit trees that we are starting to enjoy like paw paws ...",
      image: "/images/success-3.jpg",
      id: 3
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
          <h2 className="section-title text-center text-primary">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition duration-300"
              >
                <div className="bg-secondary border-2 border-dashed w-full h-48 flex items-center justify-center">
                  <img src={story.image} className="w-full h-full object-fill" alt={story.title} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-4">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                  <a href={`/impact/${story.id}`} className="text-primary font-semibold hover:text-blue-800 transition duration-300">
                    Read Full Story →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
