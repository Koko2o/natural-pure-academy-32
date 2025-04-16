
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Composant qui affiche les informations de débogage sur la langue actuelle
 * Utilisez ce composant temporairement pour diagnostiquer les problèmes de changement de langue
 */
 */
const LanguageDebugger: React.FC = () => {
  const { language } = useLanguage();
  const [htmlLang, setHtmlLang] = useState('');
  const [storedLang, setStoredLang] = useState('');
  const [bodyClasses, setBodyClasses] = useState('');
  
  useEffect(() => {
    // Mettre à jour les informations de débogage
    const updateDebugInfo = () => {
      setHtmlLang(document.documentElement.lang);
      setStoredLang(localStorage.getItem('preferredLanguage') || 'not set');
      setBodyClasses(document.body.className);
    };
    
    // Mettre à jour au montage et lors des changements de langue
    updateDebugInfo();
    
    const handleLangChange = () => {
      console.log('[LanguageDebugger] Language change detected');
      updateDebugInfo();
    };
    
    window.addEventListener('languageChange', handleLangChange);
    document.addEventListener('app-language-changed', handleLangChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLangChange);
      document.removeEventListener('app-language-changed', handleLangChange);
    };
  }, [language]);
  
  // Style discret mais visible
  const style = {
    position: 'fixed' as const,
    bottom: '10px',
    right: '10px',
    zIndex: 9999,
    padding: '8px',
    fontSize: '12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    borderRadius: '4px',
    maxWidth: '300px'
  };
  
  return (
    <div style={style}>
      <div><strong>Context Language:</strong> {language}</div>
      <div><strong>HTML lang:</strong> {htmlLang}</div>
      <div><strong>localStorage:</strong> {storedLang}</div>
      <div><strong>Body classes:</strong> {bodyClasses}</div>
      <div className="lang-specific-en">English content is visible</div>
      <div className="lang-specific-fr">Le contenu français est visible</div>
    </div>
  );
};

export default LanguageDebugger;
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Composant qui affiche les informations de débogage sur la langue actuelle
 * Utilisez ce composant temporairement pour diagnostiquer les problèmes de changement de langue
 */
 
const LanguageDebugger: React.FC = () => {
  const { language } = useLanguage();
  const [htmlLang, setHtmlLang] = useState('');
  const [storedLang, setStoredLang] = useState('');
  const [bodyClasses, setBodyClasses] = useState('');
  
  useEffect(() => {
    // Mettre à jour les informations de débogage
    const updateDebugInfo = () => {
      setHtmlLang(document.documentElement.lang);
      setStoredLang(localStorage.getItem('preferredLanguage') || 'not set');
      setBodyClasses(document.body.className);
    };
    
    // Mettre à jour au montage et lors des changements de langue
    updateDebugInfo();
    
    const handleLangChange = () => {
      console.log('[LanguageDebugger] Language change detected');
      updateDebugInfo();
    };
    
    window.addEventListener('languageChange', handleLangChange);
    document.addEventListener('app-language-changed', handleLangChange);
    
    // Mettre à jour périodiquement pour détecter les problèmes
    const interval = setInterval(updateDebugInfo, 2000);
    
    return () => {
      window.removeEventListener('languageChange', handleLangChange);
      document.removeEventListener('app-language-changed', handleLangChange);
      clearInterval(interval);
    };
  }, [language]);
  
  // Style discret mais visible
  const style = {
    position: 'fixed' as const,
    bottom: '10px',
    right: '10px',
    zIndex: 9999,
    padding: '8px',
    fontSize: '12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    borderRadius: '4px',
    maxWidth: '300px'
  };
  
  return (
    <div style={style}>
      <div><strong>Context Language:</strong> {language}</div>
      <div><strong>HTML lang:</strong> {htmlLang}</div>
      <div><strong>localStorage:</strong> {storedLang}</div>
      <div><strong>Body classes:</strong> {bodyClasses}</div>
      <div className="lang-specific-en">English content is visible</div>
      <div className="lang-specific-fr">Le contenu français est visible</div>
    </div>
  );
};

export default LanguageDebugger;
