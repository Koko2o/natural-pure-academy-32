
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Transforme le texte en clé de traduction valide
 * @param text Texte à transformer en clé
 * @returns Clé de traduction normalisée
 */
export const textToTranslationKey = (text: string): string => {
  // Convertir en minuscules, remplacer les espaces par des points
  // et supprimer les caractères spéciaux
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '.');
};

/**
 * Enveloppe un composant pour traduire automatiquement ses textes
 * @param Component Composant à traduire
 * @returns Composant avec traductions automatiques
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const { t } = useLanguage();
    
    // Fonction récursive pour traduire les props
    const translateProps = (obj: any): any => {
      if (typeof obj === 'string') {
        // Si c'est une chaîne de caractères, essayer de la traduire
        // via une clé générée automatiquement
        const key = textToTranslationKey(obj);
        const translated = t(key);
        // Si la traduction existe (différente de la clé), utiliser la traduction
        return translated !== key ? translated : obj;
      } else if (Array.isArray(obj)) {
        // Si c'est un tableau, traduire chaque élément
        return obj.map(item => translateProps(item));
      } else if (obj !== null && typeof obj === 'object' && !React.isValidElement(obj)) {
        // Si c'est un objet, traduire chaque propriété
        const result: Record<string, any> = {};
        for (const key in obj) {
          result[key] = translateProps(obj[key]);
        }
        return result;
      }
      return obj;
    };

    // Traduire toutes les props
    const translatedProps = translateProps(props) as P;
    
    return <Component {...translatedProps} />;
  };
}

/**
 * Hook pour détecter les textes non traduits
 * @returns Fonctions utilitaires pour la traduction
 */
export const useTranslationHelper = () => {
  const { language, t, translations } = useLanguage();
  
  // Vérifier si une clé existe dans les traductions
  const keyExists = (key: string): boolean => {
    return !!translations[language]?.[key];
  };
  
  // Obtenir les clés manquantes
  const getMissingKeys = (): string[] => {
    const allKeys = new Set<string>();
    
    // Collecter toutes les clés de toutes les langues
    Object.values(translations).forEach(langTranslations => {
      Object.keys(langTranslations).forEach(key => {
        allKeys.add(key);
      });
    });
    
    // Filtrer les clés qui n'existent pas dans la langue actuelle
    return Array.from(allKeys).filter(key => !translations[language]?.[key]);
  };
  
  return {
    t,
    keyExists,
    getMissingKeys,
    currentLanguage: language
  };
};

export default useTranslationHelper;
