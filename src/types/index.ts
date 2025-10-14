export type SortMode = 'keyword' | 'latest';

// Backend API DTOs - matches shared/dto/question.dto.ts
export interface QuestionDto {
  link: string;
  title: string;
  detailQuestion: string;
  answerCount?: number;
  category?: string;
}

// Step 1: Search questions (GET /questions/search or /questions/latest)
export interface SearchQuestionsRequest {
  keyword: string;
  limit?: number;
}

export interface GetLatestQuestionsRequest {
  limit?: number;
}

export interface QuestionSearchResponse {
  questions: QuestionDto[];
  totalCount: number;
}

// Step 2: Answer questions (POST /questions/answer)
export interface WriteAnswersRequest {
  questions: QuestionDto[];
  naverId: string;
  naverPw: string;
  systemMessage?: string;
  userPrompt?: string;
}

export interface AnswerWriteResponse {
  processed: number;
  failed: number;
  results: Array<{
    link: string;
    success: boolean;
    error?: string;
  }>;
}

// Form data types
export interface SearchFormData {
  sortBy: SortMode;
  keyword?: string;
  limit?: number;
}

export interface AccountFormData {
  naverId: string;
  naverPw: string;
  systemMessage?: string;
  userPrompt?: string;
}
