import React from "react";

const ImpactSection = () => {
  const impactStats = [
    { number: "50,000+", label: "Lives Impacted" },
    { number: "15", label: "Communities Served" },
    { number: "100+", label: "Water Wells Built" },
    { number: "5", label: "Countries Active" },
  ];

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title text-white">Our Impact</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
          <p className="section-subtitle text-white">
            Through our programs and partnerships, we've made a significant
            difference in communities across East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className=" rounded-lg p-8 fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">
                Transforming Lives by the Power of Love
              </h3>
              <p className="mb-4">
                We believe in empowering girls and women to overcome their
                challenges as well a skilling and educating them in all possible
                ways through our various programs. We believe in the
                transformative power of love, and as such receive and serve
                every girl and woman with unconditional love regardless of their
                story, past, mistakes or failures. Love is the most excellent
                way for changing and restoring lives.
              </p>
              <p>
                As a christian organization, we believe in reuniting people with
                their greatest lover-God and helping them pursue a growing
                relationship with Him through christian discipleship. We however
                work with and serve people from all religions and faith is not
                mandatory for our beneficiaries.
              </p>
            </div>
            <div className="md:w-1/2">
              <div
                className="bg-secondary rounded-xl w-full h-64 flex items-center justify-center"
                style={{ backgroundImage: "url('/images/impact-1.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
