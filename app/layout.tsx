import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: '주식 뉴스 모음 - 실시간 주식 정보',
  description: '20-30대를 위한 주식 뉴스 애그리게이터. 실시간 급등주, 투자 정보, 시장 분석을 한눈에.',
  keywords: ['주식 뉴스', '실시간 주식', '급등주', '투자 정보', '주식 투자'],
  openGraph: {
    title: '주식 뉴스 모음',
    description: '실시간 주식 뉴스와 투자 정보',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주식 뉴스 모음',
    description: '실시간 주식 뉴스와 투자 정보',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
