
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    // Toggle between 'en' and 'fr'
    const newLanguage = language === 'en' ? 'fr' : 'en';
    
    // Log language change for debugging
    console.log(`[Language] Switching from ${language} to ${newLanguage}`);
    
    // Définir HTML lang attribute immédiatement
    document.documentElement.lang = newLanguage;
    document.documentElement.setAttribute('data-language', newLanguage);
    
    // Force language refresh with localStorage - AVANT le reload
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Envoyer un signal fort au navigateur pour le changement de langue
    if (newLanguage === 'fr') {
      document.body.classList.add('lang-fr');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');
    }
    
    // Déclencher un événement pour informer tous les composants du changement de langue
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
    document.dispatchEvent(new CustomEvent('app-language-changed', { detail: { language: newLanguage } }));
    
    // Log confirmation
    console.log(`[Language] Applied language change: ${newLanguage} and updated DOM`);
    
    // Update the language using the context - APRÈS avoir mis à jour le DOM
    setLanguage(newLanguage);
    
    // Ajouter un délai court pour s'assurer que tout est enregistré
    setTimeout(() => {
      console.log(`[Language] Reloading page to apply language: ${newLanguage}`);
      // Force re-render by reloading la page pour appliquer à tout le site
      window.location.reload();
    }, 100);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="flex items-center gap-1 text-xs font-medium"
      title={language === 'en' ? 'Passer au français' : 'Switch to English'}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
