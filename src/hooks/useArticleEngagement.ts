
import { useState, useEffect, useRef } from 'react';

interface ArticleEngagementOptions {
  articleId: string;
  articleLength: number; // nombre approximatif de mots
  averageReadingTime?: number; // en minutes
}

interface ArticleEngagementMetrics {
  readPercentage: number;
  readTime: number; // en secondes
  scrollDepth: number;
  interactionPoints: string[];
  isEngaged: boolean;
  isPrimeForConversion: boolean;
}

/**
 * Hook qui mesure l'engagement de l'utilisateur sur un article
 * et détermine les meilleurs moments pour suggérer le quiz
 */
export const useArticleEngagement = ({
  articleId,
  articleLength,
  averageReadingTime = 3
}: ArticleEngagementOptions) => {
  const [metrics, setMetrics] = useState<ArticleEngagementMetrics>({
    readPercentage: 0,
    readTime: 0,
    scrollDepth: 0,
    interactionPoints: [],
    isEngaged: false,
    isPrimeForConversion: false
  });
  
  // Références pour suivre l'état
  const startTime = useRef<number>(Date.now());
  const isReading = useRef<boolean>(true);
  const maxScrollDepth = useRef<number>(0);
  const interactionCount = useRef<number>(0);
  const readingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Gestionnaire de défilement
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculer la profondeur de défilement (0-100%)
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    
    // Mettre à jour la profondeur maximale atteinte
    if (scrollPercentage > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercentage;
      
      // Ajouter un point d'interaction à chaque 25% de défilement
      if (Math.floor(scrollPercentage / 25) > Math.floor((maxScrollDepth.current - scrollPercentage) / 25)) {
        const milestone = `scroll-${Math.floor(scrollPercentage / 25) * 25}`;
        
        if (!metrics.interactionPoints.includes(milestone)) {
          setMetrics(prev => ({
            ...prev,
            interactionPoints: [...prev.interactionPoints, milestone]
          }));
        }
      }
    }
    
    // Mettre à jour les métriques
    setMetrics(prev => ({
      ...prev,
      scrollDepth: scrollPercentage
    }));
  };
  
  // Gestionnaire de clic
  const handleInteraction = (e: MouseEvent) => {
    // Ignorer les clics sur la navigation ou le footer
    const target = e.target as HTMLElement;
    const isNavOrFooter = target.closest('nav') || target.closest('footer');
    
    if (!isNavOrFooter) {
      interactionCount.current += 1;
      
      // Enregistrer le type d'élément cliqué
      const elementType = target.tagName.toLowerCase();
      const interactionPoint = `click-${elementType}-${interactionCount.current}`;
      
      setMetrics(prev => ({
        ...prev,
        interactionPoints: [...prev.interactionPoints, interactionPoint]
      }));
    }
  };
  
  // Gestionnaire de changement de focus
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isReading.current = false;
    } else {
      isReading.current = true;
    }
  };
  
  // Initialisation des écouteurs d'événements
  useEffect(() => {
    // Réinitialiser le temps de début
    startTime.current = Date.now();
    isReading.current = true;
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Intervalle pour mettre à jour le temps de lecture
    readingInterval.current = setInterval(() => {
      if (isReading.current) {
        const currentTime = Date.now();
        const readTime = (currentTime - startTime.current) / 1000; // en secondes
        
        // Calculer le pourcentage lu basé sur le temps et la longueur de l'article
        const avgReadTimeSeconds = averageReadingTime * 60;
        const expectedReadTimeSeconds = (articleLength / 250) * 60; // 250 mots par minute
        const readTimeTarget = Math.min(avgReadTimeSeconds, expectedReadTimeSeconds);
        const readPercentage = Math.min(100, (readTime / readTimeTarget) * 100);
        
        // Déterminer si l'utilisateur est engagé (a lu au moins 30% ou a passé du temps significatif)
        const isEngaged = readPercentage > 30 || readTime > 60; // 1 minute
        
        // Déterminer si l'utilisateur est prêt pour la conversion
        // (a lu plus de 60% ou a défilé jusqu'à 70% de l'article)
        const isPrimeForConversion = 
          (readPercentage > 60 || maxScrollDepth.current > 70) && 
          (interactionCount.current > 0 || readTime > 90); // 1.5 minutes
        
        setMetrics(prev => ({
          ...prev,
          readTime,
          readPercentage,
          isEngaged,
          isPrimeForConversion
        }));
      }
    }, 1000); // Mettre à jour chaque seconde
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (readingInterval.current) {
        clearInterval(readingInterval.current);
      }
    };
  }, [articleId, articleLength, averageReadingTime]);
  
  return {
    metrics
  };
};

export default useArticleEngagement;
