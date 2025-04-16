
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
    
    // Force language refresh with localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Update the language using the context
    setLanguage(newLanguage);
    
    // Log confirmation
    console.log(`[Language] Applied language change: ${newLanguage}`);
    
    // Force re-render by reloading the page (uncomment if needed)
    // window.location.reload();
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
