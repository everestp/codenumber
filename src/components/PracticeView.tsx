
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { mockData, Language, Chapter, mockData1 } from '../data/mockData';

interface PracticeViewProps {
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ sidebarOpen, onSidebarClose }) => {
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  
  const selectedLanguage = mockData.find(lang => lang.id === selectedLanguageId);
  const selectedChapter = selectedLanguage?.chapters.find(chapter => chapter.id === selectedChapterId);

  // Auto-select first language and chapter on mount
  useEffect(() => {
    if (mockData.length > 0 && !selectedLanguageId) {
      const firstLanguage = mockData[0];
      setSelectedLanguageId(firstLanguage.id);
      if (firstLanguage.chapters.length > 0) {
        setSelectedChapterId(firstLanguage.chapters[0].id);
      }
    }
  }, [selectedLanguageId]);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguageId(languageId);
    const language = mockData.find(lang => lang.id === languageId);
    if (language && language.chapters.length > 0) {
      setSelectedChapterId(language.chapters[0].id);
    }
  };

  const handleChapterSelect = (languageId: string, chapterId: string) => {
    setSelectedLanguageId(languageId);
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar
        languages={mockData}
        selectedLanguage={selectedLanguageId}
        selectedChapter={selectedChapterId}
        onLanguageSelect={handleLanguageSelect}
        onChapterSelect={handleChapterSelect}
        isOpen={sidebarOpen}
        onClose={onSidebarClose}
      />
      
      <MainContent
        selectedLanguage={selectedLanguage}
        selectedChapter={selectedChapter}
      />
    </div>
  );
};

export default PracticeView;
