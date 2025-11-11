"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SingleButterfly = ({
  id,
  startX,
  startY,
  endX,
  endY,
  duration,
  delay,
  size,
}) => {
  const butterflyImages = [
    "/images/butterfly/butterfly-m1.png",
    "/images/butterfly/butterfly-m2.png",
    "/images/butterfly/butterfly-m3.png",
    "/images/butterfly/butterfly-m4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * butterflyImages.length)
  );

  // Cycle through butterfly images for wing flapping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % butterflyImages.length
      );
    }, 200); // Change image every 200ms for smooth flapping effect

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute"
      initial={{ x: startX, y: startY }}
      animate={{
        x: [startX, startX + endX, startX],
        y: [startY, startY + endY, startY],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <img
        src={butterflyImages[currentImageIndex]}
        alt="Flying butterfly"
        width={Math.round(50 * size)}
        height={Math.round(160 * size)}
        className="object-contain"
      />
    </motion.div>
  );
};

const AnimatedButterfly = () => {
  // Generate 5 butterflies with random properties
  const butterflies = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: (Math.random() - 0.5) * 200,
    endY: (Math.random() - 0.5) * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 2,
    size: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {butterflies.map((butterfly) => (
        <SingleButterfly key={butterfly.id} {...butterfly} />
      ))}
    </div>
  );
};

export default AnimatedButterfly;
