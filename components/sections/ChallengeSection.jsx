"use client";

import React, { useState, useEffect } from "react";

const ChallengeSection = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % challengeStats.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const challengeStats = [
    { number: "", label: "", shape: "small" },
    {
      number: "25%",
      label: "girls are victims of teenage pregnancy",
      shape: "large",
    },
    { number: "", label: "", shape: "medium" },
    {
      number: "56%",
      label: "above 15 years experience Gender Based Violence(GBV)",
      shape: "large",
    },
    { number: "", label: "", shape: "small" },
    {
      number: "11%",
      label: "girls die due to unsage abortion",
      shape: "large",
    },
    { number: "", label: "", shape: "medium" },
    { number: "22%", label: "mothers die in child birth", shape: "large" },
    { number: "", label: "", shape: "medium" },
    {
      number: "46%",
      label: "girls are married before 18 years",
      shape: "large",
    },
    { number: "", label: "", shape: "small" },
  ];

  return (
    <section className="min-h-screen px-4 relative overflow-hidden bg-white">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-80 z-10"></div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full relative z-20 py-16">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">The Challenge</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        {/* Honeycomb grid with stats */}
        <div className="honeycomb-grid mt-50">
          {/* Row 1 */}
          <div className="honeycomb-row">
            {challengeStats.slice(0, 6).map((stat, index) => (
              <div
                key={index}
                className={`${
                  stat.shape === "small"
                    ? "hexagon-sm"
                    : stat.shape === "medium"
                    ? "hexagon-md"
                    : "hexagon"
                } ${
                  index === highlightedIndex && stat.label !== ""
                    ? "hexagon-highlighted"
                    : ""
                }`}
              >
                <div className="hexagon-content">
                  <div className="text-sm md:text-3xl font-bold text-hotpink mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm  text-center font-bold text-white">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="honeycomb-row">
            {challengeStats.slice(6, 12).map((stat, index) => (
              <div
                key={index + 6}
                className={`${
                  stat.shape === "small"
                    ? "hexagon-sm"
                    : stat.shape === "medium"
                    ? "hexagon-md"
                    : "hexagon"
                } ${
                  index + 6 === highlightedIndex && stat.label !== ""
                    ? "hexagon-highlighted"
                    : ""
                }`}
              >
                <div className="hexagon-content">
                  <div className="text-sm md:text-3xl font-bold text-hotpink mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white font-bold text-center">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="honeycomb-row">
            {challengeStats.slice(12, 18).map((stat, index) => (
              <div
                key={index + 12}
                className={`${
                  stat.shape === "small"
                    ? "hexagon-sm"
                    : stat.shape === "medium"
                    ? "hexagon-md"
                    : "hexagon"
                } ${
                  index + 12 === highlightedIndex && stat.label !== ""
                    ? "hexagon-highlighted"
                    : ""
                }`}
              >
                <div className="hexagon-content">
                  <div className="text-2xl md:text-3xl font-bold text-hotpink mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white font-bold text-center">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
