
import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Calculator, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartPracticing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartPracticing }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Code size={24} />
        </div>
        <div className="absolute top-40 right-20 text-primary/10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Calculator size={20} />
        </div>
        <div className="absolute bottom-40 left-20 text-primary/10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <Zap size={18} />
        </div>
        <div className="absolute bottom-20 right-10 text-primary/10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Code size={22} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            codenumber.net
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground italic font-light mb-12 tracking-wide">
            when code meets calculations
          </p>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Master programming through hands-on practice. Explore languages, solve problems, and enhance your coding skills with our curated collection of exercises.
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={onStartPracticing}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Start Practicing
          </Button>
          
          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Multiple Languages</h3>
              <p className="text-muted-foreground">Practice with Python, C++, and more programming languages</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
              <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Structured Learning</h3>
              <p className="text-muted-foreground">Organized chapters and progressive difficulty levels</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Access</h3>
              <p className="text-muted-foreground">Copy code examples and start practicing immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
