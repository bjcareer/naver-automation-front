import axios from 'axios';
import type {
  SearchQuestionsRequest,
  GetLatestQuestionsRequest,
  QuestionSearchResponse,
  WriteAnswersRequest,
  AnswerWriteResponse
} from '@/types';

const FETCHER_BASE_URL = import.meta.env.VITE_SEARCH_API_URL || 'http://localhost:3000';
const WRITER_BASE_URL = import.meta.env.VITE_ANSWER_API_URL || 'http://localhost:3000';

/**
 * Search questions by keyword
 * GET /api/naver/questions/search?keyword=키워드&limit=10
 */
export async function searchQuestionsByKeyword(
  params: SearchQuestionsRequest
): Promise<QuestionSearchResponse> {
  try {
    const response = await axios.get<QuestionSearchResponse>(
      `${FETCHER_BASE_URL}/api/naver/questions/search`,
      {
        params,
        timeout: 300000, // 5분 (크롤링 시간 고려)
      }
    );
    return response.data;
  } catch (error) {
    console.error('Search questions error:', error);
    throw error;
  }
}

/**
 * Get latest questions
 * GET /api/naver/questions/latest?limit=20
 */
export async function getLatestQuestions(
  params: GetLatestQuestionsRequest = {}
): Promise<QuestionSearchResponse> {
  try {
    const response = await axios.get<QuestionSearchResponse>(
      `${FETCHER_BASE_URL}/api/naver/questions/latest`,
      {
        params,
        timeout: 300000, // 5분 (크롤링 시간 고려)
      }
    );
    return response.data;
  } catch (error) {
    console.error('Get latest questions error:', error);
    throw error;
  }
}

/**
 * Write answers to selected questions
 * POST /api/naver/answers/write
 */
export async function writeAnswers(
  data: WriteAnswersRequest
): Promise<AnswerWriteResponse> {
  try {
    const response = await axios.post<AnswerWriteResponse>(
      `${WRITER_BASE_URL}/api/naver/answers/write`,
      data,
      {
        timeout: 600000, // 10분
      }
    );
    return response.data;
  } catch (error) {
    console.error('Write answers error:', error);
    throw error;
  }
}
