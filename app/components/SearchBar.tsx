'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="기사 제목이나 키워드로 검색..."
        className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm transition-all"
      />
    </div>
  )
}
