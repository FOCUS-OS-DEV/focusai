import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

// POST - Update or create progress
export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { lessonId, watchTime, completed } = body

    if (!lessonId) {
      return NextResponse.json({ error: 'Missing lessonId' }, { status: 400 })
    }

    // Check if progress record already exists
    const existingProgress = await payload.find({
      collection: 'progress',
      where: {
        and: [
          { student: { equals: user.id } },
          { lesson: { equals: parseInt(lessonId) } },
        ],
      },
      depth: 0,
    })

    if (existingProgress.docs.length > 0) {
      // Update existing progress
      const progressDoc = existingProgress.docs[0]

      // Only update if new values are greater (don't go backwards)
      const newWatchTime = Math.max(progressDoc.watchTime || 0, watchTime || 0)
      const newCompleted = progressDoc.completed || completed

      await payload.update({
        collection: 'progress',
        id: progressDoc.id,
        data: {
          watchTime: newWatchTime,
          completed: newCompleted,
          watched: newCompleted || newWatchTime > 0,
          watchedAt: new Date().toISOString(),
        },
      })

      return NextResponse.json({
        success: true,
        updated: true,
        watchTime: newWatchTime,
        completed: newCompleted,
      })
    } else {
      // Create new progress record
      await payload.create({
        collection: 'progress',
        data: {
          student: user.id,
          lesson: parseInt(lessonId),
          watchTime: watchTime || 0,
          completed: completed || false,
          watched: completed || (watchTime || 0) > 0,
          watchedAt: new Date().toISOString(),
        },
      })

      return NextResponse.json({
        success: true,
        created: true,
        watchTime: watchTime || 0,
        completed: completed || false,
      })
    }
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// GET - Fetch progress for a user
export async function GET(req: Request) {
  try {
    const payload = await getPayload({ config })

    // Check authentication
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const lessonId = searchParams.get('lessonId')
    const cohortId = searchParams.get('cohortId')

    // Build query
    const conditions: { student?: { equals: number }; lesson?: { equals: number } }[] = [{ student: { equals: user.id } }]

    if (lessonId) {
      conditions.push({ lesson: { equals: parseInt(lessonId) } })
    }

    const progressResult = await payload.find({
      collection: 'progress',
      where: conditions.length === 1 ? conditions[0] : { and: conditions },
      depth: 1,
    })

    // If cohortId is provided, filter by lessons in that cohort
    if (cohortId) {
      const lessonsResult = await payload.find({
        collection: 'lessons',
        where: { cohort: { equals: parseInt(cohortId) } },
        depth: 0,
      })

      const lessonIds = new Set(lessonsResult.docs.map(l => l.id))
      const filteredProgress = progressResult.docs.filter(p => {
        const pLessonId = typeof p.lesson === 'number' ? p.lesson : p.lesson?.id
        return pLessonId && lessonIds.has(pLessonId)
      })

      // Calculate summary
      const completedCount = filteredProgress.filter(p => p.completed).length
      const totalWatchTime = filteredProgress.reduce((acc, p) => acc + (p.watchTime || 0), 0)

      return NextResponse.json({
        progress: filteredProgress,
        summary: {
          totalLessons: lessonsResult.docs.length,
          completedLessons: completedCount,
          progressPercentage: Math.round((completedCount / lessonsResult.docs.length) * 100),
          totalWatchTime,
        },
      })
    }

    return NextResponse.json({
      progress: progressResult.docs,
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
