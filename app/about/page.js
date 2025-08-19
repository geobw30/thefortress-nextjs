import React from "react";

const AboutPage = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center fade-in">
          <h1 className="section-title">About The Fortress</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-16 fade-in bg-gray-100 p-10">
          <div className="md:w-1/2 w-full">
            <div className="rounded-xl w-full h-64 md:h-96 flex items-center justify-center">
              <img
                src="/images/bg-family-group.png"
                alt="The Fortress Community"
                className="w-full h-auto object-cover"
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

        <div className="mb-16 fade-in">
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

        <div className="mb-16 fade-in bg-gray-100 p-10 rounded-lg">
          <h2 className="section-title text-center">Our Mission</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              To{" "}
              <span className="font-semibold text-gray-600">
                instill in girls and women {" "}
              </span>
              the understanding of their{" "}
              <span className="font-semibold">value and purpose{" "}</span>
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
              <span className="font-semibold text-gray-600">
                {" "}
                medical care
              </span>
              ,
              <span className="font-semibold text-gray-600">
                {" "}
                counselling
              </span>
              , and
              <span className="font-semibold text-gray-600">
                {" "}
                emergency care & rehabilitation
              </span>
              .
            </p>
          </div>
        </div>

        <div className="mb-16 fade-in">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold">
                Love
              </div>
              <div className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold">
                Family
              </div>
              <div className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold">
                Transformation
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 fade-in">
          <h2 className="section-title text-center">Our Leadership</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center card p-6">
                <div className="bg-secondary border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-primary">Executive Director</p>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-8 fade-in">
          <h2 className="section-title text-center">Our History</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <div className="space-y-6 mt-8">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">
                2010 - Founding
              </h3>
              <p className="text-gray-600">
                The Fortress was founded with a mission to provide sustainable
                solutions to communities in need.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">
                2013 - First Major Project
              </h3>
              <p className="text-gray-600">
                Launched our first comprehensive education program in rural
                Kenya, building 5 schools.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">
                2016 - Expansion
              </h3>
              <p className="text-gray-600">
                Expanded operations to Uganda and Tanzania, increasing our reach
                to 20,000 beneficiaries.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-800">
                2020 - Digital Transformation
              </h3>
              <p className="text-gray-600">
                Integrated technology into our programs, improving efficiency
                and impact measurement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
