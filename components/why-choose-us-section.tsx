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
    <section className="w-full bg-[#0e0e0e] py-16 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          {/* Top Heading */}
          <HeadingAnimation className="mb-6">
            <h2 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] text-white font-medium leading-tight tracking-tight">
              Want to work with us?
            </h2>
          </HeadingAnimation>

          {/* Subheading */}
          <HeadingAnimation delay={0.1}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-medium max-w-2xl">
              Here's our branding & design process
            </p>
          </HeadingAnimation>
        </div>

        {/* Process Steps - Vertical Timeline Layout */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32 relative">
          {/* Timeline line (desktop only) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-white/10" style={{ top: '40px' }} />

          {processes.map((process, index) => (
            <ProcessStepAnimation key={index} index={index}>
              {({ isInView }: { isInView: boolean; isHovered: boolean; index: number }) => (
              <div className="relative">
                {/* Timeline dot */}
                <motion.div
                  className="hidden md:flex absolute -left-4 top-2 w-8 h-8 rounded-full bg-white items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.1,
                  }}
                >
                  <div className="w-3 h-3 bg-[#0e0e0e] rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                  {/* Left column - Step info */}
                  <div className="md:col-span-4">
                    {/* Step Number */}
                    <motion.p
                      className="text-sm font-medium text-white/60 mb-6"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15 + 0.1,
                      }}
                    >
                      Step {process.step}
                    </motion.p>

                    {/* Title */}
                    <motion.h3 
                      className="text-3xl md:text-3xl lg:text-4xl text-white font-medium tracking-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.15 + 0.15,
                        ease: 'easeOut',
                      }}
                    >
                      {process.title}
                    </motion.h3>
                  </div>

                  {/* Right column - Description */}
                  <div className="md:col-span-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        staggerChildren: 0.08,
                        delayChildren: index * 0.15 + 0.2,
                      }}
                    >
                      <motion.p 
                        className="text-base md:text-lg lg:text-[18px] text-gray-300 leading-relaxed"
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
              </div>
              )}
            </ProcessStepAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
