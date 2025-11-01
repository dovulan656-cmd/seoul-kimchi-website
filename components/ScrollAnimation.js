'use client';

import { useScrollAnimation } from '../hooks/useIntersectionObserver';

/**
 * Scroll Animation Wrapper Component
 * Tự động trigger animation khi element vào viewport
 */
export default function ScrollAnimation({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  animationDelay = 0
}) {
  const { ref, hasIntersected, className: animationClass } = useScrollAnimation({
    threshold,
    rootMargin
  });

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        opacity: hasIntersected ? 1 : 0,
        transform: hasIntersected ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${animationDelay}s, transform 0.6s ease ${animationDelay}s`
      }}
    >
      {children}
    </div>
  );
}

/**
 * Fade In On Scroll Component
 */
export function FadeInOnScroll({ children, delay = 0, className = '' }) {
  return (
    <ScrollAnimation 
      className={className}
      animationDelay={delay}
    >
      {children}
    </ScrollAnimation>
  );
}

