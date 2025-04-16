
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    // Force update to the opposite language
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    
    // Log language change for debugging
    console.log(`[Language] Switching from ${language} to ${newLanguage}`);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLanguage;
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="flex items-center gap-1 text-xs font-medium"
      title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{language === 'fr' ? 'EN' : 'FR'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
