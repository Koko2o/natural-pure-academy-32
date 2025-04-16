
/**
 * Utilitaires pour faciliter la gestion des traductions
 */

import { Language } from '@/contexts/LanguageContext';

// Format de sortie pour l'audit de traduction
interface TranslationAuditResult {
  missingKeys: Record<Language, string[]>;
  totalKeys: number;
  completionPercentage: Record<Language, number>;
}

// Extraction des clés de traduction des objets de traduction
export function extractTranslationKeys(
  translations: Record<Language, Record<string, string>>
): TranslationAuditResult {
  // Récupérer toutes les clés uniques
  const allKeys = new Set<string>();
  Object.values(translations).forEach(langObj => {
    Object.keys(langObj).forEach(key => allKeys.add(key));
  });
  
  // Vérifier les clés manquantes par langue
  const missingKeys: Record<Language, string[]> = {} as Record<Language, string[]>;
  const totalKeys = allKeys.size;
  const completionPercentage: Record<Language, number> = {} as Record<Language, number>;
  
  Object.keys(translations).forEach(lang => {
    const langKeys = Object.keys(translations[lang as Language]);
    const missing = Array.from(allKeys).filter(key => !langKeys.includes(key));
    
    missingKeys[lang as Language] = missing;
    completionPercentage[lang as Language] = 
      ((totalKeys - missing.length) / totalKeys) * 100;
  });
  
  return { missingKeys, totalKeys, completionPercentage };
}

// Générer un fichier JSON de traduction par langue
export function generateTranslationFile(
  translations: Record<Language, Record<string, string>>,
  language: Language
): string {
  // Obtenir toutes les clés disponibles
  const allKeys = new Set<string>();
  Object.values(translations).forEach(langObj => {
    Object.keys(langObj).forEach(key => allKeys.add(key));
  });
  
  // Créer l'objet de traduction pour la langue spécifiée
  const langTranslations: Record<string, string> = {};
  
  Array.from(allKeys).sort().forEach(key => {
    // Si la traduction existe, l'utiliser, sinon mettre un marqueur
    langTranslations[key] = translations[language]?.[key] || `[UNTRANSLATED: ${key}]`;
  });
  
  // Convertir en JSON avec indentation pour la lisibilité
  return JSON.stringify(langTranslations, null, 2);
}

// Fonctions pour aider à migrer vers un système basé sur des fichiers
export function migrateToFileBasedTranslations(
  translations: Record<Language, Record<string, string>>
): void {
  // Pour chaque langue, générer un fichier
  Object.keys(translations).forEach(lang => {
    const langFile = generateTranslationFile(translations, lang as Language);
    console.log(`Fichier de traduction pour ${lang}:`, langFile);
    
    // Cette fonction serait généralement utilisée pour écrire le fichier
    // via Node.js dans un contexte de script, pas dans le navigateur
  });
}
