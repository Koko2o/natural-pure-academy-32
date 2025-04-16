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
    try {
      // PRIORITÉ 1: Vérifier le paramètre d'URL (priorité maximale)
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'fr' || langParam === 'en') {
        console.log(`[LanguageContext] Using language from URL parameter: ${langParam}`);
        localStorage.setItem('preferredLanguage', langParam);

        // Appliquer immédiatement au HTML
        document.documentElement.lang = langParam;
        document.documentElement.setAttribute('data-language', langParam);

        if (langParam === 'fr') {
          document.body.classList.add('lang-fr');
          document.body.classList.remove('lang-en');
        } else {
          document.body.classList.add('lang-en');
          document.body.classList.remove('lang-fr');
        }

        return langParam as Language;
      }

      // PRIORITÉ 2: Vérifier localStorage pour la persistance
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage === 'fr' || savedLanguage === 'en') {
        console.log(`[LanguageContext] Using saved language preference from localStorage: ${savedLanguage}`);

        // Appliquer immédiatement au HTML
        document.documentElement.lang = savedLanguage;
        document.documentElement.setAttribute('data-language', savedLanguage);

        if (savedLanguage === 'fr') {
          document.body.classList.add('lang-fr');
          document.body.classList.remove('lang-en');
        } else {
          document.body.classList.add('lang-en');
          document.body.classList.remove('lang-fr');
        }

        return savedLanguage as Language;
      }

      // Default to English if nothing is set
      console.log(`[LanguageContext] No language preference found, defaulting to English`);
      localStorage.setItem('preferredLanguage', 'en');

      // Appliquer immédiatement au HTML
      document.documentElement.lang = 'en';
      document.documentElement.setAttribute('data-language', 'en');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');

      return 'en';
    } catch (error) {
      console.error('[LanguageContext] Error during language initialization:', error);
      return 'en';
    }
  });

  // Set language with persistence
  const setLanguage = (lang: Language) => {
    console.log(`[LanguageContext] Setting language to: ${lang}`);

    // VALIDATION: s'assurer que la langue est valide
    if (lang !== 'en' && lang !== 'fr') {
      console.error(`[LanguageContext] Invalid language value: ${lang}, defaulting to 'en'`);
      lang = 'en';
    }

    // 1. Mettre à jour l'état local React
    setLanguageState(lang);

    try {
      // 2. Persister la langue dans localStorage
      localStorage.setItem('preferredLanguage', lang);

      // 3. Mettre à jour les attributs HTML
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-language', lang);

      // 4. Appliquer des classes CSS pour le ciblage
      if (lang === 'fr') {
        document.body.classList.add('lang-fr');
        document.body.classList.remove('lang-en');
      } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-fr');
      }

      // 5. Déclencher les événements pour forcer les composants à se mettre à jour
      window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
      console.log(`[LanguageContext] Language set to ${lang}, dispatched event`);

      // 6. Forcer une mise à jour globale de l'application
      const appRoot = document.getElementById('root');
      if (appRoot) {
        appRoot.classList.add('language-changed');
        setTimeout(() => appRoot.classList.remove('language-changed'), 100);
      }

      // 7. Informer toute l'application du changement
      document.dispatchEvent(new CustomEvent('app-language-changed', { 
        detail: { language: lang, timestamp: Date.now() }
      }));

      // 8. Forcer une mise à jour globale supplémentaire
      console.log(`[LanguageContext] Forcing global re-render for language: ${lang}`);

      // 9. Important: Réappliquer les classes CSS après un court délai pour s'assurer qu'elles persistent
      setTimeout(() => {
        if (lang === 'fr') {
          document.body.classList.add('lang-fr');
          document.body.classList.remove('lang-en');
        } else {
          document.body.classList.add('lang-en');
          document.body.classList.remove('lang-fr');
        }
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-language', lang);
      }, 50);

    } catch (error) {
      console.error('[LanguageContext] Error during language update:', error);
    }
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
    'Our Research': 'Notre Recherche',
    'Discover our scientific studies': 'Découvrez nos études scientifiques',
    'Scientific Library': 'Bibliothèque Scientifique',
    'Access our publications': 'Accédez à nos publications',
    'Health Profile': 'Profil Santé',
    'Evaluate your nutritional needs': 'Évaluez vos besoins nutritionnels',
    'Lab Solutions': 'Solutions Labo',
    'Our recommended products': 'Nos produits recommandés',
    'Our Team': 'Notre Équipe',
    'The experts who support us': 'Les experts qui nous soutiennent',
    'Publications': 'Publications',
    'Our scientific articles': 'Nos articles scientifiques',
    'Methodology': 'Méthodologie',
    'Our scientific approach': 'Notre approche scientifique',
    'International Impact': 'Impact International',
    'Our global reach': 'Notre rayonnement global',
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