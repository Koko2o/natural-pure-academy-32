import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, t, toggleDebugger } = useLanguage();

  const handleLanguageChange = (lang: 'fr' | 'en' | 'es') => {
    setLanguage(lang);
  };

  // Double-click handler to toggle debugger (dev feature)
  const handleDoubleClick = () => {
    toggleDebugger();
  };

  return (
    <div className={`flex items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onDoubleClick={handleDoubleClick}>
          <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
            <Globe className="h-4 w-4" />
            <span className="sm:inline hidden">{t('language')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
              {language.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('fr')}
            className={language === 'fr' ? 'bg-slate-100 dark:bg-slate-800' : ''}
          >
            <span className="mr-2">🇫🇷</span> Français
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('en')}
            className={language === 'en' ? 'bg-slate-100 dark:bg-slate-800' : ''}
          >
            <span className="mr-2">🇬🇧</span> English
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('es')}
            className={language === 'es' ? 'bg-slate-100 dark:bg-slate-800' : ''}
          >
            <span className="mr-2">🇪🇸</span> Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;