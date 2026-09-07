import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';

export interface GSAPContextConfig {
  scope?: MutableRefObject<any> | string;
  dependencies?: any[];
}

/**
 * useGSAP hook for component-scoped GSAP context
 * Automatically cleans up animations on unmount
 * 
 * @param callback - Function containing GSAP animations
 * @param config - Optional scope and dependencies
 * 
 * @example
 * const containerRef = useRef(null);
 * useGSAP(() => {
 *   gsap.to('.box', { x: 100, duration: 1 });
 * }, { scope: containerRef });
 */
export function useGSAP(
  callback: () => void | (() => void),
  config: GSAPContextConfig = {}
) {
  const { scope, dependencies = [] } = config;
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const scopeElement = scope && typeof scope === 'object' ? scope.current : undefined;
    
    const ctx = gsap.context(() => {
      const cleanup = callback();
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    }, scopeElement);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      ctx.revert();
    };
  }, dependencies);
}
