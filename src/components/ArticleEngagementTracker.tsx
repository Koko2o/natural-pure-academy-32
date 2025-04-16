import React, { useState, useEffect } from 'react';
import { useArticleEngagement } from '../hooks/useArticleEngagement';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/LanguageContext';
import { Microscope, ChevronRight, Award, BarChart } from 'lucide-react';

interface ArticleEngagementTrackerProps {
  articleId: string;
  wordCount: number;
}

const ArticleEngagementTracker: React.FC<ArticleEngagementTrackerProps> = ({ 
  articleId, 
  wordCount 
}) => {
  const { trackBridgeImpression, trackBridgeClick } = useArticleEngagement();
  const [displayed, setDisplayed] = useState(false);
  const { t } = useTranslation();

  // Track engagement based on scroll depth
  useEffect(() => {
    const checkEngagement = () => {
      // Check scroll depth
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      // If user scrolled to 70% of the article and banner not shown yet
      if (scrollPercentage > 70 && !displayed) {
        setDisplayed(true);
        trackBridgeImpression(articleId);
      }
    };

    window.addEventListener('scroll', checkEngagement);

    // Initial check
    checkEngagement();

    return () => window.removeEventListener('scroll', checkEngagement);
  }, [articleId, displayed, trackBridgeImpression]);

  const handleClick = () => {
    trackBridgeClick(articleId);
  };

  // Don't show anything if the banner shouldn't be displayed
  if (!displayed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-lg p-6 my-8 shadow-sm">
      <div className="flex items-start">
        <div className="hidden sm:block mr-5">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Microscope className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-indigo-800 mb-3 flex items-center">
            <Microscope className="sm:hidden h-5 w-5 mr-2 text-indigo-600" />
            {t('Personalized Nutritional Analysis')}
          </h3>

          <p className="text-slate-700 mb-4">
            {t('Based on the scientific principles discussed in this article, our research team has developed an assessment tool to analyze your individual nutritional needs.')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded p-3 border border-slate-100 flex items-center">
              <Award className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm text-slate-700">
                {t('Research-backed')}
              </span>
            </div>
            <div className="bg-white rounded p-3 border border-slate-100 flex items-center">
              <BarChart className="h-4 w-4 text-indigo-500 mr-2" />
              <span className="text-sm text-slate-700">
                {t('Personalized results')}
              </span>
            </div>
            <div className="bg-white rounded p-3 border border-slate-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-slate-700">
                {t('5-minute assessment')}
              </span>
            </div>
          </div>

          <Link 
            to="/quiz" 
            onClick={handleClick}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md transition-colors font-medium"
          >
            {t('Start Free Assessment')}
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleEngagementTracker;