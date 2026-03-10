"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AboutPopup } from "@/components/about-popup"

// Animated Text Component for letter-by-letter animation
const AnimatedText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  return (
    <div className="flex">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ color: '#ffffff' }}
          animate={{ color: isHovered ? '#ff3a09' : '#ffffff' }}
          transition={{
            duration: 0.3,
            delay: isHovered ? index * 0.03 : (text.length - index - 1) * 0.03,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isCtaHovering, setIsCtaHovering] = useState(false)
  const [hoveredNavLink, setHoveredNavLink] = useState<string | null>(null)
  const isScrollDirectionUp = useScrollDirection()
  const pathname = usePathname()

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
      <header
        className={`fixed z-50 transition-colors duration-500 ease-out ${scrollY >= 100 || isMenuOpen ? "bg-[#000000]" : "bg-[#000000]"
          } lg:top-10 lg:left-1/2 lg:-translate-x-1/2 lg:w-[70%] top-0 left-0 right-0`}
      >
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden flex items-center justify-between px-3 md:px-5 py-2 md:py-2 w-full">
          {/* Logo SVG */}
          <Link href="/" className="w-18 md:w-24 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1739.38 371.37" className="w-full h-auto">
              <g id="Layer_1" data-name="Layer 1">
                <path d="M1896.81,76.9h-.08c.03-.91.05-1.81.06-2.72.01.91.02,1.81.02,2.72Z" />
                <path d="M1896.81,71.46c0,.91-.01,1.81-.02,2.72-.01-.91-.03-1.81-.06-2.72h.08Z" />
              </g>
              <g id="Shape_Grid_Output_" data-name="Shape Grid (Output)">
                <g fill="currentColor" className="text-white">
                  <path d="M3.01,5.66h84.41v284.2h166.33v75.42H3.01V5.66Z" />
                  <path d="M328.98,340.81c-26.71-15.92-46.89-37.47-60.56-64.67-13.68-27.18-20.51-57.5-20.51-90.97s6.83-63.78,20.51-90.97c13.67-27.18,33.86-48.74,60.56-64.66,26.7-15.92,58.55-23.89,95.55-23.89s68.84,7.96,95.55,23.89c26.7,15.92,46.89,37.48,60.56,64.66,13.67,27.19,20.51,57.51,20.51,90.97s-6.84,63.78-20.51,90.97c-13.68,27.19-33.86,48.74-60.56,64.67-26.71,15.92-58.56,23.89-95.55,23.89s-68.85-7.96-95.55-23.89ZM355.52,262.63c15.12,20.11,38.12,30.16,69.01,30.16s53.88-10.05,69.01-30.16c15.12-20.1,22.68-45.92,22.68-77.45s-7.56-57.34-22.68-77.45c-15.13-20.1-38.12-30.16-69.01-30.16s-53.89,10.06-69.01,30.16c-15.13,20.11-22.68,45.93-22.68,77.45s7.56,57.35,22.68,77.45Z" />
                  <path d="M611.69,297.85l185.81-218.27-90.91,1.5h-88.91V5.66h290.2v64.93l-188.8,220.77,94.4-1.5h96.9v75.42h-298.69v-67.43Z" />
                  <path d="M950.68,5.66h84.41v359.63h-84.41V5.66Z" />
                  <path d="M1162.67,124.04v241.25h-80.92V5.66h91.41l142.85,242.25V5.66h80.92v359.63h-91.41l-142.85-241.25Z" />
                  <path d="M1424.53,5.66h169.03c43.33,0,75.84,9.84,97.52,29.5,21.67,19.67,32.5,45.84,32.5,78.51,0,18.34-4.84,34.93-14.5,49.76-9.67,14.84-51.78,36.22-78.67,31.23,15,7.34,46,5.61,71.92,35.53,9.08,10.49,12.42,25.68,14.75,42.01l14,93.51h-86.51l-12-81.01c-2.67-18-8.34-31.25-17-39.76-8.67-8.5-21.34-12.75-38.01-12.75h-68.51v133.52h-84.51V5.66ZM1578.55,167.68c19.33,0,33.83-3.83,43.51-11.5,9.67-7.67,14.5-19.5,14.5-35.51s-4.84-27.83-14.5-35.51c-9.67-7.67-24.18-11.5-43.51-11.5h-69.51v94.01h69.51Z" />
                </g>
              </g>
            </svg>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex items-center justify-center rounded-full w-9 h-9 md:w-12 md:h-12 group"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 h-[2.5px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                  ? `top-1/2 -translate-y-1/2 rotate-45 w-full`
                  : `top-0 w-full group-hover:w-3/5`
                  }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                  ? `w-0 opacity-0`
                  : `w-full opacity-100 group-hover:w-4/5 group-hover:translate-x-1`
                  }`}
              />
              <span
                className={`absolute left-0 h-[2.5px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                  ? `bottom-1/2 translate-y-1/2 -rotate-45 w-full`
                  : `bottom-0 w-full group-hover:w-2/5`
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-center py-4 w-full px-8">
          <div className="flex items-center justify-between w-full max-w-[70%] bg-black rounded-full px-8 py-6">
            {/* Logo SVG */}
            <Link href="/" className="w-24 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1739.38 371.37" className="w-full h-auto">
                <g id="Layer_1" data-name="Layer 1">
                  <path d="M1896.81,76.9h-.08c.03-.91.05-1.81.06-2.72.01.91.02,1.81.02,2.72Z" />
                  <path d="M1896.81,71.46c0,.91-.01,1.81-.02,2.72-.01-.91-.03-1.81-.06-2.72h.08Z" />
                </g>
                <g id="Shape_Grid_Output_" data-name="Shape Grid (Output)">
                  <g fill="currentColor" className="text-white">
                    <path d="M3.01,5.66h84.41v284.2h166.33v75.42H3.01V5.66Z" />
                    <path d="M328.98,340.81c-26.71-15.92-46.89-37.47-60.56-64.67-13.68-27.18-20.51-57.5-20.51-90.97s6.83-63.78,20.51-90.97c13.67-27.18,33.86-48.74,60.56-64.66,26.7-15.92,58.55-23.89,95.55-23.89s68.84,7.96,95.55,23.89c26.7,15.92,46.89,37.48,60.56,64.66,13.67,27.19,20.51,57.51,20.51,90.97s-6.84,63.78-20.51,90.97c-13.68,27.19-33.86,48.74-60.56,64.67-26.71,15.92-58.56,23.89-95.55,23.89s-68.85-7.96-95.55-23.89ZM355.52,262.63c15.12,20.11,38.12,30.16,69.01,30.16s53.88-10.05,69.01-30.16c15.12-20.1,22.68-45.92,22.68-77.45s-7.56-57.34-22.68-77.45c-15.13-20.1-38.12-30.16-69.01-30.16s-53.89,10.06-69.01,30.16c-15.13,20.11-22.68,45.93-22.68,77.45s7.56,57.35,22.68,77.45Z" />
                    <path d="M611.69,297.85l185.81-218.27-90.91,1.5h-88.91V5.66h290.2v64.93l-188.8,220.77,94.4-1.5h96.9v75.42h-298.69v-67.43Z" />
                    <path d="M950.68,5.66h84.41v359.63h-84.41V5.66Z" />
                    <path d="M1162.67,124.04v241.25h-80.92V5.66h91.41l142.85,242.25V5.66h80.92v359.63h-91.41l-142.85-241.25Z" />
                    <path d="M1424.53,5.66h169.03c43.33,0,75.84,9.84,97.52,29.5,21.67,19.67,32.5,45.84,32.5,78.51,0,18.34-4.84,34.93-14.5,49.76-9.67,14.84-51.78,36.22-78.67,31.23,15,7.34,46,5.61,71.92,35.53,9.08,10.49,12.42,25.68,14.75,42.01l14,93.51h-86.51l-12-81.01c-2.67-18-8.34-31.25-17-39.76-8.67-8.5-21.34-12.75-38.01-12.75h-68.51v133.52h-84.51V5.66ZM1578.55,167.68c19.33,0,33.83-3.83,43.51-11.5,9.67-7.67,14.5-19.5,14.5-35.51s-4.84-27.83-14.5-35.51c-9.67-7.67-24.18-11.5-43.51-11.5h-69.51v94.01h69.51Z" />
                  </g>
                </g>
              </svg>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-12">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.action === "about" ? (
                    <button
                      onClick={() => setIsAboutOpen(true)}
                      onMouseEnter={() => setHoveredNavLink(link.label)}
                      onMouseLeave={() => setHoveredNavLink(null)}
                      className="text-sm font-regular tracking-tight"
                    >
                      <AnimatedText text={link.label} isHovered={hoveredNavLink === link.label} />
                    </button>
                  ) : link.action === "contact" ? (
                    <button
                      onClick={() => {
                        const contactSection = document.getElementById('contact')
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      onMouseEnter={() => setHoveredNavLink(link.label)}
                      onMouseLeave={() => setHoveredNavLink(null)}
                      className="text-sm font-regular tracking-tight"
                    >
                      <AnimatedText text={link.label} isHovered={hoveredNavLink === link.label} />
                    </button>
                  ) : link.section ? (
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.section)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      onMouseEnter={() => setHoveredNavLink(link.label)}
                      onMouseLeave={() => setHoveredNavLink(null)}
                      className="text-sm font-regular tracking-tight"
                    >
                      <AnimatedText text={link.label} isHovered={hoveredNavLink === link.label} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredNavLink(link.label)}
                      onMouseLeave={() => setHoveredNavLink(null)}
                      className="text-sm font-regular tracking-tight"
                    >
                      <AnimatedText text={link.label} isHovered={hoveredNavLink === link.label} />
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

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

      <div className={`${headerVisible ? "h-[40px] md:h-[48px] lg:h-[80px]" : "h-0"}`} />

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
