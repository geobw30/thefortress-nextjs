"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const AboutSection = () => {
  const router = useRouter();

  // Array of images for the carousel
  const images = [
    "/images/about-1.jpg",
    "/images/impact-1.jpg",
    "/images/our-programs-1.jpg",
    "/images/our-programs-2.jpg",
    "/images/our-programs-3.jpg",
    "/images/our-programs-4.jpg",
  ];

  // State to track the current index of the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="min-h-screen px-4 relative overflow-hidden">
      {/* 3D Marquee Background */}
      <div className="absolute inset-0 z-0">
        <ThreeDMarquee images={images} className="h-full" />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-80 z-10"></div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto w-full relative z-20 py-16">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title">About The Fortress</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col items-center text-center gap-8 fade-in mt-40">
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-4xl">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6 text-2xl max-w-4xl fadein">
              The Fortress is a non-profit ( Non Governmental Organisation)
              committed to championing the cause of the girl child and women:
              enabling them to overcome their odds and maximize their potential,
              transforming their lives and as a result, their families and
              communities.
            </p>
            {/* <p className="text-gray-600 mb-6 text-2xl max-w-4xl">
              We work with vulnerable girls, mothers, victims of crisis/ teenage
              pregnancy, child marriage, Gender Based Violance(GBV), abuse as
              well as HIV AIDS. We rehabilitate, rescue, empower, train in
              skills and provide counselling and unconditional love! By
              investing in the girl child and women today, we are building a
              brighter future for everyone tomorrow!
            </p> */}
            <button
              className="btn-primary"
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
