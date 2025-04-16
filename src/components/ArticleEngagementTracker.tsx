
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ArticleEngagementMetrics {
  readingTime: number;
  scrollDepth: number;
  interactions: number;
  completionRate: number;
  source?: string;
  campaignId?: string;
}

const ArticleEngagementTracker = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const [metrics, setMetrics] = useState<ArticleEngagementMetrics>({
    readingTime: 0,
    scrollDepth: 0,
    interactions: 0,
    completionRate: 0
  });
  const articleRef = useRef<HTMLElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const maxScrollDepth = useRef(0);
  const interactionCount = useRef(0);
  const tracked = useRef(false);

  // Extract UTM parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('utm_source');
    const campaign = params.get('utm_campaign');
    
    if (source || campaign) {
      setMetrics(prev => ({
        ...prev,
        source: source || undefined,
        campaignId: campaign || undefined
      }));
      
      // Store campaign data for cross-page tracking
      if (source) {
        sessionStorage.setItem('utm_source', source);
      }
      if (campaign) {
        sessionStorage.setItem('utm_campaign', campaign);
      }
    } else {
      // Try to get from session storage for cross-page tracking
      const storedSource = sessionStorage.getItem('utm_source');
      const storedCampaign = sessionStorage.getItem('utm_campaign');
      
      if (storedSource || storedCampaign) {
        setMetrics(prev => ({
          ...prev,
          source: storedSource || undefined,
          campaignId: storedCampaign || undefined
        }));
      }
    }
  }, [location]);

  // Track reading time
  useEffect(() => {
    const trackReadingTime = () => {
      const now = Date.now();
      const seconds = Math.round((now - startTime.current) / 1000);
      
      setMetrics(prev => ({
        ...prev,
        readingTime: seconds
      }));
    };

    timer.current = setInterval(trackReadingTime, 1000);
    
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  // Find article element and track scroll depth
  useEffect(() => {
    // Find main article element
    const article = document.querySelector('article') || 
                    document.querySelector('.article-content') ||
                    document.querySelector('main');
    
    if (article) {
      articleRef.current = article as HTMLElement;
    }
    
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const articleHeight = articleRef.current.scrollHeight;
      const articleTop = articleRef.current.offsetTop;
      const articleBottom = articleTop + articleHeight;
      
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const viewportBottom = scrollY + windowHeight;
      
      // Calculate how much of the article is visible
      const visibleTop = Math.max(articleTop, scrollY);
      const visibleBottom = Math.min(articleBottom, viewportBottom);
      
      let visiblePercentage = 0;
      if (visibleBottom > visibleTop) {
        const visibleHeight = visibleBottom - visibleTop;
        visiblePercentage = Math.min(100, (visibleHeight / articleHeight) * 100);
      }
      
      // Calculate scroll depth (how far through the article the user has scrolled)
      const scrollPercentage = Math.min(100, ((viewportBottom - articleTop) / articleHeight) * 100);
      
      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
      }
      
      setMetrics(prev => ({
        ...prev,
        scrollDepth: maxScrollDepth.current,
        completionRate: maxScrollDepth.current >= 70 ? 100 : Math.round(maxScrollDepth.current * 0.8)
      }));
      
      // Track conversion when user has engaged significantly
      if (!tracked.current && 
          (maxScrollDepth.current > 60 || metrics.readingTime > 120) && 
          interactionCount.current > 2) {
        trackConversion('article_engagement');
        tracked.current = true;
      }
    };
    
    // Track interactions
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      
      // Skip tracking for navigation elements
      if (target.closest('nav') || target.closest('header') || target.closest('footer')) {
        return;
      }
      
      interactionCount.current += 1;
      
      setMetrics(prev => ({
        ...prev,
        interactions: interactionCount.current
      }));
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [metrics.readingTime]);

  // Track conversion on page unload if user engaged significantly
  useEffect(() => {
    const handleUnload = () => {
      // Track article read conversion if time spent is significant
      if (metrics.readingTime > 30 && metrics.scrollDepth > 40 && !tracked.current) {
        trackConversion('article_partial_read');
      }
    };
    
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [metrics]);

  // Function to track conversion
  const trackConversion = (conversionType: string) => {
    // Get the article ID from pathname or data attribute
    const articleId = location.pathname.split('/').pop() || 'unknown';
    
    // Prepare conversion data
    const conversionData = {
      conversionType,
      articleId,
      metrics: {
        ...metrics,
        readingTime: metrics.readingTime,
        scrollDepth: metrics.scrollDepth,
        interactions: interactionCount.current
      },
      timestamp: new Date().toISOString()
    };
    
    // Log conversion for debugging
    console.log('[GoogleAdGrantsConversion]', conversionData);
    
    // Store conversion in local storage for reporting
    try {
      const conversions = JSON.parse(localStorage.getItem('article_conversions') || '[]');
      conversions.push(conversionData);
      localStorage.setItem('article_conversions', JSON.stringify(conversions));
    } catch (error) {
      console.error('Error storing conversion:', error);
    }
    
    // This would typically send data to an analytics service
    // For now, we're just storing it locally
  };

  return null; // This is a tracking component with no UI
};

export default ArticleEngagementTracker;
