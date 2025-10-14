import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ExternalLink, MessageCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { QuestionDto } from '@/types';

interface QuestionListProps {
  questions: QuestionDto[];
  totalCount: number;
  onSelectionChange: (selectedQuestions: QuestionDto[]) => void;
}

const ITEMS_PER_PAGE = 5;

export function QuestionList({ questions, totalCount, onSelectionChange }: QuestionListProps) {
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const toggleQuestion = (question: QuestionDto) => {
    const newSelected = new Set(selectedLinks);
    if (newSelected.has(question.link)) {
      newSelected.delete(question.link);
    } else {
      newSelected.add(question.link);
    }
    setSelectedLinks(newSelected);
    
    const selectedQuestions = questions.filter(q => newSelected.has(q.link));
    onSelectionChange(selectedQuestions);
  };

  const toggleExpand = (link: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(link)) {
      newExpanded.delete(link);
    } else {
      newExpanded.add(link);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleAll = () => {
    if (selectedLinks.size === questions.length) {
      setSelectedLinks(new Set());
      onSelectionChange([]);
    } else {
      const allLinks = new Set(questions.map(q => q.link));
      setSelectedLinks(allLinks);
      onSelectionChange(questions);
    }
  };

  const toggleCurrentPage = () => {
    const currentPageLinks = currentQuestions.map(q => q.link);
    const allCurrentSelected = currentPageLinks.every(link => selectedLinks.has(link));
    
    const newSelected = new Set(selectedLinks);
    if (allCurrentSelected) {
      currentPageLinks.forEach(link => newSelected.delete(link));
    } else {
      currentPageLinks.forEach(link => newSelected.add(link));
    }
    
    setSelectedLinks(newSelected);
    const selectedQuestions = questions.filter(q => newSelected.has(q.link));
    onSelectionChange(selectedQuestions);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              검색 결과
            </CardTitle>
            <CardDescription className="mt-2">
              총 {totalCount}개의 질문을 찾았습니다. 답변할 질문을 선택하세요.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {selectedLinks.size}개 선택됨
            </Badge>
            <Button variant="outline" size="sm" onClick={toggleCurrentPage}>
              현재 페이지 {currentQuestions.every(q => selectedLinks.has(q.link)) ? '해제' : '선택'}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleAll}>
              {selectedLinks.size === questions.length ? '전체 해제' : '전체 선택'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {currentQuestions.map((question) => {
            const isExpanded = expandedQuestions.has(question.link);
            const hasDetailQuestion = question.detailQuestion && question.detailQuestion !== 'Failed to fetch details';
            
            return (
              <div
                key={question.link}
                className={'p-4 border rounded-lg transition-colors ' + (selectedLinks.has(question.link) ? 'border-primary bg-accent/30' : 'hover:bg-accent/50')}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={selectedLinks.has(question.link)} 
                    onCheckedChange={() => toggleQuestion(question)} 
                    className="mt-1" 
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-medium text-lg leading-tight cursor-pointer hover:text-primary" onClick={() => toggleQuestion(question)}>
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {question.answerCount !== undefined && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {question.answerCount}개 답변
                          </Badge>
                        )}
                        {question.category && <Badge variant="secondary">{question.category}</Badge>}
                      </div>
                    </div>
                    
                    {hasDetailQuestion && (
                      <div className="space-y-2">
                        <p className={'text-sm text-muted-foreground transition-all ' + (isExpanded ? '' : 'line-clamp-2')}>
                          {question.detailQuestion}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => toggleExpand(question.link, e)}
                          className="h-6 px-2 text-xs"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3 h-3 mr-1" />
                              접기
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3 mr-1" />
                              전체 보기
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 pt-1">
                      <a 
                        href={question.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        네이버에서 질문 보기
                      </a>
                    </div>
                  </div>
                  {selectedLinks.has(question.link) && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />}
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => goToPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
