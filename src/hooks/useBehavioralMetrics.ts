
import { useState, useEffect, useRef } from 'react';
import { BehavioralMetrics } from '@/utils/types';

export const useBehavioralMetrics = () => {
  const [metrics, setMetrics] = useState<BehavioralMetrics>({
    responseTime: [],
    hesitationCount: [],
    changeFrequency: 0,
    focusLost: 0,
    scrollBehavior: {
      speed: 0,
      directionChanges: 0,
      pauseFrequency: 0
    }
  });
  
  const lastQuestionTime = useRef<number>(Date.now());
  const responseChangeCount = useRef<number>(0);
  const focusEvents = useRef<number>(0);
  const lastScrollPosition = useRef<number>(0);
  const directionChanges = useRef<number>(0);
  const scrollPauses = useRef<number>(0);
  const lastScrollTime = useRef<number>(Date.now());
  
  // Track question response time
  const recordResponseTime = () => {
    const now = Date.now();
    const responseTime = (now - lastQuestionTime.current) / 1000; // in seconds
    
    setMetrics(prev => ({
      ...prev,
      responseTime: [...prev.responseTime, responseTime]
    }));
    
    lastQuestionTime.current = now;
  };
  
  // Record hesitation (when user changes selection)
  const recordHesitation = (questionIndex: number) => {
    responseChangeCount.current += 1;
    
    setMetrics(prev => {
      const hesitationCount = [...prev.hesitationCount];
      if (!hesitationCount[questionIndex]) {
        hesitationCount[questionIndex] = 1;
      } else {
        hesitationCount[questionIndex] += 1;
      }
      
      return {
        ...prev,
        hesitationCount,
        changeFrequency: responseChangeCount.current
      };
    });
  };
  
  // Track focus lost events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        focusEvents.current += 1;
        
        setMetrics(prev => ({
          ...prev,
          focusLost: focusEvents.current
        }));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Track scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const currentTime = Date.now();
      
      // Track direction changes
      if ((currentPosition > lastScrollPosition.current && lastScrollPosition.current > 0) ||
          (currentPosition < lastScrollPosition.current && lastScrollPosition.current > 0)) {
        directionChanges.current += 1;
      }
      
      // Calculate scroll speed
      const timeDiff = (currentTime - lastScrollTime.current) / 1000;
      const distance = Math.abs(currentPosition - lastScrollPosition.current);
      const scrollSpeed = timeDiff > 0 ? distance / timeDiff : 0;
      
      // Track pauses in scrolling
      if (timeDiff > 2 && lastScrollTime.current > 0) {
        scrollPauses.current += 1;
      }
      
      setMetrics(prev => ({
        ...prev,
        scrollBehavior: {
          speed: scrollSpeed,
          directionChanges: directionChanges.current,
          pauseFrequency: scrollPauses.current
        }
      }));
      
      lastScrollPosition.current = currentPosition;
      lastScrollTime.current = currentTime;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return {
    metrics,
    recordResponseTime,
    recordHesitation,
    resetMetrics: () => {
      setMetrics({
        responseTime: [],
        hesitationCount: [],
        changeFrequency: 0,
        focusLost: 0,
        scrollBehavior: {
          speed: 0,
          directionChanges: 0,
          pauseFrequency: 0
        }
      });
      lastQuestionTime.current = Date.now();
      responseChangeCount.current = 0;
      focusEvents.current = 0;
      lastScrollPosition.current = 0;
      directionChanges.current = 0;
      scrollPauses.current = 0;
    }
  };
};
