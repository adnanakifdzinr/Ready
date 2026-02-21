'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWebOpenAnimation, useTypewriterTrigger } from '@/context/animation-context';

export function WebOpenAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { isWebOpenAnimating, setIsWebOpenAnimating } = useWebOpenAnimation();
  const { setStartTypewriterAnimation } = useTypewriterTrigger();

  const handleEnter = () => {
    setIsAnimating(true);
    setIsWebOpenAnimating(true);
    setStartTypewriterAnimation(true);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleHoverStart = () => {
    setIsHovering(true);
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
  };

  // Responsive sizing - same size for mobile and desktop
  const buttonWidth = '56px';
  const expandedWidth = '200px';
  const buttonHeight = 'h-[52px]';
  const circleSize = 'w-9 h-9';
  const arrowSize = 'w-6 h-6';
  const textSize = 'text-[16px]';
  const gap = 'gap-2';

  // Overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { opacity: 0, transition: { duration: 0.7 } }
  };

  const sliceVariants = {
    hidden: { y: 0 },
    exit: { y: 0 },
  };

  const topSliceExit = {
    exit: { y: '-100vh', transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const bottomSliceExit = {
    exit: { y: '100vh', transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  // Button container with perspective
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      x: '150vw',
      opacity: 0,
      rotateY: 20,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Button width expansion
  const buttonVariants = {
    collapsed: { width: 56 },
    expanded: {
      width: 180,
      transition: { duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Enhanced 3D text reveal with character stagger
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
        duration: 0.8
      }
    }
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      rotateX: 90,
      rotateY: -45,
      y: 20,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.320, 1]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isAnimating && (
        <>
          {/* Black overlay background - full viewport cover */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: 9998 }}
          />

          {/* Top slice that moves up on exit */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={topSliceExit}
            className="fixed top-0 left-0 right-0 h-1/2 bg-white"
            style={{ zIndex: 9997 }}
          />

          {/* Bottom slice that moves down on exit */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bottomSliceExit}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-white"
            style={{ zIndex: 9997 }}
          />

          {/* CTA Button Container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 9999, perspective: 1000 }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.button
              initial="collapsed"
              animate={isVisible ? "expanded" : "collapsed"}
              exit="exit"
              variants={buttonVariants}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onClick={handleEnter}
              className={`relative ${buttonHeight} bg-black backdrop-blur-sm border-l-2 border-r-2 border-white rounded-full flex items-center justify-between px-5 py-2 ${gap} overflow-hidden cursor-pointer focus:outline-none transition-colors duration-300 shadow-black/40 shadow-lg`}
            >
              {/* Left text - reveals with character-level 3D flip */}
              <motion.span
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={textVariants}
                className={`text-white tracking-tight font-medium ${textSize} whitespace-nowrap flex`}
                style={{ perspective: 1200 }}
              >
                {'Open Website'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charVariants}
                    style={{ perspective: 1200 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>

              {/* Arrow circle */}
              <motion.div
                className="w-10 h-10 rounded-full bg-[#ff3a09] flex items-center justify-center overflow-hidden relative flex-shrink-0"
              >
                <motion.div
                  animate={{
                    x: isHovering ? 40 : 0,
                    opacity: isHovering ? 0 : 1,
                    rotate: isHovering ? 45 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                </motion.div>

                <motion.div
                  animate={{
                    x: isHovering ? 0 : -40,
                    opacity: isHovering ? 1 : 0,
                    rotate: isHovering ? -45 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                </motion.div>
              </motion.div>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
