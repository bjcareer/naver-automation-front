import { useEffect } from 'react';

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
 * SEO Hook using native DOM manipulation
 * Compatible with React 19
 *
 * Usage:
 * useSEO({
 *   title: '네이버 지식iN 자동화 도구',
 *   description: 'AI 기반 자동 답변 시스템',
 *   keywords: ['네이버 지식인', '자동화', 'AI 답변']
 * })
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

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    // Update Open Graph tags
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:title', ogTitle, true);
    updateMetaTag('og:description', ogDescription, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Naver KIN Auto Answer', true);
    updateMetaTag('og:locale', 'ko_KR', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage]);
}

/**
 * Default SEO component for app-wide usage
 */
export function SEO(props: SEOProps = {}) {
  useSEO(props);
  return null;
}
