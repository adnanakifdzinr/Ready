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
  const [displayedCount, setDisplayedCount] = useState(4)
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

      {/* Section Title */}
      <div className="px-3 md:px-5 lg:px-8 py-8 md:py-12 lg:py-16">
        <h2 className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-medium leading-tight tracking-tight text-white">
          Selected Work
        </h2>
      </div>

      {/* Split Screen Layout - Desktop Only, Mobile Fallback */}
      <div className="px-3 md:px-5 lg:px-8 pb-8 md:pb-12 lg:pb-16">
        {/* Mobile: Vertical Stack Layout */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-4">
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
        <div className="hidden lg:flex gap-8">
          {/* Left Panel - 40% - Sticky Info */}
          <div className="w-2/5 sticky top-20 h-fit flex flex-col">
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col"
              >
                {/* Selected Image */}
                <motion.div
                  className="relative w-full aspect-video overflow-hidden bg-gray-700 rounded-lg mb-8"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Image
                    src={selectedProject.image || "/placeholder.jpg"}
                    alt={selectedProject.title}
                    fill
                    sizes="40vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Info Section */}
                <motion.div
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div>
                    <h3 className="text-3xl font-medium text-white uppercase leading-tight mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-lg text-white/80 font-medium">
                      {selectedProject.category}
                    </p>
                  </div>

                  {selectedProject.client && (
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Client</p>
                      <p className="text-base text-white font-medium">{selectedProject.client}</p>
                    </div>
                  )}

                  {selectedProject.industry && (
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-base text-white font-medium">{selectedProject.industry}</p>
                    </div>
                  )}

                  {selectedProject.year && (
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Year</p>
                      <p className="text-base text-white font-medium">{selectedProject.year}</p>
                    </div>
                  )}

                  {selectedProject.role && (
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Role</p>
                      <p className="text-base text-white font-medium">{selectedProject.role}</p>
                    </div>
                  )}

                  {selectedProject.description && (
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider mb-2">About</p>
                      <p className="text-base text-white/90 leading-relaxed">{selectedProject.description}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setIsOverlayOpen(true)}
                    className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors duration-300 w-fit"
                  >
                    View Project
                  </button>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - 60% - Scrollable Thumbnails */}
          <div className="w-3/5">
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-4">
              {projects.slice(0, displayedCount).map((project, index) => {
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
                      setIsOverlayOpen(false)
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

            {/* See More Button */}
            {displayedCount < projects.length && (
              <motion.div
                className="flex justify-center mt-8 pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <button
                  onClick={() => setDisplayedCount(prev => prev + 4)}
                  className="px-6 py-2 bg-white/10 text-white font-medium text-sm rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  Load More
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile: See More Button */}
        {displayedCount < projects.length && (
          <motion.div
            className="flex justify-center mt-12 md:mt-16 lg:hidden"
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
