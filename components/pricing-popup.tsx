'use client'

import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface PricingPopupProps {
  isOpen: boolean
  onClose: () => void
  onGetStarted?: () => void
}

export function PricingPopup({ isOpen, onClose, onGetStarted }: PricingPopupProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 400)
  }

  if (!isOpen && !isClosing) return null

  const packages = [
    {
      price: 'US $800',
      timeline: '6 weeks',
      sections: [
        {
          title: 'BRAND DISCOVERY',
          items: [],
        },
        {
          title: 'BRAND STRATEGY:',
          items: [
            'Brand Positioning',
            'Brand Persona',
            'Brand Story',
            'Ideal Buyer Persona',
            'Taglines (x3)',
            'Competitive Analysis',
            'Brand Voice & Tone',
            'Look & Feel Moodboards (x3)',
          ],
        },
        {
          title: 'BRAND IDENTITY DESIGN:',
          items: [
            'Logo Designs (x3)',
            'Brand Colors + Fonts',
            'Brand Messaging',
            'Website Header Mockup',
            'Social Media Mockup',
            'Marketing Collateral Mockups',
            'Corporate Stationary Mockup',
          ],
        },
        {
          title: 'BRAND GUIDELINES',
          items: [],
        },
      ],
    },
    {
      price: 'US $1,500',
      timeline: '10 weeks',
      sections: [
        {
          title: 'BRAND DISCOVERY',
          items: [],
        },
        {
          title: 'BRAND STRATEGY:',
          items: [
            'Brand Positioning',
            'Brand Persona',
            'Brand Story',
            'Ideal Buyer Persona',
            'Taglines (x3)',
            'Competitive Analysis',
            'Brand Voice & Tone',
            'Look & Feel Moodboards',
            'Brand Names (x9)',
          ],
        },
        {
          title: 'BRAND IDENTITY DESIGN:',
          items: [
            'Logo Designs x3',
            'Packaging Design Mockups (Multiple SKUs & Formats)',
            'Brand Colors + Fonts',
            'Brand Messaging',
            'Website Header Mockup',
            'Social Media Mockup',
            'Marketing Collateral Mockups',
            'Corporate Stationary Mockups',
          ],
        },
        {
          title: 'BRAND GUIDELINES',
          items: [],
        },
      ],
    },
  ]

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300 overflow-y-auto ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#1A1A1A] w-full max-w-2xl sm:max-w-4xl lg:max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out transform my-4 sm:my-8 ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100 animate-bounce'
        }`}
        style={{
          animation: !isClosing ? 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes bounce {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>

        {/* Close Button - Top Right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A1A1A] border border-white text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="pt-10 sm:pt-12 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium text-white leading-tight">
              Your investment for Brand Strategy & Identity Design
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-4 sm:p-6 lg:p-8 bg-white/5 hover:bg-white/10 transition-colors duration-300 flex flex-col"
              >
                {/* Price Header */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {pkg.price}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-white/80">
                    Timeline: {pkg.timeline}
                  </p>
                </div>

                {/* Package Details */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 flex-grow max-h-48 sm:max-h-64 overflow-y-auto">
                  {pkg.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h4 className="font-semibold text-white mb-1 sm:mb-2 text-xs sm:text-sm">
                        {section.title}
                      </h4>
                      {section.items.length > 0 && (
                        <ul className="space-y-1 ml-2 sm:ml-3">
                          {section.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-xs text-white/80 flex items-start gap-1.5 sm:gap-2"
                            >
                              <span className="text-white/40 flex-shrink-0 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    handleClose()
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 400)
                  }}
                  onMouseEnter={() => setHoveredButton(index)}
                  onMouseLeave={() => setHoveredButton(null)}
                  initial={{ width: '100%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="w-full h-[44px] bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium hover:bg-white/90 transition-colors duration-200 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 overflow-hidden relative focus:outline-none"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                      duration: 0.8
                    }}
                    className="text-black font-medium text-xs sm:text-sm whitespace-nowrap flex"
                    style={{ perspective: 1200 }}
                  >
                    {'Get Started'.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{
                          opacity: 0,
                          rotateX: 90,
                          rotateY: -45,
                          y: 20,
                          filter: 'blur(4px)'
                        }}
                        animate={{
                          opacity: 1,
                          rotateX: 0,
                          rotateY: 0,
                          y: 0,
                          filter: 'blur(0px)'
                        }}
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
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center overflow-hidden relative flex-shrink-0">
                    <motion.div
                      animate={{
                        x: hoveredButton === index ? 20 : 0,
                        opacity: hoveredButton === index ? 0 : 1,
                        rotate: hoveredButton === index ? 45 : 0
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute flex items-center justify-center"
                    >
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </motion.div>
                    <motion.div
                      animate={{
                        x: hoveredButton === index ? 0 : -20,
                        opacity: hoveredButton === index ? 1 : 0,
                        rotate: hoveredButton === index ? -45 : 0
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute flex items-center justify-center"
                    >
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
