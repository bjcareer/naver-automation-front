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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp } from 'lucide-react';
import type { SearchFormData } from '@/types';

const formSchema = z.object({
  sortBy: z.enum(['keyword', 'latest']),
  keyword: z.string().optional(),
  limit: z.number().min(1).max(15).default(10),
}).refine((data) => {
  if (data.sortBy === 'keyword' && !data.keyword) {
    return false;
  }
  return true;
}, {
  message: '키워드를 입력하세요',
  path: ['keyword'],
});

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function SearchForm({ onSubmit, isSubmitting }: SearchFormProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sortBy: 'keyword' as const,
      keyword: '',
      limit: 10,
    },
  });

  const sortBy = form.watch('sortBy');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          질문 검색
        </CardTitle>
        <CardDescription>
          네이버 지식iN에서 답변할 질문을 검색하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>검색 방식</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="keyword" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                          <Search className="w-4 h-4" />
                          키워드 검색
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="latest" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                          <TrendingUp className="w-4 h-4" />
                          최신 질문
                        </FormLabel>
                      </FormItem>
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
                      <Input
                        placeholder="예: 부업, 재테크, 투자"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      검색하고 싶은 키워드를 입력하세요
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>검색 개수</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    검색할 질문의 최대 개수 (1-50)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  네이버에서 질문 수집 중... (최대 5분 소요)
                </span>
              ) : (
                '질문 검색'
              )}
            </Button>

            {isSubmitting && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                💡 잠시만 기다려주세요. 네이버 지식iN에서 질문을 크롤링하고 있습니다.
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
