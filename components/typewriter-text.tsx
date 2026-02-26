'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTypewriterTrigger } from '@/context/animation-context'
import { useMediaQuery } from '@/hooks/use-mobile'

interface TypewriterTextProps {
  text: string
  className?: string
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [lines, setLines] = useState<string[]>([])
  const { startTypewriterAnimation } = useTypewriterTrigger()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    // Split text into lines based on screen size
    // Mobile: 3 lines | Desktop: 1 line
    if (isMobile) {
      // "We create premium brands that command attention."
      // Split into 3 lines for mobile
      setLines(['We create premium', 'brands that', 'command attention.'])
    } else {
      // 1 line for desktop
      setLines(['We create premium brands that command attention.'])
    }
  }, [isMobile])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.h1
      className={`text-black ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={startTypewriterAnimation ? 'visible' : 'hidden'}
    >
      {lines.map((line, index) => (
        <motion.div key={index} variants={lineVariants}>
          {line}
        </motion.div>
      ))}
    </motion.h1>
  )
}
