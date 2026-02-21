'use client'

import { HeadingAnimation, ContentBlockAnimation, BrandStrategyTextAnimation } from './section-animations'
import { motion } from 'framer-motion'

export function BrandStrategySection() {
  return (
    <section className="w-full bg-[#0E0E0E] transition-colors duration-300 py-16 md:py-24 lg:py-32 px-3 md:px-5 lg:px-8">
      <div className="max-w-full mx-auto">
        {/* Top Text Section */}
        <HeadingAnimation className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-[45px] font-medium text-white tracking-tighter leading-tight">
            We're a Brand Strategy & Identity Design studio based in Toronto. We help founders build premium, iconic brands that stand out and command attention.
          </h2>
        </HeadingAnimation>

        {/* Bottom Section: Text Only */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 lg:gap-8">
          {/* Text with smooth animations */}
          <ContentBlockAnimation className="md:col-span-10 flex flex-col justify-start gap-6 md:gap-8 max-w-4xl">
            <BrandStrategyTextAnimation className="relative">
              <motion.p
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-tight"
                initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, amount: 0.5 }}
              >
                Our work brings structure, clarity, and intention to your brand – so you can attract high paying
                customers, raise your value, and grow with confidence.
              </motion.p>
            </BrandStrategyTextAnimation>

            <BrandStrategyTextAnimation className="relative">
              <motion.p
                className="text-base md:text-lg lg:text-[22px] font-regular text-white font-medium tracking-tight leading-tight"
                initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, amount: 0.5 }}
              >
                We work with founders who think big and want their brand to reflect that ambition.
              </motion.p>
            </BrandStrategyTextAnimation>
          </ContentBlockAnimation>
        </div>
      </div>
    </section>
  )
}
