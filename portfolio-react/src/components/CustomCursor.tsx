import { useEffect, useRef, useState } from 'react';
import { useCursor } from '../hooks/useCursor';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorState, setCursorState } = useCursor();

  // Mouse position
  const mousePos = useRef({ x: 0, y: 0 });
  // Cursor position (smoothed)
  const cursorPos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  // Magnetic target
  const magneticTarget = useRef<{ x: number; y: number } | null>(null);
  
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Detect mobile/touch devices
    const checkMobile = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || 
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setCursorState('clicked');
    const handleMouseUp = () => setCursorState('default');

    // Check for magnetic elements
    const checkMagnetic = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      let foundMagnetic = false;

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor to element center
        const distance = Math.sqrt(
          Math.pow(mousePos.current.x - centerX, 2) + 
          Math.pow(mousePos.current.y - centerY, 2)
        );

        // Magnetic radius (adjust as needed)
        const magneticRadius = Math.max(rect.width, rect.height) * 0.8;

        if (distance < magneticRadius) {
          foundMagnetic = true;
          // Calculate pull strength (stronger when closer)
          const strength = 1 - (distance / magneticRadius);
          const pullX = (centerX - mousePos.current.x) * strength * 0.3;
          const pullY = (centerY - mousePos.current.y) * strength * 0.3;
          
          magneticTarget.current = {
            x: mousePos.current.x + pullX,
            y: mousePos.current.y + pullY
          };
          
          if (cursorState !== 'clicked') {
            setCursorState('hover');
          }
        }
      });

      if (!foundMagnetic) {
        magneticTarget.current = null;
        if (cursorState === 'hover') {
          setCursorState('default');
        }
      }
    };

    // Smooth animation loop with lerp interpolation
    const animate = () => {
      checkMagnetic();

      const targetX = magneticTarget.current?.x ?? mousePos.current.x;
      const targetY = magneticTarget.current?.y ?? mousePos.current.y;

      // Lerp for smooth following (adjust 0.15 for speed)
      cursorPos.current.x += (targetX - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (targetY - cursorPos.current.y) * 0.15;

      // Slower lerp for outline (creates trailing effect)
      outlinePos.current.x += (targetX - outlinePos.current.x) * 0.08;
      outlinePos.current.y += (targetY - outlinePos.current.y) * 0.08;

      // Update DOM
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = 
          `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 
          `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMobile, cursorState, setCursorState]);

  // Don't render on mobile
  if (isMobile) return null;

  // Scale factors for different states
  const getScaleClass = () => {
    switch (cursorState) {
      case 'hover':
        return 'scale-150';
      case 'clicked':
        return 'scale-75';
      default:
        return 'scale-100';
    }
  };

  return (
    <>
      {/* Cursor Dot (inner) */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-transform duration-150 ease-out ${getScaleClass()}`}
        style={{ willChange: 'transform' }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50" />
      </div>

      {/* Cursor Outline (outer ring) */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] transition-all duration-300 ease-out ${getScaleClass()}`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className="w-full h-full rounded-full border-2 border-blue-400/60"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
