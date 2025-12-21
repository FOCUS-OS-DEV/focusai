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

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <BrandsCarousel />
      <QuickContact />
      <WhyNow />
      <Programs />
      <Schedule />
      <Story />
      <Testimonials />
      <Team />
      <Integration />
      <Contact />
      <WhatsAppButton />
    </>
  )
}
