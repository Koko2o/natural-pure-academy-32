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
import { useState, useEffect } from 'react';

interface ArticleEngagementMetrics {
  readingProgression: number;     // Pourcentage de l'article lu (0-100)
  engagementLevel: number;        // Score d'engagement (0-10)
  timeSpent: number;              // Temps passé sur l'article en secondes
  interactionPoints: number;      // Nombre d'interactions (clics, survols, etc.)
  highlightCount: number;         // Nombre de surbrillances de texte
}

export function useArticleEngagement() {
  const [metrics, setMetrics] = useState<ArticleEngagementMetrics>({
    readingProgression: 0,
    engagementLevel: 0,
    timeSpent: 0,
    interactionPoints: 0,
    highlightCount: 0
  });

  useEffect(() => {
    let startTime = Date.now();
    let timer: NodeJS.Timeout;
    let scrollDepth = 0;
    let interactions = 0;

    // Mise à jour du temps passé
    timer = setInterval(() => {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      setMetrics(prev => ({ ...prev, timeSpent: timeInSeconds }));

      // Calcul du niveau d'engagement
      const engagementScore = Math.min(
        10,
        (scrollDepth / 10) +                   // Jusqu'à 5 points pour la lecture
        (timeInSeconds > 120 ? 2 : timeInSeconds / 60) +  // Jusqu'à 2 points pour le temps
        (interactions / 5) +                    // Jusqu'à 2 points pour les interactions
        (prev.highlightCount / 2)               // Jusqu'à 1 point pour les surlignages
      );

      setMetrics(prev => ({ ...prev, engagementLevel: engagementScore }));
    }, 1000);

    // Suivi de la profondeur de défilement
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calcul du pourcentage de défilement
      const scrollPercentage = Math.min(
        100,
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Mise à jour du score de progression
      scrollDepth = Math.max(scrollDepth, Math.floor(scrollPercentage / 10));

      setMetrics(prev => ({ 
        ...prev, 
        readingProgression: Math.round(scrollPercentage) 
      }));
    };

    // Suivi des interactions
    const handleInteraction = () => {
      interactions++;
      setMetrics(prev => ({ 
        ...prev, 
        interactionPoints: interactions 
      }));
    };

    // Suivi des surlignages de texte
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 10) {
        setMetrics(prev => ({ 
          ...prev, 
          highlightCount: prev.highlightCount + 1 
        }));
      }
    };

    // Ajout des écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('mouseup', handleTextSelection);

    // Déclenchement initial
    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  return metrics;
}

import { useCallback } from 'react';

/**
 * Hook pour suivre l'engagement des utilisateurs entre les articles et le quiz
 */
export const useArticleEngagement = () => {
  // Enregistre l'impression du pont article vers quiz
  const trackBridgeImpression = useCallback((articleId: string) => {
    try {
      // Récupérer les statistiques existantes
      const metricsKey = `article_to_quiz_metrics_${articleId}`;
      const existingMetricsStr = localStorage.getItem(metricsKey);

      const metrics = existingMetricsStr ? JSON.parse(existingMetricsStr) : {
        impressions: 0,
        clicks: 0,
        lastImpression: null,
        lastClick: null
      };

      // Mettre à jour les impressions
      metrics.impressions += 1;
      metrics.lastImpression = new Date().toISOString();

      // Sauvegarder les statistiques mises à jour
      localStorage.setItem(metricsKey, JSON.stringify(metrics));

      // Envoi des données à l'API d'analyse (simulé)
      console.log(`[Analytics] Article bridge impression: ${articleId}`);
    } catch (error) {
      console.error('Erreur lors du suivi de l\'impression:', error);
    }
  }, []);

  // Enregistre le clic sur le pont article vers quiz
  const trackBridgeClick = useCallback((articleId: string) => {
    try {
      // Récupérer les statistiques existantes
      const metricsKey = `article_to_quiz_metrics_${articleId}`;
      const existingMetricsStr = localStorage.getItem(metricsKey);

      const metrics = existingMetricsStr ? JSON.parse(existingMetricsStr) : {
        impressions: 0,
        clicks: 0,
        lastImpression: null,
        lastClick: null
      };

      // Mettre à jour les clics
      metrics.clicks += 1;
      metrics.lastClick = new Date().toISOString();

      // Calculer le taux de conversion
      metrics.conversionRate = metrics.impressions > 0 
        ? (metrics.clicks / metrics.impressions) 
        : 0;

      // Sauvegarder les statistiques mises à jour
      localStorage.setItem(metricsKey, JSON.stringify(metrics));

      // Enregistrer l'ID de l'article pour le contexte du quiz
      localStorage.setItem('last_article_context', articleId);

      // Envoi des données à l'API d'analyse (simulé)
      console.log(`[Analytics] Article bridge click: ${articleId}, Rate: ${metrics.conversionRate}`);
    } catch (error) {
      console.error('Erreur lors du suivi du clic:', error);
    }
  }, []);

  return {
    trackBridgeImpression,
    trackBridgeClick
  };
};