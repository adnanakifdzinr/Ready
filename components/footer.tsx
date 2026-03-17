"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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

const itemVariants = {
  hidden: { opacity: 0, y: 20, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

// Reversed direction for alternating animations
const itemVariantsReverse = {
  hidden: { opacity: 0, y: -20, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const svgVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.2,
    },
  },
  hover: {
    scale: 0.92,
    opacity: 0.9,
    filter: "blur(3px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export function Footer() {
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)
  const [ctasInView, setCtasInView] = useState(false)
  const ctaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ctasInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtasInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ctaContainerRef.current) {
      observer.observe(ctaContainerRef.current)
    }

    return () => {
      if (ctaContainerRef.current) {
        observer.unobserve(ctaContainerRef.current)
      }
    }
  }, [ctasInView])

  return (
    <>
      <footer id="contact" className="text-black bg-[#f9f9f9]">
        {/* Divider */}
        <div className="w-full h-px bg-black/10" />

        {/* Main Footer Content */}
        <div className="w-full px-3 lg:px-8 py-16 lg:py-25">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
              {/* Left Column - Schedule a Chat */}
              <motion.div
                className="flex flex-col justify-start"
                initial="hidden"
                animate={ctasInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.h2
                  className="text-[36px] font-regular text-black tracking-tighter mb-6 leading-tight"
                  variants={itemVariants}
                >
                  Schedule a chat
                </motion.h2>
                <motion.p
                  className="text-base md:text-lg lg:text-[18px] text-black/70 mb-8 leading-tight"
                  variants={itemVariants}
                >
                  Ready to bring your vision to life? Let's talk about your project and how we can help you create something extraordinary.
                </motion.p>
                <motion.div
                  className="flex flex-col gap-4"
                  ref={ctaContainerRef}
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <Link
                      href="https://wa.me/01615910614"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block w-fit"
                      onMouseEnter={() => setHoveredCta('call')}
                      onMouseLeave={() => setHoveredCta(null)}
                    >
                      <motion.div
                        className="flex items-center gap-12 bg-transparent border-b border-black text-black px-1.5 py-2 font-medium text-[16px] rounded-full transition-colors overflow-hidden"
                        initial={{ width: 'auto' }}
                        animate={{ width: 'auto' }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        >
                          Call Now
                        </motion.span>
                        <motion.div
                          className="w-9 h-9 rounded-full bg-[#ff3a09] flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                          animate={{ gap: hoveredCta === 'call' ? 12 : 8 }}
                          initial={{ gap: 8 }}
                        >
                          <motion.div
                            animate={{
                              x: hoveredCta === 'call' ? 30 : 0,
                              opacity: hoveredCta === 'call' ? 0 : 1,
                              rotate: hoveredCta === 'call' ? 45 : 0
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute"
                          >
                            <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                          </motion.div>
                          <motion.div
                            animate={{
                              x: hoveredCta === 'call' ? 0 : -30,
                              opacity: hoveredCta === 'call' ? 1 : 0,
                              rotate: hoveredCta === 'call' ? -45 : 0
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute"
                          >
                            <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariantsReverse}>
                    <Link
                      href="mailto:adnanakif.co@gmail.com"
                      className="group inline-block w-fit"
                      onMouseEnter={() => setHoveredCta('email')}
                      onMouseLeave={() => setHoveredCta(null)}
                    >
                      <motion.div
                        className="flex items-center gap-2 bg-transparent border-t border-black text-black px-1.5 py-2 font-medium text-[16px] rounded-full transition-colors overflow-hidden"
                        initial={{ width: 'auto' }}
                        animate={{ width: 'auto' }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        >
                          lozinrcontact@gmail.com
                        </motion.span>
                        <motion.div
                          className="w-9 h-9 rounded-full bg-[#ff3a09] flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                          animate={{ gap: hoveredCta === 'email' ? 12 : 8 }}
                          initial={{ gap: 8 }}
                        >
                          <motion.div
                            animate={{
                              x: hoveredCta === 'email' ? 30 : 0,
                              opacity: hoveredCta === 'email' ? 0 : 1,
                              rotate: hoveredCta === 'email' ? 45 : 0
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute"
                          >
                            <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                          </motion.div>
                          <motion.div
                            animate={{
                              x: hoveredCta === 'email' ? 0 : -30,
                              opacity: hoveredCta === 'email' ? 1 : 0,
                              rotate: hoveredCta === 'email' ? -45 : 0
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute"
                          >
                            <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Column - Cal.com Embed */}
              <motion.div
                className="flex items-center justify-center"
                initial="hidden"
                animate={ctasInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <iframe
                  src="https://cal.com/adnanakif/30-min-meeting?overlayCalendar=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Animated SVG Bottom Section */}
        <div className="mt-5 md:mt-10 pt-3 md:pt-4 px-3 md:px-4 lg:px-5 overflow-hidden">
          <motion.svg
            viewBox="0 0 1739.38 371.37"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={svgVariants}
          >
            <path d="M3.01,5.66h84.41v284.2h166.33v75.42H3.01V5.66Z" fill="black" />
            <path d="M328.98,340.81c-26.71-15.92-46.89-37.47-60.56-64.67-13.68-27.18-20.51-57.5-20.51-90.97s6.83-63.78,20.51-90.97c13.67-27.18,33.86-48.74,60.56-64.66,26.7-15.92,58.55-23.89,95.55-23.89s68.84,7.96,95.55,23.89c26.7,15.92,46.89,37.48,60.56,64.66,13.67,27.19,20.51,57.51,20.51,90.97s-6.84,63.78-20.51,90.97c-13.68,27.19-33.86,48.74-60.56,64.67-26.71,15.92-58.56,23.89-95.55,23.89s-68.85-7.96-95.55-23.89ZM355.52,262.63c15.12,20.11,38.12,30.16,69.01,30.16s53.88-10.05,69.01-30.16c15.12-20.1,22.68-45.92,22.68-77.45s-7.56-57.34-22.68-77.45c-15.13-20.1-38.12-30.16-69.01-30.16s-53.89,10.06-69.01,30.16c-15.13,20.11-22.68,45.93-22.68,77.45s7.56,57.35,22.68,77.45Z" fill="black" />
            <path d="M611.69,297.85l185.81-218.27-90.91,1.5h-88.91V5.66h290.2v64.93l-188.8,220.77,94.4-1.5h96.9v75.42h-298.69v-67.43Z" fill="black" />
            <path d="M950.68,5.66h84.41v359.63h-84.41V5.66Z" fill="black" />
            <path d="M1162.67,124.04v241.25h-80.92V5.66h91.41l142.85,242.25V5.66h80.92v359.63h-91.41l-142.85-241.25Z" fill="black" />
            <path d="M1424.53,5.66h169.03c43.33,0,75.84,9.84,97.52,29.5,21.67,19.67,32.5,45.84,32.5,78.51,0,18.34-4.84,34.93-14.5,49.76-9.67,14.84-51.78,36.22-78.67,31.23,15,7.34,46,5.61,71.92,35.53,9.08,10.49,12.42,25.68,14.75,42.01l14,93.51h-86.51l-12-81.01c-2.67-18-8.34-31.25-17-39.76-8.67-8.5-21.34-12.75-38.01-12.75h-68.51v133.52h-84.51V5.66ZM1578.55,167.68c19.33,0,33.83-3.83,43.51-11.5,9.67-7.67,14.5-19.5,14.5-35.51s-4.84-27.83-14.5-35.51c-9.67-7.67-24.18-11.5-43.51-11.5h-69.51v94.01h69.51Z" fill="black" />
          </motion.svg>
        </div>
      </footer>

    </>
  )
}
