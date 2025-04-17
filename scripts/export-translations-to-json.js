
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  languageContextPath: 'src/contexts/LanguageContext.tsx',
  outputDir: 'src/translations',
  languages: ['en', 'fr', 'es'],
  indexFile: 'index.ts'
};

// Extraction des traductions depuis LanguageContext.tsx
const extractTranslations = () => {
  const contextFile = path.resolve(CONFIG.languageContextPath);
  if (!fs.existsSync(contextFile)) {
    console.error(`Fichier de contexte de langue introuvable: ${contextFile}`);
    return null;
  }

  const content = fs.readFileSync(contextFile, 'utf-8');
  const translations = {
    en: {},
    fr: {},
    es: {}
  };

  // Recherche les définitions de traductions dans le fichier
  const englishMatch = content.match(/english:\s*{([^}]*)}/s);
  const frenchMatch = content.match(/french:\s*{([^}]*)}/s);
  const spanishMatch = content.match(/spanish:\s*{([^}]*)}/s);

  // Extraire les clés anglaises
  if (englishMatch && englishMatch[1]) {
    const entries = englishMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key && value) {
        translations.en[key] = value;
      }
    });
  }

  // Extraire les clés françaises
  if (frenchMatch && frenchMatch[1]) {
    const entries = frenchMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key && value) {
        translations.fr[key] = value;
      }
    });
  }

  // Extraire les clés espagnoles
  if (spanishMatch && spanishMatch[1]) {
    const entries = spanishMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key && value) {
        translations.es[key] = value;
      }
    });
  }

  return translations;
};

// Créer le répertoire de sortie s'il n'existe pas
const ensureOutputDir = () => {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`📁 Répertoire de sortie créé: ${CONFIG.outputDir}`);
  }
};

// Exporter les traductions vers des fichiers JSON
const exportTranslations = (translations) => {
  ensureOutputDir();
  
  // Exporter chaque langue dans un fichier séparé
  CONFIG.languages.forEach(lang => {
    const langData = translations[lang] || {};
    const filename = path.join(CONFIG.outputDir, `${lang}.json`);
    
    fs.writeFileSync(filename, JSON.stringify(langData, null, 2));
    console.log(`📄 Fichier de traduction ${lang} créé: ${filename}`);
  });
  
  // Créer un fichier index pour faciliter l'importation
  const indexContent = `
// Fichier généré automatiquement par export-translations-to-json.js
// Ne pas modifier manuellement

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

export const translations = {
  en,
  fr,
  es
};

export default translations;
`;
  
  fs.writeFileSync(path.join(CONFIG.outputDir, CONFIG.indexFile), indexContent);
  console.log(`📄 Fichier index créé: ${path.join(CONFIG.outputDir, CONFIG.indexFile)}`);
};

// Créer un utilitaire de traduction amélioré
const createTranslationHelper = () => {
  const helperContent = `
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Utilitaire pour faciliter l'utilisation des traductions
 * @returns Fonctions et état liés aux traductions
 */
export const useTranslation = () => {
  const { language, setLanguage, t, languages } = useLanguage();
  
  return {
    /**
     * Langue actuelle
     */
    language,
    
    /**
     * Changer la langue
     */
    setLanguage,
    
    /**
     * Traduire une clé
     */
    t,
    
    /**
     * Liste des langues disponibles
     */
    languages,
    
    /**
     * Vérifie si une clé existe
     */
    hasTranslation: (key: string): boolean => {
      return !!t(key);
    },
    
    /**
     * Traduit une clé avec des paramètres
     * Exemple: translateWithParams('hello_name', { name: 'John' }) => "Hello John"
     */
    translateWithParams: (key: string, params: Record<string, string | number>): string => {
      let translation = t(key);
      
      if (!translation) return key;
      
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(new RegExp(\`{{\${paramKey}}}\`, 'g'), String(paramValue));
      });
      
      return translation;
    },
    
    /**
     * Traduit un nombre avec les formes plurielles
     * Exemple: translatePlural('item_count', 5) => "5 items"
     */
    translatePlural: (key: string, count: number): string => {
      const singleKey = \`\${key}_one\`;
      const pluralKey = \`\${key}_many\`;
      
      if (count === 1) {
        return t(singleKey).replace('{count}', String(count));
      } else {
        return t(pluralKey).replace('{count}', String(count));
      }
    }
  };
};
`;
  
  fs.writeFileSync(path.join('src/utils', 'translationHelper.ts'), helperContent);
  console.log(`📄 Utilitaire de traduction créé: src/utils/translationHelper.ts`);
};

// Fonction principale
const exportAllTranslations = () => {
  console.log('🔍 Extraction des traductions depuis LanguageContext.tsx...');
  
  const translations = extractTranslations();
  if (!translations) {
    console.error('❌ Échec de l\'extraction des traductions');
    return;
  }
  
  console.log(`📊 Traductions extraites: ${Object.keys(translations.en).length} clés en anglais`);
  
  exportTranslations(translations);
  createTranslationHelper();
  
  console.log('✅ Exportation des traductions terminée!');
  console.log('👉 Pour utiliser les fichiers JSON de traduction:');
  console.log('   1. Modifiez LanguageContext.tsx pour importer les traductions depuis les fichiers JSON');
  console.log('   2. Utilisez l\'utilitaire amélioré via: import { useTranslation } from \'../utils/translationHelper\';');
};

// Exécuter le script
exportAllTranslations();
