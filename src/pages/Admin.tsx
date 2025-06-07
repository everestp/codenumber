
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plus } from 'lucide-react';
import LanguageManager from '../components/admin/LanguageManager';
import ChapterManager from '../components/admin/ChapterManager';
import QuestionManager from '../components/admin/QuestionManager';
import { mockData } from '../data/mockData';

const Admin = () => {
  const [languages, setLanguages] = useState(mockData);

  const addLanguage = (name: string) => {
    const newLanguage = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      chapters: []
    };
    setLanguages([...languages, newLanguage]);
  };

  const deleteLanguage = (languageId: string) => {
    setLanguages(languages.filter(lang => lang.id !== languageId));
  };

  const addChapter = (languageId: string, chapterName: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === languageId) {
        const newChapter = {
          id: chapterName.toLowerCase().replace(/\s+/g, '-'),
          name: chapterName,
          questions: []
        };
        return { ...lang, chapters: [...lang.chapters, newChapter] };
      }
      return lang;
    }));
  };

  const deleteChapter = (languageId: string, chapterId: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === languageId) {
        return { ...lang, chapters: lang.chapters.filter(ch => ch.id !== chapterId) };
      }
      return lang;
    }));
  };

  const addQuestion = (languageId: string, chapterId: string, title: string, code: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === languageId) {
        return {
          ...lang,
          chapters: lang.chapters.map(ch => {
            if (ch.id === chapterId) {
              const newQuestion = {
                id: title.toLowerCase().replace(/\s+/g, '-'),
                title,
                code
              };
              return { ...ch, questions: [...ch.questions, newQuestion] };
            }
            return ch;
          })
        };
      }
      return lang;
    }));
  };

  const deleteQuestion = (languageId: string, chapterId: string, questionId: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === languageId) {
        return {
          ...lang,
          chapters: lang.chapters.map(ch => {
            if (ch.id === chapterId) {
              return { ...ch, questions: ch.questions.filter(q => q.id !== questionId) };
            }
            return ch;
          })
        };
      }
      return lang;
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage programming languages, chapters, and coding questions
          </p>
        </div>

        <Tabs defaultValue="languages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="languages">
            <Card>
              <CardHeader>
                <CardTitle>Programming Languages</CardTitle>
                <CardDescription>
                  Add, edit, or remove programming languages from the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LanguageManager
                  languages={languages}
                  onAddLanguage={addLanguage}
                  onDeleteLanguage={deleteLanguage}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters">
            <Card>
              <CardHeader>
                <CardTitle>Chapters</CardTitle>
                <CardDescription>
                  Manage chapters for each programming language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChapterManager
                  languages={languages}
                  onAddChapter={addChapter}
                  onDeleteChapter={deleteChapter}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>
                  Add, edit, or remove coding questions from chapters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuestionManager
                  languages={languages}
                  onAddQuestion={addQuestion}
                  onDeleteQuestion={deleteQuestion}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
