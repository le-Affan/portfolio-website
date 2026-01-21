'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ContributionGraph } from '@/components/contribution-graph'

interface Achievement {
  title: string
  icon: string
  description: string
  details: string[]
}

interface GitHubData {
  username: string
  name: string
  bio: string
  avatar: string
  profileUrl: string
  publicRepos: number
  followers: number
  following: number
  totalContributions: number
  contributionsThisYear: number
  longestStreak: number
  currentStreak: number
  contributionGraph: Array<{ date: string; count: number }>
  repos: number
}

interface LeetCodeData {
  username: string
  name: string
  avatar: string | null
  problemsSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
  submissionCalendar: Array<{ date: string; count: number }>
  profileUrl: string
}

const achievements: Achievement[] = [
  {
    title: 'ISRO',
    icon: '🚀',
    description: '',
    details: [
      'Selected as Research Intern for ISRO Telemetry Tracking and Command Network department',
      'Could not work on the project due to college mid-semester schedule clash',
    ],
  },
  {
    title: 'SIH 2025',
    icon: '💻',
    description: '',
    details: [
      'Developed CivicLens, a civic issue reporting and tracking system',
      'Selected to represent KJSCE in SIH 2025 from a pool of 200+ teams',
    ],
  },
]

export function StatsSection() {
  const [activeTab, setActiveTab] = useState<'github' | 'leetcode' | 'achievements'>('github')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeData | null>(null)
  const [loading, setLoading] = useState({ github: true, leetcode: true })
  const [displayedValues, setDisplayedValues] = useState<Record<string, number>>({})

  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(prev => ({ ...prev, github: true }))
        const response = await fetch('/api/github')
        if (response.ok) {
          const data = await response.json()
          setGithubData(data)
          // Animate values
          setDisplayedValues(prev => ({
            ...prev,
            githubRepos: 0,
            githubFollowers: 0,
            githubContributions: 0,
          }))
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      } finally {
        setLoading(prev => ({ ...prev, github: false }))
      }
    }

    if (activeTab === 'github') {
      fetchGitHubData()
    }
  }, [activeTab])

  // Fetch LeetCode data
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(prev => ({ ...prev, leetcode: true }))
        const response = await fetch('/api/leetcode')
        if (response.ok) {
          const data = await response.json()
          setLeetcodeData(data)
          // Animate values
          setDisplayedValues(prev => ({
            ...prev,
            leetcodeProblems: 0,
          }))
        }
      } catch (error) {
        console.error('Error fetching LeetCode data:', error)
      } finally {
        setLoading(prev => ({ ...prev, leetcode: false }))
      }
    }

    if (activeTab === 'leetcode') {
      fetchLeetCodeData()
    }
  }, [activeTab])

  // Animate displayed values
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedValues((prev) => {
        const updates: Record<string, number> = { ...prev }
        
        if (githubData) {
          if ((updates.githubRepos || 0) < githubData.publicRepos) {
            updates.githubRepos = Math.min((updates.githubRepos || 0) + Math.ceil(githubData.publicRepos / 20), githubData.publicRepos)
          }
          if ((updates.githubFollowers || 0) < githubData.followers) {
            updates.githubFollowers = Math.min((updates.githubFollowers || 0) + Math.ceil(githubData.followers / 20), githubData.followers)
          }
          if ((updates.githubContributions || 0) < githubData.totalContributions) {
            updates.githubContributions = Math.min((updates.githubContributions || 0) + Math.ceil(githubData.totalContributions / 50), githubData.totalContributions)
          }
        }
        
        if (leetcodeData) {
          if ((updates.leetcodeProblems || 0) < leetcodeData.problemsSolved) {
            updates.leetcodeProblems = Math.min((updates.leetcodeProblems || 0) + Math.ceil(leetcodeData.problemsSolved / 20), leetcodeData.problemsSolved)
          }
        }
        
        return updates
      })
    }, 50)

    return () => clearInterval(interval)
  }, [githubData, leetcodeData])

  const renderGitHubStats = () => {
    if (loading.github) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-pixel-cyan">Loading GitHub stats...</p>
        </div>
      )
    }

    if (!githubData) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-pixel-pink">Failed to load GitHub stats</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {/* Username */}
        <div className="border-2 border-pixel-cyan p-3 text-center">
          <h3 className="text-xs font-bold text-pixel-cyan mb-1">{githubData.username}</h3>
          {githubData.name && (
            <p className="text-xs text-monitor-text/80">{githubData.name}</p>
          )}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-cyan p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-cyan mb-1">Repositories</p>
            <p className="text-sm font-bold text-monitor-text">
              {displayedValues.githubRepos || githubData.publicRepos}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-pink p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-yellow mb-1">Contributions This Year</p>
            <p className="text-sm font-bold text-monitor-text">
              {displayedValues.githubContributions || githubData.totalContributions}
            </p>
          </motion.div>
        </div>

        {/* Contribution Calendar */}
        <div className="border-2 border-pixel-yellow p-3">
          <h3 className="text-xs font-bold text-pixel-yellow mb-2">CONTRIBUTION CALENDAR</h3>
          <div className="overflow-x-auto">
            {githubData.contributionGraph && githubData.contributionGraph.length > 0 ? (
              <ContributionGraph contributions={githubData.contributionGraph} />
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-monitor-text/60">Loading contribution calendar...</p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Link */}
        <a
          href={githubData.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="pixel-button w-full flex items-center justify-center gap-2 px-4 py-2 text-xs"
        >
          <span>💻</span>
          <span>View GitHub Profile</span>
        </a>
      </div>
    )
  }

  const renderLeetCodeStats = () => {
    if (loading.leetcode) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-pixel-cyan">Loading LeetCode stats...</p>
        </div>
      )
    }

    if (!leetcodeData) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-pixel-pink">Failed to load LeetCode stats</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {/* Username */}
        <div className="border-2 border-pixel-cyan p-3 text-center">
          <h3 className="text-xs font-bold text-pixel-cyan mb-1">{leetcodeData.username}</h3>
          {leetcodeData.name && leetcodeData.name !== leetcodeData.username && (
            <p className="text-xs text-monitor-text/80">{leetcodeData.name}</p>
          )}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-cyan p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-cyan mb-1">Problems Solved</p>
            <p className="text-sm font-bold text-monitor-text">
              {displayedValues.leetcodeProblems || leetcodeData.problemsSolved}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-pink p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-pink mb-1">Acceptance Rate</p>
            <p className="text-sm font-bold text-monitor-text">
              {leetcodeData.acceptanceRate}%
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-yellow p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-yellow mb-1">Ranking</p>
            <p className="text-sm font-bold text-monitor-text">
              {leetcodeData.ranking > 0 ? `#${leetcodeData.ranking.toLocaleString()}` : 'N/A'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-pixel-green p-3 bg-pixel-purple/20"
          >
            <p className="text-xs font-bold text-pixel-green mb-1">Total Solved</p>
            <p className="text-sm font-bold text-monitor-text">
              {leetcodeData.easySolved + leetcodeData.mediumSolved + leetcodeData.hardSolved}
            </p>
          </motion.div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="border-2 border-pixel-purple p-3">
          <h3 className="text-xs font-bold text-pixel-purple mb-2">DIFFICULTY BREAKDOWN</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-pixel-green">Easy</span>
              <span className="text-xs text-monitor-text">{leetcodeData.easySolved}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-pixel-yellow">Medium</span>
              <span className="text-xs text-monitor-text">{leetcodeData.mediumSolved}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-pixel-pink">Hard</span>
              <span className="text-xs text-monitor-text">{leetcodeData.hardSolved}</span>
            </div>
          </div>
        </div>

        {/* Submission Calendar Graph */}
        {leetcodeData.submissionCalendar && leetcodeData.submissionCalendar.length > 0 && (
          <div className="border-2 border-pixel-yellow p-3">
            <h3 className="text-xs font-bold text-pixel-yellow mb-2">SUBMISSION CALENDAR</h3>
            <div className="overflow-x-auto">
              <ContributionGraph contributions={leetcodeData.submissionCalendar} />
            </div>
          </div>
        )}

        {/* Profile Link */}
        <a
          href={leetcodeData.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="pixel-button w-full flex items-center justify-center gap-2 px-4 py-2 text-xs"
        >
          <span>⚡</span>
          <span>View LeetCode Profile</span>
        </a>
      </div>
    )
  }

  const renderAchievements = () => (
    <>
      <div className="grid grid-cols-3 gap-2">
        {achievements.map((achievement, idx) => (
          <motion.button
            key={achievement.title}
            onClick={() => setSelectedAchievement(achievement)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="border-2 border-pixel-pink p-2 bg-pixel-purple/20 text-center hover:bg-pixel-pink/20 transition-colors cursor-pointer"
          >
            <p className="text-2xl mb-1">{achievement.icon}</p>
            <p className="text-xs font-bold text-pixel-cyan mb-1">{achievement.title}</p>
            <p className="text-xs text-monitor-text/80 leading-tight">{achievement.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
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
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedAchievement.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-pixel-yellow mb-1" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
                      {selectedAchievement.title}
                    </h2>
                    <p className="text-xs text-pixel-pink">{selectedAchievement.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="text-pixel-pink hover:text-pixel-cyan transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Details Section */}
              <div className="border-2 border-pixel-cyan p-3">
                <h3 className="text-xs font-bold text-pixel-cyan mb-2">DETAILS</h3>
                <div className="space-y-1">
                  {selectedAchievement.details.map((detail, idx) => (
                    <p key={idx} className="text-xs text-monitor-text">
                      ◆ {detail}
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

  return (
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {/* Tab Toggle */}
      <div className="flex gap-2 mb-3 border-b-2 border-pixel-purple pb-2">
        {(['github', 'leetcode', 'achievements'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 text-xs font-bold transition-colors border-2 ${
              activeTab === tab
                ? 'border-pixel-cyan bg-pixel-purple text-pixel-cyan'
                : 'border-pixel-purple bg-pixel-purple/20 text-monitor-text/60 hover:bg-pixel-purple/30'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'github' && renderGitHubStats()}
          {activeTab === 'leetcode' && renderLeetCodeStats()}
          {activeTab === 'achievements' && renderAchievements()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
