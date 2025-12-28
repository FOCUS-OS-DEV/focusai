import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their priority and change frequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ai-ready`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    // Fetch all published courses
    const courses = await payload.find({
      collection: 'courses',
      where: { status: { equals: 'published' } },
      depth: 0,
      limit: 100,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const coursePages: MetadataRoute.Sitemap = courses.docs.map((course) => ({
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: new Date(course.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Fetch all published blog posts
    const posts = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      depth: 0,
      limit: 500,
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
    })

    const postPages: MetadataRoute.Sitemap = posts.docs.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    dynamicPages = [...coursePages, ...postPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Continue with static pages only
  }

  return [...staticPages, ...dynamicPages]
}
