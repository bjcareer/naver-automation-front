'use client'

import type { NewsLink } from '../lib/types'
import { Calendar, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface NewsListItemProps {
  news: NewsLink
  featured?: boolean
}

export function NewsListItem({ news, featured = false }: NewsListItemProps) {
  const imageUrl = news.promotionLink

  const formattedDate = new Date(news.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = new Date(news.createdAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (featured) {
    return (
      <article className="group relative pb-8 border-b border-gray-200">
        <a
          href={news.originalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {/* Featured Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-gray-900 bg-gray-100 uppercase">
              Featured
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                {news.title}
              </h2>

              {/* Summary */}
              <p className="text-lg text-gray-600 leading-relaxed mb-6 line-clamp-4">
                {news.summary}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={news.createdAt}>
                    {formattedDate} · {formattedTime}
                  </time>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </a>
      </article>
    )
  }

  return (
    <article className="group relative pb-8 border-b border-gray-100 last:border-0">
      <a
        href={news.originalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex gap-6">
          {/* Image Preview */}
          <div className="relative w-48 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={news.title}
                fill
                className="object-cover"
                sizes="192px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                No image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 leading-snug tracking-tight group-hover:text-gray-600 transition-colors duration-200">
              {news.title}
            </h2>

            {/* Summary */}
            <p className="text-base text-gray-600 leading-relaxed mb-4 line-clamp-2">
              {news.summary}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <time dateTime={news.createdAt} className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </time>
              <span className="text-gray-300">·</span>
              <span className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-3.5 h-3.5" />
                자세히 보기
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  )
}
