import { getPayload } from 'payload'
import config from '@payload-config'
import type { Homepage, SiteSetting, Course, Testimonial, Instructor, Partner } from '@/payload-types'

// Force dynamic rendering - page uses Payload which requires runtime secrets
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import BrandsCarousel from '@/components/sections/BrandsCarousel'
import QuickContact from '@/components/sections/QuickContact'
import WhyNow from '@/components/sections/WhyNow'
import Programs from '@/components/sections/Programs'
import Schedule from '@/components/sections/Schedule'
import Story from '@/components/sections/Story'
import Testimonials from '@/components/sections/Testimonials'
import Team from '@/components/sections/Team'
import Integration from '@/components/sections/Integration'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// Default fallback data for when CMS data is unavailable
const defaultContact: SiteSetting['contact'] = {
  email: 'info@focusai.co.il',
  phone: '053-946-6408',
  whatsapp: '972539466408',
  address: 'אריה שנקר 14, הרצליה פיתוח',
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Initialize with defaults
  let homepage: Homepage | null = null
  let siteSettings: SiteSetting | null = null
  let courses: Course[] = []
  let testimonials: Testimonial[] = []
  let instructors: Instructor[] = []
  let partners: Partner[] = []

  try {
    // Fetch Homepage global
    homepage = await payload.findGlobal({
      slug: 'homepage',
    })
  } catch (error) {
    console.error('Error fetching homepage global:', error)
  }

  try {
    // Fetch SiteSettings global
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
  } catch (error) {
    console.error('Error fetching site-settings global:', error)
  }

  try {
    // Fetch featured courses
    const result = await payload.find({
      collection: 'courses',
      where: {
        status: { equals: 'published' },
        featured: { equals: true },
      },
      sort: 'order',
      limit: 4,
    })
    courses = result.docs
  } catch (error) {
    console.error('Error fetching courses:', error)
  }

  try {
    // Fetch featured testimonials
    const result = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'approved' },
        featured: { equals: true },
      },
      limit: 6,
    })
    testimonials = result.docs
  } catch (error) {
    console.error('Error fetching testimonials:', error)
  }

  try {
    // Fetch featured instructors
    const result = await payload.find({
      collection: 'instructors',
      where: {
        featured: { equals: true },
      },
      sort: 'order',
      limit: 4,
    })
    instructors = result.docs
  } catch (error) {
    console.error('Error fetching instructors:', error)
  }

  try {
    // Fetch partners
    const result = await payload.find({
      collection: 'partners',
      where: {
        featured: { equals: true },
      },
      sort: 'order',
      limit: 10,
    })
    partners = result.docs
  } catch (error) {
    console.error('Error fetching partners:', error)
  }

  // Use fallback contact if siteSettings failed to load
  const contact = siteSettings?.contact || defaultContact

  return (
    <>
      <Hero
        hero={homepage?.hero}
        stats={homepage?.stats}
      />
      <About about={homepage?.about} />
      <BrandsCarousel partners={partners} />
      <QuickContact contact={contact} />
      <WhyNow whyUs={homepage?.whyUs} />
      <Programs
        courses={courses}
        sectionTitle={homepage?.sections?.programs?.title || homepage?.sections?.coursesTitle}
        sectionSubtitle={homepage?.sections?.programs?.subtitle}
      />
      <Schedule />
      <Story />
      <Testimonials
        testimonials={testimonials}
        sectionTitle={homepage?.sections?.testimonials?.title || homepage?.sections?.testimonialsTitle}
        sectionSubtitle={homepage?.sections?.testimonials?.subtitle}
      />
      <Team
        instructors={instructors}
        sectionTitle={homepage?.sections?.team?.title}
        sectionSubtitle={homepage?.sections?.team?.subtitle}
      />
      <Integration />
      <Contact contact={contact} />
      <WhatsAppButton whatsapp={contact?.whatsapp} />
    </>
  )
}
