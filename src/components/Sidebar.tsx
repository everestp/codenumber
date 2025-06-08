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
  // Store only one expanded language at a time
  const [expandedLanguage, setExpandedLanguage] = useState<string | null>(selectedLanguage || null);

  const toggleLanguage = (languageId: string) => {
    // If clicking the already expanded language, collapse it
    // Otherwise, expand the new language and close others
    setExpandedLanguage(expandedLanguage === languageId ? null : languageId);
    onLanguageSelect(languageId);
  };

  const handleChapterSelect = (languageId: string, chapterId: string) => {
    onChapterSelect(languageId, chapterId);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay with smooth fade */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Sidebar with smooth slide-in */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-background border-r border-border z-50
        transform transition-all duration-300 ease-in-out
        md:relative md:top-0 md:h-[calc(100vh-4rem)] md:transform-none md:z-0
        ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4 transition-opacity duration-300">
            Programming Languages
          </h2>
          
          <div className="space-y-2">
            {languages.map((language) => (
              <div key={language.id} className="space-y-1">
                <button
                  onClick={() => toggleLanguage(language.id)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left
                    transition-all duration-200 ease-in-out
                    ${selectedLanguage === language.id 
                      ? 'bg-primary/10 text-primary border border-primary/20 scale-[1.02]' 
                      : 'hover:bg-accent text-foreground hover:scale-[1.01]'
                    }
                    active:scale-[0.98]
                  `}
                >
                  <span className="font-medium">{language.name}</span>
                  <div className="transition-transform duration-200 ease-in-out">
                    {expandedLanguage === language.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`
                    ml-4 space-y-1 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${expandedLanguage === language.id 
                      ? 'max-h-screen opacity-100' 
                      : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  {language.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterSelect(language.id, chapter.id)}
                      className={`
                        w-full text-left p-2 rounded-md text-sm
                        transition-all duration-200 ease-in-out
                        ${selectedChapter === chapter.id 
                          ? 'bg-primary/10 text-primary border border-primary/20 scale-[1.02]' 
                          : 'hover:bg-accent text-muted-foreground hover:text-foreground hover:scale-[1.01]'
                        }
                        active:scale-[0.98]
                      `}
                    >
                      {chapter.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;