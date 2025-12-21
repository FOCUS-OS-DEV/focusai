'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { label: 'המסלולים', id: 'programs' },
  { label: 'מי אנחנו', id: 'about' },
  { label: 'הצוות', id: 'team' },
  { label: 'צרו קשר', id: 'contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 right-0 left-0 h-0.5 z-[60]"
        style={{
          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'right',
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm'
            : ''
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button onClick={() => scrollTo('hero')} className="flex items-center cursor-pointer">
              <img
                src="https://res.cloudinary.com/dfudxxzlj/image/upload/v1765367021/FOCUSAI_LOGO-02_3_keeam5.png"
                alt="Focus AI Academy"
                className="h-9 w-auto"
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:block px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-300/50"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
            >
              צרו קשר
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-purple-100">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-right px-4 py-3 text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-4 w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-300/30"
                style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                בואו נדבר
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
