'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useTypewriterTrigger } from '@/context/animation-context'

interface TypewriterTextProps {
  text: string
  className?: string
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [isInView, setIsInView] = useState(false)
  const { startTypewriterAnimation } = useTypewriterTrigger()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

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
      words.slice(0, 3), // "We create premium"
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 0.66, 0.66, 1],
      },
    },
  }

  const shouldAnimate = startTypewriterAnimation || isInView

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
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
