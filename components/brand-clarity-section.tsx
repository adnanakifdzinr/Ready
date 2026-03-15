'use client'

import { useState, useRef, useEffect } from 'react'
import { PricingPopup } from '@/components/pricing-popup'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BrandClaritySection() {
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [isCtaInView, setIsCtaInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => sectionRef.current && observer.unobserve(sectionRef.current)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCtaInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => ctaRef.current && observer.unobserve(ctaRef.current)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const headingLines = [
    "When your brand is clear,",
    "everything else moves faster."
  ]

  const paragraph1Lines = [
    "Every strong brand begins with clarity. We start by",
    "understanding your audience, your story, your personality,",
    "and your product / service. When these align, your brand",
    "becomes unmistakable. From there, we build your brand",
    "strategy, messaging, and visual identity that express who",
    "you are with confidence and consistency. The result is a",
    "premium, cohesive brand that resonates deeply and performs",
    "across every touchpoint."
  ]

  const paragraph2Lines = [
    "Schedule a call to see if we're a good fit",
    "to work together."
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  }

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top Text Section - Line by line slide up */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-10"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-[45px] text-white font-medium leading-tight tracking-tighter"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {headingLines.map((line, idx) => (
              <motion.div
                key={`heading-line-${idx}`}
                variants={lineVariants}
                className="block overflow-hidden"
              >
                <motion.span className="block">
                  {line}
                </motion.span>
              </motion.div>
            ))}
          </motion.h2>
        </motion.div>

        {/* Bottom Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Side - 70% Text Content */}
            <div className="w-full md:col-span-7 space-y-6">
              {/* Paragraph 1 - Enhanced line-by-line animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.p
                  className="text-base md:text-lg lg:text-[22px] text-white font-medium tracking-tight leading-relaxed"
                >
                  {paragraph1Lines.map((line, idx) => (
                    <motion.span
                      key={`para1-line-${idx}`}
                      variants={lineVariants}
                      className="block overflow-hidden"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Paragraph 2 - Call to action with line animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.p
                  className="text-base md:text-lg lg:text-[22px] text-white font-medium tracking-tight leading-relaxed"
                >
                  {paragraph2Lines.map((line, idx) => (
                    <motion.span
                      key={`para2-line-${idx}`}
                      variants={lineVariants}
                      className="block overflow-hidden"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Popup */}
      <PricingPopup
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </section>
  )
}
