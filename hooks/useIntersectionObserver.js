import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        // Set hasIntersected to true when element first enters viewport
        if (entry.isIntersecting) {
          setHasIntersected(true);
          setShouldAnimate(true);
        } else {
          // Reset shouldAnimate when element exits viewport
          setShouldAnimate(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return { elementRef, isIntersecting, hasIntersected, shouldAnimate };
};

export default useIntersectionObserver;