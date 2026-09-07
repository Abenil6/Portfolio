import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!progressBarRef.current) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Animate progress bar based on scroll position
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      }
    });

    // Show/hide progress bar based on scroll position
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "top -100",
          end: "top -100",
          toggleActions: "play none none reverse",
        }
      });
    }
  }, { scope: progressRef, dependencies: [] });

  return (
    <div 
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-1 z-50 opacity-0 transition-opacity"
    >
      <div 
        ref={progressBarRef}
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left scale-x-0"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}

export default ScrollProgress;
