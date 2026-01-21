'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Experience {
  company: string
  role: string
  duration: string
  achievements: string[]
}

const experiences: Experience[] = [
  {
    company: 'Makeflow',
    role: 'ML Engineer Intern',
    duration: 'Dec 2025 - Present',
    achievements: ['Designed and implemented an adaptive persuasion system for donation-oriented conversational AI using multi-turn dialogue control', 
      'Implemented modular persuasion strategies with dynamic escalation and trust-recovery behavior across individual dialogues.', 
      'Integrated the persuasion controller with a LLaMA-3.1–based language model, enforcing controlled response generation through system-level logic.'],
  },
  {
    company: 'KIAAR',
    role: 'ML & GIS Intern',
    duration: 'Sep. 2025 - Present',
    achievements: ['Designed an automated GIS pipeline to generate soil salinity maps over 2.5+ sq. km using multispectral satellite imagery', 
      'Extracted spectral features and validated predictions against field-measured EC and SAR ground truth.', 
      'Produced geospatial outputs adopted by researchers for soil assessment and reporting.'],
  },
  {
    company: 'KJSCE Insignia',
    role: 'Creative Head',
    duration: 'June 2024 - June 2025',
    achievements: ['Led and scaled a creative team of 50+ members, managing the design and execution of 20+ large-scale installations for college-wide events.', 
      'Managed an annual operating budget, optimizing material procurement and delivering all projects on time.'],
  },
  {
    company: 'KJSCE Insignia',
    role: 'Joint Creative Head ',
    duration: 'Oct 2023 - June 2024',
    achievements: ['Co-led a design division of 50+ members, assisting in planning and project execution for all college-wide events.', 
      'Directly managed the execution of 10+ major installations, earning a promotion to Creative Head.'],
  },
]

export function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  return (
    <>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {experiences.map((exp, idx) => (
          <motion.button
            key={idx}
            onClick={() => setSelectedExperience(exp)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left border-2 border-pixel-yellow p-3 bg-pixel-purple/10 hover:bg-pixel-purple/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-pixel-yellow">►</span>
              <h3 className="text-xs font-bold text-pixel-yellow">{exp.company}</h3>
            </div>
            <p className="text-xs text-pixel-pink ml-3">{exp.role}</p>
          </motion.button>
        ))}
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-2xl border-4 border-pixel-purple bg-card p-6"
              style={{ boxShadow: '0 0 30px rgba(216,74,106,0.3)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-pixel-yellow mb-1" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
                    {selectedExperience.company}
                  </h2>
                  <p className="text-xs text-pixel-pink mb-1">{selectedExperience.role}</p>
                  <p className="text-xs text-monitor-text/80">{selectedExperience.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-pixel-pink hover:text-pixel-cyan transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Achievements Section */}
              <div className="border-2 border-pixel-cyan p-3">
                <h3 className="text-xs font-bold text-pixel-cyan mb-2">ACHIEVEMENTS</h3>
                <div className="space-y-1">
                  {selectedExperience.achievements.map((achievement, idx) => (
                    <p key={idx} className="text-xs text-monitor-text">
                      ◆ {achievement}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
