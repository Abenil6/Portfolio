import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export type TransitionType = 'default' | 'fast' | 'fade' | 'slideUp' | 'slideDown';

interface PageTransitionProps {
  children: ReactNode;
  transitionType?: TransitionType;
  className?: string;
}

// Transition variants
const transitionVariants: Record<TransitionType, Variants> = {
  default: {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  },
  fast: {
    initial: { 
      opacity: 0, 
      y: 10
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  },
  fade: {
    initial: { 
      opacity: 0
    },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      }
    }
  },
  slideUp: {
    initial: { 
      opacity: 0, 
      y: 40
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      opacity: 0, 
      y: -40,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  },
  slideDown: {
    initial: { 
      opacity: 0, 
      y: -40
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      opacity: 0, 
      y: 40,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }
};

export default function PageTransition({ 
  children, 
  transitionType = 'default',
  className = ''
}: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants[transitionType]}
      className={className}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
