
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface BreadcrumbsProps {
  customPaths?: {
    path: string;
    label: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customPaths }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Define path mapping for user-friendly names
  const pathMapping: { [key: string]: string } = {
    'articles': t('Articles'),
    'article': t('Article'),
    'about': t('About Us'),
    'impact': t('Our Impact'),
    'contact': t('Contact'),
    'quiz': t('Nutrition Quiz'),
    'nos-recherches': t('Our Research'),
    'labo-solutions': t('Lab Solutions'),
    'nutrition': t('Nutrition'),
    'profile-sante': t('Health Profile'),
    'bibliotheque-scientifique': t('Scientific Library'),
    'privacy-policy': t('Privacy Policy'),
    'sitemap': t('Site Map'),
    'scientific-methodology': t('Scientific Methodology'),
  };
  
  // Use custom paths if provided, or generate from current location
  const pathSegments = customPaths || location.pathname
    .split('/')
    .filter(segment => segment !== '')
    .map((segment, index, array) => {
      // Check if this is an article ID or other dynamic segment
      const isArticleId = array[index - 1] === 'article' && segment.length > 5;
      
      return {
        path: '/' + array.slice(0, index + 1).join('/'),
        label: isArticleId 
          ? t('Current Article') 
          : pathMapping[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      };
    });
  
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center"
          >
            <Home className="h-3.5 w-3.5 mr-1" />
            {t('Home')}
          </Link>
          {pathSegments.length > 0 && (
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-400" />
          )}
        </li>
        
        {pathSegments.map((segment, index) => (
          <li key={segment.path} className="flex items-center">
            {index === pathSegments.length - 1 ? (
              <span className="text-sm font-medium text-slate-700">
                {segment.label}
              </span>
            ) : (
              <>
                <Link 
                  to={segment.path} 
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  {segment.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
