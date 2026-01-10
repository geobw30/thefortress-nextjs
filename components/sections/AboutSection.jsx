"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AboutSection = () => {
  const router = useRouter();

  return (
    <section
      className="min-h-screen px-4 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(248, 249, 249,1) 01%, rgba(248, 249, 249,0) 100%), url('/images/about-the-fortress.png')",
        backgroundSize: "60%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundColor: "rgb(248, 249, 249)",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-0 z-10"></div>

      {/* Content */}
      <div className="max-w-4xl w-full relative z-20 py-16 pl-3 md:pl-40">
        <div className="text-left mb-12 fade-in">
          <h2 className="section-title">About The Fortress</h2>
          <div className="w-20 h-1 bg-primary mx-35"></div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-2 fade-in mt-40">
          <div className=" w-full">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-6">
              We reach out to{" "}
              <span className="font-semibold text-black-600">
                {" "}
                girls and young mothers{" "}
              </span>{" "}
              who are alone, abandoned, and in desperate need of help and hope —
              trapped by{" "}
              <span className="font-semibold text-black-600">
                {" "}
                teenage pregnancy, forced child marriage, gender-based violence,
                abuse, and HIV/AIDS{" "}
              </span>
              .
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-6">
              We{" "}
              <span className="font-semibold text-black-600">
                rescue, rehabilitate, and empower,
              </span>{" "}
              offering{" "}
              <span className="font-semibold text-black-600">
                hope,medical care, Vocational skills, healing, and unconditional
                love.
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
