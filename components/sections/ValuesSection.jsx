import React from "react";

const ValuesSection = () => {
  const values = [
    {
      title: "Love",
      description:
        "We believe in the power of unconditional love to transform lives",
      icon: "❤️",
    },
    {
      title: "Family",
      description:
        "We empower the family institution as the best place for children to flourish",
      icon: "🛡️",
    },
    {
      title: "Transformation",
      description:
        "We are committed to holistic restoration and transformation for our beneficiaries",
      icon: "🌱",
    },
  ];

  return (
    <section className="h-screen flex items-center justify-center py-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Our Core Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            These principles guide everything we do in our mission to empower
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="card text-center hover:shadow-lg transition duration-300 fade-in p-10"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
