import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'fr' | 'en' | 'es';

type Translations = {
  [lang in Language]: {
    [key: string]: string;
  };
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  translations: Translations;
  addTranslation: (key: string, values: { [lang in Language]?: string }) => void;
  showDebugger: boolean;
  toggleDebugger: () => void;
}

// Default translations
const defaultTranslations: Translations = {
  fr: {
    language_code: 'fr',
    app_title: 'Natural Pure Academy - Solutions nutritionnelles basées sur la science',
    app_description: 'Découvrez des solutions naturelles pour votre santé, validées par la science et personnalisées pour vos besoins.',
    home: 'Accueil',
    articles: 'Articles',
    about: 'À Propos',
    contact: 'Contact',
    labo_solutions: 'Labo Solutions',
    profile_sante: 'Profil Santé',
    bibliotheque: 'Bibliothèque',
    recherches: 'Nos Recherches',
    sign_in: 'Se Connecter',
    language: 'Langue',
    quiz: 'Quiz',
    translation_debugger: 'Débogueur de Traduction',
    show_all: 'Afficher tout',
    show_missing: 'Afficher manquants',
    search_translations: 'Rechercher des traductions...',
    missing_translations: 'Traductions manquantes',
    missing: 'Manquant',
    article_engagement_tracking_started: 'Suivi d\'engagement d\'article démarré',
    article_engagement_tracking_ended: 'Suivi d\'engagement d\'article terminé',
    scientific_insights: 'Aperçus Scientifiques',
    read_more: 'Lire Plus',
    view_details: 'Voir les Détails',
    learn_more: 'En Savoir Plus',
    register_now: 'S\'inscrire Maintenant',
    start_quiz: 'Commencer le Quiz',
    your_results: 'Vos Résultats',
    recommended_solutions: 'Solutions Recommandées',
    next_step: 'Étape Suivante',
    previous_step: 'Étape Précédente',
    submit: 'Soumettre',
    loading: 'Chargement...',
    error_message: 'Une erreur est survenue, veuillez réessayer.',
    toggle_menu: 'Basculer le menu',
    page_not_found: 'Page non trouvée',
    go_home: 'Retour à l\'accueil',
    privacy_policy: 'Politique de Confidentialité',
    terms_of_service: 'Conditions d\'Utilisation',
    copyright: '© 2024 Natural Pure Academy. Tous droits réservés.',
    welcome_message: 'Bienvenue dans notre académie de solutions naturelles',
    current_language: 'Français',
    search: 'Rechercher',
    cart: 'Panier',
    settings: 'Paramètres',
    recommended_for_you: 'Recommandé pour vous',
    view_all: 'Voir tout',
    most_popular: 'Les plus populaires',
    recent: 'Récents',
    sign_up_cta: 'Inscrivez-vous pour recevoir nos dernières recherches',
    join_newsletter: 'Rejoindre notre newsletter',
    email_placeholder: 'Votre adresse email',
    subscribe: 'S\'abonner',
    loading_text: 'Chargement en cours...',
    based_on_science: 'Basé sur la science',
    natural_solutions: 'Solutions naturelles',
    personalized_approach: 'Approche personnalisée',
    our_mission: 'Notre mission',
    our_team: 'Notre équipe',
    our_values: 'Nos valeurs',
    our_partners: 'Nos partenaires'
  },
  en: {
    language_code: 'en',
    app_title: 'Natural Pure Academy - Science-based Nutritional Solutions',
    app_description: 'Discover natural solutions for your health, validated by science and personalized for your needs.',
    home: 'Home',
    articles: 'Articles',
    about: 'About',
    contact: 'Contact',
    labo_solutions: 'Lab Solutions',
    profile_sante: 'Health Profile',
    bibliotheque: 'Library',
    recherches: 'Our Research',
    sign_in: 'Sign In',
    language: 'Language',
    quiz: 'Quiz',
    translation_debugger: 'Translation Debugger',
    show_all: 'Show All',
    show_missing: 'Show Missing',
    search_translations: 'Search translations...',
    missing_translations: 'Missing translations',
    missing: 'Missing',
    article_engagement_tracking_started: 'Article engagement tracking started',
    article_engagement_tracking_ended: 'Article engagement tracking ended',
    scientific_insights: 'Scientific Insights',
    read_more: 'Read More',
    view_details: 'View Details',
    learn_more: 'Learn More',
    register_now: 'Register Now',
    start_quiz: 'Start Quiz',
    your_results: 'Your Results',
    recommended_solutions: 'Recommended Solutions',
    next_step: 'Next Step',
    previous_step: 'Previous Step',
    submit: 'Submit',
    loading: 'Loading...',
    error_message: 'An error has occurred, please try again.',
    toggle_menu: 'Toggle menu',
    page_not_found: 'Page not found',
    go_home: 'Return to home',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    copyright: '© 2024 Natural Pure Academy. All rights reserved.',
    welcome_message: 'Welcome to our academy of natural solutions',
    current_language: 'English',
    search: 'Search',
    cart: 'Cart',
    settings: 'Settings',
    recommended_for_you: 'Recommended for you',
    view_all: 'View all',
    most_popular: 'Most popular',
    recent: 'Recent',
    sign_up_cta: 'Sign up to receive our latest research',
    join_newsletter: 'Join our newsletter',
    email_placeholder: 'Your email address',
    subscribe: 'Subscribe',
    loading_text: 'Loading...',
    based_on_science: 'Based on science',
    natural_solutions: 'Natural solutions',
    personalized_approach: 'Personalized approach',
    our_mission: 'Our mission',
    our_team: 'Our team',
    our_values: 'Our values',
    our_partners: 'Our partners'
  },
  es: {
    language_code: 'es',
    app_title: 'Natural Pure Academy - Soluciones Nutricionales Basadas en la Ciencia',
    app_description: 'Descubra soluciones naturales para su salud, validadas por la ciencia y personalizadas para sus necesidades.',
    home: 'Inicio',
    articles: 'Artículos',
    about: 'Acerca de',
    contact: 'Contacto',
    labo_solutions: 'Soluciones de Laboratorio',
    profile_sante: 'Perfil de Salud',
    bibliotheque: 'Biblioteca',
    recherches: 'Nuestras Investigaciones',
    sign_in: 'Iniciar Sesión',
    language: 'Idioma',
    quiz: 'Cuestionario',
    translation_debugger: 'Depurador de Traducción',
    show_all: 'Mostrar Todo',
    show_missing: 'Mostrar Faltantes',
    search_translations: 'Buscar traducciones...',
    missing_translations: 'Traducciones faltantes',
    missing: 'Faltante',
    article_engagement_tracking_started: 'Seguimiento de participación en artículos iniciado',
    article_engagement_tracking_ended: 'Seguimiento de participación en artículos finalizado',
    scientific_insights: 'Perspectivas Científicas',
    read_more: 'Leer Más',
    view_details: 'Ver Detalles',
    learn_more: 'Saber Más',
    register_now: 'Regístrese Ahora',
    start_quiz: 'Iniciar Cuestionario',
    your_results: 'Sus Resultados',
    recommended_solutions: 'Soluciones Recomendadas',
    next_step: 'Siguiente Paso',
    previous_step: 'Paso Anterior',
    submit: 'Enviar',
    loading: 'Cargando...',
    error_message: 'Ha ocurrido un error, por favor inténtelo de nuevo.',
    toggle_menu: 'Alternar menú',
    page_not_found: 'Página no encontrada',
    go_home: 'Volver al inicio',
    privacy_policy: 'Política de Privacidad',
    terms_of_service: 'Términos de Servicio',
    copyright: '© 2024 Natural Pure Academy. Todos los derechos reservados.',
    welcome_message: 'Bienvenido a nuestra academia de soluciones naturales',
    current_language: 'Español',
    search: 'Buscar',
    cart: 'Carrito',
    settings: 'Configuración',
    recommended_for_you: 'Recomendado para usted',
    view_all: 'Ver todo',
    most_popular: 'Más populares',
    recent: 'Recientes',
    sign_up_cta: 'Regístrese para recibir nuestras últimas investigaciones',
    join_newsletter: 'Únase a nuestro boletín',
    email_placeholder: 'Su dirección de correo electrónico',
    subscribe: 'Suscribirse',
    loading_text: 'Cargando...',
    based_on_science: 'Basado en la ciencia',
    natural_solutions: 'Soluciones naturales',
    personalized_approach: 'Enfoque personalizado',
    our_mission: 'Nuestra misión',
    our_team: 'Nuestro equipo',
    our_values: 'Nuestros valores',
    our_partners: 'Nuestros socios'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the language from localStorage, default to 'fr'
  const getInitialLanguage = (): Language => {
    try {
      // We want to log this to help with debugging
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
  const [translations, setTranslations] = useState<Translations>(defaultTranslations);
  const [showDebugger, setShowDebugger] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      setLanguageState(lang);
      console.log(`[LanguageMonitor] Language changed to: ${lang}`);
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
      (text, [placeholder, value]) => text.replace(new RegExp(`{{${placeholder}}}`, 'g'), value),
      translation
    );
  };

  // Add new translations
  const addTranslation = (key: string, values: { [lang in Language]?: string }) => {
    setTranslations(prevTranslations => {
      const newTranslations = { ...prevTranslations };

      // For each language provided in values
      Object.entries(values).forEach(([lang, value]) => {
        if (value && ['fr', 'en', 'es'].includes(lang)) {
          newTranslations[lang as Language] = {
            ...newTranslations[lang as Language],
            [key]: value
          };
        }
      });

      return newTranslations;
    });
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
    translations,
    addTranslation,
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