'use client'

import Image from 'next/image'
import { HeadingAnimation } from './section-animations'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Balanced animation wrapper for process steps
function ProcessStepAnimation({ 
  children, 
  index 
}: { 
  children: (props: { isInView: boolean; isHovered: boolean; index: number }) => React.ReactNode
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => ref.current && observer.unobserve(ref.current)
  }, [])

  // Subtle alternating stagger
  const isEven = index % 2 === 0
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >


      {/* Content */}
      <motion.div
        className="relative z-10"
      >
        {children({ isInView, isHovered, index })}
      </motion.div>
    </motion.div>
  )
}

export function WhyChooseUsSection() {
  const processes = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We dive deep into understanding your business, audience, values, and goals. Through research and strategy sessions, we uncover the insights that form the foundation of your brand identity.',
      descriptionLines: [
        'We dive deep into understanding your business,',
        'audience, values, and goals. Through research and',
        'strategy sessions, we uncover the insights that form',
        'the foundation of your brand identity.'
      ],
      image: '/images/demo.jpg',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'With a clear understanding of your brand essence, we develop a comprehensive brand strategy, messaging framework, and visual identity system that authentically represents your business.',
      descriptionLines: [
        'With a clear understanding of your brand essence,',
        'we develop a comprehensive brand strategy, messaging',
        'framework, and visual identity system that authentically',
        'represents your business.'
      ],
      image: '/images/process-strategy.png',
    },
    {
      step: '03',
      title: 'Design',
      description: 'We bring your brand to life across all touchpoints—from logo design to brand guidelines—ensuring consistency and impact everywhere your customers interact with your brand.',
      descriptionLines: [
        'We bring your brand to life across all touchpoints—',
        'from logo design to brand guidelines—ensuring',
        'consistency and impact everywhere your customers',
        'interact with your brand.'
      ],
      image: '/images/process-implementation.png',
    },
  ]

  return (
    <section className="w-full bg-[#0e0e0e] py-16 md:py-32 lg:py-40" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          {/* Section Subheading */}
          <HeadingAnimation>
            <p className="text-sm md:text-base tracking-widest uppercase text-white/50 mb-6 font-medium">
              Proven Methodology
            </p>
          </HeadingAnimation>

          {/* Main Heading */}
          <HeadingAnimation className="mb-8">
            <h2 id="process-heading" className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] text-white font-medium leading-tight tracking-tight">
              Our Process
            </h2>
          </HeadingAnimation>

          {/* Descriptive Subheading */}
          <HeadingAnimation delay={0.1}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium max-w-3xl">
              A systematic approach to building premium brands that command attention and drive results.
            </p>
          </HeadingAnimation>

          {/* Section Description */}
          <HeadingAnimation delay={0.15}>
            <p className="text-base md:text-lg text-gray-400 font-regular max-w-2xl mt-4 leading-relaxed">
              From initial discovery through final design, we follow a proven three-step methodology to create cohesive brand identities.
            </p>
          </HeadingAnimation>
        </div>

        {/* Process Steps - Alternating Full-Width Layout */}
        <div className="space-y-20 md:space-y-32">
          {processes.map((process, index) => (
            <ProcessStepAnimation key={index} index={index}>
              {({ isInView }: { isInView: boolean; isHovered: boolean; index: number }) => {
                const isEven = index % 2 === 0
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className={`${!isEven ? 'md:order-2' : ''}`}>
                      {/* Step Number */}
                      <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.15 + 0.1,
                        }}
                      >
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                          <span className="text-2xl font-medium text-white">{process.step}</span>
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.15 + 0.15,
                          ease: 'easeOut',
                        }}
                      >
                        {process.title}
                      </motion.h3>

                      {/* Divider Line */}
                      <motion.div
                        className="hidden md:block w-20 h-1 bg-white/30 mb-8"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15 + 0.2,
                        }}
                        style={{ originX: 0 }}
                      />
                    </div>

                    {/* Right Content - Description */}
                    <div className={`${!isEven ? 'md:order-1' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          staggerChildren: 0.08,
                          delayChildren: index * 0.15 + 0.25,
                        }}
                      >
                        <motion.p 
                          className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed"
                        >
                          {process.descriptionLines.map((line, lineIdx) => (
                            <motion.span
                              key={`desc-line-${lineIdx}`}
                              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(4px)' }}
                              transition={{
                                duration: 0.85,
                                ease: [0.34, 1.56, 0.64, 1],
                              }}
                              className="block overflow-hidden"
                            >
                              {line}
                            </motion.span>
                          ))}
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                )
              }}
            </ProcessStepAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
