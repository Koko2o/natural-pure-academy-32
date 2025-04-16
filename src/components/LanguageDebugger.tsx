import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Composant qui affiche les informations de débogage sur la langue actuelle
 * Utilisez ce composant temporairement pour diagnostiquer les problèmes de changement de langue
 */
const LanguageDebugger: React.FC = () => {
  const { language } = useLanguage();
  const [htmlLang, setHtmlLang] = useState<string>('');
  const [storedLang, setStoredLang] = useState<string>('');
  const [bodyClasses, setBodyClasses] = useState<string>('');

  useEffect(() => {
    // Mettre à jour les informations de débogage à chaque rendu et à intervalles
    const updateDebugInfo = () => {
      setHtmlLang(document.documentElement.lang || 'non défini');
      setStoredLang(localStorage.getItem('preferredLanguage') || 'non défini');
      setBodyClasses(document.body.className);
    };

    // Mettre à jour immédiatement
    updateDebugInfo();

    // Et vérifier régulièrement pour détecter les changements
    const interval = setInterval(updateDebugInfo, 1000);

    return () => clearInterval(interval);
  }, []);

  // Style pour le débuggeur
  const style = {
    position: 'fixed' as const,
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '12px',
    zIndex: 9999,
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