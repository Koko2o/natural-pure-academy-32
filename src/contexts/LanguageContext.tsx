
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.articles': 'Articles',
    'nav.quiz': 'Quiz Nutrition',
    'nav.profile': 'Profil Santé',
    'nav.research': 'Nos Recherches',
    'nav.lab': 'Labo Solutions',
    'nav.nutrition': 'Nutrition',
    'nav.library': 'Bibliothèque Scientifique',
    'nav.impact': 'Notre Impact',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.newsletter': 'Abonnez-vous pour recevoir nos derniers articles et actualités.',
    'footer.subscribe': 'S\'abonner',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.quickLinks': 'Liens Rapides',
    'footer.categories': 'Catégories',
    'footer.supplements': 'Compléments Alimentaires',
    'footer.skincare': 'Soins de la Peau',
    'footer.haircare': 'Santé des Cheveux',
    'footer.wellness': 'Bien-être',
    
    // Common buttons
    'button.learnMore': 'En savoir plus',
    'button.readMore': 'Lire la suite',
    'button.takeQuiz': 'Faire le quiz',
    'button.contact': 'Nous contacter',
    
    // Impact page
    'impact.title': 'Notre Impact',
    'impact.subtitle': 'Faire la différence à travers la science',
    'impact.description': 'À Natural Pure Academy, notre mission est d\'améliorer la santé mondiale par la recherche scientifique et l\'éducation. Voici comment notre travail crée un impact tangible pour les communautés et les individus du monde entier.',
    'impact.byNumbers': 'L\'impact en chiffres',
    'impact.peopleHelped': 'Personnes aidées',
    'impact.researchPapers': 'Publications scientifiques',
    'impact.grants': 'Subventions de recherche',
    'impact.studies': 'Études cliniques',
    
    // About page
    'about.title': 'À propos de Natural Pure Academy',
    'about.mission': 'Notre Mission',
    'about.missionTitle': 'Promouvoir la santé par la science nutritionnelle',
    'about.missionDesc': 'Natural Pure Academy est une organisation à but non lucratif 501(c)(3) dédiée à l\'amélioration de la santé mondiale grâce à la recherche scientifique, l\'éducation et la sensibilisation communautaire dans le domaine de la nutrition et des micronutriments.',
    'about.nonprofit': 'Organisation à but non lucratif enregistrée',
    'about.values': 'Nos Valeurs Fondamentales',
    'about.team': 'Notre Équipe Scientifique',
    
    // Generic content
    'loading': 'Chargement...',
    'error': 'Une erreur est survenue',
    'notFound': 'Page non trouvée',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.quiz': 'Nutrition Quiz',
    'nav.profile': 'Health Profile',
    'nav.research': 'Our Research',
    'nav.lab': 'Lab Solutions',
    'nav.nutrition': 'Nutrition',
    'nav.library': 'Scientific Library',
    'nav.impact': 'Our Impact',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.newsletter': 'Subscribe to receive our latest articles and news.',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.quickLinks': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.supplements': 'Dietary Supplements',
    'footer.skincare': 'Skin Care',
    'footer.haircare': 'Hair Health',
    'footer.wellness': 'Wellness',
    
    // Common buttons
    'button.learnMore': 'Learn More',
    'button.readMore': 'Read More',
    'button.takeQuiz': 'Take the Quiz',
    'button.contact': 'Contact Us',
    
    // Impact page
    'impact.title': 'Our Impact',
    'impact.subtitle': 'Making a Difference Through Science',
    'impact.description': 'At Natural Pure Academy, our mission is to improve global health through scientific research and education. Here\'s how our work is creating tangible impact for communities and individuals worldwide.',
    'impact.byNumbers': 'Impact by the Numbers',
    'impact.peopleHelped': 'People Helped',
    'impact.researchPapers': 'Research Papers',
    'impact.grants': 'Research Grants',
    'impact.studies': 'Clinical Studies',
    
    // About page
    'about.title': 'About Natural Pure Academy',
    'about.mission': 'Our Mission',
    'about.missionTitle': 'Advancing Health Through Nutritional Science',
    'about.missionDesc': 'Natural Pure Academy is a 501(c)(3) non-profit organization dedicated to improving global health outcomes through scientific research, education, and community outreach in the field of nutrition and micronutrients.',
    'about.nonprofit': 'Registered Non-Profit Organization',
    'about.values': 'Our Core Values',
    'about.team': 'Our Scientific Team',
    
    // Generic content
    'loading': 'Loading...',
    'error': 'An error occurred',
    'notFound': 'Page not found',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from local storage first
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      return savedLanguage;
    }
    return 'fr'; // Default to French
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
