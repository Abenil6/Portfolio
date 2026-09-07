import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './useLenis';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface ScrollTriggerConfig {
  trigger?: MutableRefObject<any> | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  [key: string]: any;
}

/**
 * useScrollTrigger hook for scroll-based animations with Lenis integration
 * Automatically syncs with Lenis smooth scroll and cleans up on unmount
 * 
 * @param animation - Function that returns GSAP animation
 * @param config - ScrollTrigger configuration
 * @param dependencies - Dependencies array
 * 
 * @example
 * const boxRef = useRef(null);
 * useScrollTrigger(() => {
 *   return gsap.to(boxRef.current, { x: 500 });
 * }, {
 *   trigger: boxRef,
 *   start: 'top center',
 *   end: 'bottom center',
 *   scrub: true
 * });
 */
export function useScrollTrigger(
  animation: () => gsap.core.Tween | gsap.core.Timeline | void,
  config: ScrollTriggerConfig = {},
  dependencies: any[] = []
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Integrate ScrollTrigger with Lenis
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    // Create the animation with ScrollTrigger
    const tween = animation();
    
    if (tween) {
      const triggerElement = config.trigger 
        ? typeof config.trigger === 'string' 
          ? config.trigger 
          : config.trigger.current
        : undefined;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: triggerElement,
        animation: tween as gsap.core.Animation,
        ...config,
      });
    }

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, dependencies);

  return scrollTriggerRef;
}

/**
 * Utility to refresh all ScrollTriggers
 * Useful after dynamic content loads
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Utility to batch multiple ScrollTriggers with the same start/end
 */
export function batchScrollTrigger(
  targets: string | Element[],
  config: ScrollTriggerConfig = {}
) {
  ScrollTrigger.batch(targets, {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
      });
    },
    start: 'top 80%',
    ...config,
  });
}
