'use client'

import { useState, useRef, useEffect } from 'react'
import { PricingPopup } from '@/components/pricing-popup'

import { HeadingAnimation, ContentBlockAnimation, BrandClarityTextAnimation } from '@/components/section-animations'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BrandClaritySection() {
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [isCtaInView, setIsCtaInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  return (
    <section className="w-full bg-[#f9f9f9] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top Text Section - Gradient reveal effect */}
        <HeadingAnimation className="mb-12 md:mb-16 lg:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-[45px] text-black font-medium leading-tight tracking-tighter">
            When your brand is clear,
            <br />
            everything else moves faster.
          </h2>
        </HeadingAnimation>

        {/* Bottom Section */}
        <ContentBlockAnimation>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Side - 70% Text Content */}
            <div className="w-full md:col-span-7 space-y-6">
              <BrandClarityTextAnimation>
                <motion.p
                  className="text-base md:text-lg lg:text-[22px] text-black font-medium tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  Every strong brand begins with clarity. We start by understanding your
                  audience, your story, your personality, and your product / service. When these align,
                  your brand becomes unmistakable. From there, we build your brand strategy, messaging, and visual identity that express who you are with confidence and consistency. The result is a premium, cohesive brand that resonates deeply and performs across every touchpoint.
                </motion.p>
              </BrandClarityTextAnimation>

              <BrandClarityTextAnimation>
                <motion.p
                  className="text-base md:text-lg lg:text-[22px] text-black font-medium tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  Schedule a call to see if we're a good fit to work together.
                </motion.p>
              </BrandClarityTextAnimation>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
                <motion.button
                  ref={ctaRef}
                  onClick={() => setIsPricingOpen(true)}
                  onMouseEnter={() => setHoveredCta('pricing')}
                  onMouseLeave={() => setHoveredCta(null)}
                  initial={{ width: isMobile ? '100%' : 44 }}
                  animate={isCtaInView ? { width: isMobile ? '100%' : 145 } : { width: isMobile ? '100%' : 44 }}
                  transition={{
                    duration: 1.8,
                    delay: 0,
                    ease: 'easeInOut'
                  }}
                  style={{ willChange: 'width' }}
                  className="relative ${buttonHeight} bg-black backdrop-blur-sm border-l-2 border-r-2 border-white rounded-full flex items-center justify-between px-5 py-2 gap-2 overflow-hidden cursor-pointer focus:outline-none transition-colors duration-300 shadow-black/40 shadow-lg"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      staggerChildren: 0.05,
                      delayChildren: 0.8,
                      duration: 0.8
                    }}
                    className="text-white font-medium text-[14px] whitespace-nowrap flex"
                    style={{ perspective: 1200 }}
                  >
                    {'Our Prices'.split('').map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          opacity: 0,
                          rotateX: 90,
                          rotateY: -45,
                          y: 20,
                          filter: 'blur(4px)'
                        }}
                        animate={isCtaInView ? {
                          opacity: 1,
                          rotateX: 0,
                          rotateY: 0,
                          y: 0,
                          filter: 'blur(0px)'
                        } : {}}
                        transition={{
                          duration: 0.7,
                          ease: [0.23, 1, 0.320, 1]
                        }}
                        style={{ perspective: 1200 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <div className="w-9 h-9 rounded-full bg-[#ff3a09] flex items-center justify-center overflow-hidden relative flex-shrink-0">
                    <motion.div
                      animate={{
                        x: hoveredCta === 'pricing' ? 32 : 0,
                        opacity: hoveredCta === 'pricing' ? 0 : 1,
                        rotate: hoveredCta === 'pricing' ? 45 : 0
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute"
                    >
                      <ArrowRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <motion.div
                      animate={{
                        x: hoveredCta === 'pricing' ? 0 : -32,
                        opacity: hoveredCta === 'pricing' ? 1 : 0,
                        rotate: hoveredCta === 'pricing' ? -45 : 0
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute"
                    >
                      <ArrowRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </ContentBlockAnimation>
      </div>

      {/* Pricing Popup */}
      <PricingPopup
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </section>
  )
}
