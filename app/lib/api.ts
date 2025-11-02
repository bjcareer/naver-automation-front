import axios from 'axios'
import type { NewsLinksResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetch news links for a user
 * @param userId - User ID
 * @returns News links response
 */
export async function fetchNewsLinks(userId: string): Promise<NewsLinksResponse> {
  const { data } = await apiClient.get<NewsLinksResponse>(`/news/${userId}`)
  return data
}
