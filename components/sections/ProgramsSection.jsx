"use client";

import React from "react";
import { useRouter } from 'next/navigation';

const ProgramsSection = () => {
  const router = useRouter();
  const programs = [
    {
      title: "THE DROP-IN CENTRE",
      description: "A temporary safe loving haven for girls and women in need.",
      image: "/images/our-programs-1.jpg",
    },
    {
      title: "GAREP",
      description:
        "Girls At-Risk Empowerment Project serves girls in risky environments.",
      image: "/images/our-programs-2.jpg",
    },
    {
      title: "EDUCATION AND SKILLING",
      description:
        "Girls and women are empowered through skilling and education.",
      image: "/images/our-programs-3.jpg",
    },
    {
      title: "WOMAN OF PURPOSE COMMUNITY OUTREACH",
      description:
        "Focused on helping women in the community through both on station training, and outreaches.",
      image: "/images/our-programs-4.jpg",
    },
  ];

  return (
    <section className="h-screen flex items-center justify-center py-16 px-4 bg-white mt-20 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Our Programs</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            To groom and release women of integrity and courage / valor that
            will live to their full potential and influence the world around
            them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition duration-300 fade-in"
            >
              <div
                className="bg-secondary w-full h-48 flex items-center justify-center"
                style={{ backgroundImage: `url(${program.image})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button
                  className="text-primary font-semibold hover:text-blue-800 transition duration-300"
                  onClick={() => router.push("/programs")}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
