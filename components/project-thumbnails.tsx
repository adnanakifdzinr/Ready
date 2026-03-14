"use client"

import Link from "next/link"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ProjectOverlay } from "./project-overlay"
import { projectsData } from "@/lib/projects-data"

interface Project {
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
  images?: string[]
}

const projects: Project[] = projectsData.map(project => ({
  ...project,
  bgColor: "bg-[#e72224]",
  textColor: "text-white",
}))

export function ProjectThumbnails() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(4)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const projectId = entry.target.getAttribute("data-project-id")
        if (projectId) {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, projectId]))
          } else {
            // Remove from visible cards when scrolling away
            setVisibleCards((prev) => {
              const newSet = new Set(prev)
              newSet.delete(projectId)
              return newSet
            })
          }
        }
      })
    }, observerOptions)

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0E0E0E] text-secondary">
      <style>{`
        .project-card {
          opacity: 1;
          transform: translateY(0px);
          will-change: transform, opacity;
        }
      `}</style>

      {/* Section Title */}
      <div className="px-3 md:px-5 lg:px-8 py-8 md:py-12 lg:py-16">
        <h2 className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-medium leading-tight tracking-tight text-white">
          Selected Work
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="px-3 md:px-5 lg:px-8 pb-8 md:pb-12 lg:pb-16">
        {/* Unified grid: 1 col on mobile, 2 cols on tablet and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.slice(0, displayedCount).map((project, index) => {
            const isVisible = visibleCards.has(project.id)

            return (
              <motion.div
                key={project.id}
                className="bg-transparent flex flex-col"
                ref={(el) => { if (el) cardRefs.current[project.id] = el }}
                data-project-id={project.id}
                initial={{
                  opacity: 0,
                  y: 60
                }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  type: "spring",
                  bounce: 0.4
                }}
              >
                <button
                  onClick={() => {
                    setSelectedProject(project)
                    setIsOverlayOpen(true)
                  }}
                  className="w-full flex-1 flex flex-col text-left"
                >
                  <div
                    className={`project-card cursor-pointer w-full flex flex-col h-full ${isVisible ? "in-view" : ""}`}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Image Container */}
                    <motion.div
                      className="relative w-full aspect-square overflow-hidden bg-gray-200"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <Image
                        src={project.image || "/placeholder.jpg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500"
                        priority={index === 0}
                      />
                    </motion.div>

                    {/* Title Section */}
                    <div className="bg-transparent text-white pt-4 w-full flex flex-col text-left">
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-medium leading-tight tracking-tight uppercase mb-1">
                        {project.title}
                      </h3>
                      {/* Description/Category */}
                      <p className="text-sm md:text-base font-medium tracking-tight text-white/90">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* See More Button */}
        {displayedCount < projects.length && (
          <motion.div
            className="flex justify-center mt-12 md:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <button
              onClick={() => setDisplayedCount(prev => prev + 4)}
              className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-medium text-base md:text-lg rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              See More
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Overlay */}
      <ProjectOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        project={selectedProject}
      />
    </section>
  )
}
