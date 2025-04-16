import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useArticleEngagement from '@/hooks/useArticleEngagement';

// Component to track article engagement across the site
const ArticleEngagementTracker: React.FC = () => {
  const location = useLocation();

  // Extract article data from location state or query params
  const getArticleData = () => {
    try {
      // Check if we're on an article page
      if (!location.pathname.includes('/article/')) {
        return null;
      }

      // Try to get article data from state
      if (location.state?.article) {
        return {
          articleId: location.state.article.id || 'unknown',
          articleLength: location.state.article.wordCount || 500
        };
      }

      // Fallback: extract ID from URL
      const articleId = location.pathname.split('/article/')[1]?.split('/')[0];
      if (articleId) {
        return {
          articleId,
          articleLength: 500 // Default word count when unknown
        };
      }

      return null;
    } catch (error) {
      console.error('[ArticleEngagementTracker] Error getting article data:', error);
      return null;
    }
  };

  const articleData = getArticleData();

  // Only initialize tracking if article data is available
  useEffect(() => {
    if (!articleData) {
      return;
    }

    console.log(`[ArticleEngagementTracker] Started tracking for article: ${articleData.articleId}`);

    return () => {
      console.log(`[ArticleEngagementTracker] Stopped tracking for article: ${articleData.articleId}`);
    };
  }, [location.pathname, articleData]);

  // Don't render anything if no article data
  if (!articleData) {
    return null;
  }

  // Use the hook only when article data is available
  const { metrics } = useArticleEngagement({
    articleId: articleData.articleId,
    articleLength: articleData.articleLength
  });

  // No UI to render, this is just for tracking
  return null;
};

export default ArticleEngagementTracker;