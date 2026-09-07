# GSAP ScrollTrigger Integration

## Overview

This portfolio now features advanced scroll animations powered by GSAP (GreenSock Animation Platform) with ScrollTrigger, fully integrated with Lenis smooth scrolling for a seamless experience.

## Features Implemented

### 1. **Reusable Hooks** (`src/hooks/`)

#### `useGSAP.ts`
- Component-scoped GSAP context management
- Automatic cleanup on unmount
- Prevents memory leaks and animation conflicts

```typescript
useGSAP(() => {
  gsap.to('.element', { x: 100 });
}, { scope: containerRef });
```

#### `useScrollTrigger.ts`
- Scroll-based animations with Lenis integration
- Automatic ScrollTrigger registration and cleanup
- Batch animations support

```typescript
useScrollTrigger(() => {
  return gsap.to(element, { x: 500 });
}, {
  trigger: elementRef,
  start: 'top center',
  scrub: true
});
```

### 2. **Projects Section** (`src/components/Projects.tsx`)

**Horizontal Scroll with Pinning**
- Desktop: Cards scroll horizontally while section is pinned
- Mobile/Tablet: Falls back to standard grid layout
- Responsive breakpoint: 1024px (lg)

**Parallax on Project Images**
- Subtle vertical parallax effect (-15% movement)
- Applied individually to each project card image
- Synced with scroll position using `scrub: 1`

**Key Features:**
- Section pins during horizontal scroll
- Smooth scrubbing with `scrub: 1`
- Media query-based behavior (`gsap.matchMedia()`)
- Cards maintain Framer Motion 3D tilt effects

### 3. **About Section** (`src/components/About.tsx`)

**Scroll-Triggered Reveals with Stagger**
- Content elements fade and slide up with 3D rotation
- Staggered timing (0.15s delay between elements)
- Stats cards animate with scale and bounce effect
- Toggle actions allow animations to reverse on scroll up

**Animation Details:**
- Content: `opacity: 0 → 1`, `y: 60 → 0`, `rotateX: -15 → 0`
- Stats cards: `scale: 0.8 → 1` with `back.out(1.4)` easing
- Stats stagger: 0.1s interval with `back.out` bounce

### 4. **Scroll Progress Indicator** (`src/components/ScrollProgress.tsx`)

**Features:**
- Fixed top bar showing scroll progress
- Gradient color (blue → indigo → purple)
- Fades in after scrolling 100px down
- Smooth scrubbing with `scrub: 0.3`

## Integration with Lenis

GSAP ScrollTrigger is fully synchronized with Lenis smooth scroll:

```typescript
const lenis = getLenis();
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
}
```

This ensures:
- Accurate trigger detection during smooth scrolling
- No animation stuttering or timing issues
- Consistent behavior across all scroll interactions

## Separation of Concerns

**GSAP handles:**
- Scroll-triggered animations
- Horizontal scrolling mechanics
- Parallax effects
- Batch stagger animations

**Framer Motion handles:**
- 3D card tilt effects (mouse interactions)
- Initial page load animations
- Hover states and micro-interactions

**No conflicts:** GSAP and Framer Motion animate different properties on different elements.

## Performance Optimizations

1. **Automatic Cleanup:** All ScrollTriggers are killed on unmount
2. **Component Scoping:** GSAP contexts prevent cross-component pollution
3. **Media Queries:** Horizontal scroll only activates on desktop
4. **Smooth Scrubbing:** Optimized scrub values for 60fps performance
5. **Lag Smoothing:** Disabled for better integration with Lenis

## Testing Checklist

✅ Build compiles without errors  
✅ TypeScript type checking passes  
✅ GSAP animations work on desktop  
✅ Horizontal scroll pins correctly  
✅ Mobile layout falls back to grid  
✅ Parallax effects are subtle and smooth  
✅ About section stagger animations trigger  
✅ Scroll progress bar updates accurately  
✅ No conflicts with Framer Motion  
✅ Proper cleanup on component unmount  
✅ Lenis smooth scroll integration works  

## Browser Compatibility

- Modern browsers with CSS transforms support
- WebGL not required (pure DOM animations)
- Responsive across mobile, tablet, and desktop
- Graceful degradation on older browsers

## Future Enhancements

Potential additions:
- Add GSAP animations to Skills section
- Implement scroll-triggered SVG animations
- Add magnetic cursor effects using GSAP
- Create smooth page transitions with GSAP
- Add scroll-based color theme changes

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
