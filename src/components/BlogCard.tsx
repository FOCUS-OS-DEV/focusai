'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Post, Media, Category } from '@/payload-types'

interface BlogCardProps {
  post: Post
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const featuredImage = post.featuredImage as Media | null
  const imageUrl = featuredImage?.url
  const category = post.category as Category | null

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden border border-purple-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

            {/* Category Badge */}
            {category && (
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md"
                style={{ backgroundColor: category.color || '#a855f7' }}
              >
                {category.name}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Intl.DateTimeFormat('he-IL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(post.publishedAt))}
                </time>
              )}
              {post.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.readTime} דקות קריאה</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* Read More */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>קרא עוד</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
