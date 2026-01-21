'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Stat {
  label: string
  value: number
  color: string
  unit: string
}

interface Achievement {
  title: string
  icon: string
  description: string
}

const stats: Stat[] = [
  { label: 'Projects Completed', value: 45, color: 'pixel-cyan', unit: '' },
  { label: 'Lines of Code', value: 125000, color: 'pixel-pink', unit: '+' },
  { label: 'Years Experience', value: 5, color: 'pixel-yellow', unit: '' },
  { label: 'Team Members Led', value: 12, color: 'pixel-green', unit: '' },
]

const achievements: Achievement[] = [
  { title: 'First Deploy', icon: '🚀', description: 'Deployed first production app' },
  { title: 'Speedrunner', icon: '⚡', description: 'Completed 10 projects in 30 days' },
  { title: 'Bug Slayer', icon: '🐛', description: 'Fixed 100 critical bugs' },
  { title: 'Team Lead', icon: '👑', description: 'Led team of 10+ developers' },
  { title: 'Code Master', icon: '💎', description: '1M+ lines of code written' },
  { title: 'Problem Solver', icon: '🧠', description: 'Solved 500+ technical challenges' },
]

export function StatsSection() {
  const [displayedValues, setDisplayedValues] = useState<Record<string, number>>({})

  useEffect(() => {
    stats.forEach((stat) => {
      const interval = setInterval(() => {
        setDisplayedValues((prev) => {
          const current = prev[stat.label] || 0
          if (current < stat.value) {
            return {
              ...prev,
              [stat.label]: Math.min(current + Math.ceil(stat.value / 20), stat.value),
            }
          }
          return prev
        })
      }, 50)

      return () => clearInterval(interval)
    })
  }, [])

  return (
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="border-2 border-pixel-cyan p-3 bg-pixel-purple/20"
            style={{ borderColor: `var(--${stat.color})` }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: `var(--${stat.color})` }}>{stat.label}</p>
            <p className="text-sm font-bold text-monitor-text">
              {stat.unit}{displayedValues[stat.label] || 0}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="border-t-2 border-pixel-purple pt-3">
        <p className="text-xs font-bold text-pixel-yellow mb-2" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>ACHIEVEMENTS</p>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="border-2 border-pixel-pink p-2 bg-pixel-purple/20 text-center hover:bg-pixel-pink/20 transition-colors"
            >
              <p className="text-2xl mb-1">{achievement.icon}</p>
              <p className="text-xs font-bold text-pixel-cyan mb-1">{achievement.title}</p>
              <p className="text-xs text-monitor-text/80 leading-tight">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
