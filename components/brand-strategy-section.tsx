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

  // Split heading text into lines for mobile and desktop
  const getHeadingLines = () => {
    return [
      "We're a Brand Strategy & Identity Design",
      "studio based in Toronto. We help founders",
      "build premium, iconic brands that stand out",
      "and command attention."
    ]
  }

  const getParagraph1Lines = () => {
    return [
      "Our work brings structure, clarity, and intention",
      "to your brand – so you can attract high paying",
      "customers, raise your value, and grow with confidence."
    ]
  }

  const getParagraph2Lines = () => {
    return [
      "We work with founders who think big and want",
      "their brand to reflect that ambition."
    ]
  }

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

  const headingLines = getHeadingLines()
  const paragraph1Lines = getParagraph1Lines()
  const paragraph2Lines = getParagraph2Lines()

  return (
    <section ref={ref} className="w-full bg-[#0E0E0E] transition-colors duration-300 py-16 md:py-24 lg:py-32 px-3 md:px-5 lg:px-8">
      <div className="max-w-full mx-auto">
        {/* Top Text Section - Enhanced line by line slide up */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-[45px] font-medium text-white tracking-tighter leading-tight"
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

        {/* Bottom Section: Text Only */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 lg:gap-8">
          {/* Text with enhanced line-by-line animations */}
          <div className="md:col-span-10 flex flex-col justify-start gap-6 md:gap-8 max-w-4xl">
            {/* Paragraph 1 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-relaxed block"
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

            {/* Paragraph 2 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-relaxed block"
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
    </section>
  )
}
