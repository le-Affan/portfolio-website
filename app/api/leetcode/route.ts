import { NextResponse } from 'next/server'

const LEETCODE_USERNAME = 'le-Affan'

export async function GET() {
  try {
    // LeetCode GraphQL endpoint
    const graphqlQuery = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
              ranking
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            submissionCalendar
          }
        }
      `,
      variables: {
        username: LEETCODE_USERNAME,
      },
    }

    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode data')
    }

    const data = await response.json()

    if (!data.data?.matchedUser) {
      // Fallback: return placeholder data if user not found
      return NextResponse.json({
        username: LEETCODE_USERNAME,
        problemsSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        acceptanceRate: 0,
        ranking: 0,
        submissionCalendar: '{}',
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      })
    }

    const user = data.data.matchedUser
    const stats = user.submitStats?.acSubmissionNum || []
    
    const totalSolved = stats.find((s: any) => s.difficulty === 'All')?.count || 0
    const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0
    const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0
    const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0

    // Calculate acceptance rate
    const totalSubmissions = stats.find((s: any) => s.difficulty === 'All')?.submissions || 0
    const acceptanceRate = totalSubmissions > 0 
      ? Math.round((totalSolved / totalSubmissions) * 100) 
      : 0

    // Parse submission calendar
    const submissionCalendar = user.submissionCalendar || '{}'
    const calendarData = parseSubmissionCalendar(submissionCalendar)

    return NextResponse.json({
      username: user.username || LEETCODE_USERNAME,
      name: user.profile?.realName || LEETCODE_USERNAME,
      avatar: user.profile?.userAvatar || null,
      problemsSolved: totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      ranking: user.profile?.ranking || 0,
      submissionCalendar: calendarData,
      profileUrl: `https://leetcode.com/u/${user.username || LEETCODE_USERNAME}/`,
    })
  } catch (error) {
    console.error('LeetCode API Error:', error)
    // Return placeholder data on error
    return NextResponse.json({
      username: LEETCODE_USERNAME,
      problemsSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      acceptanceRate: 0,
      ranking: 0,
      submissionCalendar: [],
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    })
  }
}

function parseSubmissionCalendar(calendarString: string) {
  try {
    const calendar = JSON.parse(calendarString)
    const contributions: Array<{ date: string; count: number }> = []
    
    Object.entries(calendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000)
      contributions.push({
        date: date.toISOString().split('T')[0],
        count: count as number,
      })
    })

    return contributions.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  } catch (error) {
    console.error('Error parsing submission calendar:', error)
    return []
  }
}
