'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useTypewriterTrigger } from '@/context/animation-context'

interface TypewriterTextProps {
  text: string
  className?: string
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [shouldAnimateNow, setShouldAnimateNow] = useState(false)
  const { startTypewriterAnimation } = useTypewriterTrigger()
  const ref = useRef(null)

  // Trigger animation after hero SVG animation completes
  useEffect(() => {
    if (startTypewriterAnimation) {
      // SVG animation: 0.4s delay + 1.4s duration = 1.8s total
      // Add small buffer to ensure it starts after SVG finishes
      const timer = setTimeout(() => {
        setShouldAnimateNow(true)
        console.log('[v0] Starting typewriter animation after SVG completes')
      }, 1800)

      return () => clearTimeout(timer)
    }
  }, [startTypewriterAnimation])

  // Split text into words for line-by-line animation
  const words = text.split(' ')

  // Group words for responsive layout:
  // Mobile: We / create premium / brands that command / attention.
  // Desktop: We create premium / brands that command / attention.
  const getMobileGroups = () => {
    return [
      [words[0]], // "We"
      words.slice(1, 3), // "create premium"
      words.slice(3, 6), // "brands that command"
      words.slice(6), // "attention."
    ]
  }

  const getDesktopGroups = () => {
    return [
      words.slice(0, 3), // "We create premium "
      words.slice(3, 6), // "brands that command"
      words.slice(6), // "attention."
    ]
  }

  const mobileGroups = getMobileGroups()
  const desktopGroups = getDesktopGroups()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimateNow ? "visible" : "hidden"}
      className={className}
    >
      {/* Mobile layout: 4 lines */}
      <div className="md:hidden">
        {mobileGroups.map((group, idx) => (
          <motion.div
            key={`mobile-${idx}`}
            variants={lineVariants}
            className="block"
          >
            {group.map((word, wordIdx) => (
              <span key={`${word}-${wordIdx}`} className="inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Desktop layout: 3 lines */}
      <div className="hidden md:block">
        {desktopGroups.map((group, idx) => (
          <motion.div
            key={`desktop-${idx}`}
            variants={lineVariants}
            className="block"
          >
            {group.map((word, wordIdx) => (
              <span key={`${word}-${wordIdx}`} className="inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
