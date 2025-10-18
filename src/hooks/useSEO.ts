import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Dynamic SEO Hook using react-helmet-async
 *
 * Usage:
 * const SEO = useSEO({
 *   title: '네이버 지식iN 자동화 도구',
 *   description: 'AI 기반 자동 답변 시스템',
 *   keywords: ['네이버 지식인', '자동화', 'AI 답변']
 * });
 *
 * return <>{SEO}...</>
 */
export function useSEO(props: SEOProps = {}) {
  const {
    title = '네이버 지식iN 자동 답변 시스템 | AI 기반 자동 답변 등록 서비스',
    description = '네이버 지식iN 질문을 검색하고 AI가 자동으로 답변을 생성하여 등록합니다. 키워드 검색으로 원하는 질문을 찾고 OpenAI로 전문적인 답변을 작성하세요.',
    keywords = [
      '네이버 지식iN',
      '자동 답변',
      'AI 답변',
      'OpenAI',
      '질문 답변',
      '지식인 자동화',
      '부업',
      '마케팅',
      '네이버 지식인 자동화',
      '지식인 답변 대행',
      'AI 답변 생성기'
    ],
    canonicalUrl = 'https://main.d2svn1j18zxxzl.amplifyapp.com/',
    ogTitle = title,
    ogDescription = description,
    ogImage = 'https://main.d2svn1j18zxxzl.amplifyapp.com/og-image.png'
  } = props;

  const SEO = (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Naver KIN Auto Answer" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );

  return SEO;
}

/**
 * SEO preset for keyword-based pages
 */
export function useKeywordSEO(keyword: string) {
  return useSEO({
    title: `${keyword} | 네이버 지식iN 자동 답변 시스템`,
    description: `${keyword} 관련 네이버 지식iN 질문에 AI가 자동으로 답변을 생성하고 등록합니다. 효율적인 자동화로 시간을 절약하세요.`,
    keywords: [keyword, '네이버 지식iN', '자동 답변', 'AI', 'OpenAI', '자동화'],
    ogTitle: `${keyword} 자동 답변 | AI 시스템`
  });
}
