"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterText({ text, className = "", speed = 30, delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete) return

    let index = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, speed, delay, isComplete])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-full ml-1 bg-current"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}
