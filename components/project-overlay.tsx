"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectOverlayProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    title: string
    category: string
    industry: string
    image: string
    slug: string
    tags?: string[]
    year?: string
    services?: string | string[]
    bgColor?: string
    textColor?: string
    client?: string
    role?: string
    deliverables?: string
    description?: string
    contextText?: string
    headline?: string
    images?: string[]
  } | null
}

export function ProjectOverlay({ isOpen, onClose, project }: ProjectOverlayProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisibleImages((prev) => new Set([...prev, index]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [project?.images?.length])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]))
  }

  if (!isOpen || !project) return null

  // Backdrop variants with unique animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.320, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.320, 1],
      },
    },
  }

  // Container variants with clip-path reveal animation
  const containerVariants = {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.320, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      clipPath: "inset(100% 0 0 0)",
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.320, 1],
      },
    },
  }

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  }

  // Headline animation with subtle scale
  const headlineVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.23, 1, 0.320, 1],
      },
    },
  }

  // Content section animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.5,
        ease: [0.23, 1, 0.320, 1],
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 bg-[#1A1A1A] overflow-y-auto flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="project-title"
      >
        {/* Back Button */}
        <motion.div
          className="fixed top-6 lg:left-9 left-4 z-50"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button
            onClick={onClose}
            initial={{ width: 44 }}
            animate={{ width: 100 }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onHoverStart={() => { }}
            onHoverEnd={() => { }}
            className="h-[44px] bg-[#1A1A1A] rounded-full flex items-center justify-center px-2 py-1 gap-2 overflow-hidden cursor-pointer focus:outline-none relative"
            aria-label="Go back"
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden relative flex-shrink-0">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute"
              >
                <ArrowLeft className="w-4 h-4 text-black" strokeWidth={2} />
              </motion.div>
            </div>

            <motion.span
              initial={{ opacity: 0, x: -44 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white font-medium text-[14px] whitespace-nowrap"
            >
              Back
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Headline Section */}
        <motion.div
          className="px-3 md:px-5 lg:px-8 pt-50 md:pt-40 lg:pt-60 flex items-center"
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          {project.headline && (
            <h1 className="text-4xl md:text-6xl lg:text-[79px] font-medium text-white leading-tighter tracking-tight ">
              {project.headline}
            </h1>
          )}
        </motion.div>

        {/* Description Section */}
        <motion.div
          className="px-3 md:px-5 lg:px-8 py-8 md:pt-15 "
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 lg:gap-24">
            {/* Left - Description */}
            <div>
              {project.contextText && (
                <p className="text-[16px] md:text-[16px] lg:text-[18px] font-medium  text-white leading-relaxed">
                  {project.contextText}
                </p>
              )}
              {project.description && (
                <p className="text-[16px] md:text-[16px] lg:text-[18px] font-medium text-white leading-relaxed mt-4">
                  {project.description}
                </p>
              )}
            </div>

            {/* Right - Project Details */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Category */}
                {project.category && (
                  <div>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white uppercase font-medium tracking-tight mb-2">
                      Category
                    </p>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white font-medium">
                      {project.category}
                    </p>
                  </div>
                )}

                {/* Scope */}
                {project.scope && (
                  <div>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white uppercase font-medium tracking-tight mb-2">
                      Scope
                    </p>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white font-medium">
                      {project.scope}
                    </p>
                  </div>
                )}

                {/* Project Type */}
                {project.projectType && (
                  <div>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white uppercase font-medium tracking-tight mb-2">
                      Project Type
                    </p>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white font-medium">
                      {project.projectType}
                    </p>
                  </div>
                )}

                {/* Deliverables */}
                {project.deliverables && project.deliverables.length > 0 && (
                  <div>
                    <p className="text-[16px] md:text-[16px] lg:text-[18px] text-white uppercase font-medium tracking-tight mb-3">
                      Deliverables
                    </p>
                    <ul className="space-y-2">
                      {project.deliverables.map((deliverable, index) => (
                        <li key={index} className="text-[16px] md:text-[16px] lg:text-[18px] text-white font-medium flex items-start leading-tight">

                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Images Section - 1 Column */}
        <motion.div
          className="px-3 md:px-5 lg:px-8 py-8 md:py-12 space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {project.images && project.images.length > 0 ? (
            project.images.map((imageUrl, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) imageRefs.current[index] = el
                }}
                className="relative w-full aspect-video overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={visibleImages.has(index)
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.98 }
                }
                transition={{
                  duration: 0.7,
                  delay: visibleImages.has(index) ? index * 0.1 : 0,
                  ease: [0.23, 1, 0.320, 1],
                }}
              >
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  onLoadingComplete={() => handleImageLoad(index)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 85vw"
                />
              </motion.div>
            ))
          ) : (
            <div className="text-white text-center py-8">No images available</div>
          )}
        </motion.div>

        {/* Bottom Padding */}
        <div className="h-12 md:h-16" />
      </motion.div>
    </AnimatePresence>
  )
}
