import { getPayload } from 'payload'
import config from '@payload-config'
import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Where } from 'payload'
import type { Post, Category } from '@/payload-types'
import BlogCard from '@/components/BlogCard'
import BlogFilter from '@/components/BlogFilter'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'בלוג | Focus AI Academy',
  description: 'מאמרים, טיפים ותובנות מעולם הבינה המלאכותית והאוטומציה העסקית',
  keywords: 'בלוג, AI, בינה מלאכותית, אוטומציה, טיפים, מאמרים',
  openGraph: {
    title: 'בלוג Focus AI Academy',
    description: 'מאמרים ותובנות בתחום ה-AI',
  },
}

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const payload = await getPayload({ config })

  let posts: Post[] = []
  let categories: Category[] = []

  try {
    // Fetch categories for filter
    const categoriesResult = await payload.find({
      collection: 'categories',
      depth: 0,
      sort: 'order',
    })
    categories = categoriesResult.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  try {
    // Build query based on filters
    const conditions: Where[] = [
      { status: { equals: 'published' } },
    ]

    if (params.category) {
      conditions.push({ category: { equals: params.category } })
    }

    if (params.search) {
      conditions.push({
        or: [
          { title: { contains: params.search } },
          { excerpt: { contains: params.search } },
        ],
      })
    }

    const where: Where = conditions.length === 1 ? conditions[0] : { and: conditions }

    // Fetch posts
    const postsResult = await payload.find({
      collection: 'posts',
      where,
      depth: 2,
      sort: '-publishedAt',
      limit: 12,
    })
    posts = postsResult.docs
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)' }}>
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#a855f7]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#ec4899]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            הבלוג <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">שלנו</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            מאמרים, טיפים ותובנות מעולם הבינה המלאכותית והאוטומציה העסקית
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <Suspense fallback={<div className="h-24 bg-white rounded-2xl shadow-lg animate-pulse" />}>
          <BlogFilter categories={categories} />
        </Suspense>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 max-w-6xl py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {params.search || params.category
                ? 'לא נמצאו מאמרים התואמים את החיפוש'
                : 'עוד אין מאמרים בבלוג'}
            </h2>
            <p className="text-gray-600 mb-8">
              {params.search || params.category
                ? 'נסו לשנות את הפילטרים או לחפש משהו אחר'
                : 'מאמרים חדשים יתווספו בקרוב!'}
            </p>
            {(params.search || params.category) && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-lg transition-all"
              >
                הצג את כל המאמרים
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)] text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              רוצים ללמוד עוד?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית ומקצועית
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-300/30 bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] transition-all"
              >
                <span>הקורסים שלנו</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/972539466408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-[#25D366] text-white shadow-lg shadow-green-300/30 hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
