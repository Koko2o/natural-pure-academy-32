
import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

/**
 * Composant qui facilite la visualisation de l'état des traductions
 * À utiliser pendant le développement pour identifier les zones non traduites
 */
export const TranslationDebugger: React.FC = () => {
  const { language } = useTranslation();
  
  return (
    <div className="fixed bottom-0 right-0 bg-black/70 text-white p-2 z-50 text-xs">
      <div>Langue: <strong>{language}</strong></div>
      <div className="text-xs mt-1">
        <span className="text-green-400">✓ Textes traduits: {language === 'fr' ? 'Français' : 'English'}</span>
      </div>
      <div className="text-xs">
        <span className="text-red-400">✗ Textes non traduits: Reste en langue d'origine</span>
      </div>
    </div>
  );
};

/**
 * Aide-mémoire pour les développeurs sur l'utilisation des traductions
 */
export const TranslationGuide: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
      <h3 className="font-bold">Guide de traduction</h3>
      <ul className="list-disc pl-5 text-sm">
        <li>Importez <code>useTranslation</code> de <code>@/contexts/LanguageContext</code></li>
        <li>Ajoutez <code>const &#123; t &#125; = useTranslation();</code> au début du composant</li>
        <li>Remplacez les textes codés en dur par <code>&#123;t('clé')&#125;</code></li>
        <li>Ajoutez les traductions dans <code>LanguageContext.tsx</code></li>
      </ul>
      <div className="mt-2 text-sm">
        <strong>Exemple:</strong> <code>&lt;h1&gt;Titre&lt;/h1&gt;</code> devient <code>&lt;h1&gt;&#123;t('Title')&#125;&lt;/h1&gt;</code>
      </div>
    </div>
  );
};

export default TranslationDebugger;
