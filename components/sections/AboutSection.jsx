import React from "react";

const AboutSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">About The Fortress</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 fade-in">
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6">
              The Fortress is a non-profit ( Non Governmental Organisation) committed to championing
               the cause of the girl child and women: enabling them to overcome their odds and maximize
               their potential, transforming their lives and as a result, their families and communities.
               
            </p>
            <p className="text-gray-600 mb-6">
              We work with vulnerable girls, mothers, victims of crisis/ teenage pregnancy, child marriage,
               Gender Based Violance(GBV), abuse as well as HIV AIDS. We rehabilitate, rescue, empower,
               train in skills and provide counselling and unconditional love! By investing in the girl child and women today,
               we are building a brighter future for everyone tomorrow!
            </p>
            <button className="btn-primary">Learn More About Us</button>
          </div>

          <div className="md:w-1/2 w-full">
            <div
              className="bg-secondary rounded-xl w-full h-64 md:h-96 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/about-1.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
