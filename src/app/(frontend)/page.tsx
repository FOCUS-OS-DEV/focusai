import { getPayload } from 'payload'
import config from '@payload-config'

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

// Types are inferred from Payload's findGlobal and find methods

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch Homepage global
  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  // Fetch SiteSettings global
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch featured courses
  const coursesResult = await payload.find({
    collection: 'courses',
    where: {
      status: { equals: 'published' },
      featured: { equals: true },
    },
    sort: 'order',
    limit: 4,
  })

  // Fetch featured testimonials
  const testimonialsResult = await payload.find({
    collection: 'testimonials',
    where: {
      status: { equals: 'approved' },
      featured: { equals: true },
    },
    limit: 6,
  })

  // Fetch featured instructors
  const instructorsResult = await payload.find({
    collection: 'instructors',
    where: {
      featured: { equals: true },
    },
    sort: 'order',
    limit: 4,
  })

  // Fetch partners
  const partnersResult = await payload.find({
    collection: 'partners',
    where: {
      featured: { equals: true },
    },
    sort: 'order',
    limit: 10,
  })

  return (
    <>
      <Hero
        hero={homepage.hero}
        stats={homepage.stats}
      />
      <About />
      <BrandsCarousel partners={partnersResult.docs} />
      <QuickContact contact={siteSettings.contact} />
      <WhyNow whyUs={homepage.whyUs} />
      <Programs
        courses={coursesResult.docs}
        sectionTitle={homepage.sections?.coursesTitle}
      />
      <Schedule />
      <Story />
      <Testimonials
        testimonials={testimonialsResult.docs}
        sectionTitle={homepage.sections?.testimonialsTitle}
      />
      <Team instructors={instructorsResult.docs} />
      <Integration />
      <Contact contact={siteSettings.contact} />
      <WhatsAppButton whatsapp={siteSettings.contact?.whatsapp} />
    </>
  )
}
