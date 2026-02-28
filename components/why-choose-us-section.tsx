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

        {/* Process Steps - Enhanced Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {processes.map((process, index) => (
            <ProcessStepAnimation key={index} index={index}>
              {({ isInView }: { isInView: boolean; isHovered: boolean; index: number }) => (
              <motion.div 
                className="group relative flex flex-col h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />
                
                {/* Card Content */}
                <div className="relative flex flex-col h-full p-8 md:p-6 lg:p-8">
                  {/* Step Number */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.1,
                    }}
                    className="mb-6"
                  >
                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20">
                      <span className="text-sm md:text-xs lg:text-sm font-medium text-white/70">
                        Step {process.step}
                      </span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3 
                    className="text-2xl md:text-2xl lg:text-3xl text-white font-medium tracking-tight mb-6"
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

                  {/* Description with line-by-line animation */}
                  <motion.div
                    className="flex-grow"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      staggerChildren: 0.08,
                      delayChildren: index * 0.15 + 0.2,
                    }}
                  >
                    <motion.p 
                      className="text-sm md:text-base lg:text-[16px] text-gray-400 leading-relaxed"
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

                  {/* Decorative line at bottom */}
                  <motion.div
                    className="mt-8 h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15 + 0.4,
                    }}
                    style={{ originX: 0 }}
                  />
                </div>
              </motion.div>
              )}
            </ProcessStepAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
