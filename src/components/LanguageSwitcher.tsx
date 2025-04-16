
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
      // 1. Mettre à jour localStorage
      localStorage.setItem('preferredLanguage', newLanguage);
      
      // 2. Mettre à jour les attributs HTML
      document.documentElement.lang = newLanguage;
      document.documentElement.setAttribute('data-language', newLanguage);
      
      // 3. Appliquer les classes CSS
      if (newLanguage === 'fr') {
        document.body.classList.add('lang-fr');
        document.body.classList.remove('lang-en');
      } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-fr');
      }
      
      // 4. Mettre à jour le contexte React
      setLanguage(newLanguage);
      
      // 5. Forcer un rechargement de la page
      window.location.href = `/?lang=${newLanguage}&t=${Date.now()}`;
      
    } catch (error) {
      console.error('[Language] Error during language switch:', error);
      setIsChanging(false);
    }
  };

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
      <span>{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
