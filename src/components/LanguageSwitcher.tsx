
import React, { useState, useEffect } from 'react';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Language = 'fr' | 'en' | 'es';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  enabled: boolean;
}

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<LanguageOption[]>([
    { code: 'fr', name: 'Français', flag: '🇫🇷', enabled: true },
    { code: 'en', name: 'English', flag: '🇬🇧', enabled: true },
    { code: 'es', name: 'Español', flag: '🇪🇸', enabled: true }
  ]);

  // Mettre à jour les options de langue disponibles en fonction des traductions
  useEffect(() => {
    // Dans une version réelle, ces valeurs pourraient venir d'une API
    // ou d'une vérification des traductions disponibles
    console.log('[LanguageSwitcher] Checking available languages');
  }, []);

  const changeLanguage = (newLanguage: Language) => {
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

  // Déterminer le niveau de complétude des traductions
  const getTranslationCompleteness = (lang: Language): number => {
    // Dans une version réelle, ces valeurs pourraient provenir d'une API
    // ou d'une analyse des fichiers de traduction
    switch (lang) {
      case 'fr': return 95; // 95% des traductions sont complètes
      case 'en': return 100; // Langue de référence
      case 'es': return 65; // 65% des traductions sont complètes
      default: return 0;
    }
  };

  const currentLanguage = availableLanguages.find(l => l.code === language) || availableLanguages[1]; // Défaut à English

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-xs font-medium"
          disabled={isChanging}
          aria-label={t('Change language')}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          <span className="language-indicator">
            <span className="mr-1">{currentLanguage.flag}</span>
            {currentLanguage.name}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map(lang => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={language === lang.code ? 'bg-muted font-medium' : ''}
            disabled={!lang.enabled}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="mr-2">{lang.flag}</span> {lang.name}
              </div>
              {language !== lang.code && getTranslationCompleteness(lang.code) < 100 && (
                <span className="text-xs text-muted-foreground ml-2">
                  {getTranslationCompleteness(lang.code)}%
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
