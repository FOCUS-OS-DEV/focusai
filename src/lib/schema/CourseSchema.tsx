import Script from 'next/script'
import type { Course, Instructor, Media } from '@/payload-types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

interface CourseSchemaProps {
  course: Course
}

export function CourseSchema({ course }: CourseSchemaProps) {
  // Get instructor names
  const instructorNames = (course.instructors || [])
    .map((inst) => {
      if (typeof inst === 'object' && inst !== null) {
        return (inst as Instructor).name
      }
      return null
    })
    .filter(Boolean)

  // Get course image URL
  const getImageUrl = (): string => {
    if (course.gallery && course.gallery.length > 0) {
      const firstImage = course.gallery[0]
      if (typeof firstImage === 'object' && firstImage !== null) {
        const media = firstImage as { image?: Media | string }
        if (typeof media.image === 'object' && media.image?.url) {
          return media.image.url.startsWith('http')
            ? media.image.url
            : `${BASE_URL}${media.image.url}`
        }
      }
    }
    return `${BASE_URL}/og-image.jpg`
  }

  // Map course type to mode
  const getCourseMode = () => {
    switch (course.type) {
      case 'digital':
        return 'Online'
      case 'frontal':
        return 'Onsite'
      case 'workshop':
        return 'Blended'
      default:
        return 'Blended'
    }
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.excerpt || course.subtitle || '',
    url: `${BASE_URL}/courses/${course.slug}`,
    image: getImageUrl(),
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Focus AI Academy',
      url: BASE_URL,
    },
    ...(instructorNames.length > 0 && {
      instructor: instructorNames.map((name) => ({
        '@type': 'Person',
        name,
      })),
    }),
    ...(course.duration && {
      timeRequired: course.duration,
    }),
    courseMode: getCourseMode(),
    ...(course.location && {
      location: {
        '@type': 'Place',
        name: course.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'הרצליה פיתוח',
          addressCountry: 'IL',
        },
      },
    }),
    teaches: [
      'Artificial Intelligence',
      'AI Tools',
      'Automation',
      'Prompt Engineering',
    ],
    inLanguage: 'he',
    ...(course.certificate && {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: getCourseMode(),
        offers: {
          '@type': 'Offer',
          category: 'Education',
          availability: 'https://schema.org/InStock',
        },
      },
    }),
  }

  return (
    <Script
      id={`course-schema-${course.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
