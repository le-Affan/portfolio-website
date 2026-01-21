import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'le-Affan'

export async function GET() {
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data')
    }

    const userData = await userResponse.json()

    // Fetch contribution graph data
    // Using GitHub's contribution calendar API (via scraping the SVG)
    let contributionData = null
    try {
      const contributionResponse = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      })

      if (contributionResponse.ok) {
        const svgText = await contributionResponse.text()
        // Parse contribution data from SVG
        contributionData = parseContributionsFromSVG(svgText)
      }
    } catch (error) {
      // Silently continue - will use fallback data
    }

    // Fallback: Use events API to estimate contributions if SVG parsing failed
    if (!contributionData) {
      try {
        const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 86400 },
        })

        if (eventsResponse.ok) {
          const events = await eventsResponse.json()
          const contributionMap = new Map<string, number>()
          const currentYear = new Date().getFullYear()
          let totalContribs = 0
          let yearContribs = 0

          events.forEach((event: any) => {
            if (event.type === 'PushEvent' || event.type === 'CreateEvent' || event.type === 'IssuesEvent' || event.type === 'PullRequestEvent') {
              const date = new Date(event.created_at)
              const dateStr = date.toISOString().split('T')[0]
              const current = contributionMap.get(dateStr) || 0
              contributionMap.set(dateStr, current + 1)
              totalContribs++
              if (date.getFullYear() === currentYear) {
                yearContribs++
              }
            }
          })

          if (contributionMap.size > 0) {
            const graph = Array.from(contributionMap.entries()).map(([date, count]) => ({ date, count }))
            contributionData = {
              totalContributions: totalContribs,
              thisYearContributions: yearContribs,
              longestStreak: 0, // Would need full history to calculate
              currentStreak: 0, // Would need full history to calculate
              graph: graph.slice(-365),
            }
          }
        }
      } catch (error) {
        // Continue without contribution data
      }
    }

    // Fetch repositories for additional stats
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    let reposData = []
    if (reposResponse.ok) {
      reposData = await reposResponse.json()
    }

    // Calculate total stars from repos
    const totalStars = reposData.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

    // Calculate total contributions from repos or contribution data
    let totalContributions = contributionData?.totalContributions || 0
    let contributionsThisYear = contributionData?.thisYearContributions || 0
    let longestStreak = contributionData?.longestStreak || 0
    let currentStreak = contributionData?.currentStreak || 0
    let contributionGraph = contributionData?.graph || []

    // If contribution data parsing failed, try to estimate from repos
    if (!contributionData && reposData.length > 0) {
      // Estimate contributions based on repository activity
      // This is a fallback - not as accurate but better than 0
      const estimatedContributions = reposData.reduce((sum, repo) => {
        return sum + (repo.stargazers_count || 0) + (repo.forks_count || 0)
      }, 0)
      
      if (totalContributions === 0) {
        totalContributions = estimatedContributions
      }
    }

    // Ensure we have some graph data even if parsing failed
    // Generate a basic graph structure if needed
    if (contributionGraph.length === 0) {
      // Generate empty graph for last 365 days as fallback
      const today = new Date()
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        contributionGraph.push({
          date: date.toISOString().split('T')[0],
          count: 0,
        })
      }
    }

    const responseData = {
      username: userData.login || GITHUB_USERNAME,
      name: userData.name || null,
      bio: userData.bio || null,
      avatar: userData.avatar_url || null,
      profileUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`,
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      totalStars: totalStars || 0,
      totalContributions: totalContributions || 0,
      contributionsThisYear: contributionsThisYear || 0,
      longestStreak: longestStreak || 0,
      currentStreak: currentStreak || 0,
      contributionGraph: contributionGraph || [],
      repos: reposData.length || 0,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    )
  }
}

function parseContributionsFromSVG(svgText: string) {
  try {
    // Try multiple patterns to extract data from SVG
    // Pattern 1: data-count and data-date attributes
    let rectMatches = svgText.match(/<rect[^>]*data-count="(\d+)"[^>]*data-date="([^"]+)"/g) || []
    
    // Pattern 2: Alternative format with different attribute order
    if (rectMatches.length === 0) {
      rectMatches = svgText.match(/<rect[^>]*data-date="([^"]+)"[^>]*data-count="(\d+)"/g) || []
    }
    
    // Pattern 3: Look for any rect with data attributes
    if (rectMatches.length === 0) {
      const allRects = svgText.match(/<rect[^>]*>/g) || []
      rectMatches = allRects.filter(rect => rect.includes('data-count') && rect.includes('data-date'))
    }
    
    const contributions: Array<{ date: string; count: number }> = []
    let totalContributions = 0
    let thisYearContributions = 0
    const currentYear = new Date().getFullYear()

    rectMatches.forEach((rect) => {
      // Try both patterns
      let countMatch = rect.match(/data-count="(\d+)"/)
      let dateMatch = rect.match(/data-date="([^"]+)"/)
      
      // If first pattern didn't work, try reversed
      if (!countMatch || !dateMatch) {
        countMatch = rect.match(/data-count='(\d+)'/)
        dateMatch = rect.match(/data-date='([^']+)'/)
      }
      
      if (countMatch && dateMatch) {
        const count = parseInt(countMatch[1], 10)
        const date = dateMatch[1]
        totalContributions += count
        
        const dateObj = new Date(date)
        if (!isNaN(dateObj.getTime()) && dateObj.getFullYear() === currentYear) {
          thisYearContributions += count
        }
        
        contributions.push({ date, count })
      }
    })
    
    // If still no data, return null
    if (contributions.length === 0) {
      console.error('No contribution data found in SVG')
      return null
    }

    // Calculate streaks
    const sortedContributions = contributions.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    
    let longestStreak = 0
    let currentStreak = 0
    let tempStreak = 0
    let lastDate: Date | null = null

    sortedContributions.forEach((contrib) => {
      const date = new Date(contrib.date)
      if (contrib.count > 0) {
        if (lastDate) {
          const daysDiff = Math.floor((date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
          if (daysDiff === 1) {
            tempStreak++
          } else {
            longestStreak = Math.max(longestStreak, tempStreak)
            tempStreak = 1
          }
        } else {
          tempStreak = 1
        }
        lastDate = date
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 0
        lastDate = null
      }
    })
    
    longestStreak = Math.max(longestStreak, tempStreak)
    
    // Calculate current streak (from today backwards)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let streakDate = new Date(today)
    let streakCount = 0
    
    while (true) {
      const dateStr = streakDate.toISOString().split('T')[0]
      const contrib = contributions.find(c => c.date === dateStr)
      
      if (contrib && contrib.count > 0) {
        streakCount++
        streakDate.setDate(streakDate.getDate() - 1)
      } else {
        break
      }
    }

    return {
      totalContributions,
      thisYearContributions,
      longestStreak,
      currentStreak: streakCount,
      graph: contributions.slice(-365), // Last 365 days
    }
  } catch (error) {
    console.error('Error parsing contributions:', error)
    return null
  }
}
