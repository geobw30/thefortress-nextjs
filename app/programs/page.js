"use client";

import React from "react";
import { programs } from "../../lib/programData";
import { useRouter } from "next/navigation";
import DonateSection from "../../components/sections/DonateSection";

const ProgramsPage = () => {
  const router = useRouter();

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="section-title">Our Programs</h1>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle">
            Transforming lives by the power of love.
          </p>
        </div>

        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="card hover:shadow-lg transition duration-300 fade-in"
            >
              <div
                className="bg-secondary w-full h-48 md:h-64 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${program.image})` }}
              ></div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {program.title}
                </h2>
                <p className="text-gray-600 mb-4">{program.shortDescription}</p>
                <div className="mb-4">
                  <div className="mb-3">
                    <span className="text-gray-700 font-medium block mb-1">
                      Impact:
                    </span>
                    <span className="text-gray-600 block">
                      {program.impact}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-700 font-medium block mb-1">
                      Goal:
                    </span>
                    <span className="text-gray-600 block">{program.goal}</span>
                  </div>
                </div>
                <button
                  className="text-primary font-semibold hover:text-blue-800 transition duration-300"
                  onClick={() => router.push(`/programs/${program.id}`)}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <DonateSection />
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
