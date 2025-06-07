import { useState, useEffect, useRef } from 'react';
import { Check, Copy, Download, Moon, Sun, Code } from 'lucide-react';

// Import SyntaxHighlighter and necessary styles/languages from react-syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Import Prism themes
import { dracula, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import specific language definitions if needed (Prism doesn't include all by default)
// For example, if you need JSX, TypeScript, etc., you might need to import them:
// import { jsx, typescript } from 'react-syntax-highlighter/dist/esm/languages/prism';
// Note: 'javascript' and 'python' are usually included by default in the 'prism' bundle.

const CodeBlock = ({
  code,
  language = 'javascript',
  filename = 'code',
  showLineNumbers = true,
  initialTheme = 'dark'
}) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const codeRef = useRef(null); // This ref might not be strictly needed anymore for highlighting

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Optionally, provide user feedback that copying failed
    }
  };

  const handleDownload = () => {
    const extension = {
      javascript: 'js',
      python: 'py',
      html: 'html',
      css: 'css',
      typescript: 'ts',
      jsx: 'jsx',
      json: 'json'
      // Add more as needed
    }[language] || 'txt';

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        container: 'bg-gray-900 border-gray-700',
        header: 'bg-gray-800 border-gray-700',
        headerText: 'text-gray-300',
        // Code background is handled by Prism theme directly, but we keep this for consistency if needed
        codeWrapper: 'bg-gray-900', // This wrapper maintains the overall dark bg
        button: 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
      };
    } else {
      return {
        container: 'bg-white border-gray-300',
        header: 'bg-gray-100 border-gray-300',
        headerText: 'text-gray-700',
        codeWrapper: 'bg-white', // This wrapper maintains the overall light bg
        button: 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
      };
    }
  };

  const themeClasses = getThemeClasses();

  // Choose Prism theme based on component's theme state
  const codeTheme = theme === 'dark' ? dracula : coy;

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* The inline style for syntax highlighting is now gone, as Prism handles it */}
      
      <div className={`relative rounded-lg shadow-lg border transition-colors duration-200 ${themeClasses.container}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 rounded-t-lg border-b transition-colors duration-200 ${themeClasses.header}`}>
          <div className="flex items-center gap-3">
            <Code className={`h-4 w-4 ${themeClasses.headerText}`} />
            {filename && (
              <span className={`text-xs opacity-75 ${themeClasses.headerText}`}>
                {/* {filename}.{language === 'javascript' ? 'js' : language} */}
              </span>
            )}
            {/* <span className={`text-sm font-mono font-medium ${themeClasses.headerText}`}>
              {language}
            </span> */}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 border ${themeClasses.button}`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            <button
              onClick={handleDownload}
              className={`p-2 rounded-md transition-all duration-200 border ${themeClasses.button}`}
              title="Download code"
            >
              <Download className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 text-sm border ${
                copied
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : themeClasses.button
              }`}
              title={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content - Now using SyntaxHighlighter */}
        <div className={`relative overflow-hidden rounded-b-lg ${themeClasses.codeWrapper}`}>
          <SyntaxHighlighter
            style={codeTheme} // Apply the chosen Prism theme
            language={language}
            showLineNumbers={showLineNumbers}
            // Use customStyle to override default highlighter styles if needed
            // The padding and margin need to be managed carefully with `customStyle`
            // and Tailwind classes to avoid conflicts.
            customStyle={{
              margin: 0,
              padding: '1rem',
              // Ensure background matches header for seamless look if necessary,
              // though theme usually handles this.
              background: 'transparent', // Let parent wrapper handle background
            }}
            codeTagProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: '0.875rem', // text-sm
                lineHeight: '1.5rem', // leading-6
              }
            }}
            // You can also pass a className to the pre tag
            // PreTag="pre" // default is 'pre'
            // CodeTag="code" // default is 'code'
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;