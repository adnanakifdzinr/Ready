"use client"

import { useRef } from "react"
import Link from "next/link"
import { ServiceCards } from "./service-cards"
import { HeadingAnimation } from "./section-animations"

export function ServicesSection() {
  const servicesRef = useRef<HTMLHeadingElement>(null)

  return (
    <section className="w-full bg-[#f9f9f9] py-20 md:py-20 lg:py-20 px-3 md:px-5 lg:px-8" aria-labelledby="services-heading">
      <div className="max-w-full mx-auto">
        {/* Section Subheading */}
        <p className="text-sm md:text-base tracking-widest uppercase text-black/60 mb-4 font-medium">
          Our Expertise
        </p>
        
        {/* Main Section Heading */}
        <HeadingAnimation className="space-y-0 md:space-y-2 overflow-hidden -mt-2 md:mt-0 mb-16 text-center" ref={servicesRef}>
          <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-[64px] font-medium text-black mb-0 leading-none tracking-tighter">
            How we can help you
          </h2>
          <p className="text-lg md:text-xl text-black/70 mt-6 max-w-2xl mx-auto leading-relaxed">
            Comprehensive branding services designed to elevate your business and create lasting impact in your market.
          </p>
        </HeadingAnimation>

        {/* Service Cards Grid */}
        <ServiceCards />
      </div>
    </section>
  )
}
