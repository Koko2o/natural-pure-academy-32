import { useState, useEffect, useCallback } from 'react';
import { BehavioralMetrics } from '@/utils/types';

/**
 * Hook pour suivre les métriques comportementales des utilisateurs pendant le quiz
 */
export const useBehavioralMetrics = () => {
  const [metrics, setMetrics] = useState<BehavioralMetrics>({
    timeSpent: 0,
    changeCount: 0,
    focusPoints: [],
    hesitationPatterns: [],
    readingSpeed: 'medium',
    engagementScore: 0,
  });

  // Initialiser les métriques
  useEffect(() => {
    const startTime = Date.now();
    let changeCounter = 0;
    const focusPoints: string[] = [];
    const hesitationPatterns: string[] = [];

    // Suivre les changements d'options
    const trackOptionChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'radio' || target.type === 'checkbox') {
        changeCounter++;

        // Enregistrer les questions qui ont causé une hésitation
        if (changeCounter > 0 && target.name) {
          focusPoints.push(target.name);
        }
      }
    };

    // Suivre les pauses de réflexion (hover prolongé)
    const trackHesitation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const questionId = target.closest('form')?.id;

      if (questionId && !hesitationPatterns.includes(questionId)) {
        hesitationPatterns.push(questionId);
      }
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('change', trackOptionChange);
    document.addEventListener('mouseover', trackHesitation);

    // Sauvegarder les métriques périodiquement
    const saveInterval = setInterval(() => {
      const currentTimeSpent = Math.floor((Date.now() - startTime) / 1000);
      const currentMetrics: BehavioralMetrics = {
        timeSpent: currentTimeSpent,
        changeCount: changeCounter,
        focusPoints: [...new Set(focusPoints)], // Dédupliquer
        hesitationPatterns: [...new Set(hesitationPatterns)], // Dédupliquer
        readingSpeed: calculateReadingSpeed(currentTimeSpent, changeCounter),
        engagementScore: calculateEngagementScore(currentTimeSpent, changeCounter, focusPoints.length),
      };

      setMetrics(currentMetrics);

      // Enregistrer les métriques localement
      try {
        localStorage.setItem('behavioral_metrics', JSON.stringify(currentMetrics));
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des métriques:', error);
      }
    }, 5000);

    return () => {
      document.removeEventListener('change', trackOptionChange);
      document.removeEventListener('mouseover', trackHesitation);
      clearInterval(saveInterval);
    };
  }, []);

  // Calculer la vitesse de lecture
  const calculateReadingSpeed = (timeSpent: number, changes: number): 'slow' | 'medium' | 'fast' => {
    const ratio = changes / timeSpent;
    if (ratio < 0.05) return 'slow';
    if (ratio > 0.2) return 'fast';
    return 'medium';
  };

  // Calculer le score d'engagement
  const calculateEngagementScore = (timeSpent: number, changes: number, focusPoints: number): number => {
    // Formule simplifiée - à ajuster selon besoins
    const timeScore = Math.min(timeSpent / 120, 1) * 40; // Max 40 points pour 2 minutes+
    const activityScore = Math.min(changes / 10, 1) * 40; // Max 40 points pour 10+ changements
    const focusScore = Math.min(focusPoints / 5, 1) * 20; // Max 20 points pour 5+ points de focus

    return Math.round(timeScore + activityScore + focusScore);
  };

  // Ajouter un point d'intérêt spécifique
  const trackInterestPoint = useCallback((pointId: string) => {
    setMetrics(prev => {
      if (!prev.focusPoints.includes(pointId)) {
        const updated = {
          ...prev,
          focusPoints: [...prev.focusPoints, pointId],
          engagementScore: Math.min(prev.engagementScore + 5, 100) // +5 points, max 100
        };

        // Enregistrer les métriques mises à jour
        try {
          localStorage.setItem('behavioral_metrics', JSON.stringify(updated));
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement des métriques:', error);
        }

        return updated;
      }
      return prev;
    });
  }, []);

  return {
    metrics,
    trackInterestPoint
  };
};