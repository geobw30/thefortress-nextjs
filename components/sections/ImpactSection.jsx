import React from "react";
import { CardStack } from "@/components/ui/card-stack";

const ImpactSection = () => {
  const impactStats = [
    { number: "3400+", label: "Girls Empowered in Life Skills" },
    { number: "320+", label: "Young Mothers Rescued" },
    { number: "1870+", label: "Mama Kits Distributed" },
    { number: "650+", label: "Re-Usable Sanitary Kits Donated" },
    { number: "450+", label: "Community Outreaches" },
    { number: "580+", label: "Medical Support" },
    { number: "479+", label: "Girls Counselled" },
    { number: "298+", label: "Family Reunifications" },
  ];

  const cardStackImages = [
    { id: 1, src: "/images/impact-1.jpg", alt: "Community Impact" },
    { id: 2, src: "/images/our-programs-1.jpg", alt: "Education Program" },
    { id: 3, src: "/images/our-programs-2.jpg", alt: "Healthcare Initiative" },
    { id: 4, src: "/images/our-programs-3.jpg", alt: "Empowerment Workshop" },
    { id: 5, src: "/images/our-programs-4.jpg", alt: "Community Gathering" },
  ];

  return (
    <section className="relative min-h-screen py-16 px-4 text-white overflow-hidden">
      {/* Full-screen background CardStack */}
      <CardStack items={cardStackImages} fullScreen={true} opacity={0.4} />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div>

      {/* Content positioned over the background */}
      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title" style={{ color: "white" }}>
            Our Impact
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle text-xl" style={{ color: "white" }}>
            Through our programs and partnerships, we've made a significant
            difference in communities we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 mt-20 ">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl mb-2 font-extrabold text-primary">
                {stat.number}
              </div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
