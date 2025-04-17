
const fs = require('fs');
const path = require('path');

// Fonction pour extraire les traductions du LanguageContext
function extractTranslations() {
  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
  const content = fs.readFileSync(contextPath, 'utf8');
  
  const translations = {
    fr: {},
    en: {},
    es: {}
  };
  
  // Extraire les traductions par langue
  ['fr', 'en', 'es'].forEach(lang => {
    const langStart = content.indexOf(`${lang}: {`);
    if (langStart === -1) return;
    
    // Trouver la fin du bloc de langue
    let nestingLevel = 0;
    let langEnd = langStart;
    
    for (let i = langStart; i < content.length; i++) {
      if (content[i] === '{') nestingLevel++;
      if (content[i] === '}') {
        nestingLevel--;
        if (nestingLevel === 0) {
          langEnd = i;
          break;
        }
      }
    }
    
    const langSection = content.substring(langStart, langEnd);
    
    // Extraire chaque ligne de traduction
    const translationLines = langSection.split('\n');
    
    translationLines.forEach(line => {
      // Chercher les motifs comme "key: 'value'"
      const match = line.match(/\s*([^:]+):\s*'([^']*)'[,]?/);
      if (match && match.length >= 3) {
        const key = match[1].trim();
        const value = match[2].trim();
        
        // Ajouter au dictionnaire de traductions
        if (key && value) {
          translations[lang][key] = value;
        }
      }
    });
  });
  
  return translations;
}

// Fonction pour écrire les traductions dans des fichiers JSON
function writeTranslationsToJson(translations) {
  const outputDir = path.join(__dirname, '../src/locales');
  
  // Créer le répertoire des traductions s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Écrire un fichier par langue
  Object.entries(translations).forEach(([lang, trans]) => {
    const outputPath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(trans, null, 2), 'utf8');
    console.log(`✅ Fichier de traduction créé: ${outputPath}`);
  });
  
  // Créer un fichier index.ts pour faciliter l'importation
  const indexContent = `import fr from './fr.json';
import en from './en.json';
import es from './es.json';

export default {
  fr,
  en,
  es
};
`;
  
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf8');
  console.log(`✅ Fichier index.ts créé`);
}

// Créer un nouveau LanguageContext qui utilise les fichiers JSON
function createNewLanguageContext() {
  const template = `import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '@/locales';

type Language = 'fr' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  showDebugger: boolean;
  toggleDebugger: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the language from localStorage, default to 'fr'
  const getInitialLanguage = (): Language => {
    try {
      const storedLanguage = localStorage.getItem('language') as Language;
      console.log("[LanguageMonitor] Initial language from storage:", storedLanguage);

      if (storedLanguage && ['fr', 'en', 'es'].includes(storedLanguage)) {
        // Set the lang attribute on the document
        document.documentElement.lang = storedLanguage;
        console.log("[LanguageMonitor] Applied stored language to document:", storedLanguage);
        return storedLanguage;
      }
      return 'fr';
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return 'fr';
    }
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [showDebugger, setShowDebugger] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      setLanguageState(lang);
      console.log(\`[LanguageMonitor] Language changed to: \${lang}\`);
    } catch (e) {
      console.error("Error setting language:", e);
    }
  };

  const toggleDebugger = () => {
    setShowDebugger(prev => !prev);
  };

  // Translate function with replacements support
  const t = (key: string, replacements?: Record<string, string>): string => {
    const translation = translations[language]?.[key] || translations.fr?.[key] || key;

    if (!replacements) return translation;

    // Replace placeholders with values
    return Object.entries(replacements).reduce(
      (text, [placeholder, value]) => text.replace(new RegExp(\`{{\${placeholder}}}\`, 'g'), value),
      translation
    );
  };

  useEffect(() => {
    // Set up event listener for language changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        if (['fr', 'en', 'es'].includes(e.newValue)) {
          document.documentElement.lang = e.newValue;
          setLanguageState(e.newValue as Language);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    showDebugger,
    toggleDebugger
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
`;

  const backupPath = path.join(__dirname, '../src/contexts/LanguageContext.backup.tsx');
  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
  
  // Faire une sauvegarde du fichier existant
  fs.copyFileSync(contextPath, backupPath);
  console.log(`✅ Sauvegarde créée: ${backupPath}`);
  
  // Écrire le nouveau fichier
  fs.writeFileSync(contextPath, template, 'utf8');
  console.log(`✅ Nouveau LanguageContext créé`);
}

// Point d'entrée principal
function main() {
  console.log('🔄 Exportation des traductions en cours...');
  
  try {
    // Extraire les traductions du fichier LanguageContext
    const translations = extractTranslations();
    
    // Compter les traductions
    const counts = {
      fr: Object.keys(translations.fr).length,
      en: Object.keys(translations.en).length,
      es: Object.keys(translations.es).length
    };
    
    console.log(`📊 Traductions trouvées: FR=${counts.fr}, EN=${counts.en}, ES=${counts.es}`);
    
    // Écrire les traductions dans des fichiers JSON
    writeTranslationsToJson(translations);
    
    // Créer un nouveau LanguageContext
    createNewLanguageContext();
    
    console.log('\n✅ Migration terminée avec succès!');
    console.log('\n📋 PROCHAINES ÉTAPES:');
    console.log('1. Vérifiez les fichiers JSON générés dans src/locales/');
    console.log('2. Testez l\'application pour vous assurer que tout fonctionne correctement');
    console.log('3. Si tout va bien, vous pouvez supprimer le fichier de sauvegarde src/contexts/LanguageContext.backup.tsx');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  }
}

main();
