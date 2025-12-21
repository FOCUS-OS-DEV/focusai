'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { label: 'התוכניות', id: 'programs' },
  { label: 'מי אנחנו', id: 'about' },
  { label: 'הצוות', id: 'team' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-purple-500/10'
          : ''
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center cursor-pointer">
            <img
              src="https://res.cloudinary.com/dfudxxzlj/image/upload/v1765367021/FOCUSAI_LOGO-02_3_keeam5.png"
              alt="Focus AI Academy"
              className="h-10 w-auto"
            />
          </button>

          {/* Desktop Nav - Glass Card */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-purple-100 rounded-full px-2 py-1.5 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-purple-500/10 hover:text-purple-600 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden lg:block px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          >
            דברו איתנו
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
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
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-purple-100">
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
              דברו איתנו
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
