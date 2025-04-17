
import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Fonction pour suggérer une clé de traduction à partir d'un texte
 */
export const suggestTranslationKey = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 30);
};

/**
 * Extrait les textes d'un code JSX
 */
export const extractTextFromJSX = (code: string): { key: string; text: string }[] => {
  const patterns = [
    /<h[1-6][^>]*>\s*([^<{]+)\s*<\/h[1-6]>/g,
    /<p[^>]*>\s*([^<{]+)\s*<\/p>/g,
    /<span[^>]*>\s*([^<{]+)\s*<\/span>/g,
    /<div[^>]*>\s*([^<{]+)\s*<\/div>/g,
    /<button[^>]*>\s*([^<{]+)\s*<\/button>/g,
    /<a[^>]*>\s*([^<{]+)\s*<\/a>/g,
    /<li[^>]*>\s*([^<{]+)\s*<\/li>/g,
    /<label[^>]*>\s*([^<{]+)\s*<\/label>/g,
    /<option[^>]*>\s*([^<{]+)\s*<\/option>/g,
    /<strong[^>]*>\s*([^<{]+)\s*<\/strong>/g,
    /<em[^>]*>\s*([^<{]+)\s*<\/em>/g>,
    /<small[^>]*>\s*([^<{]+)\s*<\/small>/g>,
    /title="([^"{}]+)"/g,
    /placeholder="([^"{}]+)"/g,
    /label="([^"{}]+)"/g,
    /alt="([^"{}]+)"/g,
    /aria-label="([^"{}]+)"/g,
    /tooltip="([^"{}]+)"/g,
  ];
  
  const extractedTexts: { key: string; text: string }[] = [];
  const usedKeys = new Set<string>();
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(code)) !== null) {
      const text = match[1].trim();
      
      // Ignorer le code, les nombres seuls et les chaînes très courtes
      if (text && 
          !text.includes('t(') && 
          text.length > 2 && 
          !/^[0-9.,%]+$/.test(text) && 
          !/^[A-Za-z0-9_]+$/.test(text)) {
          
        let key = suggestTranslationKey(text);
        
        // S'assurer que la clé est unique
        if (usedKeys.has(key)) {
          let counter = 1;
          while (usedKeys.has(`${key}_${counter}`)) {
            counter++;
          }
          key = `${key}_${counter}`;
        }
        
        usedKeys.add(key);
        extractedTexts.push({ key, text });
      }
    }
  });
  
  return extractedTexts;
};

/**
 * Hook personnalisé pour aider à la gestion des traductions
 */
export const useTranslationRecommender = () => {
  const { addTranslation } = useLanguage();
  
  const generateTranslationKeys = useCallback((code: string) => {
    return extractTextFromJSX(code);
  }, []);
  
  const addBulkTranslations = useCallback((translations: { key: string, text: string }[]) => {
    translations.forEach(({ key, text }) => {
      // Ajouter la traduction pour le français (source)
      addTranslation(key, { 
        fr: text,
        en: '',  // Laisser vide pour être identifié comme manquant
        es: ''   // Laisser vide pour être identifié comme manquant
      });
    });
  }, [addTranslation]);
  
  return {
    generateTranslationKeys,
    addBulkTranslations
  };
};

/**
 * Helper pour créer un objet multi-langue pour les traductions
 */
export const createTranslation = (
  fr: string, 
  en: string, 
  es: string
): { fr: string; en: string; es: string } => {
  return { fr, en, es };
};

/**
 * Fonction pour détecter la langue d'un texte
 * C'est une implémentation simple. Pour la production, envisagez d'utiliser une bibliothèque.
 */
export const detectLanguage = (text: string): 'fr' | 'en' | 'es' | 'unknown' => {
  // Détection simple basée sur des mots courants
  const frenchWords = ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'en', 'au', 'du', 'est', 'sont', 'avoir', 'être', 'pour', 'dans', 'avec', 'sans', 'mais'];
  const englishWords = ['the', 'a', 'an', 'and', 'or', 'in', 'of', 'to', 'is', 'are', 'have', 'be', 'for', 'on', 'with', 'without', 'but'];
  const spanishWords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'en', 'de', 'es', 'son', 'estar', 'ser', 'para', 'con', 'sin', 'pero'];
  
  // Tokeniser le texte
  const words = text.toLowerCase().split(/\s+/);
  
  // Compter les correspondances pour chaque langue
  let frCount = 0, enCount = 0, esCount = 0;
  
  words.forEach(word => {
    if (frenchWords.includes(word)) frCount++;
    if (englishWords.includes(word)) enCount++;
    if (spanishWords.includes(word)) esCount++;
  });
  
  // Déterminer la langue la plus probable
  if (frCount > enCount && frCount > esCount) return 'fr';
  if (enCount > frCount && enCount > esCount) return 'en';
  if (esCount > frCount && esCount > enCount) return 'es';
  
  // Si aucune correspondance claire ou trop peu de mots
  return 'unknown';
};

/**
 * Hook pour vérifier la couverture des traductions dans un composant
 */
export const useTranslationCoverage = (componentCode: string) => {
  const { translations } = useLanguage();
  
  return useMemo(() => {
    // Extraire tous les textes du composant
    const extractedTexts = extractTextFromJSX(componentCode);
    
    // Vérifier chaque texte pour voir s'il a une traduction
    const results = extractedTexts.map(({ key, text }) => {
      const potentialKey = suggestTranslationKey(text);
      const hasTranslation = Object.keys(translations.fr).some(k => 
        k === potentialKey || translations.fr[k] === text
      );
      
      return {
        text,
        suggestedKey: potentialKey,
        hasTranslation,
      };
    });
    
    // Statistiques
    const untranslated = results.filter(r => !r.hasTranslation);
    
    return {
      totalTexts: extractedTexts.length,
      untranslatedCount: untranslated.length,
      untranslatedTexts: untranslated,
      coveragePercent: extractedTexts.length > 0 
        ? Math.round(((extractedTexts.length - untranslated.length) / extractedTexts.length) * 100)
        : 100
    };
  }, [componentCode, translations]);
};
