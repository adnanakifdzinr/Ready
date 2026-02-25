'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorPosition {
  x: number
  y: number
}

interface TrailPoint {
  x: number
  y: number
  id: number
}

export function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const trailIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })

      // Add trail points
      const distance = Math.hypot(
        clientX - lastPositionRef.current.x,
        clientY - lastPositionRef.current.y
      )

      if (distance > 10) {
        const newPoint: TrailPoint = {
          x: clientX,
          y: clientY,
          id: trailIdRef.current++,
        }
        setTrail((prev) => [...prev, newPoint].slice(-20)) // Keep last 20 points
        lastPositionRef.current = { x: clientX, y: clientY }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      setIsHovering(isClickable)
    }

    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Trail effect - animated dots following cursor */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 58, 9, 0.8) 0%, rgba(255, 58, 9, 0.3) 100%)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Main cursor - outer glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x,
          top: position.y,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid rgba(255, 58, 9, 0.6)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(255, 58, 9, 0.4), inset 0 0 10px rgba(255, 58, 9, 0.2)',
        }}
        animate={{
          width: isHovering ? 50 : isClicking ? 28 : 32,
          height: isHovering ? 50 : isClicking ? 28 : 32,
          borderColor: isHovering ? 'rgba(255, 58, 9, 1)' : 'rgba(255, 58, 9, 0.6)',
          boxShadow: isHovering
            ? '0 0 30px rgba(255, 58, 9, 0.8), inset 0 0 15px rgba(255, 58, 9, 0.4)'
            : isClicking
              ? '0 0 15px rgba(255, 58, 9, 0.6), inset 0 0 8px rgba(255, 58, 9, 0.3)'
              : '0 0 20px rgba(255, 58, 9, 0.4), inset 0 0 10px rgba(255, 58, 9, 0.2)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Main cursor - inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x,
          top: position.y,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(255, 58, 9, 0.9)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 12px rgba(255, 58, 9, 0.8)',
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          boxShadow: isHovering
            ? '0 0 20px rgba(255, 58, 9, 1)'
            : '0 0 12px rgba(255, 58, 9, 0.8)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-40"
          style={{
            left: position.x,
            top: position.y,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid rgba(255, 58, 9, 0.6)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </>
  )
}
