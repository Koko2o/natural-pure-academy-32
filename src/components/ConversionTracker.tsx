
import React, { useEffect } from 'react';

interface ConversionEvent {
  eventName: string;
  eventCategory: 'Newsletter' | 'Download' | 'Quiz' | 'Contact' | 'Engagement';
  eventValue?: number;
  metadata?: Record<string, any>;
}

/**
 * Component that tracks user conversions for Google Ad Grant compliance
 * Google Ad Grant requires at least one conversion tracking per ad
 */
const ConversionTracker: React.FC = () => {
  // Set up conversion tracking
  useEffect(() => {
    // Define tracking function to be used throughout the application
    const trackConversion = (event: ConversionEvent) => {
      try {
        // Log the conversion event
        console.log(`[ConversionTracking] ${event.eventCategory}: ${event.eventName}`, 
          event.eventValue ? `Value: ${event.eventValue}` : '',
          event.metadata || {}
        );
        
        // Store in session for reporting
        const conversions = JSON.parse(sessionStorage.getItem('adGrantConversions') || '[]');
        conversions.push({
          ...event,
          timestamp: new Date().toISOString(),
        });
        sessionStorage.setItem('adGrantConversions', JSON.stringify(conversions));
        
        // In a real implementation, you would send this to Google Analytics or another tracking service
      } catch (error) {
        console.error('[ConversionTracking] Error tracking conversion:', error);
      }
    };

    // Make the tracking function globally available
    window.trackConversion = trackConversion;

    // Track page engagement as a conversion after 3 minutes on the site
    const engagementTimer = setTimeout(() => {
      trackConversion({
        eventName: 'Extended Page Visit',
        eventCategory: 'Engagement',
        eventValue: 1,
        metadata: {
          path: window.location.pathname,
          duration: '3min+',
        }
      });
    }, 3 * 60 * 1000);

    return () => {
      clearTimeout(engagementTimer);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Add type declaration for the global trackConversion function
declare global {
  interface Window {
    trackConversion: (event: ConversionEvent) => void;
  }
}

export default ConversionTracker;
