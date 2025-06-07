
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { Language } from '../../data/mockData';

interface LanguageManagerProps {
  languages: Language[];
  onAddLanguage: (name: string) => void;
  onDeleteLanguage: (languageId: string) => void;
}

const LanguageManager: React.FC<LanguageManagerProps> = ({
  languages,
  onAddLanguage,
  onDeleteLanguage
}) => {
  const [newLanguageName, setNewLanguageName] = useState('');

  const handleAddLanguage = () => {
    if (newLanguageName.trim()) {
      onAddLanguage(newLanguageName.trim());
      setNewLanguageName('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="languageName">Language Name</Label>
              <Input
                id="languageName"
                value={newLanguageName}
                onChange={(e) => setNewLanguageName(e.target.value)}
                placeholder="e.g., JavaScript, Java, Go"
                onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddLanguage} disabled={!newLanguageName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Existing Languages</h3>
        {languages.length === 0 ? (
          <p className="text-muted-foreground">No languages added yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <Card key={language.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{language.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {language.chapters.length} chapter{language.chapters.length !== 1 ? 's' : ''}
                        </Badge>
                        <Badge variant="outline">
                          {language.chapters.reduce((total, ch) => total + ch.questions.length, 0)} question{language.chapters.reduce((total, ch) => total + ch.questions.length, 0) !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDeleteLanguage(language.id)}
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
    </div>
  );
};

export default LanguageManager;
