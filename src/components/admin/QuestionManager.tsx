
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2, Code } from 'lucide-react';
import { Language } from '../../data/mockData';

interface QuestionManagerProps {
  languages: Language[];
  onAddQuestion: (languageId: string, chapterId: string, title: string, code: string) => void;
  onDeleteQuestion: (languageId: string, chapterId: string, questionId: string) => void;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
  languages,
  onAddQuestion,
  onDeleteQuestion
}) => {
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionCode, setQuestionCode] = useState('');

  const handleAddQuestion = () => {
    if (selectedLanguageId && selectedChapterId && questionTitle.trim() && questionCode.trim()) {
      onAddQuestion(selectedLanguageId, selectedChapterId, questionTitle.trim(), questionCode.trim());
      setQuestionTitle('');
      setQuestionCode('');
    }
  };

  const selectedLanguage = languages.find(lang => lang.id === selectedLanguageId);
  const selectedChapter = selectedLanguage?.chapters.find(ch => ch.id === selectedChapterId);
  const availableChapters = selectedLanguage?.chapters || [];

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguageId(languageId);
    setSelectedChapterId('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="questionLanguageSelect">Select Language</Label>
              <Select value={selectedLanguageId} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="questionChapterSelect">Select Chapter</Label>
              <Select 
                value={selectedChapterId} 
                onValueChange={setSelectedChapterId}
                disabled={!selectedLanguageId || availableChapters.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a chapter" />
                </SelectTrigger>
                <SelectContent>
                  {availableChapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="questionTitle">Question Title</Label>
            <Input
              id="questionTitle"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="e.g., Write a function to calculate factorial"
            />
          </div>
          
          <div>
            <Label htmlFor="questionCode">Code Solution</Label>
            <Textarea
              id="questionCode"
              value={questionCode}
              onChange={(e) => setQuestionCode(e.target.value)}
              placeholder="Enter the code solution here..."
              className="font-mono text-sm min-h-[120px]"
            />
          </div>
          
          <Button 
            onClick={handleAddQuestion} 
            disabled={!selectedLanguageId || !selectedChapterId || !questionTitle.trim() || !questionCode.trim()}
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {selectedChapter && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Questions in {selectedLanguage?.name} - {selectedChapter.name}
          </h3>
          {selectedChapter.questions.length === 0 ? (
            <p className="text-muted-foreground">No questions added yet for this chapter.</p>
          ) : (
            <div className="space-y-4">
              {selectedChapter.questions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">{question.title}</h4>
                        </div>
                        <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                          <code>{question.code}</code>
                        </pre>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDeleteQuestion(selectedLanguageId, selectedChapterId, question.id)}
                        className="text-destructive hover:text-destructive ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedLanguageId && languages.length > 0 && (
        <p className="text-muted-foreground text-center py-8">
          Select a language and chapter above to view and manage questions
        </p>
      )}

      {languages.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No languages available. Please add a programming language first.
        </p>
      )}

      {selectedLanguageId && availableChapters.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No chapters available for this language. Please add a chapter first.
        </p>
      )}
    </div>
  );
};

export default QuestionManager;
