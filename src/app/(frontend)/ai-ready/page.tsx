import { getPayload } from 'payload'
import config from '@payload-config'
import AIReadyClient from './AIReadyClient'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

// Transform CMS data to component format
function transformSyllabusData(
  cmsSyllabus: {
    meetings?: Array<{
      number: number
      title: string
      description: string
      topics?: Array<{ text?: string }>
      tools?: Array<{ name?: string }>
      icon?: string
    }>
  } | null
) {
  if (!cmsSyllabus?.meetings?.length) return undefined

  return cmsSyllabus.meetings.map((meeting) => ({
    number: meeting.number,
    title: meeting.title,
    description: meeting.description,
    tools: meeting.tools?.map((t) => t.name).filter(Boolean) as string[] || [],
    highlight: meeting.number === 8, // Last meeting is highlighted
  }))
}

function transformWhyNowData(
  cmsWhyNow: {
    cards?: Array<{
      icon?: string
      title: string
      description: string
    }>
  } | null
) {
  if (!cmsWhyNow?.cards?.length) return undefined

  const colors = ['red', 'green', 'blue', 'purple'] // Cycle through colors
  return cmsWhyNow.cards.map((card, index) => ({
    title: card.title,
    description: card.description,
    color: colors[index % colors.length],
  }))
}

export default async function AIReadyPage() {
  let syllabusData
  let whyNowData

  try {
    const payload = await getPayload({ config })
    const pagesGlobal = await payload.findGlobal({
      slug: 'pages',
      depth: 0,
    })

    // Extract and transform syllabus data
    const aiReady = pagesGlobal?.aiReady as {
      syllabus?: {
        meetings?: Array<{
          number: number
          title: string
          description: string
          topics?: Array<{ text?: string }>
          tools?: Array<{ name?: string }>
          icon?: string
        }>
      }
      whyNow?: {
        cards?: Array<{
          icon?: string
          title: string
          description: string
        }>
      }
    } | undefined

    syllabusData = transformSyllabusData(aiReady?.syllabus || null)
    whyNowData = transformWhyNowData(aiReady?.whyNow || null)
  } catch (error) {
    console.error('Error fetching AI Ready page data:', error)
    // Continue with fallback data (handled in AIReadyClient)
  }

  return <AIReadyClient syllabusData={syllabusData} whyNowData={whyNowData} />
}
