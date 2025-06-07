
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Question } from '../data/mockData';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {question?.title}
      </h3>
      
      <div className="relative">
        <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground whitespace-pre">
            {question?.code}
          </code>
        </pre>
        
        <button
          onClick={handleCopy}
          className={`
            absolute top-2 right-2 p-2 rounded-md transition-colors duration-200
            ${copied 
              ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
              : 'bg-background border border-border hover:bg-accent'
            }
          `}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
