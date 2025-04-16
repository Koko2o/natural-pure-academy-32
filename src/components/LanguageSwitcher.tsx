
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  // Surveiller les changements réels de langue dans le DOM
  useEffect(() => {
    const currentDocLang = document.documentElement.lang;
    if (currentDocLang !== language && !isChanging) {
      console.log(`[LanguageSwitcher] DOM language (${currentDocLang}) doesn't match context (${language}), syncing`);
      setLanguage(currentDocLang as 'en' | 'fr');
    }
  }, [language, setLanguage, isChanging]);

  const toggleLanguage = () => {
    setIsChanging(true);
    
    // Toggle between 'en' and 'fr'
    const newLanguage = language === 'en' ? 'fr' : 'en';
    
    console.log(`[Language] Switching from ${language} to ${newLanguage}`);
    
    // 1. Mettre à jour localStorage en premier (crucial pour le rechargement)
    localStorage.setItem('preferredLanguage', newLanguage);
    console.log(`[Language] Updated localStorage with new language: ${newLanguage}`);
    
    // 2. Mettre à jour les attributs HTML immédiatement
    document.documentElement.lang = newLanguage;
    document.documentElement.setAttribute('data-language', newLanguage);
    
    // 3. Appliquer les classes CSS pour le ciblage
    if (newLanguage === 'fr') {
      document.body.classList.add('lang-fr');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');
    }
    
    // 4. Déclencher les événements de changement de langue
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
    document.dispatchEvent(new CustomEvent('app-language-changed', { 
      detail: { language: newLanguage, timestamp: Date.now() } 
    }));
    
    // 5. Mettre à jour le contexte React
    setLanguage(newLanguage);
    
    // 6. Forcer une actualisation après un court délai
    setTimeout(() => {
      console.log(`[Language] Reloading page to fully apply language: ${newLanguage}`);
      window.location.href = window.location.pathname; // Méthode plus propre que reload()
      setIsChanging(false);
    }, 200);
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
