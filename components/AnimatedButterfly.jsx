"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedButterfly = () => {
  const butterflyImages = [
    "/images/butterfly/butterfly-m1.png",
    "/images/butterfly/butterfly-m2.png",
    "/images/butterfly/butterfly-m3.png",
    "/images/butterfly/butterfly-m4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through butterfly images for wing flapping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % butterflyImages.length);
    }, 200); // Change image every 200ms for smooth flapping effect

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      animate={{
        x: [-100, 100, -100], // Move left to right and back
        y: [0, -50, 0],       // Move up and down for floating effect
      }}
      transition={{
        duration: 8,           // Total animation duration
        repeat: Infinity,      // Repeat infinitely
        repeatType: "loop",    // Loop the animation
        ease: "easeInOut",     // Smooth easing
      }}
    >
      <img
        src={butterflyImages[currentImageIndex]}
        alt="Flying butterfly"
        className="w-32 h-32 md:w-40 md:h-40 object-contain"
      />
    </motion.div>
  );
};

export default AnimatedButterfly;