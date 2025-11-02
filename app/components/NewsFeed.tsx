'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNewsLinks } from '../lib/api'
import { NewsListItem } from './NewsListItem'
import { SearchBar } from './SearchBar'
import { useState } from 'react'
import { Newspaper } from 'lucide-react'

const USER_ID = process.env.NEXT_PUBLIC_USER_ID || '1'

export function NewsFeed() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', USER_ID],
    queryFn: () => fetchNewsLinks(USER_ID),
  })

  const filteredLinks = data?.links.filter((link) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      link.title.toLowerCase().includes(query) ||
      link.summary.toLowerCase().includes(query)
    )
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-sm text-gray-500">뉴스를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
            뉴스를 불러올 수 없습니다
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {error instanceof Error ? error.message : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Masthead Header */}
      <header className="border-b border-gray-200 sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Logo & Tagline */}
          <div className="py-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Newspaper className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
              <h1 className="text-4xl lg:text-5xl font-serif font-black text-gray-900 tracking-tight">
                The Investor
              </h1>
            </div>
            <p className="text-sm text-gray-500 font-light tracking-wide ml-11">
              Financial Intelligence for the Modern Investor
            </p>
          </div>

          {/* Search Bar */}
          <div className="py-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* News Grid */}
        <div className="space-y-8">
          {filteredLinks && filteredLinks.length > 0 ? (
            filteredLinks.map((link, index) => (
              <NewsListItem
                key={link.id}
                news={link}
                featured={index === 0}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">검색 결과가 없습니다</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {data && filteredLinks && filteredLinks.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400 tracking-wide">
              — {filteredLinks.length} —
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
