
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricData {
  name: string;
  value: number;
  target?: number;
  unit?: string;
}

interface MetricTrackerProps {
  title: string;
  description?: string;
  metrics: MetricData[];
  showChart?: boolean;
}

const MetricTracker: React.FC<MetricTrackerProps> = ({ 
  title, 
  description, 
  metrics, 
  showChart = true 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {showChart && (
          <div className="h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const metric = metrics.find(m => m.value === value);
                    return [`${value}${metric?.unit || ''}`, name];
                  }}
                />
                <Bar dataKey="value" fill="#8884d8" />
                {metrics.some(m => m.target) && (
                  <Bar dataKey="target" fill="#82ca9d" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-1">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                )}
                {metric.target && (
                  <span className="text-xs text-muted-foreground ml-2">
                    / cible: {metric.target}{metric.unit || ''}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricTracker;
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetricTrackerProps {
  minimumReadTime?: number; // in seconds
}

const MetricTracker: React.FC<MetricTrackerProps> = ({ minimumReadTime = 180 }) => {
  const location = useLocation();
  
  // Track page views
  useEffect(() => {
    // Send page view to Google Analytics (simulated)
    trackPageView(location.pathname);
    
    // Reset timer for time-on-page tracking
    const startTime = Date.now();
    let hasTrackedTimeThreshold = false;
    
    // Set up timer to track minimum read time (important for Google Ad Grant)
    const timeTracker = setInterval(() => {
      const timeSpent = (Date.now() - startTime) / 1000;
      
      // If user has spent the minimum time and we haven't tracked it yet
      if (timeSpent >= minimumReadTime && !hasTrackedTimeThreshold) {
        trackTimeThresholdReached(location.pathname, timeSpent);
        hasTrackedTimeThreshold = true;
      }
    }, 5000); // Check every 5 seconds
    
    return () => {
      clearInterval(timeTracker);
      
      // Track exit time
      const timeSpent = (Date.now() - startTime) / 1000;
      trackTimeOnPage(location.pathname, timeSpent);
    };
  }, [location.pathname, minimumReadTime]);
  
  // Track scroll depth
  useEffect(() => {
    let maxScrollPercentage = 0;
    let hasTracked25 = false;
    let hasTracked50 = false;
    let hasTracked75 = false;
    let hasTracked100 = false;
    
    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight;
      
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      // Update max scroll depth
      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
        
        // Track specific scroll depth milestones (important for Google Ad Grant)
        if (scrollPercentage >= 25 && !hasTracked25) {
          trackScrollDepth(location.pathname, 25);
          hasTracked25 = true;
        }
        if (scrollPercentage >= 50 && !hasTracked50) {
          trackScrollDepth(location.pathname, 50);
          hasTracked50 = true;
        }
        if (scrollPercentage >= 75 && !hasTracked75) {
          trackScrollDepth(location.pathname, 75);
          hasTracked75 = true;
        }
        if (scrollPercentage >= 90 && !hasTracked100) {
          trackScrollDepth(location.pathname, 100);
          hasTracked100 = true;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Track final scroll depth on unmount
      trackScrollDepth(location.pathname, maxScrollPercentage);
    };
  }, [location.pathname]);
  
  // Track quiz participation
  useEffect(() => {
    if (location.pathname.includes('/quiz')) {
      // Track quiz start
      const handleQuizStart = () => {
        trackConversion('quiz_start');
      };
      
      // Track quiz completion
      const handleQuizComplete = () => {
        trackConversion('quiz_complete');
      };
      
      // Add event listeners for quiz tracking
      document.addEventListener('quiz_started', handleQuizStart);
      document.addEventListener('quiz_completed', handleQuizComplete);
      
      return () => {
        document.removeEventListener('quiz_started', handleQuizStart);
        document.removeEventListener('quiz_completed', handleQuizComplete);
      };
    }
  }, [location.pathname]);
  
  // These functions would normally send data to your analytics platform
  // For Google Ad Grant, you'll want to connect these to Google Analytics goals
  
  const trackPageView = (path: string) => {
    console.log(`[Analytics] Page view: ${path}`);
    // In real implementation, this would be:
    // gtag('event', 'page_view', { page_path: path });
  };
  
  const trackTimeOnPage = (path: string, seconds: number) => {
    console.log(`[Analytics] Time on page: ${path} - ${seconds.toFixed(1)}s`);
    // In real implementation, this would be:
    // gtag('event', 'time_on_page', { page_path: path, value: seconds });
  };
  
  const trackTimeThresholdReached = (path: string, seconds: number) => {
    console.log(`[Analytics] Minimum read time reached: ${path} - ${seconds.toFixed(1)}s`);
    // This is a conversion event for Google Ad Grant
    trackConversion('minimum_read_time');
    // In real implementation, this would be:
    // gtag('event', 'conversion', { 'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', page_path: path });
  };
  
  const trackScrollDepth = (path: string, percentage: number) => {
    console.log(`[Analytics] Scroll depth: ${path} - ${percentage}%`);
    
    // For 100% scroll, track as a conversion for Google Ad Grant
    if (percentage >= 90) {
      trackConversion('page_complete_read');
    }
    
    // In real implementation, this would be:
    // gtag('event', 'scroll_depth', { page_path: path, value: percentage });
  };
  
  const trackConversion = (conversionType: string) => {
    console.log(`[Analytics] Conversion: ${conversionType}`);
    // In real implementation, this would send the conversion to Google Analytics
    // which would then be imported into Google Ads for the Ad Grant
    
    // Example for Google Analytics 4:
    // gtag('event', conversionType, {
    //   send_to: 'G-MEASUREMENT_ID',
    //   value: 1
    // });
  };
  
  // This component doesn't render anything visible
  return null;
};

export default MetricTracker;
