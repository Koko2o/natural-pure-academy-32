import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useArticleEngagement from '@/hooks/useArticleEngagement';
import { trackContentQuality } from '@/utils/adGrantCompliance';

interface ArticleEngagementData {
  articleId: string;
  articleLength: number;
  articleTitle: string;
  hasScientificCitations?: boolean;
  hasMedicalTerms?: boolean;
  category?: string;
  readLevel?: 'beginner' | 'intermediate' | 'advanced';
}

const ArticleEngagementTracker: React.FC<ArticleEngagementData> = ({ 
  articleId, 
  articleLength, 
  articleTitle,
  hasScientificCitations = true,
  hasMedicalTerms = true,
  category = 'nutrition',
  readLevel = 'intermediate'
}) => {
  const location = useLocation();
  const { trackBridgeImpression, trackBridgeClick } = useArticleEngagement();

  // Track user interactions with article content
  useEffect(() => {
    console.log(`[GoogleAdGrantsTrack] Tracking article engagement for: ${articleTitle}`);

    // Track initial article view event for Google Ad Grant reporting
    console.log(`[GoogleAdGrantsTrack] Article view: ${articleId}, Length: ${articleLength} words`);

    // Track content quality metrics for Google Ad Grant compliance
    trackContentQuality(location.pathname, {
      wordCount: articleLength,
      readTime: Math.ceil(articleLength / 200), // Avg reading time in minutes (200 words/min)
      hasScientificCitations: hasScientificCitations,
      hasStructuredData: true
    });

    // Calculate article substantiveness score (important for Google Ad Grants)
    const substantivenessScore = calculateSubstantivenessScore({
      wordCount: articleLength,
      hasScientificCitations,
      hasMedicalTerms,
      readLevel
    });

    console.log(`[GoogleAdGrantsCompliance] Article substantiveness score: ${substantivenessScore}/10`);

    // Simple tracking for article read time
    const startTime = Date.now();

    return () => {
      const timeSpentMs = Date.now() - startTime;
      const timeSpentSeconds = Math.floor(timeSpentMs / 1000);

      // Track read metrics for Google Ad Grant performance reporting
      console.log(`[GoogleAdGrantsMetric] Article read time: ${timeSpentSeconds} seconds`);

      // Track if article was likely read (spent at least 30 seconds per 500 words)
      const minimumReadTime = Math.min(30, articleLength / 500 * 30);
      const wasLikelyRead = timeSpentSeconds >= minimumReadTime;

      // Add engagement quality tracking for Grant compliance
      const readPercentage = Math.min(100, (timeSpentSeconds / (articleLength / 200 * 60)) * 100);

      console.log(`[GoogleAdGrantsMetric] Article engagement:`, {
        articleId,
        wasRead: wasLikelyRead,
        readPercentage: readPercentage.toFixed(2) + '%',
        timeSpentSeconds,
        category
      });
    };
  }, [articleId, articleLength, articleTitle, location.pathname, hasScientificCitations, hasMedicalTerms, category, readLevel]);

  // Calculate substantiveness score for Google Ad Grant quality requirements
  const calculateSubstantivenessScore = (params: {
    wordCount: number;
    hasScientificCitations: boolean;
    hasMedicalTerms: boolean;
    readLevel: string;
  }) => {
    let score = 0;

    // Word count scoring (0-3 points)
    if (params.wordCount >= 1500) score += 3;
    else if (params.wordCount >= 1000) score += 2;
    else if (params.wordCount >= 500) score += 1;

    // Scientific citations (0-2 points)
    if (params.hasScientificCitations) score += 2;

    // Medical terminology (0-1 point)
    if (params.hasMedicalTerms) score += 1;

    // Reading level (0-2 points)
    if (params.readLevel === 'advanced') score += 2;
    else if (params.readLevel === 'intermediate') score += 1;

    // Educational value (2 points for educational content)
    score += 2;

    return score;
  };

  return null; // This is a non-visual tracking component
};

export default ArticleEngagementTracker;