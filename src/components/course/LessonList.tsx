'use client'

import Link from 'next/link'
import type { Lesson, Progress } from '@/payload-types'

interface LessonListProps {
  lessons: Lesson[]
  currentLessonId: number
  progressMap: Map<number, Progress>
  courseSlug: string
}

export default function LessonList({
  lessons,
  currentLessonId,
  progressMap,
  courseSlug,
}: LessonListProps) {
  const completedCount = lessons.filter(l => progressMap.get(l.id)?.completed).length
  const totalDuration = lessons.reduce((acc, l) => acc + (l.video?.duration || 0), 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-bold text-gray-900">תוכן הקורס</h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span>{lessons.length} שיעורים</span>
          <span>•</span>
          <span>{completedCount} הושלמו</span>
          {totalDuration > 0 && (
            <>
              <span>•</span>
              <span>{Math.round(totalDuration)} דקות</span>
            </>
          )}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${(completedCount / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {lessons.map((lesson, index) => {
            const progress = progressMap.get(lesson.id)
            const isCompleted = progress?.completed
            const isWatching = progress && !progress.completed && (progress.watchTime || 0) > 0
            const isCurrent = lesson.id === currentLessonId

            return (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${courseSlug}/learn?lesson=${lesson.slug || lesson.id}`}
                  className={`
                    flex items-start gap-3 p-4 transition-colors
                    ${isCurrent
                      ? 'bg-purple-50 border-r-4 border-purple-500'
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : isWatching ? (
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm truncate ${
                      isCurrent ? 'text-purple-600' : 'text-gray-900'
                    }`}>
                      {lesson.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      {lesson.video?.duration && (
                        <span className="text-xs text-gray-500">
                          {lesson.video.duration} דקות
                        </span>
                      )}
                      {isWatching && progress?.watchTime && lesson.video?.duration && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-purple-600">
                            {Math.round((progress.watchTime / 60 / lesson.video.duration) * 100)}% נצפה
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress bar for in-progress lessons */}
                    {isWatching && lesson.video?.duration && (
                      <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 transition-all"
                          style={{
                            width: `${Math.min(100, ((progress?.watchTime || 0) / 60 / lesson.video.duration) * 100)}%`
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Current indicator */}
                  {isCurrent && (
                    <div className="flex-shrink-0">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-600">
                        צופה
                      </span>
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          חזרה לאזור האישי
        </Link>
      </div>
    </div>
  )
}
