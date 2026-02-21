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
      image: '/images/demo.jpg',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'With a clear understanding of your brand essence, we develop a comprehensive brand strategy, messaging framework, and visual identity system that authentically represents your business.',
      image: '/images/process-strategy.png',
    },
    {
      step: '03',
      title: 'Design',
      description: 'We bring your brand to life across all touchpoints—from logo design to brand guidelines—ensuring consistency and impact everywhere your customers interact with your brand.',
      image: '/images/process-implementation.png',
    },
  ]

  return (
    <section className="w-full bg-[#0e0e0e] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top Heading */}
        <HeadingAnimation className="mb-8 md:mb-2">
          <h2 className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-white font-medium leading-tighter tracking-tight">
            Want to work with us?
          </h2>
        </HeadingAnimation>

        {/* Subheading */}
        <HeadingAnimation className="mb-16 md:mb-20" delay={0.1}>
          <p className="text-lg md:text-xl lg:text-[22px] text-gray-300 font-medium">
            Here's our branding & design process
          </p>
        </HeadingAnimation>

        {/* Process Steps */}
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          {processes.map((process, index) => (
            <ProcessStepAnimation key={index} index={index}>
              {({ isInView, isHovered }: { isInView: boolean; isHovered: boolean; index: number }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                {/* Left Side - Step Number, Title, Image */}
                <div className="flex flex-col space-y-6">
                  {/* Step Number - Subtle fade and scale */}
                  <motion.p 
                    className="text-sm md:text-base lg:text-[18px] text-white/70 font-medium mb-2 tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.1,
                    }}
                  >
                    Step {process.step}
                  </motion.p>

                  {/* Title - Smooth reveal */}
                  <motion.h3 
                    className="text-3xl md:text-4xl lg:text-[40px] text-white font-medium tracking-tight"
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

                  {/* Image Placeholder - Blank */}
                  <motion.div
                    className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-transparent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15 + 0.2,
                      ease: 'easeOut',
                    }}
                  />
                  
                </div>

                {/* Right Side - Description */}
                <motion.div 
                  className="flex flex-col justify-start mt-25"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15 + 0.25,
                    ease: 'easeOut',
                  }}
                >
                  <motion.p 
                    className="text-base md:text-lg lg:text-[18px] text-gray-400 leading-relaxed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15 + 0.3,
                      ease: 'easeOut',
                    }}
                  >
                    {process.description}
                  </motion.p>


                </motion.div>
              </div>
              )}
            </ProcessStepAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
