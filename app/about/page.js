import React from "react";
import SectionDivider from "@/components/layout/SectionDivider";

const AboutPage = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center fade-in">
          <h1 className="section-title">About The Fortress</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-8 fade-in bg-gray-100 p-10">
          <div className="md:w-1/2 w-full">
            <div className="rounded-xl w-full h-64 md:h-96 flex items-center justify-center">
              <img
                src="/images/about-the-fortress.png"
                alt="The Fortress Community"
                className="w-full h-auto object-cover"
                style={{
                  width: "90%",
                  height: "100%",
                  opacity: "0.8",
                  marginTop: "4em",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              The Fortress is a{" "}
              <span className="font-semibold text-gray-600">non-profit </span>
              committed to championing the cause of the
              <span className="font-semibold text-gray-600">
                {" "}
                girl child and women
              </span>
              : enabling them to overcome their odds and maximize their
              potential,
              <span className="font-semibold text-gray-600">
                {" "}
                transforming their lives
              </span>{" "}
              and, as a result, their families and communities.
            </p>

            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              We actively{" "}
              <span className="font-semibold text-gray-600">
                {" "}
                prevent and respond{" "}
              </span>
              to{" "}
              <span className="font-semibold">
                violence against girls and women
              </span>
              , as well as the challenges of{" "}
              <span className="font-semibold text-gray-600">
                teen pregnancy
              </span>
              ,
              <span className="font-semibold text-gray-600">
                {" "}
                child marriage
              </span>
              , and
              <span className="font-semibold text-gray-600"> abuse</span>.
            </p>
          </div>
        </div>

        <SectionDivider bgColor="#f8f4f3ff" flipColor="#FFFFFF" />

        <div className="mb-8 fade-in mt-10">
          <h2 className="section-title text-center">Our Vision</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-xl mt-8">
              To groom and release women of integrity and courage/valor that
              will live to their full potential and influence the world around
              them.
            </p>
          </div>
        </div>

        <SectionDivider flip bgColor="#f7f0efff" flipColor="#FFFFFF" />

        <div className="mb-8 fade-in bg-gray-100 p-10 rounded-lg mt-10">
          <h2 className="section-title text-center">Our Mission</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              To{" "}
              <span className="font-semibold text-gray-600">
                instill in girls and women{" "}
              </span>
              the understanding of their{" "}
              <span className="font-semibold">value and purpose </span>
              and enable them to rise above their limitations, achieving maximum
              impact in their lives.
            </p>

            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              We do this by providing
              <span className="font-semibold text-gray-600"> education</span>,
              <span className="font-semibold text-gray-600"> skilling</span>,
              <span className="font-semibold text-gray-600">
                {" "}
                economic empowerment
              </span>
              ,
              <span className="font-semibold text-gray-600"> medical care</span>
              ,<span className="font-semibold text-gray-600"> counselling</span>
              , and
              <span className="font-semibold text-gray-600">
                {" "}
                emergency care & rehabilitation
              </span>
              .
            </p>
          </div>
        </div>

        <SectionDivider bgColor="#f7f0efff" flipColor="#FFFFFF" />

        <div className="mb-8 fade-in mt-10">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-red-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Love</h3>
              <p className="text-gray-700">
                We believe in the power of unconditional love to transform lives
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Family</h3>
              <p className="text-gray-700">
                We empower the family institution as the best place for children
                to flourish
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Transformation
              </h3>
              <p className="text-gray-700">
                We are committed to holistic restoration and transformation for
                our beneficiaries
              </p>
            </div>
          </div>
        </div>

        <SectionDivider flip bgColor="#f7f0efff" flipColor="#FFFFFF" />
      </div>
    </div>
  );
};

export default AboutPage;
