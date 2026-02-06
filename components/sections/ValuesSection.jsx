"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import AnimatedButterfly from "@/components/AnimatedButterfly";

const ValuesSection = () => {
  const values = [
    {
      title: "Love",
      description:
        "We believe in the power of unconditional love to transform lives",
      image: "/images/love.png",
    },
    {
      title: "Dignity & Respect",
      description:
        "Every individual deserves respect, honor, and the chance to reclaim their worth.",
      image: "/images/butterfly.png",
    },
    {
      title: "Empowerment",
      description:
        "We equip girls and women with the skills, confidence, and resources to rebuild their lives.",
      image: "/images/butterfly.png",
    },
    {
      title: "Hope & Transformation",
      description:
        "We believe in the potential for every life to heal, grow, and flourish despite adversity.",
      image: "/images/butterfly.png",
    },
    {
      title: "Family",
      description:
        "We empower the family institution as the best place for children to flourish",
      image: "/images/bg-togetherness.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [values.length]);

  // Determine if image should be on left or right (alternating)
  const isImageOnLeft = currentIndex % 2 === 0;

  // Render image with animations based on the image type
  const renderAnimatedImage = () => {
    const currentImage = values[currentIndex].image;
    const currentValue = values[currentIndex].title;

    // Heartbeat animation for love.png using Heroicons
    const [heartType, setHeartType] = useState("outline");

    // Toggle between outline and solid heart icons
    useEffect(() => {
      if (currentValue === "Love") {
        const interval = setInterval(() => {
          setHeartType((prev) => (prev === "outline" ? "solid" : "outline"));
        }, 750);

        return () => clearInterval(interval);
      }
    }, [currentImage]);

    // Heartbeat animation for love.png using Heroicons
    if (currentValue === "Love") {
      return (
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {heartType === "outline" ? (
            <HeartIconOutline className="w-48 h-48 md:w-64 md:h-64 text-primary" />
          ) : (
            <HeartIconSolid className="w-48 h-48 md:w-64 md:h-64 text-primary" />
          )}
        </motion.div>
      );
    }

    // Flying animation for butterfly.png
    if (
      currentValue === "Hope & Transformation" ||
      currentValue === "Dignity & Respect" ||
      currentValue === "Empowerment"
    ) {
      return <AnimatedButterfly />;
    }

    // Slow magnification animation for Family value
    if (currentValue === "Family") {
      return (
        <motion.div
          className="flex items-center justify-center overflow-hidden"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img
            src={currentImage}
            alt={values[currentIndex].title}
            className="max-w-xs md:max-w-sm h-auto object-contain"
          />
        </motion.div>
      );
    }

    // Default image without animation for other images
    return (
      <img
        src={currentImage}
        alt={values[currentIndex].title}
        className="max-w-xs md:max-w-sm h-auto object-contain"
      />
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-4">
      {/* Background with subtle gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-white to-secondary/50"></div>
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Top divider - decorative wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f7f4f2"></path>
        </svg>
      </div>

      {/* Bottom divider - decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,110.05,985.66,92.83Z" fill="#f7f4f2"></path>
        </svg>
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title" style={{ color: "rgb(100 91 88)" }}>
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle text-primary font-bold text-2xl">
            Love, Dignity & Respect, Empowerment, Hope & Transformation, Family.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-96 md:h-[32rem] flex items-center justify-center">
          {/* Carousel Item with alternating image layout */}
          <div
            className={`flex flex-col md:flex-row items-center w-full px-4 ${
              isImageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              {renderAnimatedImage()}
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 text-primary">
                {values[currentIndex].title}
              </h3>
              <p
                className="text-lg md:text-4xl max-w-4xl"
                style={{ color: "rgb(100 91 88)" }}
              >
                {values[currentIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 md:mt-12 space-x-3">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
