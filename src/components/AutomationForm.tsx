import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { FormData } from '@/types';

const formSchema = z.object({
  naverId: z.string().min(1, '네이버 ID를 입력하세요'),
  naverPw: z.string().min(1, '비밀번호를 입력하세요'),
  sortBy: z.enum(['keyword', 'latest']),
  keyword: z.string().optional(),
  maxAnswers: z.number().min(1).max(20).optional(),
}).refine((data) => {
  if (data.sortBy === 'keyword' && !data.keyword) {
    return false;
  }
  return true;
}, {
  message: '키워드를 입력하세요',
  path: ['keyword'],
});

interface AutomationFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export function AutomationForm({ onSubmit, isLoading }: AutomationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sortBy: 'latest',
      maxAnswers: 5,
    },
  });

  const sortBy = form.watch('sortBy');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="naverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>네이버 ID</FormLabel>
              <FormControl>
                <Input placeholder="your_naver_id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="naverPw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sortBy"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>검색 모드</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="latest" id="latest" />
                    <Label htmlFor="latest" className="font-normal cursor-pointer">
                      최신순
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="keyword" id="keyword" />
                    <Label htmlFor="keyword" className="font-normal cursor-pointer">
                      키워드 기반
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {sortBy === 'keyword' && (
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>검색 키워드</FormLabel>
                <FormControl>
                  <Input placeholder="예: 프로그래밍" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="maxAnswers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>최대 답변 수 (1-20)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? '답변 진행 중...' : '답변 시작'}
        </Button>
      </form>
    </Form>
  );
}
