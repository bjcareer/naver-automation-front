/**
 * Niche Keyword Database for SEO Optimization
 *
 * Selection Criteria:
 * - Low competition keywords targeting specific user intent
 * - Focus on automation, side hustle, and marketing niches
 * - Keywords that drive traffic to automation-front service
 */

export interface NicheKeyword {
  keyword: string;
  searchVolume: number; // Monthly search volume estimate
  competition: 'low' | 'medium' | 'high';
  priority: number; // 1-10, higher = more important
  seoTitle: string;
  seoDescription: string;
  relatedKeywords: string[];
  serviceContext: string; // How to mention the service naturally
}

export const nicheKeywords: NicheKeyword[] = [
  {
    keyword: '네이버 지식인 자동화',
    searchVolume: 800,
    competition: 'low',
    priority: 10,
    seoTitle: '네이버 지식iN 자동화 도구 | AI 답변 등록 시스템',
    seoDescription: '네이버 지식iN 질문에 AI가 자동으로 답변을 생성하고 등록합니다. 효율적인 지식인 자동화로 시간을 절약하세요.',
    relatedKeywords: ['지식인 답변 자동화', '네이버 자동 답변', 'AI 답변 도구'],
    serviceContext: '이런 작업을 효율화하고 싶으시다면, AI 기반 자동 답변 시스템을 활용해보세요. 질문 검색부터 답변 등록까지 자동화할 수 있습니다.'
  },
  {
    keyword: '지식인 답변 대행',
    searchVolume: 600,
    competition: 'low',
    priority: 9,
    seoTitle: '지식iN 답변 대행 서비스 | AI 자동 답변 등록',
    seoDescription: 'AI가 네이버 지식iN 답변을 대신 작성하고 등록해드립니다. 전문적인 답변으로 채택률을 높이세요.',
    relatedKeywords: ['지식인 답변 서비스', '네이버 답변 작성 대행', 'AI 답변 대행'],
    serviceContext: '답변 작성이 부담스러우시다면, AI 답변 대행 시스템으로 자동화할 수 있습니다. OpenAI를 활용한 전문적인 답변 생성이 가능합니다.'
  },
  {
    keyword: '온라인 마케팅 자동화',
    searchVolume: 1200,
    competition: 'medium',
    priority: 8,
    seoTitle: '온라인 마케팅 자동화 솔루션 | 네이버 지식iN 활용',
    seoDescription: '네이버 지식iN을 활용한 온라인 마케팅 자동화 전략. AI 답변으로 브랜드 노출과 유입을 증대시키세요.',
    relatedKeywords: ['디지털 마케팅 자동화', '네이버 마케팅 도구', 'SNS 자동화'],
    serviceContext: '네이버 지식iN은 효과적인 온라인 마케팅 채널입니다. 자동 답변 시스템으로 지속적인 브랜드 노출을 만들 수 있습니다.'
  },
  {
    keyword: '부업 자동화',
    searchVolume: 900,
    competition: 'low',
    priority: 7,
    seoTitle: '부업 자동화 도구 | 네이버 지식iN 수익 창출',
    seoDescription: '네이버 지식iN 답변으로 수익을 창출하세요. AI 자동화로 효율적인 부업 시스템을 구축할 수 있습니다.',
    relatedKeywords: ['자동 수익 시스템', '온라인 부업', '지식인 수익화'],
    serviceContext: '부업으로 지식iN 활동을 고려 중이시라면, 자동화 시스템으로 시간 대비 효율을 크게 높일 수 있습니다.'
  },
  {
    keyword: 'AI 답변 생성기',
    searchVolume: 700,
    competition: 'medium',
    priority: 8,
    seoTitle: 'AI 답변 생성기 | 네이버 지식iN 전문 답변 작성',
    seoDescription: 'OpenAI 기반 AI 답변 생성기로 네이버 지식iN 전문 답변을 자동으로 작성합니다. 높은 채택률과 신뢰도를 보장합니다.',
    relatedKeywords: ['GPT 답변 작성', 'AI 자동 작성', '챗GPT 활용'],
    serviceContext: '전문적인 답변 작성이 어렵다면, AI 답변 생성기를 활용해보세요. OpenAI가 질문 맥락을 이해하고 최적화된 답변을 생성합니다.'
  },
  {
    keyword: '네이버 SEO 최적화',
    searchVolume: 1500,
    competition: 'high',
    priority: 6,
    seoTitle: '네이버 SEO 최적화 | 지식iN 답변으로 검색 노출 증대',
    seoDescription: '네이버 지식iN 답변을 활용한 SEO 최적화 전략. 니치 키워드 타겟팅으로 검색 노출을 극대화하세요.',
    relatedKeywords: ['네이버 검색 최적화', '지식인 SEO', '블로그 상위 노출'],
    serviceContext: '네이버 검색 노출을 높이려면 지식iN 활동이 효과적입니다. 자동화 시스템으로 꾸준한 콘텐츠 발행이 가능합니다.'
  },
  {
    keyword: '지식인 채택률 높이기',
    searchVolume: 500,
    competition: 'low',
    priority: 7,
    seoTitle: '지식iN 채택률 높이는 방법 | AI 전문 답변 작성',
    seoDescription: '네이버 지식iN 채택률을 높이는 전략과 AI 답변 작성 팁. 전문적인 답변 구조와 키워드 최적화 방법을 안내합니다.',
    relatedKeywords: ['지식인 베스트 답변', '채택 잘되는 답변', '지식인 팁'],
    serviceContext: '채택률을 높이려면 답변 품질이 중요합니다. AI 시스템은 구조화된 전문 답변으로 채택 가능성을 높입니다.'
  },
  {
    keyword: '콘텐츠 마케팅 도구',
    searchVolume: 1000,
    competition: 'medium',
    priority: 6,
    seoTitle: '콘텐츠 마케팅 자동화 도구 | 네이버 지식iN AI 시스템',
    seoDescription: 'AI 기반 콘텐츠 마케팅 도구로 네이버 지식iN 답변을 자동화하세요. 지속적인 브랜드 콘텐츠 발행이 가능합니다.',
    relatedKeywords: ['콘텐츠 자동화', '마케팅 자동화 툴', 'AI 마케팅'],
    serviceContext: '콘텐츠 마케팅을 효율화하려면 자동화가 필수입니다. 지식iN 답변을 통해 자연스러운 브랜드 노출을 만들 수 있습니다.'
  }
];

/**
 * Get keyword by exact match
 */
export function getKeywordByName(keyword: string): NicheKeyword | undefined {
  return nicheKeywords.find(k => k.keyword === keyword);
}

/**
 * Get top priority keywords
 */
export function getTopKeywords(limit: number = 5): NicheKeyword[] {
  return [...nicheKeywords]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

/**
 * Get keywords by competition level
 */
export function getKeywordsByCompetition(competition: 'low' | 'medium' | 'high'): NicheKeyword[] {
  return nicheKeywords.filter(k => k.competition === competition);
}

/**
 * Search keywords by query (fuzzy match)
 */
export function searchKeywords(query: string): NicheKeyword[] {
  const lowerQuery = query.toLowerCase();
  return nicheKeywords.filter(k =>
    k.keyword.includes(query) ||
    k.relatedKeywords.some(rk => rk.includes(query)) ||
    k.seoTitle.toLowerCase().includes(lowerQuery)
  );
}
