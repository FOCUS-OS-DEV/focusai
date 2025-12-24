'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

const courseTypes = [
  { value: 'all', label: 'הכל', icon: '📚' },
  { value: 'frontal', label: 'פרונטלי', icon: '👨‍🏫' },
  { value: 'digital', label: 'דיגיטלי', icon: '💻' },
  { value: 'workshop', label: 'סדנאות', icon: '🏢' },
  { value: 'coaching', label: 'ליווי אישי', icon: '🎯' },
]

export default function CoursesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const currentType = searchParams.get('type') || 'all'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.push(`/courses?${params.toString()}`)
    })
  }

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
    }

    startTransition(() => {
      router.push(`/courses?${params.toString()}`)
    })
  }

  const clearFilters = () => {
    setSearch('')
    startTransition(() => {
      router.push('/courses')
    })
  }

  const hasActiveFilters = search || currentType !== 'all'

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.15)] p-6 border border-purple-100">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חפש קורס..."
              className="w-full px-4 py-3 pr-12 bg-purple-50/50 border border-purple-100 rounded-xl focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isPending ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'חפש'
            )}
          </button>
        </div>
      </form>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {courseTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeFilter(type.value)}
            disabled={isPending}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              currentType === type.value
                ? 'bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-md'
                : 'bg-purple-50 text-gray-700 hover:bg-purple-100 border border-purple-100'
            } ${isPending ? 'opacity-50' : ''}`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-purple-100">
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="text-gray-500">פילטרים פעילים:</span>

            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                חיפוש: {search}
              </span>
            )}

            {currentType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                סוג: {courseTypes.find(t => t.value === currentType)?.label}
              </span>
            )}

            <button
              onClick={clearFilters}
              disabled={isPending}
              className="text-[#a855f7] hover:text-[#9333ea] font-semibold mr-auto flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              נקה הכל
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
