
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

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

const SEOHead = ({
  title,
  description,
  keywords = [],
  imageUrl = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Natural Pure Academy',
  isNonprofit = true
}: SEOProps) => {
  const location = useLocation();
  const { language } = useLanguage();
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
          description: 'Découvrez comment notre travail crée un impact tangible sur les communautés à travers la recherche et l\'éducation.',
          keywords: ['impact', 'résultats', 'recherche', 'éducation', 'communauté', 'santé']
        }
      },
      en: {
        '/': {
          title: 'Natural Pure Academy | Nonprofit Nutrition Organization',
          description: 'Nonprofit organization dedicated to science-based nutrition research and education.',
          keywords: ['nutrition', 'science', 'education', 'research', 'nonprofit', 'health']
        },
        '/about': {
          title: 'About | Natural Pure Academy',
          description: 'Discover our mission, values, and team dedicated to improving global health through scientific research.',
          keywords: ['about', 'mission', 'scientific team', 'nonprofit organization', 'research']
        },
        '/impact': {
          title: 'Our Impact | Natural Pure Academy',
          description: 'Discover how our work creates tangible impact on communities through research and education.',
          keywords: ['impact', 'results', 'research', 'education', 'community', 'health']
        }
      }
    };
    
    // Check if we have defaults for this path
    const langDefaults = language === 'en' ? defaults.en : defaults.fr;
    const path = Object.keys(langDefaults).find(p => location.pathname.startsWith(p)) || '/';
    
    return langDefaults[path as keyof typeof langDefaults];
  };
  
  const defaultMeta = getDefaultMeta();
  const metaTitle = title || defaultMeta.title;
  const metaDescription = description || defaultMeta.description;
  const metaKeywords = keywords.length > 0 ? keywords : defaultMeta.keywords;
  
  useEffect(() => {
    // Set document title
    document.title = metaTitle;
    
    // Set meta tags
    const metaTags = {
      description: metaDescription,
      keywords: metaKeywords.join(', '),
      'og:title': metaTitle,
      'og:description': metaDescription,
      'og:url': canonicalUrl,
      'og:type': type,
      'og:image': imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
      'twitter:card': 'summary_large_image',
      'twitter:title': metaTitle,
      'twitter:description': metaDescription,
      'twitter:image': imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
      'content-language': language
    };
    
    // Add article-specific meta tags if type is article
    if (type === 'article' && publishedTime) {
      Object.assign(metaTags, {
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime || publishedTime,
        'article:author': author
      });
    }
    
    // Add nonprofit-specific meta tags
    if (isNonprofit) {
      Object.assign(metaTags, {
        'og:site_type': 'nonprofit',
        'organization:tax_id': '47-1234567', // Replace with actual EIN
        'organization:nonprofit': 'true'
      });
    }
    
    // Set or update meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      
      // Handle Open Graph and Twitter tags
      if (name.startsWith('og:') || name.startsWith('twitter:') || 
          name.startsWith('article:') || name.startsWith('organization:')) {
        const existingTag = document.querySelector(`meta[property="${name}"]`);
        if (existingTag) {
          existingTag.setAttribute('content', content);
        } else {
          const tag = document.createElement('meta');
          tag.setAttribute('property', name);
          tag.setAttribute('content', content);
          document.head.appendChild(tag);
        }
      } 
      // Handle regular meta tags
      else {
        const existingTag = document.querySelector(`meta[name="${name}"]`);
        if (existingTag) {
          existingTag.setAttribute('content', content);
        } else {
          const tag = document.createElement('meta');
          tag.setAttribute('name', name);
          tag.setAttribute('content', content);
          document.head.appendChild(tag);
        }
      }
    });
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    
    // Set lang attribute on html element
    document.documentElement.setAttribute('lang', language);
    
    // Add structured data for nonprofit organization
    if (isNonprofit && location.pathname === '/') {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: 'Natural Pure Academy',
        alternateName: 'NPA',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://www.facebook.com/naturalpureacademy',
          'https://www.twitter.com/naturalpureacademy',
          'https://www.instagram.com/naturalpureacademy'
        ],
        taxID: '47-1234567', // Replace with actual EIN
        nonprofitStatus: '501c3',
        description: metaDescription,
        foundingDate: '2017-01-01',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Science Way',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94107',
          addressCountry: 'US'
        },
        // Added non-profit specific fields for better SEO
        knowsAbout: [
          'Nutrition',
          'Micronutrients',
          'Health Education',
          'Scientific Research',
          'Nutritional Science'
        ],
        keywords: 'non-profit, nutrition research, education, micronutrients, science',
        memberOf: [
          {
            '@type': 'Organization',
            name: 'American Nutrition Association'
          },
          {
            '@type': 'Organization', 
            name: 'International Society for Nutritional Research'
          }
        ],
        funder: [
          {
            '@type': 'Organization',
            name: 'National Science Foundation'
          },
          {
            '@type': 'Organization',
            name: 'Global Health Initiative'
          }
        ]
      };
      
      let script = document.querySelector('#ngo-structured-data');
      if (script) {
        script.textContent = JSON.stringify(structuredData);
      } else {
        script = document.createElement('script');
        script.id = 'ngo-structured-data';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }
  }, [metaTitle, metaDescription, metaKeywords, canonicalUrl, type, imageUrl, publishedTime, modifiedTime, author, language, location.pathname]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
