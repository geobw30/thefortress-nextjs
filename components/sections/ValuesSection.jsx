"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ValuesSection = () => {
  const values = [
    {
      title: "Love",
      description:
        "We believe in the power of unconditional love to transform lives",
      image: "/images/love.png",
    },
    {
      title: "Family",
      description:
        "We empower the family institution as the best place for children to flourish",
      image: "/images/social.png",
    },
    {
      title: "Transformation",
      description:
        "We are committed to holistic restoration and transformation for our beneficiaries",
      image: "/images/butterfly.png",
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
    
    // Heartbeat animation for love.png
    if (currentImage === "/images/love.png") {
      return (
        <motion.img
          src={currentImage}
          alt={values[currentIndex].title}
          className="max-w-xs md:max-w-sm h-auto object-contain"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      );
    }
    
    // Flying animation for butterfly.png
    if (currentImage === "/images/butterfly.png") {
      return (
        <motion.img
          src={currentImage}
          alt={values[currentIndex].title}
          className="max-w-xs md:max-w-sm h-auto object-contain"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
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
    <section
      className="min-h-screen flex items-center justify-center py-16 px-4 bg-secondary"
      style={{ backgroundColor: "lightsalmon" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 fade-in">
          <h2 className="section-title" style={{ color: "white" }}>
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="section-subtitle" style={{ color: "white" }}>
            Transforming lives through the power of Love.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-96 md:h-[32rem] flex items-center justify-center">
          {/* Carousel Item with alternating image layout */}
          <div className={`flex flex-col md:flex-row items-center w-full px-4 ${isImageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              {renderAnimatedImage()}
            </div>
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 text-primary">
                {values[currentIndex].title}
              </h3>
              <p className="text-lg md:text-4xl text-white max-w-4xl">
                {values[currentIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 md:mt-12 space-x-3">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
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
