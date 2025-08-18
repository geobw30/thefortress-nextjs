"use client";

import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const AnimatedSection = ({
  children,
  className = "",
  animationType = "fade", // 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right'
  delay = 0,
  threshold = 0.1
}) => {
  const { elementRef, isIntersecting, hasIntersected, shouldAnimate } = useIntersectionObserver({
    threshold: threshold
  });

  // Animation classes
  const animationClasses = {
    fade: "transition-opacity duration-1000 ease-in",
    "slide-up": "transition-all duration-1000 ease-in",
    "slide-down": "transition-all duration-1000 ease-in",
    "slide-left": "transition-all duration-1000 ease-in",
    "slide-right": "transition-all duration-1000 ease-in"
  };

  // Initial state classes
  const initialClasses = {
    fade: "opacity-0",
    "slide-up": "opacity-0 translate-y-12",
    "slide-down": "opacity-0 -translate-y-12",
    "slide-left": "opacity-0 translate-x-12",
    "slide-right": "opacity-0 -translate-x-12"
  };

  // Animated state classes
  const animatedClasses = {
    fade: "opacity-100",
    "slide-up": "opacity-100 translate-y-0",
    "slide-down": "opacity-100 translate-y-0",
    "slide-left": "opacity-100 translate-x-0",
    "slide-right": "opacity-100 translate-x-0"
  };

  // Determine current classes
  const currentAnimation = animationType;
  const baseClasses = `${animationClasses[currentAnimation]}`;
  const stateClasses = shouldAnimate
    ? animatedClasses[currentAnimation]
    : initialClasses[currentAnimation];

  return (
    <div
      ref={elementRef}
      className={`${baseClasses} ${stateClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;