import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import type { Course, Cohort, Lesson, Progress, Media, User } from '@/payload-types'
import CoursePlayer from '@/components/course/CoursePlayer'
import LessonList from '@/components/course/LessonList'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lesson?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: _slug } = await params

  return {
    title: `לומדים | Focus AI Academy`,
    robots: { index: false, follow: false },
  }
}

export default async function LearnPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { lesson: lessonParam } = await searchParams

  const payload = await getPayload({ config })

  // Check authentication
  let user: User | null = null
  try {
    const authResult = await payload.auth({ headers: await headers() })
    user = authResult.user as User | null
  } catch {
    redirect(`/login?redirect=/courses/${slug}/learn`)
  }

  if (!user) {
    redirect(`/login?redirect=/courses/${slug}/learn`)
  }

  // Fetch course
  const coursesResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  if (!coursesResult.docs.length) {
    notFound()
  }

  const course = coursesResult.docs[0]

  // Check if user is enrolled in any cohort of this course
  const enrollmentsResult = await payload.find({
    collection: 'enrollments',
    where: {
      and: [
        { student: { equals: user.id } },
        { status: { equals: 'active' } },
      ],
    },
    depth: 2,
  })

  // Find enrollment for this course
  const enrollment = enrollmentsResult.docs.find(e => {
    const cohort = e.cohort as Cohort
    if (!cohort) return false
    const cohortCourse = cohort.course as Course | number
    const courseId = typeof cohortCourse === 'number' ? cohortCourse : cohortCourse?.id
    return courseId === course.id
  })

  if (!enrollment) {
    // Not enrolled - redirect to course page
    redirect(`/courses/${slug}?error=not_enrolled`)
  }

  const cohort = enrollment.cohort as Cohort

  // Fetch lessons for this cohort
  const lessonsResult = await payload.find({
    collection: 'lessons',
    where: {
      and: [
        { cohort: { equals: cohort.id } },
        { status: { equals: 'published' } },
      ],
    },
    sort: 'order',
    depth: 2,
  })

  const lessons = lessonsResult.docs

  if (lessons.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            אין שיעורים זמינים עדיין
          </h1>
          <p className="text-gray-600 mb-8">
            השיעורים עבור המחזור שלך יעלו בקרוב
          </p>
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500"
          >
            חזרה לדף הקורס
          </Link>
        </div>
      </main>
    )
  }

  // Get current lesson (from URL param or first lesson)
  let currentLesson: Lesson | undefined
  if (lessonParam) {
    currentLesson = lessons.find(l => l.slug === lessonParam || l.id.toString() === lessonParam)
  }
  if (!currentLesson) {
    currentLesson = lessons[0]
  }

  // Fetch progress for all lessons
  const progressResult = await payload.find({
    collection: 'progress',
    where: {
      and: [
        { student: { equals: user.id } },
        { lesson: { in: lessons.map(l => l.id) } },
      ],
    },
    depth: 0,
  })

  const progressMap = new Map<number, Progress>()
  progressResult.docs.forEach(p => {
    const lessonId = typeof p.lesson === 'number' ? p.lesson : (p.lesson as Lesson)?.id
    if (lessonId) {
      progressMap.set(lessonId, p)
    }
  })

  // Get video URL for current lesson
  const videoUrl = currentLesson.video?.url || ''
  const videoFile = currentLesson.video?.file as Media | null
  const videoType = currentLesson.video?.type || 'url'
  const actualVideoUrl = videoType === 'upload' && videoFile?.url ? videoFile.url : videoUrl

  // Calculate overall progress
  const completedLessons = lessons.filter(l => progressMap.get(l.id)?.completed).length
  const overallProgress = Math.round((completedLessons / lessons.length) * 100)

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href={`/courses/${slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm font-medium">חזרה לקורס</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-lg font-bold text-gray-900 truncate max-w-md">
                {course.title}
              </h1>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {completedLessons} / {lessons.length} שיעורים
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-purple-600">
                {overallProgress}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar - Lesson List */}
        <aside className="w-80 bg-white border-l border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 hidden lg:block">
          <LessonList
            lessons={lessons}
            currentLessonId={currentLesson.id}
            progressMap={progressMap}
            courseSlug={slug}
          />
        </aside>

        {/* Main Content - Video Player */}
        <div className="flex-1">
          <div className="max-w-5xl mx-auto p-6">
            {/* Lesson Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>שיעור {currentLesson.order}</span>
                {progressMap.get(currentLesson.id)?.completed && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    הושלם
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
            </div>

            {/* Video Player */}
            {actualVideoUrl ? (
              <CoursePlayer
                videoUrl={actualVideoUrl}
                lessonId={currentLesson.id.toString()}
                userId={user.id.toString()}
                initialProgress={progressMap.get(currentLesson.id)?.watchTime || 0}
                duration={currentLesson.video?.duration || undefined}
              />
            ) : (
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">הוידאו יעלה בקרוב</p>
                </div>
              </div>
            )}

            {/* Lesson Description */}
            {currentLesson.description && (
              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">על השיעור</h3>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {/* Simple text display - can be enhanced with RichText component */}
                  <p>תיאור השיעור יופיע כאן</p>
                </div>
              </div>
            )}

            {/* Materials */}
            {currentLesson.materials && currentLesson.materials.length > 0 && (
              <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">חומרים להורדה</h3>
                <div className="space-y-3">
                  {currentLesson.materials.map((material, i) => {
                    const file = material.file as Media | null
                    return (
                      <a
                        key={i}
                        href={file?.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 group-hover:text-purple-600">
                            {material.title}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              {(() => {
                const currentIndex = lessons.findIndex(l => l.id === currentLesson.id)
                const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
                const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

                return (
                  <>
                    {prevLesson ? (
                      <Link
                        href={`/courses/${slug}/learn?lesson=${prevLesson.slug || prevLesson.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>השיעור הקודם</span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextLesson ? (
                      <Link
                        href={`/courses/${slug}/learn?lesson=${nextLesson.slug || nextLesson.id}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition"
                      >
                        <span>השיעור הבא</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg transition"
                      >
                        <span>סיימת את הקורס! 🎉</span>
                      </Link>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        </div>

        {/* Mobile Lesson List Toggle */}
        <div className="lg:hidden fixed bottom-4 right-4">
          <button
            className="w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center"
            onClick={() => {/* Toggle mobile menu */}}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}
