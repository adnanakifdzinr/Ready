'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export function BrandStrategySection() {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Split heading text into sentences for line-by-line animation
  const headingText = "We're a Brand Strategy & Identity Design studio based in Toronto. We help founders build premium, iconic brands that stand out and command attention."
  const headingSentences = headingText.split('. ').map((s, i) => 
    i < headingText.split('. ').length - 1 ? s + '.' : s
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <section ref={ref} className="w-full bg-[#0E0E0E] transition-colors duration-300 py-16 md:py-24 lg:py-32 px-3 md:px-5 lg:px-8">
      <div className="max-w-full mx-auto">
        {/* Top Text Section - Line by line slide up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[45px] font-medium text-white tracking-tighter leading-tight">
            {headingSentences.map((sentence, idx) => (
              <motion.div
                key={`sentence-${idx}`}
                variants={lineVariants}
                className="block"
              >
                {sentence}
              </motion.div>
            ))}
          </h2>
        </motion.div>

        {/* Bottom Section: Text Only */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 lg:gap-8">
          {/* Text with line-by-line animations */}
          <div className="md:col-span-10 flex flex-col justify-start gap-6 md:gap-8 max-w-4xl">
            {/* Paragraph 1 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                variants={lineVariants}
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-tight block"
              >
                Our work brings structure, clarity, and intention to your brand – so you can attract high paying customers, raise your value, and grow with confidence.
              </motion.p>
            </motion.div>

            {/* Paragraph 2 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                variants={lineVariants}
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-tight block"
              >
                We work with founders who think big and want their brand to reflect that ambition.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
