"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AboutPopup } from "@/components/about-popup"

// Letter Spin Component
function SpinningNavLink({ label, onClick, action }: { label: string; onClick: () => void; action?: string }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="text-[14px] text-white font-medium tracking-tight cursor-pointer relative h-4 overflow-hidden flex"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {label.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ rotateX: 0 }}
          animate={isHovering ? { rotateX: 360 } : { rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.05,
            ease: [0.23, 1, 0.32, 1]
          }}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d',
            display: 'inline-block'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </button>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
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
    { href: "/", label: "WORK", section: "work" },
    { href: "/", label: "SERVICES", section: "services" },
    { href: "/", label: "ABOUT", action: "about" },
    { href: "/", label: "CONTACT", action: "contact" },
  ]

  const desktopNavLinks = [
    { label: "Work", section: "work" },
    { label: "Process", section: "process" },
    { label: "Contact", action: "contact" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-out ${scrollY >= 100 || isMenuOpen ? "bg-[#000000]" : "bg-[#000000]"
          }`}
      >
        <div
          className="flex items-center justify-between px-3 md:px-5 lg:px-8 py-2 md:py-2 w-full"
        >
          {/* Logo SVG */}
          <Link href="/" className="w-18 md:w-24 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1739.38 371.37" className="w-full h-auto">
              <g id="Layer_1" data-name="Layer 1">
                <path d="M1896.81,76.9h-.08c.03-.91.05-1.81.06-2.72.01.91.02,1.81.02,2.72Z" />
                <path d="M1896.81,71.46c0,.91-.01,1.81-.02,2.72-.01-.91-.03-1.81-.06-2.72h.08Z" />
              </g>
              <g id="Shape_Grid_Output_" data-name="Shape Grid (Output)">
                <g fill="#ffffff">
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

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {desktopNavLinks.map((link) => (
              <div key={link.label}>
                {link.action === "about" ? (
                  <SpinningNavLink
                    label={link.label}
                    onClick={() => setIsAboutOpen(true)}
                    action="about"
                  />
                ) : link.action === "contact" ? (
                  <SpinningNavLink
                    label={link.label}
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    action="contact"
                  />
                ) : (
                  <SpinningNavLink
                    label={link.label}
                    onClick={() => {
                      const element = document.getElementById(link.section || '')
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </nav>


        </div>
      </motion.header>


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

      <div className={`${headerVisible ? "h-[40px] md:h-[48px]" : "h-0"}`} />

      {/* About Popup */}
      <AboutPopup isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}
