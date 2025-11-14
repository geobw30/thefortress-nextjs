"use client";

import React, { useState, useEffect, useRef } from "react";


const ImpactStats = React.forwardRef(({ stats, shouldAnimate = false }, ref) => {
  const [isClient, setIsClient] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple count up animation without external library
  const [visibleCounts, setVisibleCounts] = useState({});

  useEffect(() => {
    if (!isClient || !shouldAnimate || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    const interval = setInterval(() => {
      setVisibleCounts((prev) => {
        const newCounts = {};
        stats.forEach((stat, i) => {
          const current = prev[i] || 0;
          const target = stat.number;
          const increment = Math.max(1, Math.floor(target / 50));
          newCounts[i] = current + increment >= target ? target : current + increment;
        });
        return newCounts;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isClient, shouldAnimate, stats]);

  if (!isClient) {
    // SSR static version
    return (
      <section ref={ref} className="bg-gradient-to-b from-indigo-50 to-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Through our programs and partnerships, we've made a significant difference in the communities we serve.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
              <div className="text-primary mb-2 text-4xl">{stat.icon}</div>
              <h3 className="text-4xl font-extrabold text-primary">
                {stat.number}+
              </h3>
              <p className="mt-2 text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="bg-gradient-to-b from-indigo-50 to-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
      <div className="w-20 h-1 bg-primary mx-auto"></div>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12 mt-5">
        Through our programs and partnerships, we've made a significant difference in the communities we serve.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg flex flex-col items-center transform transition-all duration-700 ease-out"
            style={{
              opacity: shouldAnimate ? 1 : 0,
              transform: shouldAnimate ? "translateY(0px)" : "translateY(20px)"
            }}
          >
            <div className="text-primary mb-2 text-4xl">{stat.icon}</div>
            <h3 className="text-4xl font-extrabold text-primary">
              {(visibleCounts[i] || 0).toLocaleString()}+
            </h3>
            <p className="mt-2 text-gray-700 text-sm"><b>{stat.label}</b></p>
          </div>
        ))}
      </div>
    </section>
  );
});

ImpactStats.displayName = "ImpactStats";

export default ImpactStats;
