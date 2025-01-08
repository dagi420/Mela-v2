import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateRandomPosition = () => ({
    x: Math.random() * windowSize.width,
    y: Math.random() * windowSize.height,
  });

  const generateFloatingElements = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-2xl"
        initial={{
          ...generateRandomPosition(),
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.2,
          x: [
            Math.random() * windowSize.width,
            Math.random() * windowSize.width,
          ],
          y: [
            Math.random() * windowSize.height,
            Math.random() * windowSize.height,
          ],
          rotate: [0, 360],
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {getRandomSymbol()}
      </motion.div>
    ));
  };

  return (
    <div className="animated-bg fixed inset-0 -z-10">

      {/* Floating symbols */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">

        {generateFloatingElements(20)}
      </div>

      {/* Gradient orbs */}
      {generateGradientOrbs()}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
    </div>
  );
};

const symbols = ['$', '€', '£', '¥', '₿', '📈', '💰', '📊'];
const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const generateGradientOrbs = () => (
  <>
    <motion.div
      className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/20 
                     dark:bg-primary-500/10 rounded-full blur-3xl"
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    <motion.div
      className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary-400/20 
                     dark:bg-primary-400/10 rounded-full blur-3xl"
      animate={{
        x: [0, -100, 0],
        y: [0, 50, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </>
);

export default AnimatedBackground;