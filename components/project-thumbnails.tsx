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
          {projects.map((project, index) => {
            const isVisible = visibleCards.has(project.id)
            const slideFromLeft = index % 2 === 0
            const slideFromTop = Math.floor(index / 2) % 2 === 0

            return (
              <motion.div
                key={project.id}
                className="bg-transparent flex flex-col"
                ref={(el) => { if (el) cardRefs.current[project.id] = el }}
                data-project-id={project.id}
                initial={{
                  opacity: 0,
                  x: slideFromLeft ? -80 : 80,
                  y: slideFromTop ? -80 : 80
                }}
                animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: slideFromLeft ? -80 : 80, y: slideFromTop ? -80 : 80 }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
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
