"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useWebOpenAnimation } from "@/context/animation-context"

export function Hero() {
  const heroRef = useRef(null)
  const svgContainerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHeroInView, setIsHeroInView] = useState(false)
  const { isWebOpenAnimating } = useWebOpenAnimation()

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Detect when hero comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 0.66, 0.66, 1],
      },
    },
  }

  const characterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 0.66, 0.66, 1],
      },
    },
  }

  // Floating animation
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const words = ["Brands,", "built with intention."]

  return (
    <section
      className="w-full sticky top-0 z-0 overflow-hidden"
      ref={heroRef}
    >
      <motion.div
        className="w-full transition-colors duration-300 bg-white"
      >
        <style>{`
          .cta-buttoon {
            position: relative;
            overflow: hidden;
            background: transparent;
            color: black;
            padding: 12px 3px;
            z-index: 1;
          }

          .cta-buttoon::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            background: black;
            transition: width 0.4s cubic-bezier(0.33, 0, 0.2, 1);
            z-index: -1;
          }

          .cta-buttoon::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            opacity: 0;
            z-index: -1;
          }

          .cta-buttoon:hover::before {
            width: 100%;
          }

          @keyframes shimmerWave {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          .cta-buttoon:hover::after {
            animation: shimmerWave 0.6s ease-in-out;
          }

          .cta-buttoon:hover {
            color: white;
          }

          .cta-text-wrapper {
            position: relative;
            z-index: 2;
            display: inline-flex;
            gap: 0.5rem;
            align-items: center;
          }

          .cta-arrow {
            display: inline-block;
            width: 1.2em;
            height: 1.2em;
            opacity: 0;
            transform: translateX(-8px);
            transition: all 0.4s cubic-bezier(0.33, 0, 0.2, 1);
          }

          .cta-buttoon:hover .cta-arrow {
            opacity: 1;
            transform: translateX(0);
          }

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .gradient-text {
            background: linear-gradient(
              135deg,
              #000000 0%,
              #1a1a1a 50%,
              #000000 100%
            );
            background-size: 200% 200%;
            animation: gradientFlow 8s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        {/* Parallax Background Element */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            y: y,
            background: "radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 100%)",
          }}
        />



        {/* Unified Hero for all devices */}
        <motion.div
          className="flex pt-90 md:pt-70 lg:pt-70 pb-40 md:pb-56 lg:pb-72 items-center justify-between overflow-hidden w-full relative"
          ref={svgContainerRef}
          style={{ opacity }}
        >
          <motion.div
            className="w-full overflow-visible origin-center relative"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-[42px] md:text-[80px] lg:text-[120px] xl:text-[160px] 2xl:text-[196px] font-medium text-black leading-[0.9] sm:leading-[1.1] md:leading-[0.85] tracking-tighter text-left w-full"
            >
              {/* Mobile: 3 lines, Desktop: 1 line */}
              
              {/* Line 1: "Brands," - visible on mobile and desktop */}
              <motion.div 
                className="block md:inline"
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.33, 0.66, 0.66, 1],
                }}
              >
                <span className="inline-block mr-0 md:mr-4">Brands,</span>
              </motion.div>

              {/* Line 2: "built" - visible on mobile and desktop */}
              <motion.div 
                className="block md:inline"
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.33, 0.66, 0.66, 1],
                }}
              >
                <span className="inline-block mr-0 md:mr-4">built</span>
              </motion.div>

              {/* Line 3: "with intention." - visible on mobile and desktop */}
              <motion.div 
                className="block md:inline"
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: [0.33, 0.66, 0.66, 1],
                }}
              >
                <span className="inline-block">with intention.</span>
              </motion.div>
            </motion.h1>


          </motion.div>
        </motion.div>


      </motion.div>
    </section>
  )
}
