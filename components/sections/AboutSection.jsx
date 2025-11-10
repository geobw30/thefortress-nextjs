"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AboutSection = () => {
  const router = useRouter();

  // Array of images
  const images = [
    "/images/about-1.jpg",
    "/images/impact-1.jpg",
    "/images/our-programs-1.jpg",
    "/images/our-programs-2.jpg",
    "/images/our-programs-3.jpg",
    "/images/our-programs-4.jpg",
  ];

  return (
    <section
      className="min-h-screen px-4 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(248, 249, 249,1) 20%, rgba(248, 249, 249,0) 100%), url('/images/about-1.jpg')",
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundColor: "rgb(248, 249, 249)"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-0 z-10"></div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full relative z-20 py-16">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">About The Fortress</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 fade-in mt-40">
          <div className="md:w-1/2 w-full">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              We work with{" "}
              <span className="font-semibold text-black-600">
                vulnerable girls, mothers, and victims of crisis
              </span>{" "}
              — including teenage pregnancy, child marriage,{" "}
              <span className="font-semibold text-black-600">
                Gender-Based Violence (GBV)
              </span>
              , abuse, and HIV/AIDS.
            </p>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              We{" "}
              <span className="font-semibold text-black-600">
                rehabilitate, rescue, empower
              </span>
              , and provide{" "}
              <span className="font-semibold text-black-600">
                skills training, counselling, and unconditional love.
              </span>
            </p>

            <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 italic border-l-4 border-red-600 pl-4">
              By investing in the girl child and women today, we are building a
              brighter future for everyone tomorrow!
            </blockquote>
            <button
              className="btn-primary mt-5"
              onClick={() => router.push("/about")}
            >
              Learn More About Us
            </button>
          </div>
          {/* <div className="md:w-1/2 w-full">
            <div className="rounded-xl overflow-hidden transform scale-150 origin-center opacity-50">
              <img
                src="/images/bg-family-group.png"
                alt="The Fortress Community"
                className="w-full h-auto object-cover"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
