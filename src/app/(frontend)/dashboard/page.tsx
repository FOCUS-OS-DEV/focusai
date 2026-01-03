import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Course, Media, Cohort, Enrollment, Lesson } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'האזור האישי שלי',
  description: 'ניהול הקורסים והלמידה שלך',
}

interface EnrolledCourseWithProgress {
  course: Course
  cohort: Cohort
  enrollment: Enrollment
  progress: {
    totalLessons: number
    completedLessons: number
    progressPercentage: number
    totalWatchTime: number
    lastLesson?: Lesson
  }
}

export default async function DashboardPage() {
  const payload = await getPayload({ config })

  let user = null
  const enrolledCoursesWithProgress: EnrolledCourseWithProgress[] = []
  let completedCoursesCount = 0
  let totalWatchTimeMinutes = 0

  try {
    const authResult = await payload.auth({
      headers: await headers(),
    })
    user = authResult.user
  } catch {
    redirect('/login?redirect=/dashboard')
  }

  if (!user) {
    redirect('/login?redirect=/dashboard')
  }

  // Fetch enrollments with progress data
  try {
    const enrollmentsResult = await payload.find({
      collection: 'enrollments',
      where: {
        and: [
          { student: { equals: user.id } },
          { status: { in: ['active', 'completed'] } },
        ],
      },
      depth: 2,
    })

    for (const enrollment of enrollmentsResult.docs) {
      const cohort = enrollment.cohort as Cohort
      if (!cohort) continue

      const course = cohort.course as Course
      if (!course) continue

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
        depth: 0,
      })

      const lessons = lessonsResult.docs

      // Fetch progress for these lessons
      const progressResult = await payload.find({
        collection: 'progress',
        where: {
          and: [
            { student: { equals: user.id } },
            { lesson: { in: lessons.map(l => l.id) } },
          ],
        },
        depth: 1,
      })

      const completedLessons = progressResult.docs.filter(p => p.completed).length
      const watchTime = progressResult.docs.reduce((acc, p) => acc + (p.watchTime || 0), 0)
      const progressPercentage = lessons.length > 0
        ? Math.round((completedLessons / lessons.length) * 100)
        : 0

      // Find the last watched lesson
      let lastLesson: Lesson | undefined
      if (progressResult.docs.length > 0) {
        const sortedProgress = [...progressResult.docs].sort((a, b) => {
          const dateA = a.watchedAt ? new Date(a.watchedAt).getTime() : 0
          const dateB = b.watchedAt ? new Date(b.watchedAt).getTime() : 0
          return dateB - dateA
        })
        const lastProgress = sortedProgress[0]
        lastLesson = typeof lastProgress.lesson === 'number'
          ? lessons.find(l => l.id === lastProgress.lesson)
          : lastProgress.lesson as Lesson
      }

      enrolledCoursesWithProgress.push({
        course,
        cohort,
        enrollment,
        progress: {
          totalLessons: lessons.length,
          completedLessons,
          progressPercentage,
          totalWatchTime: watchTime,
          lastLesson,
        },
      })

      totalWatchTimeMinutes += Math.round(watchTime / 60)

      if (enrollment.status === 'completed' || progressPercentage >= 100) {
        completedCoursesCount++
      }
    }
  } catch (error) {
    console.error('Error fetching enrollments:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            שלום, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">{user.name || user.email}</span>
          </h1>
          <p className="text-gray-600 text-lg">ברוכים הבאים לאזור האישי שלך</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-purple-100 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{enrolledCoursesWithProgress.length}</div>
            <div className="text-gray-600">קורסים רשומים</div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-purple-100 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{completedCoursesCount}</div>
            <div className="text-gray-600">קורסים שהושלמו</div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-purple-100 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">{totalWatchTimeMinutes > 0 ? totalWatchTimeMinutes : '-'}</div>
            <div className="text-gray-600">דקות למידה</div>
          </div>
        </div>

        {/* Continue Learning - Most Recent */}
        {enrolledCoursesWithProgress.length > 0 && enrolledCoursesWithProgress.some(e => e.progress.lastLesson) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">המשך מאיפה שהפסקת</h2>
            {(() => {
              const recentCourse = enrolledCoursesWithProgress.find(e => e.progress.lastLesson)
              if (!recentCourse) return null
              const image = recentCourse.course.featuredImage as Media | null
              return (
                <Link
                  href={`/courses/${recentCourse.course.slug}/learn?lesson=${recentCourse.progress.lastLesson?.slug || recentCourse.progress.lastLesson?.id}`}
                  className="block bg-white/80 backdrop-blur rounded-2xl overflow-hidden border border-purple-100 hover:border-[#a855f7]/50 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={recentCourse.course.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">🎓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                          {recentCourse.progress.progressPercentage}% הושלם
                        </span>
                        <span className="text-sm text-gray-500">
                          {recentCourse.progress.completedLessons} / {recentCourse.progress.totalLessons} שיעורים
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {recentCourse.course.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        שיעור הבא: <span className="font-medium">{recentCourse.progress.lastLesson?.title}</span>
                      </p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                          style={{ width: `${recentCourse.progress.progressPercentage}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[#a855f7] font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>המשך צפייה</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })()}
          </section>
        )}

        {/* Enrolled Courses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">הקורסים שלי</h2>

          {enrolledCoursesWithProgress.length === 0 ? (
            <div className="bg-white/80 backdrop-blur rounded-3xl p-12 border border-purple-100 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">עדיין לא נרשמת לקורסים</h3>
              <p className="text-gray-600 mb-6">בחר קורס והתחל את מסע הלמידה שלך</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-lg transition-all"
              >
                עבור לקורסים
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesWithProgress.map(({ course, progress }) => {
                const image = course.featuredImage as Media | null
                return (
                  <div
                    key={course.id}
                    className="group bg-white/80 backdrop-blur rounded-2xl overflow-hidden border border-purple-100 hover:border-[#a855f7]/50 transition-all hover:shadow-lg"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">🎓</span>
                        </div>
                      )}
                      {/* Progress badge */}
                      <div className="absolute top-3 left-3">
                        {progress.progressPercentage >= 100 ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            הושלם
                          </span>
                        ) : progress.progressPercentage > 0 ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white">
                            {progress.progressPercentage}%
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#a855f7] transition-colors">
                        {course.title}
                      </h3>
                      {course.subtitle && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{course.subtitle}</p>
                      )}

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                          style={{ width: `${progress.progressPercentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-500">
                          {progress.completedLessons} / {progress.totalLessons} שיעורים
                        </span>
                      </div>

                      <Link
                        href={`/courses/${course.slug}/learn`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-lg transition-all text-sm"
                      >
                        {progress.progressPercentage >= 100 ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            <span>צפה שוב</span>
                          </>
                        ) : progress.progressPercentage > 0 ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span>המשך ללמוד</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span>התחל ללמוד</span>
                          </>
                        )}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">פעולות מהירות</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/courses"
              className="bg-white/80 backdrop-blur rounded-xl p-5 border border-purple-100 hover:border-[#a855f7]/50 transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">כל הקורסים</h3>
              <p className="text-sm text-gray-600">עיין בכל הקורסים הזמינים</p>
            </Link>

            <Link
              href="/blog"
              className="bg-white/80 backdrop-blur rounded-xl p-5 border border-purple-100 hover:border-[#a855f7]/50 transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-pink-200 transition-colors">
                <svg className="w-5 h-5 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">בלוג</h3>
              <p className="text-sm text-gray-600">מאמרים וטיפים על AI</p>
            </Link>

            <a
              href="https://wa.me/972539466408"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 backdrop-blur rounded-xl p-5 border border-purple-100 hover:border-green-400/50 transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">יצירת קשר</h3>
              <p className="text-sm text-gray-600">שאלות? דברו איתנו</p>
            </a>

            <form action="/api/users/logout" method="POST">
              <button
                type="submit"
                className="w-full text-right bg-white/80 backdrop-blur rounded-xl p-5 border border-purple-100 hover:border-red-300/50 transition-all hover:shadow-md group"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">התנתקות</h3>
                <p className="text-sm text-gray-600">צא מהחשבון</p>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
