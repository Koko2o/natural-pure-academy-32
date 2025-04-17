import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

interface TranslationHelperProps {
  onClose?: () => void;
}

export const TranslationHelper: React.FC<TranslationHelperProps> = ({ onClose }) => {
  const { t, language, languages, setLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [newKey, setNewKey] = useState('');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [filter, setFilter] = useState<'all' | 'missing' | 'untranslated'>('all');
  const [activeTab, setActiveTab] = useState<string>('search');

  // Charger les traductions depuis le contexte
  useEffect(() => {
    try {
      // Simulation - dans un vrai cas on récupérerait les traductions du contexte
      const translationsObj = {
        'app_title': {
          en: 'Natural Pure Academy',
          fr: 'Académie Natural Pure',
          es: 'Academia Natural Pure',
        },
        'home': {
          en: 'Home',
          fr: 'Accueil',
          es: 'Inicio'
        },
        'articles': {
          en: 'Articles',
          fr: 'Articles',
          es: 'Artículos'
        },
        // ...plus de traductions
      };

      setTranslations(translationsObj);
    } catch (error) {
      console.error('Erreur lors du chargement des traductions:', error);
    }
  }, []);

  // Filtrer les traductions
  const filteredTranslations = Object.entries(translations).filter(([key, values]) => {
    // Filtre par terme de recherche
    const matchesSearch = key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(values).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (!matchesSearch) return false;

    // Filtre par état de traduction
    if (filter === 'missing') {
      return !values[language];
    }
    if (filter === 'untranslated') {
      return values[language] && (
        values[language].includes('à traduire en') || 
        values[language].includes('traducir al') ||
        values[language] === values.en
      );
    }

    return true;
  });

  // Décompte des traductions
  const statsCount = {
    total: Object.keys(translations).length,
    missing: Object.entries(translations).filter(([, values]) => !values[language]).length,
    untranslated: Object.entries(translations).filter(([, values]) => 
      values[language] && (
        values[language].includes('à traduire en') || 
        values[language].includes('traducir al') ||
        values[language] === values.en
      )
    ).length
  };

  // Simuler une mise à jour de traduction
  const updateTranslation = (key: string, lang: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value
      }
    }));

    toast({
      title: "Traduction mise à jour",
      description: `La clé "${key}" a été mise à jour pour la langue "${lang}".`,
    });
  };

  // Simuler un ajout de nouvelle traduction
  const addNewTranslation = () => {
    if (!newKey.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une clé de traduction",
        variant: "destructive"
      });
      return;
    }

    if (translations[newKey]) {
      toast({
        title: "Erreur",
        description: "Cette clé existe déjà",
        variant: "destructive"
      });
      return;
    }

    const newTranslations = { ...translations };
    newTranslations[newKey] = {
      en: '',
      fr: '',
      es: ''
    };

    setTranslations(newTranslations);
    toast({
      title: "Clé ajoutée",
      description: `La clé "${newKey}" a été ajoutée.`
    });

    setNewKey('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{t('translation_helper')}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="search">{t('search_translations')}</TabsTrigger>
              <TabsTrigger value="add">{t('add_translation')}</TabsTrigger>
              <TabsTrigger value="stats">{t('translation_stats')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="search" className="flex-1 overflow-hidden flex flex-col p-4">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder={t('search_translations_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="border rounded px-3 py-2 bg-transparent"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">{t('filter_all')}</option>
                <option value="missing">{t('filter_missing')}</option>
                <option value="untranslated">{t('filter_untranslated')}</option>
              </select>
              <select
                className="border rounded px-3 py-2 bg-transparent"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{t(`language_${lang}`)}</option>
                ))}
              </select>
            </div>

            <div className="overflow-auto flex-1 border rounded">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">{t('key')}</th>
                    <th className="p-2 text-left">{t('english')}</th>
                    <th className="p-2 text-left">{t('current_language')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTranslations.map(([key, values]) => (
                    <tr key={key} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-2 font-mono text-sm">{key}</td>
                      <td className="p-2">{values.en}</td>
                      <td className="p-2">
                        <Textarea
                          value={values[language] || ''}
                          onChange={(e) => updateTranslation(key, language, e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredTranslations.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-gray-500">
                        {t('no_translations_found')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="add" className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block mb-1">{t('translation_key')}</label>
                <Input
                  placeholder="new_translation_key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t('translation_key_hint')}
                </p>
              </div>

              {languages.map(lang => (
                <div key={lang}>
                  <label className="block mb-1">{t(`language_${lang}`)}</label>
                  <Textarea 
                    placeholder={`${t('enter_translation_for')} ${t(`language_${lang}`)}`}
                    rows={2}
                    onChange={(e) => {
                      if (newKey) {
                        updateTranslation(newKey, lang, e.target.value);
                      }
                    }}
                  />
                </div>
              ))}

              <Button onClick={addNewTranslation}>
                {t('add_translation')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{statsCount.total}</div>
                  <div className="text-sm text-gray-500">{t('total_translations')}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">{statsCount.missing}</div>
                  <div className="text-sm text-gray-500">{t('missing_translations')}</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">{statsCount.untranslated}</div>
                  <div className="text-sm text-gray-500">{t('untranslated_translations')}</div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold mb-2">{t('translation_progress')}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full" 
                    style={{ width: `${100 - (statsCount.missing + statsCount.untranslated) / statsCount.total * 100}%` }}
                  />
                </div>
                <div className="text-sm mt-2 text-gray-500">
                  {Math.round(100 - (statsCount.missing + statsCount.untranslated) / statsCount.total * 100)}% {t('complete')}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">{t('translation_tips')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>{t('translation_tip_1')}</li>
                  <li>{t('translation_tip_2')}</li>
                  <li>{t('translation_tip_3')}</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t flex justify-end">
          <Button onClick={onClose}>
            {t('close')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranslationHelper;