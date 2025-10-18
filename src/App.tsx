import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { QuestionList } from '@/components/QuestionList';
import { AccountForm } from '@/components/AccountForm';
import { ResultDisplay } from '@/components/ResultDisplay';
import { searchQuestionsByKeyword, getLatestQuestions, writeAnswers } from '@/services/lambdaApi';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { SEO } from '@/hooks/useSEO';
import type { SearchFormData, AccountFormData, QuestionDto, AnswerWriteResponse } from '@/types';

type Step = 'search' | 'select' | 'account' | 'result';

function App() {
  const [step, setStep] = useState<Step>('search');
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionDto[]>([]);
  const [result, setResult] = useState<AnswerWriteResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (data: SearchFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = data.sortBy === 'keyword'
        ? await searchQuestionsByKeyword({ keyword: data.keyword!, limit: data.limit })
        : await getLatestQuestions({ limit: data.limit });

      setQuestions(response.questions);
      setTotalCount(response.totalCount);
      setStep('select');
    } catch (err) {
      setError(err instanceof Error ? err.message : '질문 검색 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectionChange = (selected: QuestionDto[]) => {
    setSelectedQuestions(selected);
  };

  const handleProceedToAccount = () => {
    if (selectedQuestions.length === 0) {
      setError('최소 1개 이상의 질문을 선택하세요');
      return;
    }
    setError(null);
    setStep('account');
  };

  const handleAccountSubmit = async (accountData: AccountFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 답변 요청을 서버로 전송 (백그라운드 처리)
      const response = await writeAnswers({
        questions: selectedQuestions,
        naverId: accountData.naverId,
        naverPw: accountData.naverPw,
        systemMessage: accountData.systemMessage,
        userPrompt: accountData.userPrompt,
      });

      setResult(response);
      setStep('result');

      // 성공 알림 표시 (페이지 이탈 가능 안내)
      if (response.processed > 0) {
        console.log('✅ 답변 등록 요청이 성공적으로 전송되었습니다. 서버에서 백그라운드로 처리 중입니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '답변 등록 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('search');
    setQuestions([]);
    setTotalCount(0);
    setSelectedQuestions([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEO />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            네이버 지식iN 자동 답변 시스템
          </h1>
          <p className="text-muted-foreground">
            AI를 활용한 스마트 질문 답변 자동화
          </p>
        </header>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'search' && (
          <>
            {/* Hero Section */}
            <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl text-white">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold">
                  네이버 지식iN 자동 답변 등록 서비스
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  질문을 검색하고 선택하면, AI가 자동으로 답변을 생성하여 네이버 지식iN에 등록해드립니다
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">1️⃣</span>
                      질문 검색
                    </div>
                    <p className="text-sm text-white/80">
                      키워드나 최신 질문으로 답변할 질문을 찾아보세요
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">2️⃣</span>
                      AI 답변 생성
                    </div>
                    <p className="text-sm text-white/80">
                      OpenAI가 각 질문에 맞는 전문적인 답변을 자동 생성합니다
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-2xl">3️⃣</span>
                      자동 등록
                    </div>
                    <p className="text-sm text-white/80">
                      생성된 답변을 네이버 지식iN에 자동으로 등록해드립니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SearchForm onSubmit={handleSearch} isSubmitting={isSubmitting} />
          </>
        )}

        {step === 'select' && (
          <>
            <Button variant="outline" onClick={handleReset} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              다시 검색하기
            </Button>

            <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/30">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold">
                AI 자동 답변 기능
              </AlertTitle>
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                답변할 질문을 선택하시면, OpenAI를 활용하여 <strong>자동으로 답변을 생성하고 네이버 지식iN에 등록</strong>합니다.
                <br />
                <span className="text-sm text-blue-700 dark:text-blue-300 mt-1 inline-block">
                  💡 답변하고 싶은 질문을 체크박스로 선택한 후 계정 정보를 입력하세요.
                </span>
              </AlertDescription>
            </Alert>

            <QuestionList
              questions={questions}
              totalCount={totalCount}
              onSelectionChange={handleSelectionChange}
            />
            {selectedQuestions.length > 0 && (
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleProceedToAccount}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  다음 단계: AI 자동 답변 설정 ({selectedQuestions.length}개 선택됨)
                </Button>
              </div>
            )}
          </>
        )}

        {step === 'account' && (
          <>
            <Button variant="outline" onClick={() => setStep('select')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              질문 선택으로 돌아가기
            </Button>
            <AccountForm
              onSubmit={handleAccountSubmit}
              isSubmitting={isSubmitting}
              selectedCount={selectedQuestions.length}
            />
          </>
        )}

        {step === 'result' && result && (
          <>
            <ResultDisplay result={result} />
            <div className="mt-6 flex justify-center">
              <Button size="lg" onClick={handleReset}>
                새로운 질문 검색하기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
