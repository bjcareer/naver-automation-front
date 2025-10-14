import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Key, User, Lock, Link, Info, MessageSquare, Settings } from 'lucide-react';
import type { AccountFormData } from '@/types';

const formSchema = z.object({
  naverId: z.string().min(1, '네이버 아이디를 입력하세요'),
  naverPw: z.string().min(1, '네이버 비밀번호를 입력하세요'),
  openaiApiKey: z.string().min(1, 'OpenAI API 키를 입력하세요'),
  promotionLink: z.string().url('올바른 URL을 입력하세요').optional().or(z.literal('')),
  systemMessage: z.string().optional(),
  userPrompt: z.string().optional(),
});

interface AccountFormProps {
  onSubmit: (data: AccountFormData) => Promise<void>;
  isSubmitting: boolean;
  selectedCount: number;
}

export function AccountForm({ onSubmit, isSubmitting, selectedCount }: AccountFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      naverId: '',
      naverPw: '',
      openaiApiKey: '',
      promotionLink: '',
      systemMessage: '당신은 네이버 지식iN에서 질문에 답변하는 친절하고 전문적인 AI 어시스턴트입니다. 정확하고 유용한 정보를 제공하며, 한국어로 자연스럽게 답변합니다.',
      userPrompt: '위 질문에 대해 자세하고 이해하기 쉽게 답변해주세요.',
    },
  });

  return (
    <>
      <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/30">
        <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100 font-semibold">
          백그라운드 처리 안내
        </AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          답변 등록을 요청하면 <strong>서버에서 백그라운드로 자동 처리</strong>됩니다.
          <br />
          <span className="text-sm text-green-700 dark:text-green-300 mt-1 inline-block">
            ✅ 페이지를 닫거나 이탈해도 답변 등록은 계속 진행됩니다.
          </span>
        </AlertDescription>
      </Alert>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            2단계: 네이버 계정 및 API 설정
          </CardTitle>
          <CardDescription>
            선택한 {selectedCount}개 질문에 답변하기 위해 필요한 정보를 입력하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="naverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    네이버 아이디
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="naver_id"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    답변을 등록할 네이버 계정 아이디
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="naverPw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    네이버 비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    네이버 계정 비밀번호 (안전하게 처리됩니다)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openaiApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    OpenAI API 키
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    AI 답변 생성에 사용할 OpenAI API 키
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promotionLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    홍보 링크 (선택사항)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    답변에 포함할 홍보 링크 (선택사항)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AI 커스텀 설정 섹션 */}
            <div className="pt-6 border-t space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                  AI 답변 커스터마이징 (선택사항)
                </h3>
              </div>

              <Alert className="border-purple-200 bg-purple-50 dark:bg-purple-950/30">
                <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <AlertDescription className="text-purple-800 dark:text-purple-200 text-sm">
                  AI가 답변을 생성할 때 사용할 시스템 메시지와 사용자 프롬프트를 커스터마이징할 수 있습니다.
                  <br />
                  비워두면 기본 설정이 사용됩니다.
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="systemMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      시스템 메시지
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="예: 당신은 네이버 지식iN에서 질문에 답변하는 친절하고 전문적인 AI 어시스턴트입니다."
                        className="min-h-[100px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      AI의 역할과 답변 스타일을 정의합니다 (System Prompt)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userPrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      사용자 프롬프트
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="예: 위 질문에 대해 자세하고 이해하기 쉽게 답변해주세요."
                        className="min-h-[80px] resize-none"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      질문과 함께 전달될 추가 지침입니다 (User Prompt)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🤖</span>
                  AI 답변 생성 및 등록 중... (질문당 약 1-2분 소요)
                </span>
              ) : (
                `선택한 ${selectedCount}개 질문에 AI 답변 자동 등록`
              )}
            </Button>

            {isSubmitting && (
              <div className="space-y-2 mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  진행 중인 작업:
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4 list-disc">
                  <li>네이버 로그인</li>
                  <li>각 질문에 대해 OpenAI로 답변 생성</li>
                  <li>생성된 답변을 네이버 지식iN에 자동 등록</li>
                </ul>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                  💡 예상 소요 시간: 약 {selectedCount * 1.5}분
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
    </>
  );
}
