import Script from 'next/script'
import type { Post, User, Category, Media } from '@/payload-types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

interface ArticleSchemaProps {
  post: Post
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  // Get author name
  const getAuthorName = (): string => {
    if (typeof post.author === 'object' && post.author !== null) {
      const author = post.author as User
      if (author.name) {
        return author.name
      }
      return author.email || 'Focus AI Academy'
    }
    return 'Focus AI Academy'
  }

  // Get category name
  const getCategoryName = (): string | null => {
    if (typeof post.category === 'object' && post.category !== null) {
      return (post.category as Category).name || null
    }
    return null
  }

  // Get featured image URL
  const getImageUrl = (): string => {
    if (typeof post.featuredImage === 'object' && post.featuredImage !== null) {
      const media = post.featuredImage as Media
      if (media.url) {
        return media.url.startsWith('http') ? media.url : `${BASE_URL}${media.url}`
      }
    }
    return `${BASE_URL}/og-image.jpg`
  }

  const categoryName = getCategoryName()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    url: `${BASE_URL}/blog/${post.slug}`,
    image: getImageUrl(),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: getAuthorName(),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Focus AI Academy',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    inLanguage: 'he',
    ...(categoryName && {
      articleSection: categoryName,
    }),
    keywords: [
      'AI',
      'בינה מלאכותית',
      'אוטומציה',
      ...(categoryName ? [categoryName] : []),
    ],
  }

  return (
    <Script
      id={`article-schema-${post.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
