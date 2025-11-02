/**
 * News Link DTO matching backend response
 */
export interface NewsLink {
  id: string
  title: string
  originalLink: string
  promotionLink: string
  summary: string
  source: string
  status: string
  createdAt: string
}

/**
 * API Response from GET /news/:userId
 */
export interface NewsLinksResponse {
  userId: string
  total: number
  links: NewsLink[]
}
