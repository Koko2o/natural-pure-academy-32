
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const changeLanguage = (newLanguage: 'fr' | 'en' | 'es') => {
    if (language === newLanguage) return;
    
    setIsChanging(true);
    console.log(`[Language] Switching from ${language} to ${newLanguage}`);
    
    try {
      // Méthode qui force le reload avec le paramètre lang
      window.location.href = `/?lang=${newLanguage}&force=true&t=${Date.now()}`;
      
      // Le reste du traitement se fait au chargement de la page dans LanguageContext
    } catch (error) {
      console.error('[Language] Error during language switch:', error);
      setIsChanging(false);
    }
  };

  // Obtenir le nom complet de la langue actuelle
  const getLanguageName = (code: string) => {
    switch (code) {
      case 'fr': return 'Français';
      case 'en': return 'English';
      case 'es': return 'Español';
      default: return code;
    }
  };

  // Obtenir le drapeau pour la langue (utilisant des emojis comme solution simple)
  const getLanguageFlag = (code: string) => {
    switch (code) {
      case 'fr': return '🇫🇷';
      case 'en': return '🇬🇧';
      case 'es': return '🇪🇸';
      default: return '🌐';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-xs font-medium"
          disabled={isChanging}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          <span className="language-indicator">
            {getLanguageName(language)}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('fr')}
          className={language === 'fr' ? 'bg-muted font-medium' : ''}
        >
          <span className="mr-2">{getLanguageFlag('fr')}</span> Français
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={language === 'en' ? 'bg-muted font-medium' : ''}
        >
          <span className="mr-2">{getLanguageFlag('en')}</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')}
          className={language === 'es' ? 'bg-muted font-medium' : ''}
        >
          <span className="mr-2">{getLanguageFlag('es')}</span> Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
