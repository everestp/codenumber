
import React from 'react';
import { Language, Chapter } from '../data/mockData';
import QuestionCard from './QuestionCard';

interface MainContentProps {
  selectedLanguage?: Language;
  selectedChapter?: Chapter;
}

const MainContent: React.FC<MainContentProps> = ({ selectedLanguage, selectedChapter }) => {
  if (!selectedLanguage || !selectedChapter) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Welcome to codenumber.net
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a programming language and chapter from the sidebar to start practicing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {selectedLanguage.name} - {selectedChapter.name}
          </h1>
          <p className="text-muted-foreground">
            Practice problems and solutions for {selectedChapter.name.toLowerCase()}
          </p>
        </div>
        
        <div className="space-y-6">
          {selectedChapter.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
