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

        <div className="flex flex-col md:flex-row items-center gap-8 fade-in mt-40">
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-4xl">
              Our Mission
            </h3>
            {/* <p className="text-gray-600 mb-6 text-2xl max-w-4xl fadein">
              The Fortress is a non-profit ( Non Governmental Organisation)
              committed to championing the cause of the girl child and women:
              enabling them to overcome their odds and maximize their potential,
              transforming their lives and as a result, their families and
              communities.
            </p> */}
            {/* <p className="text-gray-600 mb-6 text-2xl max-w-4xl">
              We work with vulnerable girls, mothers, victims of crisis/ teenage
              pregnancy, child marriage, Gender Based Violance(GBV), abuse as
              well as HIV AIDS. We rehabilitate, rescue, empower, train in
              skills and provide counselling and unconditional love! By
              investing in the girl child and women today, we are building a
              brighter future for everyone tommorrow!
            </p> */}
            <p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              We work with{" "}
              <span class="font-semibold text-black-600">
                vulnerable girls, mothers, and victims of crisis
              </span>{" "}
              — including teenage pregnancy, child marriage,{" "}
              <span class="font-semibold text-black-600">
                Gender-Based Violence (GBV)
              </span>
              , abuse, and HIV/AIDS.
            </p>

            <p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              We{" "}
              <span class="font-semibold text-black-600">
                rehabilitate, rescue, empower
              </span>
              , and provide{" "}
              <span class="font-semibold text-black-600">
                skills training, counselling, and unconditional love.
              </span>
            </p>

            <blockquote class="text-2xl md:text-3xl font-bold text-gray-800 italic border-l-4 border-red-600 pl-4">
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
          <div className="md:w-1/2 w-full">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/about-1.jpg"
                alt="The Fortress Community"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
