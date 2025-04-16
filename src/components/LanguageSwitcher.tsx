
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = () => {
    setIsChanging(true);
    
    // Toggle between 'en' and 'fr'
    const newLanguage = language === 'en' ? 'fr' : 'en';
    
    console.log(`[Language] Switching from ${language} to ${newLanguage}`);
    
    try {
      // Méthode plus directe qui force le reload avec le paramètre lang
      window.location.href = `/?lang=${newLanguage}&force=true&t=${Date.now()}`;
      
      // Le reste du traitement se fait au chargement de la page dans LanguageContext
      
    } catch (error) {
      console.error('[Language] Error during language switch:', error);
      setIsChanging(false);
    }
  };

  // Affiche le bouton pour alterner vers l'autre langue
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="flex items-center gap-1 text-xs font-medium"
      disabled={isChanging}
      title={language === 'en' ? 'Passer au français' : 'Switch to English'}
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="language-indicator">
        {/* Afficher la langue vers laquelle on va basculer */}
        {language === 'en' ? 'FR' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
