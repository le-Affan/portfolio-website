'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PixelMenu } from '@/components/pixel-menu'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { StatsSection } from '@/components/sections/stats-section'
import { PlainPortfolio } from '@/components/plain-portfolio'
import { ModernPortfolio } from '@/components/modern-portfolio'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'pixel' | 'modern'>('pixel')
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    setIsLoading(false)
    
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

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />
      case 'projects':
        return <ProjectsSection />
      case 'experience':
        return <ExperienceSection />
      case 'stats':
        return <StatsSection />
      default:
        return null
    }
  }

  if (viewMode === 'modern') {
    return <ModernPortfolio onSwitchView={() => setViewMode('pixel')} />
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Game background overlay */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0"></div>

      {/* Clock - Top Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 z-0 text-xs font-bold text-pixel-cyan"
        style={{ textShadow: '0 0 8px rgba(74, 154, 255, 0.4)' }}
      >
        {currentTime}
      </motion.div>

      {/* View Toggle Button - Fixed */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setViewMode('modern')}
        className="fixed top-4 right-4 z-20 px-3 py-2 border-2 border-pixel-cyan bg-pixel-purple hover:bg-pixel-pink text-monitor-text text-xs font-bold transition-colors cursor-pointer"
        style={{ boxShadow: '0 0 12px rgba(74, 154, 255, 0.4)' }}
      >
        CLEAN VIEW
      </motion.button>

      {/* Title Section - Background Layer */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-0 text-center pointer-events-none"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-pixel-cyan mb-2" style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.8), 0 0 16px rgba(74,154,255,0.5)' }}>
          LEARN BY
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-pixel-pink" style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.8), 0 0 16px rgba(74,154,255,0.5)' }}>
          BUILDING
        </h1>
        <p className="text-sm md:text-lg mt-4 text-pixel-yellow" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
          Select your quest below
        </p>
      </motion.div>

      {/* Footer with Name - Background Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-0 text-xs font-bold text-pixel-pink pointer-events-none"
        style={{ textShadow: '0 0 8px rgba(216, 74, 106, 0.4)' }}
      >
        Affan Shaikh
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen gap-8">
        {/* Content Display Area - Popup Window */}
        {!isLoading && activeSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="border-4 border-pixel-purple bg-card p-6" style={{ boxShadow: '0 0 30px rgba(216,74,106,0.3)' }}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-pixel-yellow" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
                  ◆ {activeSection.toUpperCase()} ◆
                </h2>
                <button
                  onClick={() => setActiveSection(null)}
                  className="text-pixel-pink hover:text-pixel-cyan transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              {renderContent()}
            </div>
          </motion.div>
        )}

        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-10"
        >
          <PixelMenu onSelectMenu={setActiveSection} />
        </motion.div>
      </div>
    </div>
  )
}
