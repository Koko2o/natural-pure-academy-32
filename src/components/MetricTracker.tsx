import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * MetricTracker - Silently tracks important user engagement metrics
 * for Google Ad Grant compliance and optimization
 */
const MetricTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      try {
        // Get session data
        let sessionData = JSON.parse(sessionStorage.getItem('session_metrics') || '{}');

        // Initialize if new session
        if (!sessionData.startTime) {
          sessionData = {
            startTime: new Date().toISOString(),
            pageViews: [],
            engagementScore: 0,
            conversionEvents: []
          };
        }

        // Add current page view
        sessionData.pageViews.push({
          path: location.pathname,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || 'direct'
        });

        // Calculate engagement score
        // 10 points per page view, max 100
        sessionData.engagementScore = Math.min(100, sessionData.pageViews.length * 10);

        // Save updated data
        sessionStorage.setItem('session_metrics', JSON.stringify(sessionData));

        console.log(`[MetricTracker] Page view: ${location.pathname}`);
      } catch (error) {
        console.error('[MetricTracker] Error tracking metrics:', error);
      }
    };

    trackPageView();

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScrollDepth = 0;

      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const scrollDepth = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);

        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;

          // Log significant milestones
          if (scrollDepth >= 75 && maxScrollDepth < 75) {
            console.log('[MetricTracker] Deep scroll engagement: 75%+');

            // Count as a quality visit for Ad Grant purposes
            if (window.trackConversion) {
              window.trackConversion({
                eventName: 'Deep Content Engagement',
                eventCategory: 'Engagement',
                eventValue: 1,
                metadata: { scrollDepth }
              });
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    };

    const scrollTracker = trackScrollDepth();

    // Track time on page
    const startTime = Date.now();
    const timeTracker = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

      // Mark significant time milestone (2+ minutes)
      if (timeOnPage === 120) {
        console.log('[MetricTracker] Significant time engagement: 2+ minutes');
      }
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(timeTracker);
      scrollTracker();
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default MetricTracker;