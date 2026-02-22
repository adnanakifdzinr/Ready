"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ServiceCardItem } from "./section-animations"

// Unique animation variants for service cards
const createCardVariants = (index: number) => {
  const isLeft = index % 2 === 0
  const isFirstRow = Math.floor(index / 3) === 0

  return {
    // Zoom out with blur effect
    hexagon: {
      hidden: {
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.15 + 0.2,
        },
      },
    },
    // Wave reveal effect on hover
    wave: {
      idle: { backgroundPosition: "200% 0" },
      hover: { backgroundPosition: "0% 0" },
    },
  }
}

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description: `
• Brand Discovery Workshop
• Market & Competitor Analysis
• Target Audience Definition
• Brand Positioning Statement
• Brand Purpose / Mission / Vision
• Brand Values & Personality
• Brand Archetype Selection
• Unique Value Proposition (UVP)
• Brand Messaging Framework
• Tone of Voice Guidelines
• Naming Direction (Optional)
• Tagline Direction (Optional)
`,
    icon: (
      <svg className="w-20 h-20" fill="black" viewBox="0 0 16 16">
        <path d="M8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill="black" />
        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6 6L4 11L5 12L10 10L12 5L11 4L6 6Z" fill="black" />
      </svg>
    ),
  },

  {
    number: "02",
    title: "Brand Identity System",
    description: `
• Logo System (Primary, Secondary, Mark)
• Logo Variations & Usage Rules
• Color System (Primary / Secondary / Accent)
• Typography System
• Iconography Style
• Pattern & Graphic Elements
• Grid & Layout System
• Brand Mark Construction
• Clearspace & Minimum Size Rules
• Do & Don't Guidelines
• Stationery Design
• Brand Guidelines PDF
`,
    icon: (
      <svg className="w-20 h-20" fill="black" viewBox="0 0 24 24">
        <path d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.6309 3.96779 19.7415 5.96241 20.5284 8.55374H3.47164C4.2585 5.96241 6.36915 3.96779 9.02975 3.3437Z" fill="black" />
        <path d="M3.20453 9.70249C2.89142 11.4471 2.93781 13.2399 3.3437 14.9703C3.9678 17.6309 5.96243 19.7415 8.55377 20.5284V9.70249H3.20453Z" fill="black" />
        <path d="M9.70252 20.7955C11.4471 21.1086 13.2399 21.0622 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.0622 13.2399 21.1086 11.4471 20.7955 9.70249H9.70252V20.7955Z" fill="black" />
      </svg>
    ),
  },

  {
    number: "03",
    title: "Digital Brand Experience",
    description: `
• Website Visual Direction
• Landing Page UI Direction
• UI Brand Kit
• Digital Color & Type Rules
• Social Media Brand Kit
• Post & Story Templates
• Digital Ad Visual System
• Content Visual Framework
• UX Tone Alignment
• Interaction Style Guide
`,
    icon: (
      <svg className="w-20 h-20" fill="black" viewBox="-2 -4 24 24">
        <path d="M1 14h18a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zM2 0h16a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a2 2 0 0 1 2-2z" />
      </svg>
    ),
  }
]

export function ServiceCards() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [animatedIcons, setAnimatedIcons] = useState<Set<number>>(new Set())
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconAnimationRefs = useRef<Set<number>>(new Set())

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5],
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
        if (index !== -1) {
          if (entry.isIntersecting) {
            // Card enters view - add to visible set
            setVisibleCards((prev) => new Set([...prev, index]))
            
            // Trigger icon rotation animation only if not already animated in this view
            if (!iconAnimationRefs.current.has(index)) {
              iconAnimationRefs.current.add(index)
              setAnimatedIcons((prev) => new Set([...prev, index]))
            }
          } else {
            // Card leaves view - remove from visible set to re-trigger animation
            setVisibleCards((prev) => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
            // Reset icon animation ref when card leaves view
            iconAnimationRefs.current.delete(index)
            setAnimatedIcons((prev) => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        }
      })
    }, observerOptions)

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .service-card-inner {
        position: relative;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div ref={containerRef} className="relative mt-12 md:mt-16 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
        {services.map((service, index) => {
          const items = service.description
            .trim()
            .split("\n")
            .filter((item) => item.trim())
          const isExpanded = expandedCards.has(index)
          const itemsToShow = isExpanded ? items : items.slice(0, 3)
          const hasMore = items.length > 3

          const isVisible = visibleCards.has(index)
          const variants = createCardVariants(index)
          const isHovered = hoveredCard === index

          return (
            <motion.div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="service-card group relative"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants.hexagon}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated gradient border blur effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                  boxShadow: isHovered
                    ? "0 0 10px rgba(255, 255, 255, 0), inset 0 0 40px rgba(255, 255, 255, 0.1)"
                    : "0 0 0px rgba(255, 255, 255, 0)",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100"
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{
                    x: isHovered ? ["100%", "-100%"] : "100%",
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{ opacity: 0.1 }}
                />
              </motion.div>

              <motion.div
                className="service-card-inner h-full bg-black/20 rounded-3xl p-8 md:p-9 flex flex-col relative z-10 transition-all duration-500"
                animate={{
                  y: isHovered ? 0 : 0,
                  scale: isHovered ? 1 : 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                {/* Icon Badge - Rotating spin on view and hover */}
                <motion.div
                  className="mb-8 inline-flex w-fit"
                  animate={{
                    rotate: isHovered ? 360 : animatedIcons.has(index) ? 360 : 0,
                  }}
                  transition={{
                    duration: isHovered ? 0.8 : 1.2,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="icon-badge w-25 h-25 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300"
                    animate={{
                      scale: isHovered ? 1 : 1,
                      backgroundColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>

                {/* Title - Gradient text animation */}
                <motion.h3
                  className="text-xl md:text-lg lg:text-[30px] font-regular text-black leading-[1.2] mb-4 tracking-tighter transition-colors duration-300"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: isHovered ? "0% 0%" : "100% 0%",
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  {service.title}
                </motion.h3>

                {/* Description List - Staggered reveal */}
                <motion.ul className="text-sm md:text-base lg:text-[16px] text-black leading-relaxed flex-grow space-y-2 list-none">
                  {itemsToShow.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="text-black relative pl-0 overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? {
                        opacity: 1,
                        x: isHovered ? 0 : 0,
                      } : {
                        opacity: 0,
                        x: -20
                      }}
                      transition={{
                        duration: 0.4,
                        delay: (index * 0.15) + (idx * 0.05),
                        ease: "easeOut",
                      }}
                    >
                      <span className="inline-block">
                        {item.replace(/^•\s*/, "").trim()}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* View More/Less Button - Smooth expansion */}
                {hasMore && (
                  <motion.button
                    onClick={() => toggleExpanded(index)}
                    className="mt-6 px-4 py-2 rounded-full text-white text-sm md:text-base font-medium bg-black relative overflow-hidden"
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index * 0.15) + 0.3 }}
                  >
                    <motion.span
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    >
                      {isExpanded ? "Show less" : `+${items.length - 3} more`}
                    </motion.span>
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
