import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'fr' | 'en';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

// Hook for using translations
export const useTranslation = () => useContext(LanguageContext);

// Make useLanguage the default export for backward compatibility
export default useLanguage;

// Context provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with browser language or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    return browserLang === 'fr' ? 'fr' : 'en';
  });

  // Set language with persistence
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
    
    // Force all components to re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    console.log(`[LanguageContext] Language set to ${lang}, dispatched event`);
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    console.log(`[LanguageContext] Document language attribute set to: ${language}`);
    
    // Apply language-specific classes to body for CSS targeting
    if (language === 'fr') {
      document.body.classList.add('lang-fr');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!key) return '';
    
    // If key starts with 'nav.', handle special case for navbar items
    if (key.startsWith('nav.')) {
      const navKey = key.replace('nav.', '');
      const navTranslations = {
        en: {
          home: 'Home',
          articles: 'Articles',
          quiz: 'Quiz',
          profile: 'Health Profile',
          research: 'Our Research',
          lab: 'Lab Solutions',
          nutrition: 'Nutrition',
          library: 'Scientific Library',
          impact: 'Our Impact',
          about: 'About Us',
          contact: 'Contact',
          sitemap: 'Site Map',
          scientificMethodology: 'Scientific Methodology',
          adGrantAudit: 'Ad Grant Audit',
          compliance: 'Compliance'
        },
        fr: {
          home: 'Accueil',
          articles: 'Articles',
          quiz: 'Quiz',
          profile: 'Profil Santé',
          research: 'Nos Recherches',
          lab: 'Solutions Labo',
          nutrition: 'Nutrition',
          library: 'Bibliothèque Scientifique',
          impact: 'Notre Impact',
          about: 'À Propos',
          contact: 'Contact',
          sitemap: 'Plan du Site',
          scientificMethodology: 'Méthodologie Scientifique',
          adGrantAudit: 'Audit Ad Grant',
          compliance: 'Conformité'
        }
      };
      return navTranslations[language]?.[navKey as keyof typeof navTranslations.en] || navKey;
    }
    
    // Regular translations
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Define translations for both languages
const translations = {
  en: {
    'Home': 'Home',
    'About Us': 'About Us',
    'Contact': 'Contact',
    'Our Impact': 'Our Impact',
    'Articles': 'Articles',
    'Scientific Publications': 'Scientific Publications',
    'Main Pages': 'Main Pages',
    'Site Navigation': 'Site Navigation',
    'Site Map': 'Site Map',
    'Research & Education': 'Research & Education',
    'Health Resources': 'Health Resources',
    'Scientific Team': 'Scientific Team',
    'Mission & Impact': 'Mission & Impact',
    'Legal & Compliance': 'Legal & Compliance',
    'Our Research': 'Our Research',
    'Scientific Methodology': 'Scientific Methodology',
    'Lab Solutions': 'Lab Solutions',
    'Nutrition': 'Nutrition',
    'Health Profile': 'Health Profile',
    'Interactive Quiz': 'Interactive Quiz',
    'Team Members': 'Team Members',
    'Research Partners': 'Research Partners',
    'Scientific Advisory Board': 'Scientific Advisory Board',
    'Our Mission': 'Our Mission',
    'Impact Programs': 'Impact Programs',
    'Success Stories': 'Success Stories',
    'Support Our Research': 'Support Our Research',
    'Non-Profit Status': 'Non-Profit Status',
    'Privacy Policy': 'Privacy Policy',
    'Terms of Use': 'Terms of Use',
    'Accessibility': 'Accessibility',
    'Support Our Mission': 'Support Our Mission',
    'International Resources': 'International Resources',
    'Looking for Specific Research?': 'Looking for Specific Research?',
    'Explore our Scientific Library': 'Explore our Scientific Library',
    'Learn how you can support our research': 'Learn how you can support our research',
    'A comprehensive overview of our website structure to help you navigate our research and resources efficiently.': 'A comprehensive overview of our website structure to help you navigate our research and resources efficiently.',
    'Our Scientific Library contains all our published research organized by topic, date, and relevance to help you find exactly what you need.': 'Our Scientific Library contains all our published research organized by topic, date, and relevance to help you find exactly what you need.',
    'As a non-profit organization, we rely on partnerships and community support to continue our research and educational programs.': 'As a non-profit organization, we rely on partnerships and community support to continue our research and educational programs.',
    'Our research and educational resources are available in multiple languages to support a global audience.': 'Our research and educational resources are available in multiple languages to support a global audience.',
  },
  fr: {
    'Home': 'Accueil',
    'About Us': 'À propos',
    'Contact': 'Contact',
    'Our Impact': 'Notre Impact',
    'Articles': 'Articles',
    'Scientific Publications': 'Publications Scientifiques',
    'Main Pages': 'Pages Principales',
    'Site Navigation': 'Navigation du Site',
    'Site Map': 'Plan du Site',
    'Research & Education': 'Recherche & Éducation',
    'Health Resources': 'Ressources Santé',
    'Scientific Team': 'Équipe Scientifique',
    'Mission & Impact': 'Mission & Impact',
    'Legal & Compliance': 'Légal & Conformité',
    'Our Research': 'Nos Recherches',
    'Scientific Methodology': 'Méthodologie Scientifique',
    'Lab Solutions': 'Solutions Labo',
    'Nutrition': 'Nutrition',
    'Health Profile': 'Profil Santé',
    'Interactive Quiz': 'Quiz Interactif',
    'Team Members': 'Membres de l\'Équipe',
    'Research Partners': 'Partenaires de Recherche',
    'Scientific Advisory Board': 'Comité Scientifique',
    'Our Mission': 'Notre Mission',
    'Impact Programs': 'Programmes d\'Impact',
    'Success Stories': 'Témoignages de Réussite',
    'Support Our Research': 'Soutenir Notre Recherche',
    'Non-Profit Status': 'Statut d\'Association',
    'Privacy Policy': 'Politique de Confidentialité',
    'Terms of Use': 'Conditions d\'Utilisation',
    'Accessibility': 'Accessibilité',
    'Support Our Mission': 'Soutenez Notre Mission',
    'International Resources': 'Ressources Internationales',
    'Looking for Specific Research?': 'Vous cherchez une recherche spécifique ?',
    'Explore our Scientific Library': 'Explorez notre Bibliothèque Scientifique',
    'Learn how you can support our research': 'Découvrez comment soutenir notre recherche',
    'A comprehensive overview of our website structure to help you navigate our research and resources efficiently.': 'Une vue d\'ensemble de la structure de notre site pour vous aider à naviguer efficacement dans nos recherches et ressources.',
    'Our Scientific Library contains all our published research organized by topic, date, and relevance to help you find exactly what you need.': 'Notre Bibliothèque Scientifique contient toutes nos recherches publiées, organisées par sujet, date et pertinence pour vous aider à trouver exactement ce dont vous avez besoin.',
    'As a non-profit organization, we rely on partnerships and community support to continue our research and educational programs.': 'En tant qu\'organisation à but non lucratif, nous comptons sur les partenariats et le soutien communautaire pour poursuivre nos programmes de recherche et d\'éducation.',
    'Our research and educational resources are available in multiple languages to support a global audience.': 'Nos recherches et ressources éducatives sont disponibles en plusieurs langues pour soutenir un public mondial.',
  }
};