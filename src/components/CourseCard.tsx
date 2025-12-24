'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Course, Media } from '@/payload-types'

// Color themes for different course types
const courseTypeThemes: Record<string, { accentColor: string; glowColor: string; label: string }> = {
  frontal: {
    accentColor: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    label: 'פרונטלי',
  },
  digital: {
    accentColor: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    label: 'דיגיטלי',
  },
  workshop: {
    accentColor: 'from-orange-500 to-amber-400',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    label: 'סדנה',
  },
  coaching: {
    accentColor: 'from-green-500 to-emerald-400',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    label: 'ליווי אישי',
  },
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const theme = courseTypeThemes[course.type] || courseTypeThemes.frontal
  const featuredImage = course.featuredImage as Media | null

  // Build tags from course data
  const tags: string[] = []
  if (course.duration) tags.push(course.duration)
  if (course.schedule) tags.push(course.schedule)
  if (course.certificate) tags.push(course.certificate)
  if (course.highlights && course.highlights.length > 0 && tags.length < 3) {
    course.highlights.slice(0, 3 - tags.length).forEach(h => {
      if (h.text && tags.length < 3) tags.push(h.text)
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/courses/${course.slug}`} className="block group h-full">
        {/* Gradient Border Wrapper */}
        <div
          className="relative p-[2px] rounded-2xl h-full transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${theme.glowColor}, transparent 50%)`,
          }}
        >
          {/* Glow Effect on Hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
            style={{ background: theme.glowColor }}
          />

          <div className="relative rounded-2xl overflow-hidden h-full bg-white border border-purple-100 flex flex-col">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              {featuredImage?.url ? (
                <Image
                  src={featuredImage.url}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🎓</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

              {/* Featured Badge */}
              {course.featured && (
                <div
                  className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${theme.accentColor} shadow-lg`}
                >
                  מומלץ
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                {theme.label}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>

              {/* Subtitle */}
              {course.subtitle && (
                <p className={`text-sm mb-3 bg-gradient-to-r ${theme.accentColor} bg-clip-text text-transparent font-medium`}>
                  {course.subtitle}
                </p>
              )}

              {/* Description */}
              {course.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {course.excerpt}
                </p>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs text-gray-600 bg-purple-50 border border-purple-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                {course.location && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate max-w-[150px]">{course.location.split(',')[0]}</span>
                  </div>
                )}
                {course.hasZoom && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>גם בזום</span>
                  </div>
                )}
                {course.maxStudents && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>עד {course.maxStudents} משתתפים</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <div
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${theme.accentColor} transition-all duration-300 group-hover:shadow-lg shadow-md w-full justify-center`}
                >
                  <span>{course.ctaText || 'למידע נוסף'}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
