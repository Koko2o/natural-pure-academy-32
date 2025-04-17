
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Scans a React component for hardcoded text and returns suggestions
 * for translation keys
 */
export const scanForHardcodedText = (componentCode: string): string[] => {
  // Common patterns for hardcoded text in JSX
  const patterns = [
    /<h[1-6][^>]*>\s*([^<{]+)\s*<\/h[1-6]>/g,
    /<p[^>]*>\s*([^<{]+)\s*<\/p>/g,
    /<span[^>]*>\s*([^<{]+)\s*<\/span>/g,
    /<div[^>]*>\s*([^<{]+)\s*<\/div>/g,
    /<button[^>]*>\s*([^<{]+)\s*<\/button>/g,
    /<a[^>]*>\s*([^<{]+)\s*<\/a>/g,
    /title="([^"{}]+)"/g,
    /placeholder="([^"{}]+)"/g,
    /label="([^"{}]+)"/g,
    /alt="([^"{}]+)"/g,
  ];

  const hardcodedText: string[] = [];

  // Search for patterns
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(componentCode)) !== null) {
      const text = match[1].trim();
      if (text && !text.includes('t(') && text.length > 2) {
        hardcodedText.push(text);
      }
    }
  });

  return [...new Set(hardcodedText)]; // Remove duplicates
};

/**
 * Suggests translation keys based on text content
 */
export const suggestTranslationKey = (text: string): string => {
  // Convert to lowercase and replace non-alphanumeric characters with underscores
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_') // Replace multiple underscores with a single one
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 30); // Limit length
};

/**
 * Hook to get recommended translations for component code
 */
export const useTranslationRecommender = () => {
  const { addTranslation } = useLanguage();

  const generateTranslationKeys = (componentCode: string) => {
    const hardcodedTexts = scanForHardcodedText(componentCode);
    
    return hardcodedTexts.map(text => {
      const key = suggestTranslationKey(text);
      return { key, text };
    });
  };

  const addBulkTranslations = (translations: { key: string, text: string }[]) => {
    translations.forEach(({ key, text }) => {
      // Add translation for French (source)
      addTranslation(key, { fr: text });
    });
  };

  return {
    generateTranslationKeys,
    addBulkTranslations
  };
};

/**
 * Helper to create a multi-language object for translations
 */
export const createTranslation = (
  fr: string, 
  en: string, 
  es: string
): { fr: string; en: string; es: string } => {
  return { fr, en, es };
};

/**
 * Function to detect the language of a text
 * This is a simple implementation. For production, consider using a library.
 */
export const detectLanguage = (text: string): 'fr' | 'en' | 'es' | 'unknown' => {
  // Simple detection based on common words
  const frenchWords = ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'en', 'au', 'du', 'est', 'sont', 'avoir', 'être', 'pour', 'dans', 'avec', 'sans', 'mais'];
  const englishWords = ['the', 'a', 'an', 'and', 'or', 'in', 'of', 'to', 'is', 'are', 'have', 'be', 'for', 'on', 'with', 'without', 'but'];
  const spanishWords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'en', 'de', 'es', 'son', 'estar', 'ser', 'para', 'con', 'sin', 'pero'];

  // Convert to lowercase and split into words
  const words = text.toLowerCase().split(/\W+/);
  
  // Count occurrences of words from each language
  const frCount = words.filter(word => frenchWords.includes(word)).length;
  const enCount = words.filter(word => englishWords.includes(word)).length;
  const esCount = words.filter(word => spanishWords.includes(word)).length;
  
  // Determine the most likely language
  const max = Math.max(frCount, enCount, esCount);
  if (max === 0) return 'unknown';
  
  if (frCount === max) return 'fr';
  if (enCount === max) return 'en';
  return 'es';
};
