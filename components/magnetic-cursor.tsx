'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorLabel {
  text: string
  color?: string
}

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [label, setLabel] = useState<CursorLabel | null>(null)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef<{ x: number; y: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add to trail
      trailRef.current = [...trailRef.current, { x: e.clientX, y: e.clientY }].slice(-15)
      setTrailPositions([...trailRef.current])

      // Check for interactive elements
      const target = e.target as HTMLElement
      if (target) {
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.classList.contains('interactive') ||
          target.classList.contains('magnetic-trigger')
        ) {
          setIsHovering(true)
          const labelText = target.getAttribute('data-cursor-label') || 'Click'
          const labelColor = target.getAttribute('data-cursor-color') || '#000000'
          setLabel({ text: labelText, color: labelColor })
        } else {
          setIsHovering(false)
          setLabel(null)
        }
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setLabel(null)
      trailRef.current = []
      setTrailPositions([])
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

      {/* Trail dots */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed z-50"
          style={{
            left: pos.x,
            top: pos.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Main cursor circle */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          borderRadius: '50%',
          border: `2px solid ${label?.color || '#000000'}`,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s cubic-bezier(0.1, 0.5, 0.3, 1)',
          backdropFilter: 'blur(4px)',
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            backgroundColor: label?.color || '#000000',
          }}
        />
      </motion.div>

      {/* Text label */}
      {label && (
        <motion.div
          className="pointer-events-none fixed z-50 font-medium text-sm"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
            color: label.color || '#000000',
          }}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          <div className="whitespace-nowrap bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/5">
            {label.text}
          </div>
        </motion.div>
      )}
    </>
  )
}
