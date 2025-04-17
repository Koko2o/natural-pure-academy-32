
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Helper pour faciliter l'utilisation des traductions et ajouter des fonctionnalités avancées
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
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
      });
      
      return translation;
    },
    
    /**
     * Traduit un nombre avec les formes plurielles
     * Exemple: translatePlural('item_count', 5) => "5 items"
     */
    translatePlural: (key: string, count: number): string => {
      const singleKey = `${key}_one`;
      const pluralKey = `${key}_many`;
      
      if (count === 1) {
        return t(singleKey).replace('{count}', String(count));
      } else {
        return t(pluralKey).replace('{count}', String(count));
      }
    },
    
    /**
     * Formate un texte en remplaçant les marqueurs par des valeurs
     * Exemple: format("Hello {name}", { name: "John" }) => "Hello John"
     */
    format: (text: string, params: Record<string, string | number>): string => {
      let result = text;
      
      Object.entries(params).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
      });
      
      return result;
    },
    
    /**
     * Traduit et formate un texte
     */
    tf: (key: string, params: Record<string, string | number>): string => {
      return useTranslation().format(t(key), params);
    },
    
    /**
     * Traduit un nombre avec le bon format
     */
    formatNumber: (num: number): string => {
      return new Intl.NumberFormat(language).format(num);
    },
    
    /**
     * Traduit une date avec le bon format
     */
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions): string => {
      return new Intl.DateTimeFormat(language, options).format(date);
    }
  };
};

/**
 * Vérifie si un texte a besoin d'être traduit
 */
export const needsTranslation = (text: string): boolean => {
  if (!text) return false;
  
  // Ignorer les URLs, chemins, identifiants de code, etc.
  if (text.startsWith('http') || text.startsWith('/') || text.includes('.') || /^[a-z0-9_]+$/.test(text)) {
    return false;
  }
  
  // Texte trop court (probablement un identifiant)
  if (text.length < 3) {
    return false;
  }
  
  // Texte qui contient uniquement des caractères non-alphabétiques
  if (!/[a-zA-Z]/.test(text)) {
    return false;
  }
  
  return true;
};

/**
 * Génère une clé de traduction à partir d'un texte
 */
export const generateTranslationKey = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 30);
};

/**
 * Vérifie si un texte semble être dans une certaine langue
 */
export const detectLanguage = (text: string): 'en' | 'fr' | 'es' | 'unknown' => {
  // Quelques marqueurs spécifiques aux langues
  const frenchMarkers = ['les', 'et', 'est', 'sont', 'dans', 'avec', 'pour', 'cette', 'votre', 'notre'];
  const spanishMarkers = ['los', 'las', 'es', 'son', 'en', 'con', 'para', 'esta', 'su', 'nuestra'];
  const englishMarkers = ['the', 'and', 'is', 'are', 'in', 'with', 'for', 'this', 'your', 'our'];
  
  const words = text.toLowerCase().split(/\s+/);
  
  let frCount = 0;
  let esCount = 0;
  let enCount = 0;
  
  words.forEach(word => {
    if (frenchMarkers.includes(word)) frCount++;
    if (spanishMarkers.includes(word)) esCount++;
    if (englishMarkers.includes(word)) enCount++;
  });
  
  // Déterminer la langue probable
  if (frCount > esCount && frCount > enCount) return 'fr';
  if (esCount > frCount && esCount > enCount) return 'es';
  if (enCount > frCount && enCount > esCount) return 'en';
  
  return 'unknown';
};

/**
 * Interface pour la fonction de traduction et son contexte
 */
export interface TranslationFunction {
  (key: string): string;
}

/**
 * Génère un contexte de traduction factice pour les tests
 */
export const createMockTranslation = (mockData: Record<string, string>): TranslationFunction => {
  return (key: string) => mockData[key] || key;
};
