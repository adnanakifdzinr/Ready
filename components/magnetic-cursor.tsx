'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorState {
  x: number
  y: number
  label: string
  isVisible: boolean
  color: string
}

export function MagneticCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    isVisible: false,
    color: '#ffffff',
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }))

      // Check if hovering over interactive element
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.classList.contains('magnetic-trigger')

      if (isInteractive) {
        const label = target.getAttribute('data-cursor-label') || 'Click'
        const color = target.getAttribute('data-cursor-color') || '#ffffff'
        setCursor((prev) => ({
          ...prev,
          label,
          isVisible: true,
          color,
        }))
      } else {
        setCursor((prev) => ({
          ...prev,
          label: '',
          isVisible: false,
        }))
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
  }, [])

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor - glassmorphism style */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Glassmorphism cursor ring */}
        <div
          className="relative w-10 h-10 rounded-full"
          style={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Inner dot */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Label bubble with glassmorphism */}
        {cursor.isVisible && cursor.label && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute left-14 top-1/2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold text-white pointer-events-none"
            style={{
              transform: 'translateY(-50%)',
              backdropFilter: 'blur(12px)',
              background: `rgba(255, 255, 255, 0.15)`,
              border: `1.5px solid ${cursor.color}`,
              boxShadow: `0 8px 32px rgba(31, 38, 135, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 0 20px ${cursor.color}40`,
            }}
          >
            {cursor.label}
          </motion.div>
        )}
      </div>
    </>
  )
}
