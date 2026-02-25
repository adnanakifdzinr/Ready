'use client'

import { useEffect, useState } from 'react'

interface CursorState {
  x: number
  y: number
  label: string
  isVisible: boolean
}

export function MagneticCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    isVisible: false,
  })
  const [isHovering, setIsHovering] = useState(false)

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
        const label = target.getAttribute('data-cursor-label') || 'click'
        setCursor((prev) => ({
          ...prev,
          label,
          isVisible: true,
        }))
        setIsHovering(true)
      } else {
        setCursor((prev) => ({
          ...prev,
          label: '',
          isVisible: false,
        }))
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => {
      setCursor((prev) => ({
        ...prev,
        isVisible: false,
        label: '',
      }))
      setIsHovering(false)
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

      {/* Light beam spotlight cursor */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer glow circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 70%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
            width: isHovering ? 160 : 120,
            height: isHovering ? 160 : 120,
            background: isHovering
              ? 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0.08) 70%, transparent 100%)'
              : 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 70%, transparent 100%)',
          }}
        />

        {/* Middle glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'width 0.3s ease, height 0.3s ease',
            width: isHovering ? 100 : 80,
            height: isHovering ? 100 : 80,
          }}
        />

        {/* Inner bright core */}
        <div
          className="absolute rounded-full"
          style={{
            width: 24,
            height: 24,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(96, 165, 250, 0.4) 100%)',
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.6), inset 0 0 12px rgba(255, 255, 255, 0.3)',
            pointerEvents: 'none',
          }}
        />

        {/* Center point */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: 4,
            height: 4,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            pointerEvents: 'none',
          }}
        />

        {/* Light beam rays (subtle) */}
        <svg
          className="absolute"
          style={{
            width: 100,
            height: 100,
            left: -50,
            top: -50,
            pointerEvents: 'none',
            opacity: isHovering ? 0.4 : 0.2,
            transition: 'opacity 0.3s ease',
          }}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="beam" x1="50%" y1="50%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.6)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
            </linearGradient>
          </defs>
          <polygon points="50,50 45,10 50,20 55,10" fill="url(#beam)" />
          <polygon points="50,50 70,45 60,50 70,55" fill="url(#beam)" />
          <polygon points="50,50 55,90 50,80 45,90" fill="url(#beam)" />
          <polygon points="50,50 30,55 40,50 30,45" fill="url(#beam)" />
        </svg>

        {/* Interactive label */}
        {cursor.isVisible && cursor.label && (
          <div
            className="absolute left-12 top-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold text-white pointer-events-none"
            style={{
              transform: 'translateY(-50%)',
              animation: 'slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              background: 'rgba(96, 165, 250, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              boxShadow: '0 8px 24px rgba(96, 165, 250, 0.2)',
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
