import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'fr' | 'en' | 'es';

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
      if (langParam === 'fr' || langParam === 'en' || langParam === 'es') {
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
      if (savedLanguage === 'fr' || savedLanguage === 'en' || savedLanguage === 'es') {
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
    if (lang !== 'en' && lang !== 'fr' && lang !== 'es') {
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
      // Supprimer toutes les classes de langue d'abord
      document.body.classList.remove('lang-fr', 'lang-en', 'lang-es');
      
      // Ajouter la classe pour la langue active
      document.body.classList.add(`lang-${lang}`);

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
        // Supprimer toutes les classes de langue d'abord
        document.body.classList.remove('lang-fr', 'lang-en', 'lang-es');
        
        // Ajouter la classe pour la langue active
        document.body.classList.add(`lang-${lang}`);
        
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
    // Supprimer toutes les classes de langue d'abord
    document.body.classList.remove('lang-fr', 'lang-en', 'lang-es');
    
    // Ajouter la classe pour la langue active
    document.body.classList.add(`lang-${language}`);
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
        },
        es: {
          home: 'Inicio',
          articles: 'Artículos',
          quiz: 'Cuestionario',
          profile: 'Perfil de Salud',
          research: 'Nuestra Investigación',
          lab: 'Soluciones de Laboratorio',
          nutrition: 'Nutrición',
          library: 'Biblioteca Científica',
          impact: 'Nuestro Impacto',
          about: 'Acerca de Nosotros',
          contact: 'Contacto',
          sitemap: 'Mapa del Sitio',
          scientificMethodology: 'Metodología Científica',
          adGrantAudit: 'Auditoría de Subvención Publicitaria',
          compliance: 'Cumplimiento'
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

// Define translations for all languages
const translations = {
  en: {
    // Nouvelles traductions pour le système d'engagement
    'Article engagement tracking started': 'Article engagement tracking started',
    'Article engagement tracking ended': 'Article engagement tracking ended',
    'Engagement level': 'Engagement level',
    'Read time': 'Read time',
    'Scroll depth': 'Scroll depth',
    'Interactions': 'Interactions',
    'Languages': 'Languages',
    
    // Traductions existantes
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
    // Nouvelles traductions pour le système d'engagement
    'Article engagement tracking started': 'Suivi d\'engagement d\'article démarré',
    'Article engagement tracking ended': 'Suivi d\'engagement d\'article terminé',
    'Engagement level': 'Niveau d\'engagement',
    'Read time': 'Temps de lecture',
    'Scroll depth': 'Profondeur de défilement',
    'Interactions': 'Interactions',
    'Languages': 'Langues',
    
    // Traductions existantes
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
  },
  es: {
    // Nouvelles traductions pour le système d'engagement
    'Article engagement tracking started': 'Seguimiento de participación en artículos iniciado',
    'Article engagement tracking ended': 'Seguimiento de participación en artículos finalizado',
    'Engagement level': 'Nivel de compromiso',
    'Read time': 'Tiempo de lectura',
    'Scroll depth': 'Profundidad de desplazamiento',
    'Interactions': 'Interacciones',
    'Languages': 'Idiomas',
    
    // Traductions existantes
    'Home': 'Inicio',
    'About Us': 'Acerca de Nosotros',
    'Contact': 'Contacto',
    'Our Impact': 'Nuestro Impacto',
    'Articles': 'Artículos',
    'Scientific Publications': 'Publicaciones Científicas',
    'Main Pages': 'Páginas Principales',
    'Site Navigation': 'Navegación del Sitio',
    'Site Map': 'Mapa del Sitio',
    'Research & Education': 'Investigación y Educación',
    'Health Resources': 'Recursos de Salud',
    'Scientific Team': 'Equipo Científico',
    'Mission & Impact': 'Misión e Impacto',
    'Legal & Compliance': 'Legal y Cumplimiento',
    'Our Research': 'Nuestra Investigación',
    'Scientific Methodology': 'Metodología Científica',
    'Lab Solutions': 'Soluciones de Laboratorio',
    'Nutrition': 'Nutrición',
    'Health Profile': 'Perfil de Salud',
    'Interactive Quiz': 'Cuestionario Interactivo',
    'Team Members': 'Miembros del Equipo',
    'Research Partners': 'Socios de Investigación',
    'Scientific Advisory Board': 'Consejo Científico Asesor',
    'Our Mission': 'Nuestra Misión',
    'Impact Programs': 'Programas de Impacto',
    'Success Stories': 'Historias de Éxito',
    'Support Our Research': 'Apoyar Nuestra Investigación',
    'Non-Profit Status': 'Estatus sin Fines de Lucro',
    'Privacy Policy': 'Política de Privacidad',
    'Terms of Use': 'Términos de Uso',
    'Accessibility': 'Accesibilidad',
    'Support Our Mission': 'Apoyar Nuestra Misión',
    'International Resources': 'Recursos Internacionales',
    'Looking for Specific Research?': '¿Buscando Investigación Específica?',
    'Explore our Scientific Library': 'Explore nuestra Biblioteca Científica',
    'Learn how you can support our research': 'Descubra cómo puede apoyar nuestra investigación',
    'A comprehensive overview of our website structure to help you navigate our research and resources efficiently.': 'Una visión completa de la estructura de nuestro sitio web para ayudarle a navegar por nuestra investigación y recursos de manera eficiente.',
    'Our Scientific Library contains all our published research organized by topic, date, and relevance to help you find exactly what you need.': 'Nuestra Biblioteca Científica contiene toda nuestra investigación publicada organizada por tema, fecha y relevancia para ayudarle a encontrar exactamente lo que necesita.',
    'As a non-profit organization, we rely on partnerships and community support to continue our research and educational programs.': 'Como organización sin fines de lucro, dependemos de asociaciones y apoyo comunitario para continuar nuestros programas de investigación y educación.',
    'Our research and educational resources are available in multiple languages to support a global audience.': 'Nuestra investigación y recursos educativos están disponibles en varios idiomas para apoyar a una audiencia global.',
  }
};