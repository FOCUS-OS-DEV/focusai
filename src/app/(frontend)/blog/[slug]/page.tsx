import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Post, Media, Category, Course } from '@/payload-types'
import BlogCard from '@/components/BlogCard'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      depth: 1,
    })

    const post = posts.docs[0]
    if (!post) return {}

    const featuredImage = post.featuredImage as Media | null

    return {
      title: post.seo?.metaTitle || `${post.title} | Focus AI Academy`,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || undefined,
        images: featuredImage?.url ? [featuredImage.url] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let post: Post | null = null
  let relatedPosts: Post[] = []

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 2,
    })

    post = posts.docs[0] || null

    if (!post) {
      notFound()
    }

    // Fetch related posts from same category
    const category = post.category as Category | null
    if (category?.id) {
      const relatedResult = await payload.find({
        collection: 'posts',
        where: {
          category: { equals: category.id },
          id: { not_equals: post.id },
          status: { equals: 'published' },
        },
        depth: 2,
        limit: 3,
        sort: '-publishedAt',
      })
      relatedPosts = relatedResult.docs
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }

  const featuredImage = post.featuredImage as Media | null
  const imageUrl = featuredImage?.url
  const category = post.category as Category | null
  const relatedCourse = post.relatedCourse as Course | null

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)' }}>
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#a855f7]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#ec4899]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              בית
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-purple-600 transition-colors">
              בלוג
            </Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/blog?category=${category.id}`}
                  className="hover:text-purple-600 transition-colors"
                  style={{ color: category.color || undefined }}
                >
                  {category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Category Badge */}
          {category && (
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4"
              style={{ backgroundColor: category.color || '#a855f7' }}
            >
              {category.name}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Intl.DateTimeFormat('he-IL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(post.publishedAt))}
              </time>
            )}
            {post.readTime && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} דקות קריאה
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {imageUrl && (
        <section className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-200/50">
            <div className="relative aspect-video">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 max-w-4xl py-12 lg:py-16">
        <div className="bg-white rounded-2xl p-6 md:p-10 lg:p-12 shadow-lg shadow-purple-100/50 border border-purple-50">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100">
              {post.excerpt}
            </p>
          )}

          {/* Rich Text Content */}
          <div className="prose prose-lg prose-purple max-w-none">
            <RichText content={post.content} />
          </div>

          {/* In-Article CTA */}
          {post.cta?.enabled && post.cta.text && post.cta.url && (
            <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <Link
                href={post.cta.url}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  post.cta.style === 'primary'
                    ? 'bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white hover:shadow-lg'
                    : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'
                }`}
              >
                {post.cta.text}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500 text-sm font-medium">תגיות:</span>
                {post.tags.map((tagItem, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-purple-50 text-purple-700"
                  >
                    {tagItem.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Course */}
      {relatedCourse && (
        <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎓</span>
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    קורס מומלץ: {relatedCourse.title}
                  </h3>
                  {relatedCourse.excerpt && (
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedCourse.excerpt}
                    </p>
                  )}
                </div>
                <Link
                  href={`/courses/${relatedCourse.slug}`}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-semibold hover:shadow-lg transition-all flex-shrink-0"
                >
                  לפרטים נוספים
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
              מאמרים נוספים שיעניינו אותך
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors"
              >
                <span>לכל המאמרים</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.15)] text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              אהבתם את המאמר?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              הצטרפו לקורסים שלנו ולמדו AI ואוטומציה בצורה מעשית
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-300/30 bg-gradient-to-r from-[#a855f7] to-[#ec4899] hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] transition-all"
              >
                <span>לכל הקורסים</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 transition-all"
              >
                <span>חזרה לבלוג</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
