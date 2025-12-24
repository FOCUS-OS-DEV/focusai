'use client'

import { motion } from 'framer-motion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import type { Homepage } from '@/payload-types'

interface HeroProps {
  hero?: Homepage['hero']
  stats?: Homepage['stats']
}

const Hero = ({ hero, stats }: HeroProps) => {
  const scrollTo = useSmoothScroll()

  // Fallback values
  const title = hero?.title || 'Focus AI Academy'
  const subtitle = hero?.subtitle || 'מרכז ההכשרות המוביל בישראל לעולם ה-AI'
  const primaryCtaText = hero?.primaryCta?.text || 'גלו את המסלולים'
  const primaryCtaLink = hero?.primaryCta?.link || '#programs'
  const secondaryCtaText = hero?.secondaryCta?.text || 'שיחת ייעוץ חינם'
  const secondaryCtaLink = hero?.secondaryCta?.link || '#contact'

  const handlePrimaryClick = () => {
    if (primaryCtaLink?.startsWith('#')) {
      scrollTo(primaryCtaLink.slice(1))
    } else if (primaryCtaLink) {
      window.location.href = primaryCtaLink
    }
  }

  const handleSecondaryClick = () => {
    if (secondaryCtaLink?.startsWith('#')) {
      scrollTo(secondaryCtaLink.slice(1))
    } else if (secondaryCtaLink) {
      window.location.href = secondaryCtaLink
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf8ff 0%, #f3e8ff 50%, #fce7f3 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-gray-700">הרשמה למחזור הקרוב פתוחה</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Focus AI</span>
            <span className="text-gray-900"> Academy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.p>

          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={handlePrimaryClick}
              className="group relative px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.7)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {primaryCtaText}
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </motion.button>
            <motion.button
              onClick={handleSecondaryClick}
              className="px-8 py-4 rounded-full font-bold text-lg text-purple-600 border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {secondaryCtaText}
            </motion.button>
          </motion.div>

          {/* Trust indicators - Stats from Payload */}
          {stats && stats.length > 0 ? (
            <motion.div
              className="pt-8 border-t border-purple-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
                {stats.map((stat, index) => (
                  <div key={stat.id || index} className="flex items-center gap-2">
                    {index > 0 && <div className="w-px h-6 bg-purple-200 mr-8" />}
                    <span className="text-2xl font-bold gradient-text">{stat.number}</span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="pt-8 border-t border-purple-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold gradient-text">50+</span>
                  <span>ארגונים</span>
                </div>
                <div className="w-px h-6 bg-purple-200" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold gradient-text">1,000+</span>
                  <span>בוגרים</span>
                </div>
                <div className="w-px h-6 bg-purple-200" />
                <div className="flex items-center gap-2">
                  <span>בשיתוף</span>
                  <span className="text-gray-700 font-medium">הטכניון</span>
                  <span>&amp;</span>
                  <span className="text-gray-700 font-medium">אוניברסיטת חיפה</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
