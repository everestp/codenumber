
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Language } from '../data/mockData';

interface SidebarProps {
  languages: Language[];
  selectedLanguage?: string;
  selectedChapter?: string;
  onLanguageSelect: (languageId: string) => void;
  onChapterSelect: (languageId: string, chapterId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  languages,
  selectedLanguage,
  selectedChapter,
  onLanguageSelect,
  onChapterSelect,
  isOpen,
  onClose
}) => {
  const [expandedLanguages, setExpandedLanguages] = useState<Set<string>>(new Set([selectedLanguage]));

  const toggleLanguage = (languageId: string) => {
    const newExpanded = new Set(expandedLanguages);
    if (newExpanded.has(languageId)) {
      newExpanded.delete(languageId);
    } else {
      newExpanded.add(languageId);
    }
    setExpandedLanguages(newExpanded);
    onLanguageSelect(languageId);
  };

  const handleChapterSelect = (languageId: string, chapterId: string) => {
    onChapterSelect(languageId, chapterId);
    onClose(); // Close mobile sidebar when chapter is selected
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-background border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        md:relative md:top-0 md:h-[calc(100vh-4rem)] md:transform-none md:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Programming Languages</h2>
          
          <div className="space-y-2">
            {languages.map((language) => (
              <div key={language.id} className="space-y-1">
                <button
                  onClick={() => toggleLanguage(language.id)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left
                    transition-colors duration-200
                    ${selectedLanguage === language.id 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-accent text-foreground'
                    }
                  `}
                >
                  <span className="font-medium">{language.name}</span>
                  {expandedLanguages.has(language.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedLanguages.has(language.id) && (
                  <div className="ml-4 space-y-1 animate-accordion-down">
                    {language.chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterSelect(language.id, chapter.id)}
                        className={`
                          w-full text-left p-2 rounded-md text-sm
                          transition-colors duration-200
                          ${selectedChapter === chapter.id 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        {chapter.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
