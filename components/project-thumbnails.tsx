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
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const projectId = entry.target.getAttribute("data-project-id")
        if (projectId && entry.isIntersecting) {
          // Update selected project when thumbnail comes into view
          const project = projects.find(p => p.id === projectId)
          if (project) {
            setSelectedProject(project)
          }
          setVisibleCards((prev) => new Set([...prev, projectId]))
        }
      })
    }, observerOptions)

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#000000] text-secondary">
      <style>{`
        .project-card {
          opacity: 1;
          transform: translateY(0px);
          will-change: transform, opacity;
        }
      `}</style>

      {/* Split Screen Layout - Desktop Only, Mobile Fallback */}
      <div className="w-full min-h-screen flex flex-col">
        {/* Mobile: Vertical Stack Layout */}
        <div className="lg:hidden flex flex-col min-h-screen px-3 md:px-5 py-8 md:py-12">
          <div className="flex flex-col gap-4">
            {projects.map((project, index) => {
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
                          sizes="100vw"
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

        {/* Desktop: Split Screen Layout */}
        <div className="hidden lg:flex gap-0 w-full min-h-screen">
          {/* Left Panel - 40% - Fixed */}
          <div className="w-2/5 fixed left-0 top-0 h-screen flex flex-col px-8 py-16 bg-black z-10">
            {/* Top - Our Work Title */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl font-light text-white leading-tight mb-8"
            >
              Our work
            </motion.h2>

            {/* Project Name - Center Area */}
            {selectedProject && (
              <>
                <motion.h3
                  key={`${selectedProject.id}-title`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="text-7xl font-light text-white/60 leading-tight"
                >
                  {selectedProject.title}
                </motion.h3>

                {/* Middle Spacer */}
                <div className="flex-1" />

                {/* Bottom - Description */}
                {selectedProject.description && (
                  <motion.div
                    key={`${selectedProject.id}-desc`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="pb-12"
                  >
                    <p className="text-base text-white/70 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Right Panel - 60% - Scrollable Thumbnails */}
          <div className="w-3/5 ml-auto">
            <div className="flex flex-col gap-4 px-8 py-16 min-h-screen overflow-y-auto">
              {projects.map((project, index) => {
                const isVisible = visibleCards.has(project.id)
                const isSelected = selectedProject?.id === project.id

                return (
                  <motion.div
                    key={project.id}
                    ref={(el) => { if (el) cardRefs.current[project.id] = el }}
                    data-project-id={project.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    className={`group cursor-pointer flex flex-col gap-3 pb-4 border-b border-white/10 transition-all duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => {
                      setSelectedProject(project)
                      setIsOverlayOpen(true)
                    }}
                  >
                    {/* Thumbnail Image */}
                    <motion.div
                      className="relative w-full aspect-video overflow-hidden bg-gray-700 rounded"
                      initial={{ scale: 0.95 }}
                      animate={isSelected ? { scale: 1 } : { scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <Image
                        src={project.image || "/placeholder.jpg"}
                        alt={project.title}
                        fill
                        sizes="60vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-white" />
                      )}
                    </motion.div>

                    {/* Thumbnail Info */}
                    <div className="flex flex-col gap-1">
                      <h4 className={`font-medium uppercase tracking-tight transition-colors duration-300 ${
                        isSelected ? 'text-white text-lg' : 'text-white/80 text-base'
                      }`}>
                        {project.title}
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${
                        isSelected ? 'text-white/90' : 'text-white/60'
                      }`}>
                        {project.category}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            </div>
          </div>
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
