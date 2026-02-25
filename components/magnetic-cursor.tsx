'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorState {
  x: number
  y: number
  label: string
  isVisible: boolean
}

const INTERACTIVE_SELECTORS = [
  'a',
  'button',
  '[role="button"]',
  'input[type="submit"]',
  'input[type="button"]',
  '.cursor-pointer',
  '[data-cursor="pointer"]',
]

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    isVisible: false,
  })

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!cursor.isVisible) {
        setCursor((prev) => ({ ...prev, isVisible: true }))
      }

      const target = e.target as HTMLElement
      let label = ''

      // Check if hovering over interactive element
      const isInteractive = INTERACTIVE_SELECTORS.some((selector) => {
        try {
          return target.closest(selector)
        } catch {
          return false
        }
      })

      if (isInteractive) {
        if (target.tagName === 'A') {
          label = 'Open'
        } else if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
          label = 'Click'
        } else if (target.type === 'submit' || target.type === 'button') {
          label = 'Submit'
        } else {
          label = 'Interact'
        }
      }

      setCursor((prev) => ({
        ...prev,
        label,
      }))

      // Smooth animation frame for cursor movement
      if (cursorRef.current) {
        const animate = () => {
          const dx = mouseX - cursorX
          const dy = mouseY - cursorY

          cursorX += dx * 0.15 // Magnetic easing
          cursorY += dy * 0.15

          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`
          }

          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            requestAnimationFrame(animate)
          }
        }

        animate()
      }
    }

    const handleMouseLeave = () => {
      setCursor((prev) => ({
        ...prev,
        isVisible: false,
        label: '',
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursor.isVisible])

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none;
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Main cursor circle */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: cursor.label ? 1.3 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
          }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#ff3a09]"
              animate={{
                opacity: cursor.label ? 1 : 0.6,
                scale: cursor.label ? 1.2 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
            />

            {/* Inner dot */}
            <motion.div
              className="w-2 h-2 rounded-full bg-[#ff3a09]"
              animate={{
                scale: cursor.label ? 1.5 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
            />
          </div>
        </motion.div>

        {/* Label text */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            opacity: cursor.label ? 1 : 0,
            scale: cursor.label ? 1 : 0.8,
            y: cursor.label ? 35 : 20,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#ff3a09] text-white text-xs font-semibold tracking-wider">
            {cursor.label}
          </div>
        </motion.div>
      </div>
    </>
  )
}
