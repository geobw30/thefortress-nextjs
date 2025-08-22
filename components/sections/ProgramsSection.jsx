"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { programs } from '../../lib/programData';

const ProgramsSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">Our Programs</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle text-xl">
            To groom and release women of integrity and courage / valor that
            will live to their full potential and influence the world around
            them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.shortDescription}</p>
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
      </div>
    </section>
  );
};

export default ProgramsSection;
