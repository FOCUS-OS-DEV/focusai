import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import BrandsCarousel from '@/components/sections/BrandsCarousel'
import Programs from '@/components/sections/Programs'
import Schedule from '@/components/sections/Schedule'
import WhyNow from '@/components/sections/WhyNow'
import Team from '@/components/sections/Team'
import Story from '@/components/sections/Story'
import Testimonials from '@/components/sections/Testimonials'
import Integration from '@/components/sections/Integration'
import QuickContact from '@/components/sections/QuickContact'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <BrandsCarousel />
      <Programs />
      <Schedule />
      <WhyNow />
      <Team />
      <Story />
      <Testimonials />
      <Integration />
      <QuickContact />
      <Contact />
      <WhatsAppButton />
    </>
  )
}
