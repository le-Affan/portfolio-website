'use client'

import { motion } from 'framer-motion'

interface Contribution {
  date: string
  count: number
}

interface ContributionGraphProps {
  contributions: Contribution[]
  className?: string
}

export function ContributionGraph({ contributions, className = '' }: ContributionGraphProps) {
  if (!contributions || contributions.length === 0) {
    return (
      <div className={`${className} text-center py-4`}>
        <p className="text-xs text-monitor-text/60">No contribution data available</p>
      </div>
    )
  }

  // Get last 365 days of contributions
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364)

  // Create a map for quick lookup
  const contributionMap = new Map<string, number>()
  contributions.forEach((contrib) => {
    contributionMap.set(contrib.date, contrib.count)
  })

  // Generate grid of days
  const weeks: Array<Array<{ date: Date; count: number }>> = []
  let currentDate = new Date(startDate)
  let currentWeek: Array<{ date: Date; count: number }> = []

  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const count = contributionMap.get(dateStr) || 0

    currentWeek.push({
      date: new Date(currentDate),
      count,
    })

    // Start new week on Sunday
    if (currentDate.getDay() === 6 || currentDate.getTime() === today.getTime()) {
      weeks.push([...currentWeek])
      currentWeek = []
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  // Get max count for color intensity
  const maxCount = Math.max(...contributions.map(c => c.count), 1)

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-800 border border-slate-700'
    const intensity = Math.min(count / maxCount, 1)
    if (intensity < 0.25) return 'bg-green-900 border border-green-800'
    if (intensity < 0.5) return 'bg-green-700 border border-green-600'
    if (intensity < 0.75) return 'bg-green-500 border border-green-400'
    return 'bg-green-400 border border-green-300'
  }

  return (
    <div className={`${className}`}>
      <div className="flex gap-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((day, dayIdx) => {
              const isToday = day.date.toDateString() === today.toDateString()
              return (
                <motion.div
                  key={`${weekIdx}-${dayIdx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIdx * 7 + dayIdx) * 0.001 }}
                  className={`w-3 h-3 ${getColor(day.count)} ${isToday ? 'ring-2 ring-pixel-cyan' : ''}`}
                  title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-monitor-text/60">
        <span>Less</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 bg-slate-800 border border-slate-700" />
          <div className="w-3 h-3 bg-green-900 border border-green-800" />
          <div className="w-3 h-3 bg-green-700 border border-green-600" />
          <div className="w-3 h-3 bg-green-500 border border-green-400" />
          <div className="w-3 h-3 bg-green-400 border border-green-300" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
