'use client'

import { useEffect, useState } from 'react'

interface CursorState {
  x: number
  y: number
  label: string
  isVisible: boolean
}

interface DotPos {
  id: number
  x: number
  y: number
  scale: number
}

export function MagneticCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    isVisible: false,
  })
  const [dots, setDots] = useState<DotPos[]>([])

  useEffect(() => {
    // Initialize dot matrix positions
    const initialDots: DotPos[] = []
    const gridSize = 3
    const dotSize = 8
    const spacing = 6

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        initialDots.push({
          id: row * gridSize + col,
          x: (col - 1) * spacing,
          y: (row - 1) * spacing,
          scale: 1,
        })
      }
    }
    setDots(initialDots)

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
        const label = target.getAttribute('data-cursor-label') || 'click'
        setCursor((prev) => ({
          ...prev,
          label,
          isVisible: true,
        }))

        // Animate dots on hover
        setDots((prevDots) =>
          prevDots.map((dot) => ({
            ...dot,
            scale: 1.4,
          }))
        )
      } else {
        setCursor((prev) => ({
          ...prev,
          label: '',
          isVisible: false,
        }))

        // Reset dots
        setDots((prevDots) =>
          prevDots.map((dot) => ({
            ...dot,
            scale: 1,
          }))
        )
      }
    }

    const handleMouseLeave = () => {
      setCursor((prev) => ({
        ...prev,
        isVisible: false,
        label: '',
      }))
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          scale: 1,
        }))
      )
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

      {/* Dot matrix cursor */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Grid of dots */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-white"
            style={{
              width: 6,
              height: 6,
              left: dot.x,
              top: dot.y,
              transform: `translate(-50%, -50%) scale(${dot.scale})`,
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
              opacity: 0.8,
            }}
          />
        ))}

        {/* Center dot - accent color */}
        <div
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            backgroundColor: '#60a5fa',
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 12px #60a5fa, 0 0 24px rgba(96, 165, 250, 0.4)',
            transition: 'box-shadow 0.2s ease',
          }}
        />

        {/* Interactive label */}
        {cursor.isVisible && cursor.label && (
          <div
            className="absolute left-10 top-1/2 whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold text-white pointer-events-none"
            style={{
              transform: 'translateY(-50%)',
              animation: 'slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              background: 'rgba(96, 165, 250, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              boxShadow: '0 8px 16px rgba(96, 165, 250, 0.1)',
            }}
          >
            {cursor.label}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
    </>
  )
}
