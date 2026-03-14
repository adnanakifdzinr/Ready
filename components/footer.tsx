"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

// Reversed direction for alternating animations
const itemVariantsReverse = {
  hidden: { opacity: 0, y: -20, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const svgVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.2,
    },
  },
  hover: {
    scale: 0.92,
    opacity: 0.9,
    filter: "blur(3px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export function Footer() {

  return (
    <footer className="bg-[#f9f9f9]">
      {/* Animated SVG Bottom Section */}
      <div className="w-full pt-3 md:pt-4 px-3 md:px-4 lg:px-5 overflow-hidden">
        <motion.svg
          viewBox="0 0 1739.38 371.37"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={svgVariants}
        >
          <path d="M3.01,5.66h84.41v284.2h166.33v75.42H3.01V5.66Z" fill="black" />
          <path d="M328.98,340.81c-26.71-15.92-46.89-37.47-60.56-64.67-13.68-27.18-20.51-57.5-20.51-90.97s6.83-63.78,20.51-90.97c13.67-27.18,33.86-48.74,60.56-64.66,26.7-15.92,58.55-23.89,95.55-23.89s68.84,7.96,95.55,23.89c26.7,15.92,46.89,37.48,60.56,64.66,13.67,27.19,20.51,57.51,20.51,90.97s-6.84,63.78-20.51,90.97c-13.68,27.19-33.86,48.74-60.56,64.67-26.71,15.92-58.56,23.89-95.55,23.89s-68.85-7.96-95.55-23.89ZM355.52,262.63c15.12,20.11,38.12,30.16,69.01,30.16s53.88-10.05,69.01-30.16c15.12-20.1,22.68-45.92,22.68-77.45s-7.56-57.34-22.68-77.45c-15.13-20.1-38.12-30.16-69.01-30.16s-53.89,10.06-69.01,30.16c-15.13,20.11-22.68,45.93-22.68,77.45s7.56,57.35,22.68,77.45Z" fill="black" />
          <path d="M611.69,297.85l185.81-218.27-90.91,1.5h-88.91V5.66h290.2v64.93l-188.8,220.77,94.4-1.5h96.9v75.42h-298.69v-67.43Z" fill="black" />
          <path d="M950.68,5.66h84.41v359.63h-84.41V5.66Z" fill="black" />
          <path d="M1162.67,124.04v241.25h-80.92V5.66h91.41l142.85,242.25V5.66h80.92v359.63h-91.41l-142.85-241.25Z" fill="black" />
          <path d="M1424.53,5.66h169.03c43.33,0,75.84,9.84,97.52,29.5,21.67,19.67,32.5,45.84,32.5,78.51,0,18.34-4.84,34.93-14.5,49.76-9.67,14.84-51.78,36.22-78.67,31.23,15,7.34,46,5.61,71.92,35.53,9.08,10.49,12.42,25.68,14.75,42.01l14,93.51h-86.51l-12-81.01c-2.67-18-8.34-31.25-17-39.76-8.67-8.5-21.34-12.75-38.01-12.75h-68.51v133.52h-84.51V5.66ZM1578.55,167.68c19.33,0,33.83-3.83,43.51-11.5,9.67-7.67,14.5-19.5,14.5-35.51s-4.84-27.83-14.5-35.51c-9.67-7.67-24.18-11.5-43.51-11.5h-69.51v94.01h69.51Z" fill="black" />
        </motion.svg>
      </div>
    </footer>
  )
}
