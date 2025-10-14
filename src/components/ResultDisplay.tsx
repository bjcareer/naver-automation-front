import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { AnswerWriteResponse } from '@/types';

interface ResultDisplayProps {
  result: AnswerWriteResponse;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const hasFailures = result.failed > 0;
  const successRate = ((result.processed / (result.processed + result.failed)) * 100).toFixed(1);

  return (
    <>
      <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/30">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold">
          백그라운드 처리 완료
        </AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          요청하신 답변 등록이 <strong>서버에서 백그라운드로 처리</strong>되었습니다.
          <br />
          <span className="text-sm text-blue-700 dark:text-blue-300 mt-1 inline-block">
            ℹ️ 아래 결과는 처리 완료 후 반환된 최종 결과입니다.
          </span>
        </AlertDescription>
      </Alert>

      <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {hasFailures ? (
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
          답변 등록 결과
        </CardTitle>
        <CardDescription>
          답변 처리 완료 - 성공률: {successRate}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex gap-4">
          <Alert className="flex-1 border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-200">성공</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300 text-2xl font-bold">
              {result.processed}개
            </AlertDescription>
          </Alert>
          
          {hasFailures && (
            <Alert className="flex-1 border-red-500 bg-red-50 dark:bg-red-950">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-200">실패</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300 text-2xl font-bold">
                {result.failed}개
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Detailed Results */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-muted-foreground">상세 결과</h3>
          {result.results.map((item, index) => (
            <div
              key={item.link}
              className={'p-3 rounded-lg border ' + (item.success ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900')}
            >
              <div className="flex items-start gap-3">
                {item.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium">질문 #{index + 1}</span>
                    <Badge variant={item.success ? 'default' : 'destructive'} className="text-xs">
                      {item.success ? '성공' : '실패'}
                    </Badge>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline block"
                  >
                    {item.link}
                  </a>
                  {item.error && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      오류: {item.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </>
  );
}
