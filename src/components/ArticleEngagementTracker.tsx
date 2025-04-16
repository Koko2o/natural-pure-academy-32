
import React, { useEffect } from 'react';
import { useArticleEngagement } from '@/hooks/useArticleEngagement';

interface ArticleEngagementTrackerProps {
  articleId: string;
  wordCount: number;
}

/**
 * Component that silently tracks user engagement with article content
 * This helps comply with Google Ad Grant requirements by measuring content quality metrics
 */
const ArticleEngagementTracker: React.FC<ArticleEngagementTrackerProps> = ({
  articleId,
  wordCount
}) => {
  const { metrics } = useArticleEngagement({
    articleId,
    articleLength: wordCount
  });

  // Report metrics to analytics
  useEffect(() => {
    // Only log significant engagement changes
    if (metrics.readPercentage > 10 && metrics.readPercentage % 25 === 0) {
      console.log(`[Analytics] Article ${articleId} engagement milestone: ${metrics.readPercentage}%`);
    }

    // Track conversion readiness
    if (metrics.isPrimeForConversion) {
      console.log(`[Analytics] User ready for conversion on article ${articleId}`);
      // Here we could trigger a newsletter signup prompt or other conversion action
    }
  }, [metrics.readPercentage, metrics.isPrimeForConversion, articleId]);

  return null; // This component doesn't render anything
};

export default ArticleEngagementTracker;
