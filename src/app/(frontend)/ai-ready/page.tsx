import { getPayload } from 'payload'
import config from '@payload-config'
import AIReadyClient from './AIReadyClient'
import type { Course } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // Revalidate every minute for quick CMS updates

// Transform Course syllabus to component format
function transformSyllabusData(
  courseSyllabus: Course['syllabus']
) {
  if (!courseSyllabus?.length) return undefined

  return courseSyllabus.map((meeting) => ({
    number: meeting.number,
    title: meeting.title,
    description: meeting.description,
    tools: meeting.tools?.map((t) => t.name).filter(Boolean) as string[] || [],
    highlight: meeting.number === 8, // Last meeting is highlighted
  }))
}

// Transform Course whyNow to component format
function transformWhyNowData(
  courseWhyNow: Course['whyNow']
) {
  if (!courseWhyNow?.length) return undefined

  const colors = ['red', 'green', 'blue', 'purple'] // Cycle through colors
  return courseWhyNow.map((card, index) => ({
    title: card.title,
    description: card.description,
    color: colors[index % colors.length],
  }))
}

// Transform Course cohorts to component format
function transformCohortsData(
  courseCohorts: Course['cohorts']
) {
  if (!courseCohorts?.length) return undefined

  return courseCohorts.map((cohort) => ({
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    format: cohort.format,
    dayOfWeek: cohort.dayOfWeek,
    startTime: cohort.startTime,
    endTime: cohort.endTime,
    location: cohort.location,
    price: cohort.price,
    originalPrice: cohort.originalPrice,
    priceNote: cohort.priceNote,
    maxStudents: cohort.maxStudents,
    availableSeats: cohort.availableSeats,
    registrationOpen: cohort.registrationOpen,
  }))
}

export default async function AIReadyPage() {
  let syllabusData
  let whyNowData
  let cohortsData

  try {
    const payload = await getPayload({ config })

    // Fetch the AI Ready COURSE (Single Source of Truth!)
    const { docs: courses } = await payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: 'ai-ready-course',
        },
      },
      depth: 2, // Get instructors, testimonials relationships
    })

    const course = courses[0] as Course | undefined

    if (course) {
      // Transform course data for the client component
      syllabusData = transformSyllabusData(course.syllabus)
      whyNowData = transformWhyNowData(course.whyNow)
      cohortsData = transformCohortsData(course.cohorts)
    }
  } catch (error) {
    console.error('Error fetching AI Ready course data:', error)
    // Continue with fallback data (handled in AIReadyClient)
  }

  return <AIReadyClient syllabusData={syllabusData} whyNowData={whyNowData} cohortsData={cohortsData} />
}
