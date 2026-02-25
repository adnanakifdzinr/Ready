'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  label: string
  isVisible: boolean
  rotation: number
}

export function MagneticCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    label: '',
    isVisible: false,
    rotation: 0,
  })
  const animationFrameRef = useRef<number>()
  const rotationRef = useRef(0)

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
        const label = target.getAttribute('data-cursor-label') || 'view'
        setCursor((prev) => ({
          ...prev,
          label,
          isVisible: true,
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

    // Continuous rotation animation
    const animate = () => {
      rotationRef.current += 2
      if (rotationRef.current >= 360) {
        rotationRef.current = 0
      }
      setCursor((prev) => ({
        ...prev,
        rotation: rotationRef.current,
      }))
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
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

      {/* Custom text cursor */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Rotating text cursor - always visible */}
        <div
          className="relative w-16 h-16"
          style={{
            transform: `rotate(${cursor.rotation}deg)`,
          }}
        >
          {/* Text that rotates around the cursor */}
          <svg
            className="absolute w-16 h-16 -top-8 -left-8"
            viewBox="0 0 100 100"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
            }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                fill="none"
              />
            </defs>
            <text
              className="text-xs font-bold fill-white"
              letterSpacing="8"
              style={{
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              <textPath href="#circlePath" startOffset="0%">
                • scroll • view • explore • scroll • view • explore •
              </textPath>
            </text>
          </svg>

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
            }}
          />
        </div>

        {/* Interactive label when hovering */}
        {cursor.isVisible && cursor.label && (
          <div
            className="absolute left-12 top-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold text-white pointer-events-none opacity-0 animate-in"
            style={{
              transform: 'translateY(-50%)',
              animation: 'fadeIn 0.3s ease-out forwards',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-50%) scale(0.8)' },
                to: { opacity: 1, transform: 'translateY(-50%) scale(1)' },
              },
            }}
          >
            {cursor.label}
          </div>
        )}
      </div>

      {/* Keyframe animation for label */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }
      `}</style>
    </>
  )
}
