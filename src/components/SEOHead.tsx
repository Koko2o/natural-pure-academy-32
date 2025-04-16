import React from 'react';
import { useLocation } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async'; // Removed due to installation issues
import { useTranslation } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  isNonprofit?: boolean;
}

// Temporary fix until react-helmet-async is properly installed
const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  imageUrl = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Natural Pure Academy',
  isNonprofit = true
}) => {
  const location = useLocation();
  const { t, language } = useTranslation();
  const baseUrl = 'https://naturalpureacademy.org';
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  // Default meta based on current path
  const getDefaultMeta = () => {
    // The 'en' defaults will be used when language is 'en'
    const defaults = {
      fr: {
        '/': {
          title: 'Natural Pure Academy | Organisation à but non lucratif en nutrition',
          description: 'Organisation à but non lucratif dédiée à la recherche et l\'éducation en nutrition basée sur la science.',
          keywords: ['nutrition', 'science', 'éducation', 'recherche', 'organisation à but non lucratif', 'santé']
        },
        '/about': {
          title: 'À propos | Natural Pure Academy',
          description: 'Découvrez notre mission, nos valeurs et notre équipe dédiée à l\'amélioration de la santé mondiale par la recherche scientifique.',
          keywords: ['à propos', 'mission', 'équipe scientifique', 'organisation à but non lucratif', 'recherche']
        },
        '/impact': {
          title: 'Notre Impact | Natural Pure Academy',
          description: 'Découvrez comment notre travail crée un impact tangible sur les communautés à travers la recherche et l\'éducation en nutrition.',
          keywords: ['impact', 'résultats', 'étude de cas', 'recherche']
        }
      },
      en: {
        '/': {
          title: 'Natural Pure Academy | Non-profit Nutrition Research Organization',
          description: 'A non-profit organization dedicated to scientific research and education in nutrition and health.',
          keywords: ['nutrition', 'science', 'education', 'research', 'non-profit', 'health']
        },
        '/about': {
          title: 'About Us | Natural Pure Academy',
          description: 'Learn about our mission, values, and team dedicated to improving global health through scientific research.',
          keywords: ['about', 'mission', 'scientific team', 'non-profit', 'research']
        },
        '/impact': {
          title: 'Our Impact | Natural Pure Academy',
          description: 'Discover how our work creates tangible impact on communities through nutrition research and education.',
          keywords: ['impact', 'outcomes', 'case studies', 'research']
        }
      }
    };

    const langDefaults = defaults[language as keyof typeof defaults] || defaults.en;
    return langDefaults[location.pathname as keyof typeof langDefaults] || {
      title: 'Natural Pure Academy',
      description: 'Scientific research and education in nutrition',
      keywords: ['nutrition', 'research', 'science', 'education']
    };
  };

  const defaultMeta = getDefaultMeta();
  const finalTitle = title || defaultMeta.title;
  const finalDescription = description || defaultMeta.description;
  const finalKeywords = keywords.length ? keywords : defaultMeta.keywords;

  // Update document title directly as a temporary solution
  if (typeof document !== 'undefined') {
    document.title = finalTitle;
  }

  return null; // Return null since we can't properly set meta tags without helmet
};

export default SEOHead;