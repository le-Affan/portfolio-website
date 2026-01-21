'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { StatsSection } from '@/components/sections/stats-section'

interface ModernPortfolioProps {
  onSwitchView: () => void
}

export function ModernPortfolio({ onSwitchView }: ModernPortfolioProps) {
  const [activeTab, setActiveTab] = useState('about')

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'stats', label: 'Stats' },
  ]

  const tabComponents: Record<string, React.ReactNode> = {
    about: <AboutSection />,
    projects: <ProjectsSection />,
    experience: <ExperienceSection />,
    stats: <StatsSection />,
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700"
      >
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <motion.button
            onClick={onSwitchView}
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
          >
            ← Pixel View
          </motion.button>
          
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                className="text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === tab.id ? '#e2e8f0' : '#94a3b8',
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="w-24" />
        </div>
      </motion.nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="border-b border-slate-700"
      >
        <div className="max-w-6xl mx-auto px-8 py-24 text-center">
          <h1 className="text-6xl font-light tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Affan Shaikh
          </h1>
          <p className="text-lg text-slate-400 font-light">
            Designer & Developer
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabComponents[activeTab]}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-6xl mx-auto px-8 py-12 text-center">
          <p className="text-sm text-slate-500">
            © 2024 Affan Shaikh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
