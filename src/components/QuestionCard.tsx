
import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { Question } from '../data/mockData';
import CodeBlock from './Codeblock';

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
      
      <CodeBlock code={question?.code} language={question.title} />
    </div>
  );
};

export default QuestionCard;
