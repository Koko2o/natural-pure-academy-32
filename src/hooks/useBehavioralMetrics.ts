
import { useState, useEffect, useRef } from 'react';
import { BehavioralMetrics } from '@/utils/types';

/**
 * Hook qui mesure et analyse le comportement de l'utilisateur pendant le quiz
 * pour personnaliser les recommandations
 */
export const useBehavioralMetrics = () => {
  // Initialisation des métriques comportementales
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
  
  // Références pour suivre l'état
  const questionStartTime = useRef<number>(Date.now());
  const responseChanges = useRef<number>(0);
  const scrollPositions = useRef<number[]>([]);
  const scrollDirectionChanges = useRef<number>(0);
  const lastScrollDirection = useRef<'up' | 'down' | null>(null);
  const scrollPauses = useRef<number>(0);
  const lastScrollTime = useRef<number>(Date.now());
  const isScrolling = useRef<boolean>(false);
  const focusLostCount = useRef<number>(0);
  
  // Gestionnaire de défilement
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const currentTime = Date.now();
    
    // Marquer comme en défilement
    if (!isScrolling.current) {
      isScrolling.current = true;
      lastScrollTime.current = currentTime;
    }
    
    // Détecter le changement de direction
    if (scrollPositions.current.length > 0) {
      const lastPosition = scrollPositions.current[scrollPositions.current.length - 1];
      const currentDirection = currentPosition > lastPosition ? 'down' : 'up';
      
      if (lastScrollDirection.current !== null && lastScrollDirection.current !== currentDirection) {
        scrollDirectionChanges.current += 1;
        
        // Mettre à jour les métriques
        setMetrics(prev => ({
          ...prev,
          scrollBehavior: {
            ...prev.scrollBehavior,
            directionChanges: scrollDirectionChanges.current
          }
        }));
      }
      
      lastScrollDirection.current = currentDirection;
    }
    
    // Ajouter la position actuelle
    scrollPositions.current.push(currentPosition);
    
    // Limiter la taille du tableau des positions
    if (scrollPositions.current.length > 50) {
      scrollPositions.current.shift();
    }
    
    // Détecter une pause dans le défilement
    setTimeout(() => {
      const newTime = Date.now();
      if (newTime - currentTime > 500 && isScrolling.current) {
        // L'utilisateur a arrêté de défiler pendant au moins 500ms
        isScrolling.current = false;
        scrollPauses.current += 1;
        
        // Mettre à jour les métriques
        setMetrics(prev => ({
          ...prev,
          scrollBehavior: {
            ...prev.scrollBehavior,
            pauseFrequency: scrollPauses.current
          }
        }));
      }
    }, 500);
  };
  
  // Gestionnaire de changement de focus
  const handleVisibilityChange = () => {
    if (document.hidden) {
      focusLostCount.current += 1;
      
      // Mettre à jour les métriques
      setMetrics(prev => ({
        ...prev,
        focusLost: focusLostCount.current
      }));
    }
  };
  
  // Initialisation des écouteurs d'événements
  useEffect(() => {
    // Réinitialiser le temps de début pour la première question
    questionStartTime.current = Date.now();
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Calculer la vitesse moyenne de défilement
  useEffect(() => {
    if (scrollPositions.current.length < 2) return;
    
    // Calculer la distance totale de défilement
    let totalDistance = 0;
    for (let i = 1; i < scrollPositions.current.length; i++) {
      totalDistance += Math.abs(scrollPositions.current[i] - scrollPositions.current[i - 1]);
    }
    
    // Calculer la vitesse moyenne (pixels par seconde)
    const avgSpeed = totalDistance / ((Date.now() - lastScrollTime.current) / 1000);
    
    // Mettre à jour les métriques si la vitesse a changé significativement
    if (Math.abs(avgSpeed - metrics.scrollBehavior.speed) > 5) {
      setMetrics(prev => ({
        ...prev,
        scrollBehavior: {
          ...prev.scrollBehavior,
          speed: isNaN(avgSpeed) ? 0 : avgSpeed
        }
      }));
    }
  }, [metrics.scrollBehavior.directionChanges]);
  
  // Fonctions exposées pour être utilisées dans les composants
  
  /**
   * Appelé lorsque l'utilisateur passe à la question suivante
   * pour enregistrer le temps de réponse
   */
  const recordQuestionCompletion = () => {
    const endTime = Date.now();
    const timeSpent = (endTime - questionStartTime.current) / 1000; // en secondes
    
    // Mettre à jour les métriques
    setMetrics(prev => ({
      ...prev,
      responseTime: [...prev.responseTime, timeSpent],
      hesitationCount: [...prev.hesitationCount, responseChanges.current]
    }));
    
    // Réinitialiser pour la question suivante
    questionStartTime.current = endTime;
    responseChanges.current = 0;
  };
  
  /**
   * Appelé lorsque l'utilisateur change sa réponse à une question
   */
  const recordResponseChange = () => {
    responseChanges.current += 1;
    
    // Mettre à jour les métriques
    setMetrics(prev => ({
      ...prev,
      changeFrequency: prev.changeFrequency + 1
    }));
  };
  
  return {
    metrics,
    recordQuestionCompletion,
    recordResponseChange
  };
};

export default useBehavioralMetrics;
