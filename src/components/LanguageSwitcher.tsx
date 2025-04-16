
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
    
    // Approche complète pour assurer le changement de langue
    try {
      // 1. Mettre à jour localStorage en premier (crucial pour le rechargement)
      localStorage.setItem('preferredLanguage', newLanguage);
      
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
      
      // 4. Mettre à jour le contexte React AVANT de déclencher les événements
      setLanguage(newLanguage);
      
      // 5. Déclencher les événements de changement de langue
      window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
      document.dispatchEvent(new CustomEvent('app-language-changed', { 
        detail: { language: newLanguage, timestamp: Date.now() } 
      }));
      
      // Confirmer que le changement a été appliqué
      console.log(`[Language] Applied language change: ${newLanguage}`);
      
      // 6. Forcer un rechargement complet de la page pour garantir que tous les composants sont mis à jour
      setTimeout(() => {
        // Ajouter un paramètre de langue à l'URL pour forcer le rechargement avec la bonne langue
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLanguage);
        window.location.href = url.toString();
      }, 100);
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
