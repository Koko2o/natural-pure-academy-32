import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TranslationDebugger: React.FC = () => {
  const { language, translations, setLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'fr' | 'en' | 'es');
  };

  const filteredTranslations = Object.entries(translations[language] || {}).filter(
    ([key, value]) => 
      key.toLowerCase().includes(searchTerm.toLowerCase()) || 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count missing translations
  const missingTranslations = Object.keys(translations.fr || {}).filter(
    key => !translations[language]?.[key] || translations[language]?.[key] === translations.fr?.[key]
  );

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-slate-900 text-white p-4 rounded-t-lg shadow-lg z-50 max-h-[50vh] overflow-y-auto border-t border-l border-gray-700">
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
            onClick={() => setShowAll(!showAll)} 
            className="text-xs px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded"
          >
            {showAll ? t('show_missing') : t('show_all')}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <input 
          type="text" 
          placeholder={t('search_translations')} 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full px-3 py-1 bg-slate-800 text-white rounded border border-slate-700 text-sm"
        />
      </div>

      <div className="text-xs bg-red-900/50 p-2 mb-2 rounded flex justify-between items-center">
        <strong>{t('missing_translations')}: {missingTranslations.length}</strong>
        <div className="flex gap-1">
          <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">FR: {Object.keys(translations.fr).length}</span>
          <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">EN: {Object.keys(translations.en).length}</span>
          <span className="px-1.5 py-0.5 bg-slate-800 rounded text-xs">ES: {Object.keys(translations.es).length}</span>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        {(showAll ? filteredTranslations : missingTranslations.map(key => [key, translations[language]?.[key] || ''])).map(([key, value]) => (
          <div key={key} className={`p-1.5 rounded flex flex-col ${!value ? 'bg-red-900/30' : 'bg-slate-800'}`}>
            <div className="flex justify-between">
              <span className="font-mono text-xs text-slate-400">{key}</span>
              <div className="flex gap-1">
                <span className="text-xs bg-slate-700 px-1 rounded">{language}</span>
                {!value && <span className="text-xs bg-red-700 px-1 rounded">!</span>}
              </div>
            </div>
            <div className="mt-1">
              {value ? value : <em className="text-red-400">{t('missing')}</em>}
            </div>
            {language !== 'fr' && translations.fr[key] && (
              <div className="mt-1 border-t border-slate-700 pt-1 text-slate-400 text-xs">
                FR: {translations.fr[key]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};