'use client'

import { Fragment } from 'react'

interface LexicalNode {
  type: string
  format?: number | string
  text?: string
  children?: LexicalNode[]
  tag?: string
  listType?: string
  url?: string
  target?: string
  rel?: string
  value?: {
    url?: string
    alt?: string
  }
  fields?: {
    url?: string
    newTab?: boolean
  }
}

interface RichTextContent {
  root?: {
    children?: LexicalNode[]
  }
}

interface RichTextProps {
  content: RichTextContent | null | undefined
  className?: string
}

// Format flags from Lexical
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

function renderText(node: LexicalNode): React.ReactNode {
  if (!node.text) return null

  let content: React.ReactNode = node.text

  const format = typeof node.format === 'number' ? node.format : 0

  if (format & IS_CODE) {
    content = <code className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-sm font-mono">{content}</code>
  }
  if (format & IS_BOLD) {
    content = <strong className="font-bold">{content}</strong>
  }
  if (format & IS_ITALIC) {
    content = <em className="italic">{content}</em>
  }
  if (format & IS_UNDERLINE) {
    content = <u className="underline">{content}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    content = <s className="line-through">{content}</s>
  }

  return content
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  const key = `node-${index}-${node.type}`

  switch (node.type) {
    case 'text':
      return <Fragment key={key}>{renderText(node)}</Fragment>

    case 'linebreak':
      return <br key={key} />

    case 'paragraph':
      return (
        <p key={key} className="mb-4 text-gray-700 leading-relaxed">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      )

    case 'heading': {
      const tag = node.tag || 'h2'
      const headingClasses: Record<string, string> = {
        h1: 'text-3xl font-black text-gray-900 mb-6 mt-10',
        h2: 'text-2xl font-bold text-gray-900 mb-4 mt-8',
        h3: 'text-xl font-bold text-gray-900 mb-3 mt-6',
        h4: 'text-lg font-bold text-gray-900 mb-2 mt-4',
        h5: 'text-base font-bold text-gray-900 mb-2 mt-4',
        h6: 'text-sm font-bold text-gray-900 mb-2 mt-4',
      }
      const className = headingClasses[tag] || headingClasses.h2
      const children = node.children?.map((child, i) => renderNode(child, i))

      switch (tag) {
        case 'h1':
          return <h1 key={key} className={className}>{children}</h1>
        case 'h2':
          return <h2 key={key} className={className}>{children}</h2>
        case 'h3':
          return <h3 key={key} className={className}>{children}</h3>
        case 'h4':
          return <h4 key={key} className={className}>{children}</h4>
        case 'h5':
          return <h5 key={key} className={className}>{children}</h5>
        case 'h6':
          return <h6 key={key} className={className}>{children}</h6>
        default:
          return <h2 key={key} className={className}>{children}</h2>
      }
    }

    case 'list':
      if (node.listType === 'number') {
        return (
          <ol key={key} className="list-decimal list-inside mb-4 space-y-2 mr-4 text-gray-700">
            {node.children?.map((child, i) => renderNode(child, i))}
          </ol>
        )
      }
      return (
        <ul key={key} className="list-disc list-inside mb-4 space-y-2 mr-4 text-gray-700">
          {node.children?.map((child, i) => renderNode(child, i))}
        </ul>
      )

    case 'listitem':
      return (
        <li key={key} className="leading-relaxed">
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-r-4 border-purple-400 pr-4 my-6 text-gray-600 italic">
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      )

    case 'link':
    case 'autolink':
      const href = node.fields?.url || node.url || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          key={key}
          href={href}
          target={node.fields?.newTab || isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-purple-600 hover:text-purple-800 underline transition-colors"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      )

    case 'upload':
      if (node.value?.url) {
        return (
          <figure key={key} className="my-8">
            <img
              src={node.value.url}
              alt={node.value.alt || ''}
              className="w-full rounded-lg shadow-lg"
            />
            {node.value.alt && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {node.value.alt}
              </figcaption>
            )}
          </figure>
        )
      }
      return null

    case 'horizontalrule':
      return <hr key={key} className="my-8 border-gray-200" />

    default:
      // For unknown types, try to render children
      if (node.children) {
        return (
          <div key={key}>
            {node.children.map((child, i) => renderNode(child, i))}
          </div>
        )
      }
      return null
  }
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) {
    return null
  }

  return (
    <div className={`rich-text ${className}`}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  )
}
