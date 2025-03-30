
import { useState, useEffect, useCallback } from 'react';
import { BehavioralMetrics } from '@/utils/types';

interface ResponseTimeTracker {
  questionId: string;
  startTime: number;
  endTime?: number;
}

export function useBehavioralMetrics() {
  const [metrics, setMetrics] = useState<BehavioralMetrics>({
    avgResponseTime: 0,
    changedAnswers: [],
    consistencyScore: 0.7, // Score par défaut
    focusedQuestions: [],
    responsePattern: 'methodical',
    longPauseQuestions: [],
    engagementIntensity: 75
  });

  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [responseTimers, setResponseTimers] = useState<ResponseTimeTracker[]>([]);
  const [answerHistory, setAnswerHistory] = useState<Map<string, string[]>>(new Map());
  const [hoverCount, setHoverCount] = useState<Map<string, number>>(new Map());
  const [focusTime, setFocusTime] = useState<Map<string, number>>(new Map());
  const [idleStartTime, setIdleStartTime] = useState<number | null>(null);
  const [idleTimeout, setIdleTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Fonction pour démarrer le suivi d'une question
  const startQuestionTracking = useCallback((questionId: string) => {
    setCurrentQuestion(questionId);
    
    // Enregistrer le temps de début
    setResponseTimers(prev => [
      ...prev.filter(t => t.questionId !== questionId), // Supprimer les trackers existants pour cette question
      {
        questionId,
        startTime: Date.now()
      }
    ]);
    
    // Initialiser le compteur de hover s'il n'existe pas
    setHoverCount(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(questionId)) {
        newMap.set(questionId, 0);
      }
      return newMap;
    });
    
    // Initialiser le temps de focus s'il n'existe pas
    setFocusTime(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(questionId)) {
        newMap.set(questionId, 0);
      }
      return newMap;
    });
    
    // Réinitialiser le temps d'inactivité
    resetIdleTimer();
  }, []);

  // Fonction pour enregistrer la réponse à une question
  const trackAnswer = useCallback((questionId: string, answer: string) => {
    // Enregistrer l'heure de fin de réponse
    setResponseTimers(prev => 
      prev.map(t => 
        t.questionId === questionId && !t.endTime
          ? { ...t, endTime: Date.now() }
          : t
      )
    );
    
    // Enregistrer la réponse dans l'historique
    setAnswerHistory(prev => {
      const newMap = new Map(prev);
      const previousAnswers = newMap.get(questionId) || [];
      newMap.set(questionId, [...previousAnswers, answer]);
      return newMap;
    });
    
    // Mettre à jour les métriques
    updateMetrics();
  }, []);

  // Fonction pour suivre le survol des éléments
  const trackHover = useCallback((questionId: string, elementId: string) => {
    setHoverCount(prev => {
      const newMap = new Map(prev);
      const count = newMap.get(questionId) || 0;
      newMap.set(questionId, count + 1);
      return newMap;
    });
    
    // Réinitialiser le temps d'inactivité
    resetIdleTimer();
  }, []);

  // Fonction pour suivre le temps de focus
  const trackFocus = useCallback((questionId: string, elementId: string, durationMs: number) => {
    setFocusTime(prev => {
      const newMap = new Map(prev);
      const time = newMap.get(questionId) || 0;
      newMap.set(questionId, time + durationMs);
      return newMap;
    });
    
    // Réinitialiser le temps d'inactivité
    resetIdleTimer();
  }, []);

  // Fonction pour réinitialiser le timer d'inactivité
  const resetIdleTimer = useCallback(() => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    
    setIdleStartTime(Date.now());
    
    // Configurer un nouveau timeout
    const timeout = setTimeout(() => {
      // L'utilisateur est considéré comme inactif après 10 secondes
      if (currentQuestion) {
        setMetrics(prev => {
          const updatedLongPauseQuestions = prev.longPauseQuestions.includes(currentQuestion)
            ? prev.longPauseQuestions
            : [...prev.longPauseQuestions, currentQuestion];
          
          return {
            ...prev,
            longPauseQuestions: updatedLongPauseQuestions
          };
        });
      }
    }, 10000);
    
    setIdleTimeout(timeout);
  }, [idleTimeout, currentQuestion]);

  // Mise à jour des métriques de comportement
  const updateMetrics = useCallback(() => {
    // Calculer le temps moyen de réponse
    const completedTimers = responseTimers.filter(t => t.endTime);
    const avgTime = completedTimers.length > 0
      ? completedTimers.reduce((acc, timer) => 
          acc + ((timer.endTime as number) - timer.startTime), 0) / completedTimers.length / 1000
      : 0;
    
    // Identifier les questions modifiées
    const changedQuestions = Array.from(answerHistory.entries())
      .filter(([_, answers]) => answers.length > 1)
      .map(([questionId, _]) => questionId);
    
    // Identifier les questions avec beaucoup de focus
    const highFocusQuestions = Array.from(focusTime.entries())
      .filter(([_, time]) => time > 10000) // Plus de 10 secondes de focus
      .map(([questionId, _]) => questionId);
    
    // Calculer un score de cohérence basé sur le nombre de changements
    // Plus le score est élevé, plus l'utilisateur est cohérent
    const totalQuestions = answerHistory.size;
    const changedRatio = totalQuestions > 0 ? changedQuestions.length / totalQuestions : 0;
    const consistencyScore = Math.max(0, Math.min(1, 1 - (changedRatio * 0.5)));
    
    // Déterminer le modèle de réponse
    let responsePattern: 'quick' | 'methodical' | 'hesitant' = 'methodical';
    if (avgTime < 5) {
      responsePattern = 'quick';
    } else if (avgTime > 15 || changedQuestions.length > totalQuestions * 0.3) {
      responsePattern = 'hesitant';
    }
    
    // Calculer l'intensité de l'engagement
    const totalHovers = Array.from(hoverCount.values()).reduce((acc, count) => acc + count, 0);
    const avgHoversPerQuestion = totalQuestions > 0 ? totalHovers / totalQuestions : 0;
    
    // Plus l'utilisateur survole les éléments et passe du temps sur les questions,
    // plus son engagement est considéré comme élevé
    const engagementIntensity = Math.min(100, Math.max(0,
      50 + // Base
      (avgHoversPerQuestion * 5) + // Bonus pour les survols
      (highFocusQuestions.length * 10) - // Bonus pour le focus élevé
      (changedQuestions.length * 5) // Malus pour l'indécision
    ));
    
    // Mettre à jour l'état des métriques
    setMetrics({
      avgResponseTime: avgTime,
      changedAnswers: changedQuestions,
      consistencyScore,
      focusedQuestions: highFocusQuestions,
      responsePattern,
      longPauseQuestions: metrics.longPauseQuestions, // Conservé de l'état précédent
      engagementIntensity
    });
  }, [responseTimers, answerHistory, focusTime, hoverCount, metrics.longPauseQuestions]);

  // Nettoyer le timer d'inactivité lors du démontage
  useEffect(() => {
    return () => {
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
    };
  }, [idleTimeout]);

  // Fonction pour réinitialiser toutes les métriques
  const resetMetrics = useCallback(() => {
    setMetrics({
      avgResponseTime: 0,
      changedAnswers: [],
      consistencyScore: 0.7,
      focusedQuestions: [],
      responsePattern: 'methodical',
      longPauseQuestions: [],
      engagementIntensity: 75
    });
    
    setCurrentQuestion(null);
    setResponseTimers([]);
    setAnswerHistory(new Map());
    setHoverCount(new Map());
    setFocusTime(new Map());
    setIdleStartTime(null);
    
    if (idleTimeout) {
      clearTimeout(idleTimeout);
      setIdleTimeout(null);
    }
  }, [idleTimeout]);

  return {
    metrics,
    startQuestionTracking,
    trackAnswer,
    trackHover,
    trackFocus,
    resetMetrics
  };
}
