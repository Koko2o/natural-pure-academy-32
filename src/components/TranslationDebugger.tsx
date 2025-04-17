
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const TranslationDebugger: React.FC = () => {
  const { language, translations, setLanguage, t, showDebugger } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'missing' | 'all' | 'stats'>('missing');
  const [highlightMissing, setHighlightMissing] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'fr' | 'en' | 'es');
  };

  // Filtrer les traductions selon la recherche
  const filteredTranslations = Object.entries(translations[language] || {}).filter(
    ([key, value]) => 
      key.toLowerCase().includes(searchTerm.toLowerCase()) || 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compter les traductions manquantes
  const missingTranslations = Object.keys(translations.fr || {}).filter(
    key => !translations[language]?.[key] || 
           (language !== 'fr' && translations[language]?.[key] === translations.fr?.[key]) ||
           translations[language]?.[key].includes('à traduire en')
  );

  // Calculer les statistiques
  const stats = {
    total: Object.keys(translations.fr || {}).length,
    fr: Object.keys(translations.fr || {}).length,
    en: Object.keys(translations.en || {}).length,
    es: Object.keys(translations.es || {}).length,
    missingEn: Object.keys(translations.fr || {}).filter(
      key => !translations.en?.[key] || 
             translations.en?.[key] === translations.fr?.[key] ||
             translations.en?.[key].includes('à traduire en')
    ).length,
    missingEs: Object.keys(translations.fr || {}).filter(
      key => !translations.es?.[key] || 
             translations.es?.[key] === translations.fr?.[key] ||
             translations.es?.[key].includes('à traduire en')
    ).length
  };

  // Copier les clés manquantes
  const copyMissingKeys = () => {
    const keys = missingTranslations.join('\n');
    navigator.clipboard.writeText(keys);
    setCopySuccess('Copié!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  // Activer/désactiver le surlignage des textes non traduits
  useEffect(() => {
    if (highlightMissing) {
      // Ajouter une classe à tous les éléments contenant du texte non traduit
      const highlightUntranslated = () => {
        // Enlever d'abord toutes les mises en évidence
        document.querySelectorAll('.missing-translation').forEach(el => {
          el.classList.remove('missing-translation');
        });

        // Trouver tout texte qui pourrait être non traduit
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, button, a, li');
        elements.forEach(el => {
          const text = el.textContent;
          if (text && text.includes('à traduire en') || text === text.toLowerCase()) {
            el.classList.add('missing-translation');
          }
        });
      };

      highlightUntranslated();
      const observer = new MutationObserver(highlightUntranslated);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    } else {
      // Enlever toutes les mises en évidence
      document.querySelectorAll('.missing-translation').forEach(el => {
        el.classList.remove('missing-translation');
      });
    }
  }, [highlightMissing, language]);

  if (!showDebugger) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-slate-900 text-white p-4 rounded-t-lg shadow-lg z-50 max-h-[60vh] overflow-y-auto border-t border-l border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{t('translation_debugger')}</h3>
        <div className="flex gap-2">
          <select 
            value={language} 
            onChange={handleLanguageChange} 
            className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <button 
            onClick={() => setHighlightMissing(!highlightMissing)} 
            className={`text-xs px-2 py-1 rounded ${highlightMissing ? 'bg-red-700 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            {highlightMissing ? 'Désactiver surlignage' : 'Surligner manquants'}
          </button>
        </div>
      </div>

      <div className="mb-2 flex gap-2">
        <button 
          onClick={() => setSelectedTab('missing')} 
          className={`text-xs px-2 py-1 rounded ${selectedTab === 'missing' ? 'bg-blue-700' : 'bg-slate-700'}`}
        >
          Manquants ({missingTranslations.length})
        </button>
        <button 
          onClick={() => setSelectedTab('all')} 
          className={`text-xs px-2 py-1 rounded ${selectedTab === 'all' ? 'bg-blue-700' : 'bg-slate-700'}`}
        >
          Toutes ({filteredTranslations.length})
        </button>
        <button 
          onClick={() => setSelectedTab('stats')} 
          className={`text-xs px-2 py-1 rounded ${selectedTab === 'stats' ? 'bg-blue-700' : 'bg-slate-700'}`}
        >
          Statistiques
        </button>
      </div>

      {selectedTab !== 'stats' && (
        <div className="mb-2">
          <input 
            type="text" 
            placeholder={t('search_translations')} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full px-3 py-1 bg-slate-800 text-white rounded border border-slate-700 text-sm"
          />
        </div>
      )}

      {selectedTab === 'stats' && (
        <div className="bg-slate-800 p-3 rounded mb-3">
          <h4 className="font-medium mb-2 text-blue-300">Statistiques de traduction</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-slate-700 p-2 rounded">
              <div className="font-semibold">Total</div>
              <div className="text-xl">{stats.total}</div>
            </div>
            <div className="bg-slate-700 p-2 rounded">
              <div className="font-semibold">Français</div>
              <div className="text-xl text-green-400">{stats.fr}</div>
            </div>
            <div className="bg-slate-700 p-2 rounded">
              <div className="font-semibold">Anglais</div>
              <div className="text-xl text-yellow-400">
                {stats.en} <span className="text-sm text-red-400">(-{stats.missingEn})</span>
              </div>
            </div>
            <div className="bg-slate-700 p-2 rounded">
              <div className="font-semibold">Espagnol</div>
              <div className="text-xl text-yellow-400">
                {stats.es} <span className="text-sm text-red-400">(-{stats.missingEs})</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-1 text-sm">Complétion:</div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.en / stats.total) * 100}%` }}></div>
            </div>
            <div className="text-xs text-right mt-1">Anglais: {Math.round((stats.en / stats.total) * 100)}%</div>
            
            <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.es / stats.total) * 100}%` }}></div>
            </div>
            <div className="text-xs text-right mt-1">Espagnol: {Math.round((stats.es / stats.total) * 100)}%</div>
          </div>
        </div>
      )}

      {selectedTab === 'missing' && (
        <div className="text-xs bg-red-900/50 p-2 mb-2 rounded flex justify-between items-center">
          <strong>{t('missing_translations')}: {missingTranslations.length}</strong>
          <button 
            onClick={copyMissingKeys}
            className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-xs"
          >
            {copySuccess || 'Copier les clés'}
          </button>
        </div>
      )}

      <div className="space-y-1 text-sm">
        {selectedTab === 'missing' && (
          missingTranslations.filter(key => 
            key.toLowerCase().includes(searchTerm.toLowerCase()) || 
            String(translations[language]?.[key] || '').toLowerCase().includes(searchTerm.toLowerCase())
          ).map(key => (
            <div key={key} className="p-1.5 rounded flex flex-col bg-red-900/30">
              <div className="flex justify-between">
                <span className="font-mono text-xs text-slate-400">{key}</span>
                <span className="text-xs bg-red-700 px-1 rounded">!</span>
              </div>
              <div className="mt-1">
                <div className="font-bold text-xs text-slate-400">FR:</div>
                <div>{translations.fr[key]}</div>
              </div>
              <div className="mt-1">
                <div className="font-bold text-xs text-slate-400">{language.toUpperCase()}:</div>
                <div className="text-red-300">{translations[language]?.[key] || t('missing')}</div>
              </div>
            </div>
          ))
        )}
        
        {selectedTab === 'all' && (
          filteredTranslations.map(([key, value]) => (
            <div key={key} className={`p-1.5 rounded flex flex-col ${!value || value === translations.fr[key] ? 'bg-red-900/30' : 'bg-slate-800'}`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs text-slate-400">{key}</span>
                <div className="flex gap-1">
                  <span className="text-xs bg-slate-700 px-1 rounded">{language}</span>
                  {(!value || value === translations.fr[key]) && <span className="text-xs bg-red-700 px-1 rounded">!</span>}
                </div>
              </div>
              <div className="mt-1">
                {value || <em className="text-red-400">{t('missing')}</em>}
              </div>
              {language !== 'fr' && translations.fr[key] && (
                <div className="mt-1 border-t border-slate-700 pt-1 text-slate-400 text-xs">
                  FR: {translations.fr[key]}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranslationDebugger;
