
import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onMenuToggle: () => void;
  showMenuButton?: boolean;
  onNavigateHome?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, showMenuButton = false, onNavigateHome }) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateHome = () => {
    if (location.pathname === '/') {
      onNavigateHome?.();
    } else {
      navigate('/');
    }
  };

  const handleNavigateAdmin = () => {
    navigate('/admin');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-accent rounded-md transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={handleNavigateHome}
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            codenumber.net
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleNavigateHome}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Home
            </button>
            <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Practice
            </span>
            <button
              onClick={handleNavigateAdmin}
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/admin' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Admin
            </button>
          </nav>
          
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
