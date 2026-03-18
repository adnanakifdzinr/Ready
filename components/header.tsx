"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useWebOpenAnimation } from "@/context/animation-context"
import { AboutPopup } from "@/components/about-popup"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isCtaHovering, setIsCtaHovering] = useState(false)
  const [isWebOpenActive, setIsWebOpenActive] = useState(false)
  const [isWebOpenVisible, setIsWebOpenVisible] = useState(false)
  const isScrollDirectionUp = useScrollDirection()
  const pathname = usePathname()
  const { isWebOpenAnimating } = useWebOpenAnimation()

  const handleWebOpenClick = () => {
    setIsWebOpenActive(true)
    setTimeout(() => setIsWebOpenVisible(true), 50)
  }

  const handleWebOpenExit = () => {
    setIsWebOpenVisible(false)
    setTimeout(() => setIsWebOpenActive(false), 900)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkHeroAnimation = () => {
      const isAnimated = document.documentElement.getAttribute("data-hero-animated") === "true"
      setHeaderVisible(isAnimated)
    }

    checkHeroAnimation()
    const observer = new MutationObserver(checkHeroAnimation)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero-animated"] })

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { href: "/", label: "HOME", section: "home" },
    { href: "/", label: "OUR WORK", section: "work" },
    { href: "/", label: "OUR SERVICES", section: "services" },
    { href: "/", label: "ABOUT", action: "about" },
    { href: "/", label: "CONTACT US", action: "contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/#home") return pathname === "/"
    if (href.startsWith("/#")) return false
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px]"
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="flex items-center justify-between px-4 py-2 w-full bg-black rounded-2xl">
          {/* Logo */}
          <Link href="/" className="w-12 h-12 flex-shrink-0 flex items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752" className="w-11 h-11" fill="white">
              <path d="M735.804 364.18C735.408 352.237 734.396 340.235 732.809 328.292C726.203 279.212 709.261 230.746 681.349 185.991L680.476 186.546L680.635 185.832L680.794 185.118C652.822 140.62 616.657 104.375 575.513 77.0576C565.653 70.4911 555.476 64.4404 545.061 58.9451C517.189 44.1655 487.531 33.175 457.02 26.1521C440.039 22.244 422.74 19.5856 405.362 18.1771C391.673 17.0463 377.945 16.7487 364.158 17.205C352.156 17.5621 340.154 18.5738 328.172 20.2006C279.132 26.8068 230.727 43.6893 186.032 71.6219V71.6616C163.654 85.6477 143.36 101.677 125.208 119.373C107.037 137.01 91.0867 156.392 77.3389 176.984C70.6931 187.002 64.5235 197.338 58.9292 207.912C52.5215 220.073 46.7882 232.571 41.8089 245.347C35.3813 261.714 30.2037 278.557 26.236 295.638C19.2134 326.05 16.1781 357.375 17.1898 388.799C19.2133 449.942 36.9089 511.361 71.6454 566.949C99.5774 611.645 135.722 648.068 176.867 675.525C186.944 682.23 197.32 688.4 207.933 694.034C235.607 708.695 265.007 719.626 295.3 726.629C325.811 733.751 357.254 736.865 388.837 735.794C400.581 735.377 412.384 734.425 424.128 732.898C473.049 726.391 521.454 709.607 566.11 681.893L566.407 680.465L566.982 681.318C622.608 646.6 665.419 599.087 694.065 545.027C708.765 517.273 719.696 487.774 726.758 457.361C733.781 426.949 736.836 395.564 735.804 364.18ZM504.83 297.007L504.274 297.364L455.651 508.167L456.068 508.921L455.354 509.338L455.453 508.981C419.506 531.2 377.906 536.894 339.757 527.946C301.509 519.098 266.773 495.649 244.296 459.801L244.098 459.96L244.197 459.603C221.82 423.695 216.126 382.094 224.934 343.905C233.782 305.656 257.112 270.88 292.959 248.383L293.019 248.145L292.82 248.085L293.078 247.926V247.986L293.118 248.145L398.696 272.506L504.413 296.967L504.473 296.61L504.572 296.193L505.127 297.066L504.83 297.007Z" />
            </svg>
          </Link>

          {/* CTAs */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Pricing CTA - Glassmorphism */}
            <Link
              href="/#pricing"
              className="hidden sm:block px-4 py-2 text-white text-[15px] tracking-tight font-medium rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              See pricing
            </Link>

            {/* Book a Call CTA */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FF3C00] tracking-tight text-white text-[15px] font-medium rounded-lg hover:bg-[#E63A00] transition-all duration-300"
              style={{
                boxShadow: 'inset 0 10px 20px 0 rgba(255, 255, 255, 0.2), 0 10px 20px rgba(255, 60, 0, 0.4)'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Book a call
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-8 h-8 group"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              {/* Top line - 50% width from right on idle, full width on hover */}
              <span
                className="h-0.5 bg-white transition-all duration-500 origin-right"
                style={{
                  width: isMenuOpen ? '100%' : '50%',
                  marginLeft: isMenuOpen ? '0' : 'auto'
                }}
              />
              {/* Middle line */}
              <span
                className={`h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                style={{ width: '100%' }}
              />
              {/* Bottom line - 50% width from left on idle, full width on hover */}
              <span
                className="h-0.5 bg-white transition-all duration-500 origin-left"
                style={{
                  width: isMenuOpen ? '100%' : '50%'
                }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      <div
        className={`fixed inset-0 z-40 overflow-hidden ${isAnimating || isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Background curtain panels */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 bg-[#0e0e0e] transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "scale-y-100 origin-bottom" : "scale-y-0 origin-top"}`}
              style={{
                transitionDuration: "1500ms",
                transitionDelay: isMenuOpen ? `${i * 50}ms` : `${(4 - i) * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between items-center px-3 md:px-5 lg:px-8 pt-20 pb-8 md:pb-10">
          {/* Main Navigation */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex flex-col gap-2humbnailhang items-center text-center">
              {navLinks.map((link, index) => (
                <li key={link.label} className="overflow-hidden">
                  {link.action === "about" ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsAboutOpen(true)
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : link.action === "contact" ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        const contactSection = document.getElementById('contact')
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : link.section ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        const element = document.getElementById(link.section)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out ${isActive(link.href) ? "text-white" : "text-white hover:text-[#ff3a09]"}`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section - Social links */}
          <motion.div className="flex items-center justify-center w-full">
            <motion.div
              className="flex flex-row items-center gap-4 md:gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: isMenuOpen ? 1.6 : 0,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <motion.a
                href="https://www.instagram.com/adnanahmedakif/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] transition-colors duration-300"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={isMenuOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: isMenuOpen ? 1.7 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ x: 5 }}
              >
                Instagram
                <motion.div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  whileHover={{ scale: 1.15, backgroundColor: '#ff3a09' }}
                >
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                </motion.div>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/adnanahakif"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] transition-colors duration-300"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={isMenuOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: isMenuOpen ? 1.85 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ x: 5 }}
              >
                Facebook
                <motion.div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  whileHover={{ scale: 1.15, backgroundColor: '#ff3a09' }}
                >
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                </motion.div>
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@adnanahmedakif"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] transition-colors duration-300"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={isMenuOpen ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
                transition={{
                  duration: 0.6,
                  delay: isMenuOpen ? 2.0 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ x: 5 }}
              >
                YouTube
                <motion.div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  whileHover={{ scale: 1.15, backgroundColor: '#ff3a09' }}
                >
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="h-32" />

      {/* Web-Open CTA Expansion Animation Overlay */}
      <AnimatePresence mode="wait">
        {isWebOpenActive && (
          <>
            {/* Black overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 bg-black"
              style={{ zIndex: 9998 }}
            />

            {/* Top slice that moves up on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100vh' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 9997 }}
            />

            {/* Bottom slice that moves down on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed bottom-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 9997 }}
            />

            {/* CTA Button Container with Web-Open Animation */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center px-4"
              style={{ zIndex: 9999, perspective: 1000 }}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{
                x: '150vw',
                opacity: 0,
                rotateY: 20,
                transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.button
                initial={{ width: 56, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                animate={isWebOpenVisible ? { width: 180 } : { width: 56 }}
                exit={{ width: 56 }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onHoverStart={() => setIsCtaHovering(true)}
                onHoverEnd={() => setIsCtaHovering(false)}
                onClick={() => {
                  handleWebOpenExit()
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 900)
                }}
                className="relative h-[52px] backdrop-blur-sm border-l-2 border-r-2 border-white rounded-full flex items-center justify-between px-2 py-2 gap-2 overflow-hidden cursor-pointer focus:outline-none"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                {/* Text with character-level 3D flip animation */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isWebOpenVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                    duration: 0.8
                  }}
                  className="text-white font-medium text-base whitespace-nowrap flex"
                  style={{ perspective: 1200 }}
                >
                  {'Open Website'.split('').map((char, index) => (
                    <motion.span
                      key={index}
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

                {/* Arrow circle with glow effect */}
                <motion.div
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden relative flex-shrink-0"
                  initial={{ boxShadow: '0 0 0px rgba(255, 255, 255, 0)' }}
                  animate={isWebOpenVisible ? {
                    boxShadow: [
                      '0 0 0px rgba(255, 255, 255, 0)',
                      '0 0 20px rgba(255, 255, 255, 0.4)',
                      '0 0 0px rgba(255, 255, 255, 0)'
                    ]
                  } : {}}
                  transition={isWebOpenVisible ? {
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.2
                  } : {}}
                >
                  {/* Main arrow */}
                  <motion.div
                    animate={{
                      x: isCtaHovering ? 40 : 0,
                      opacity: isCtaHovering ? 0 : 1,
                      rotate: isCtaHovering ? 45 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute"
                  >
                    <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                  </motion.div>

                  {/* Secondary arrow */}
                  <motion.div
                    animate={{
                      x: isCtaHovering ? 0 : -40,
                      opacity: isCtaHovering ? 1 : 0,
                      rotate: isCtaHovering ? -45 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute"
                  >
                    <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                  </motion.div>
                </motion.div>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Popup */}
      <AboutPopup isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}
