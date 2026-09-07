import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  isLoading?: boolean;
  duration?: number;
}

export default function PageLoader({ isLoading = true, duration = 400 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (duration / 16));
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isLoading, duration]);

  if (!isLoading && progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ 
          scaleX: progress / 100,
          transition: {
            duration: 0.1,
            ease: 'easeOut'
          }
        }}
      />
      
      {/* Optional overlay with spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

// Minimal loading bar (just the progress bar, no overlay)
export function PageLoadingBar({ isLoading = true, duration = 400 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + (90 / (duration / 16));
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isLoading, duration]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[9999] pointer-events-none"
      initial={{ scaleX: 0, transformOrigin: 'left' }}
      animate={{ 
        scaleX: progress / 100,
        opacity: progress === 100 ? 0 : 1
      }}
      transition={{
        scaleX: { duration: 0.1, ease: 'easeOut' },
        opacity: { duration: 0.3, delay: progress === 100 ? 0.2 : 0 }
      }}
    />
  );
}
