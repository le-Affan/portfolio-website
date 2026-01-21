'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { StatsSection } from '@/components/sections/stats-section'

interface PlainPortfolioProps {
  onSwitchView: () => void
}

export function PlainPortfolio({ onSwitchView }: PlainPortfolioProps) {
  const [activeTab, setActiveTab] = useState('about')
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const day = dayNames[now.getDay()]
      const date = now.getDate()
      const month = monthNames[now.getMonth()]
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
      
      setCurrentTime(`${day} ${month} ${date} ${hours}:${minutes} ${ampm}`)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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
    <div style={{ backgroundColor: '#fafafa', color: '#1a1a1a' }} className="min-h-screen">
      {/* Clock - Top Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 left-6 z-30 text-xs font-light tracking-wider"
        style={{ color: '#666' }}
      >
        {currentTime}
      </motion.div>

      {/* Fixed View Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onSwitchView}
        className="fixed top-6 right-6 z-30 px-5 py-2 text-sm font-medium transition-all rounded hover:bg-gray-200"
        style={{ backgroundColor: '#efefef', color: '#1a1a1a' }}
      >
        Pixel View
      </motion.button>

      {/* Header */}
      <div style={{ paddingTop: '80px' }} className="border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6 py-12 text-center"
        >
          <h1 style={{ fontSize: '52px', letterSpacing: '-1px', marginBottom: '12px' }} className="font-light">
            Learn By Building
          </h1>
          <p style={{ color: '#888', fontSize: '18px', fontWeight: 300 }}>
            Designer & Developer
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 sticky top-0 z-20" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-3xl mx-auto px-6 py-0">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="py-4 text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === tab.id ? '#1a1a1a' : '#999',
                  borderBottom: activeTab === tab.id ? '2px solid #1a1a1a' : 'none',
                  paddingBottom: activeTab === tab.id ? '12px' : '16px',
                }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabComponents[activeTab]}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-20">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p style={{ color: '#999', fontSize: '13px', fontWeight: 300 }}>
            Affan Shaikh
          </p>
        </div>
      </div>
    </div>
  )
}
