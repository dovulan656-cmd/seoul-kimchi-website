/**
 * Spring Physics Animation Utilities
 * Sử dụng spring physics cho animations tự nhiên hơn
 */

/**
 * Spring configuration
 */
export const springConfigs = {
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  default: {
    tension: 170,
    friction: 26
  }
};

/**
 * Calculate spring animation value
 * Based on React Spring algorithm
 */
export function springValue(
  from,
  to,
  config = springConfigs.default,
  progress = 0
) {
  const { tension, friction } = config;
  const delta = to - from;
  const velocity = 0;
  
  // Simplified spring calculation
  const damping = friction / tension;
  const omega = Math.sqrt(tension);
  const d = delta;
  
  if (progress >= 1) return to;
  
  const t = progress;
  const expTerm = Math.exp(-damping * omega * t);
  const cosTerm = Math.cos(omega * t);
  const sinTerm = Math.sin(omega * t);
  
  return from + d * (expTerm * cosTerm + (damping * sinTerm));
}

/**
 * Generate spring keyframes
 */
export function generateSpringKeyframes(
  from,
  to,
  config = springConfigs.default,
  steps = 60
) {
  const keyframes = [];
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const value = springValue(from, to, config, progress);
    keyframes.push(value);
  }
  return keyframes;
}

/**
 * Spring animation for CSS
 */
export function createSpringAnimation(
  property,
  from,
  to,
  config = springConfigs.default,
  duration = 600
) {
  const keyframes = generateSpringKeyframes(from, to, config);
  const steps = keyframes.length;
  const percentages = Array.from({ length: steps }, (_, i) => 
    `${(i / (steps - 1)) * 100}%`
  );
  
  return {
    keyframes: keyframes.map((value, i) => ({
      [percentages[i]]: {
        [property]: `${value}px`
      }
    })),
    duration: `${duration}ms`,
    timingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  };
}

/**
 * React Hook for spring animation
 */
export function useSpringAnimation(
  targetValue,
  config = springConfigs.default
) {
  const [value, setValue] = React.useState(targetValue);
  
  React.useEffect(() => {
    let rafId;
    let startTime;
    const from = value;
    const to = targetValue;
    const duration = 600; // ms
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const springVal = springValue(from, to, config, progress);
      setValue(springVal);
      
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };
    
    if (from !== to) {
      rafId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [targetValue, config]);
  
  return value;
}

export default {
  springConfigs,
  springValue,
  generateSpringKeyframes,
  createSpringAnimation,
  useSpringAnimation
};

