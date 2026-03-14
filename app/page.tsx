import type { Metadata } from "next"
import { ProjectThumbnails } from "@/components/project-thumbnails"
import { ServicesSection } from "@/components/services-section"
import { Hero } from "@/components/hero"
import { HeroCTASection } from "@/components/hero-cta-section"
import { BrandStrategySection } from "@/components/brand-strategy-section"
import { BrandClaritySection } from "@/components/brand-clarity-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { Separator } from "@/components/ui/separator"
import { HeroSVGAnimation } from "@/components/hero-svg-animation"
import { TypewriterText } from "@/components/typewriter-text"

export const metadata: Metadata = {
  title: "Lozinr | Logo & Brand Identity Design Agency",
  description:
    "Lozinr is a strategic design agency specializing in logos, brand identity systems, and high-impact visual branding for modern businesses.",
  openGraph: {
    title: "Lozinr — Logo & Brand Identity Design Agency",
    description:
      "Strategic logo design and brand identity systems crafted for clarity, consistency, and lasting impact.",
    url: "https://lozinr.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lozinr Branding Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lozinr | Logo & Brand Identity Design Agency",
    description: "Strategic logo design and brand identity systems crafted for clarity, consistent and lasting impact.",
  },
  alternates: {
    canonical: "https://lozinr.com",
  },
}

export default function Home() {
  return (
    <>
      <main className="relative bg-[#000000] transition-colors duration-300">
        {/* Hero SVG Section */}
        <section id="home" className="w-full lg:py-60 lg:px-8 py-30 px-3 overflow-hidden relative">
          <HeroSVGAnimation />
          {/* Hero Text Section */}
          <div className="grid grid-cols-2 gap-0 mt-4 md:mt-5">
            {/* Left - Empty */}
            <div></div>
            {/* Right - Text */}
            <div className="flex items-center">
              <TypewriterText
                text="We create premium brands that command attention."
                className="text-[20px] md:text-5xl lg:text-[35px] font-regular text-black leading-none tracking-tighter"
              />
            </div>
          </div>
        </section>
        <Separator className="w-full h-px" />
        <BrandStrategySection />
        <Separator className="w-full h-px" />
        <BrandClaritySection />
        <Separator className="w-full h-px" />
        <div className="relative bg-background">
          <section id="work">
            <ProjectThumbnails />
          </section>
          <Separator className="w-full h-px" />
          <section id="services">
            <ServicesSection />
          </section>
          <Separator className="w-full h-px" />
          <WhyChooseUsSection />
          <Separator className="w-full h-px" />
        </div>
      </main>
    </>
  )
}
