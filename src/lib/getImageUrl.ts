import type { Media } from '@/payload-types'

/**
 * Extract URL from a Payload media object or string
 * Handles both direct URLs and Payload media objects
 */
export function getImageUrl(image: Media | string | null | undefined): string | null {
  if (!image) return null

  // String URL
  if (typeof image === 'string') {
    return image
  }

  // Payload media object
  if (typeof image === 'object' && image.url) {
    return image.url
  }

  return null
}

/**
 * Get alt text from a Payload media object
 */
export function getImageAlt(image: Media | string | null | undefined, fallback: string = ''): string {
  if (!image) return fallback

  if (typeof image === 'object' && image.alt) {
    return image.alt
  }

  return fallback
}

/**
 * Get a specific image size URL from a Payload media object
 */
export function getImageSizeUrl(
  image: Media | string | null | undefined,
  size: 'thumbnail' | 'card' | 'hero'
): string | null {
  if (!image) return null

  if (typeof image === 'string') {
    return image
  }

  if (typeof image === 'object') {
    // Check for specific size
    const sizeUrl = image.sizes?.[size]?.url
    if (sizeUrl) return sizeUrl

    // Fallback to main URL
    return image.url || null
  }

  return null
}
