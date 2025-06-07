
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Language } from '../../data/mockData';

interface ChapterManagerProps {
  languages: Language[];
  onAddChapter: (languageId: string, chapterName: string) => void;
  onDeleteChapter: (languageId: string, chapterId: string) => void;
}

const ChapterManager: React.FC<ChapterManagerProps> = ({
  languages,
  onAddChapter,
  onDeleteChapter
}) => {
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [newChapterName, setNewChapterName] = useState('');

  const handleAddChapter = () => {
    if (selectedLanguageId && newChapterName.trim()) {
      onAddChapter(selectedLanguageId, newChapterName.trim());
      setNewChapterName('');
    }
  };

  const selectedLanguage = languages.find(lang => lang.id === selectedLanguageId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Chapter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="languageSelect">Select Language</Label>
              <Select value={selectedLanguageId} onValueChange={setSelectedLanguageId}>
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
              <Label htmlFor="chapterName">Chapter Name</Label>
              <Input
                id="chapterName"
                value={newChapterName}
                onChange={(e) => setNewChapterName(e.target.value)}
                placeholder="e.g., Variables, Functions, Loops"
                onKeyDown={(e) => e.key === 'Enter' && handleAddChapter()}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddChapter} 
            disabled={!selectedLanguageId || !newChapterName.trim()}
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Chapter
          </Button>
        </CardContent>
      </Card>

      {selectedLanguage && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Chapters in {selectedLanguage.name}
          </h3>
          {selectedLanguage.chapters.length === 0 ? (
            <p className="text-muted-foreground">No chapters added yet for this language.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedLanguage.chapters.map((chapter) => (
                <Card key={chapter.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{chapter.name}</h4>
                        <Badge variant="secondary" className="mt-2">
                          {chapter.questions.length} question{chapter.questions.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDeleteChapter(selectedLanguageId, chapter.id)}
                        className="text-destructive hover:text-destructive"
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
          Select a language above to view and manage its chapters
        </p>
      )}

      {languages.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No languages available. Please add a programming language first.
        </p>
      )}
    </div>
  );
};

export default ChapterManager;
