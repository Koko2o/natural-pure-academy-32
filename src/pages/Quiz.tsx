import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import NutritionalQuiz from "@/components/NutritionalQuiz";
import { toast } from "sonner";
import { Beaker, ChevronRight, Award, Microscope, Users as LucideUsers, Brain, Sparkles, CheckCircle, Star, BarChart, Activity, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QuizResponse } from "@/utils/types";
import LabEffects from "@/components/quiz/LabEffects";
import GDPRCompliance from "@/components/GDPRCompliance";
import UrgencyCountdown from "@/components/quiz/UrgencyCountdown";
import { collectPersonalizationFactors, getPersonalizedMessage } from "@/utils/dynamicPersonalization";
import SocialProofIndicator from "@/components/quiz/SocialProofIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { useBehavioralMetrics } from "@/hooks/useBehavioralMetrics";
import QuizResults from "@/components/QuizResults";
import ScientificHighlightedText from "@/components/ui/ScientificHighlightedText";
import { useAdvancedRecommendations } from "@/hooks/useAdvancedRecommendations";
import { generateRecommendations } from "@/utils/recommenderSystem"; // Added import


/**
 * Génère un nombre stable de participants basé sur la date actuelle
 * (augmente progressivement pour créer un effet de popularité croissante
 * mais reste cohérent pour la session utilisateur))
 */
function getStableParticipantNumber(): number {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const baseNumber = 900; // Nombre de base
  const dailyIncrease = 3; // Augmentation journalière

  return baseNumber + (dayOfYear * dailyIncrease);
}

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [responses, setResponses] = useState<QuizResponse>({});
  const [userLocation, setUserLocation] = useState<string>("");
  const [personalizationFactors, setPersonalizationFactors] = useState<any>(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const introDone = useRef(false);

  // Métriques comportementales avec le hook personnalisé
  const { 
    metrics: behavioralData, 
    startQuestionTracking,
    trackAnswer,
    trackHover,
    trackFocus,
    resetMetrics 
  } = useBehavioralMetrics();

  // Préparation des recommandations avancées
  const {
    recommendations: advancedRecommendations, // Rename to avoid conflict
    explanation,
    isLoading: recommendationsLoading,
    isPrioritized,
    recalculateRecommendations,
    prioritizeByMetric
  } = useAdvancedRecommendations({
    quizResponses: responses,
    behavioralMetrics: behavioralData,
    neuroProfile: {
      stressIndex: 68,
      decisionConfidence: 73,
      attentionScore: 81,
      consistencyIndex: 85
    }
  });

  // Détecter la localisation approximative (simulée pour l'exemple)
  useEffect(() => {
    const cities = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Strasbourg", "Nantes", "Toulouse"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setUserLocation(randomCity);

    // Collecte des facteurs de personnalisation
    const factors = collectPersonalizationFactors();
    setPersonalizationFactors(factors);

    // Marquer la page comme chargée après un court délai pour l'animation
    setTimeout(() => {
      setPageLoaded(true);
    }, 500);

    // Terminer l'animation d'introduction après un délai
    setTimeout(() => {
      setShowIntroAnimation(false);
      introDone.current = true;
    }, 3500);
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    resetMetrics(); // Réinitialiser les métriques comportementales

    // Enregistrer le début du quiz
    localStorage.setItem('quizStartTime', Date.now().toString());

    // Notification de début de quiz
    toast.success("Analyse nutritionnelle initiée", {
      description: "Notre système analyse vos réponses en temps réel",
      icon: <Beaker className="h-5 w-5" />
    });
  };

  const handleQuizComplete = (finalResponses: QuizResponse) => {
    setResponses(finalResponses);
    setQuizCompleted(true);

    // Calcul du temps total passé dans le quiz
    const startTime = parseInt(localStorage.getItem('quizStartTime') || '0');
    const totalTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    // Enregistrement des statistiques anonymisées
    localStorage.setItem('quizCompletionStats', JSON.stringify({
      timeToComplete: totalTime,
      questionsChanged: behavioralData.changedAnswers.length,
      date: new Date().toISOString()
    }));

    // Notification de complétion
    toast.success("Analyse complétée avec succès", {
      description: "Vos recommandations personnalisées sont prêtes",
      icon: <CheckCircle className="h-5 w-5" />
    });
  };

  const handleUserInfoUpdate = (info: any) => {
    console.log("Mise à jour des informations utilisateur:", info);
    // Vous pouvez mettre à jour les facteurs de personnalisation ici si nécessaire
  };

  // Valeur fixe pour le compteur d'analyses restantes
  const [analysesRestantes, setAnalysesRestantes] = useState<number>(98);

  // Aucun effet de changement pour assurer la stabilité
  useEffect(() => {
    // Aucune mise à jour automatique pour éviter les fluctuations
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {/* Animation d'introduction scientifique */}
        {showIntroAnimation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto"
              >
                <Beaker className="w-full h-full text-blue-600" />
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold">Laboratoire de Nutrition</h1>
                <p className="text-gray-600 mt-2">Analyse scientifique en cours d'initialisation...</p>
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 2 }}
                className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-natural-100 via-natural-50 to-white rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Effet de laboratoire en arrière-plan */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <LabEffects intensity={0.5} />
        </div>

        <div className="relative container mx-auto px-4 py-8 md:py-10">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-medium">
              Laboratoire Indépendant
            </Badge>

            <p className="text-xs text-natural-500 mb-4">
              Contenu éducatif et scientifique uniquement - Aucune vente de produit
            </p>

            <div className="flex justify-center space-x-4 mb-6">
              <Button variant="ghost" size="sm" className="text-xs">
                Données scientifiques
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Études exclusives
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Recherches avancées
              </Button>
            </div>

            <Button variant="outline" size="sm" className="text-xs">
              Voir nos études scientifiques
            </Button>

            <p className="text-xs text-gray-500 mt-2">
              Plus de 10,000 personnes consultent déjà nos ressources scientifiques
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenu principal conditionnel (Quiz ou Formulaire d'introduction) */}
      <div className="container mx-auto px-4 py-8">
        {!quizStarted ? (
          /* Page d'introduction du quiz */
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introDone.current ? 1 : 0, y: introDone.current ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Identifiez vos besoins précis en micronutriments
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                <ScientificHighlightedText text="Test personnalisé basé sur notre [[research-methodology:méthodologie exclusive]] développée par notre équipe de chercheurs." />
              </p>
            </div>

            {/* Principaux problèmes de santé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Sparkles className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Stress et Fatigue</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  <ScientificHighlightedText text="Identifiez les micronutriments qui vous manquent réellement" />
                </p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Brain className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Sommeil Perturbé</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  <ScientificHighlightedText text="Découvrez les solutions naturelles validées scientifiquement" />
                </p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <BarChart className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Problèmes Digestifs</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  <ScientificHighlightedText text="Révélez les causes profondes validées par notre laboratoire" />
                </p>
              </motion.div>
            </div>

            {/* Bannière d'information */}
            <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-10 text-center">
              <p className="text-gray-700 font-medium mb-3">
                Basé sur une étude exclusive menée sur 243 participants.
              </p>
              <h2 className="text-2xl font-semibold mb-4">
                <ScientificHighlightedText text="Identifiez vos besoins réels en [[micronutrient-balance:micronutriments]]." />
              </h2>

              <Button 
                size="lg" 
                className="w-full md:w-auto text-lg py-6 px-8 group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg quiz-cta" 
                onClick={startQuiz}
                aria-label="Commencer mon bilan nutritionnel personnalisé"
              >
                <span>🧪 Démarrer Mon Test Gratuit</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>

              <div className="mt-4">
                <Button variant="ghost" className="text-sm text-gray-600">
                  Voir les Études Scientifiques
                </Button>
              </div>
            </div>

            {/* Statistiques et social proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-gray-900">{getStableParticipantNumber()}</p>
                <p className="text-sm text-gray-600">profils analysés</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-gray-900">72%</p>
                <p className="text-sm text-gray-600">d'efficacité prouvée</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">universités partenaires</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <span>Analyses restantes aujourd'hui: </span>
                  <span className="text-indigo-600 ml-1">{analysesRestantes}</span>
                  <span className="text-gray-400">/100</span>
                </div>
              </div>
            </div>

            {/* Badge de validation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                <Award className="h-5 w-5" />
                <span className="font-medium">Validé Scientifiquement</span>
              </div>
            </div>

            {/* Section de problèmes de santé courants */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8">Problèmes de Santé Courants</h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                Nous avons identifié les solutions scientifiques à vos problèmes les plus courants grâce à notre équipe de chercheurs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Stress Chronique</h3>
                    <p className="text-gray-600 mb-4">
                      <ScientificHighlightedText text="La science a identifié les nutriments exacts pour réduire vos [[cortisol-levels:hormones de stress]]" />
                    </p>
                    <div className="flex items-center text-green-600 gap-1">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">72% d'efficacité prouvée</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Solution Troubles du Sommeil</h3>
                    <p className="text-gray-600 mb-4">
                      <ScientificHighlightedText text="Des composés naturels peuvent améliorer votre sommeil de 71% sans [[side-effects:effets secondaires]]" />
                    </p>
                    <div className="flex items-center text-green-600 gap-1">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">85% des participants ont vu des résultats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicateurs de confiance fixes */}
            <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full flex-shrink-0">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Analyses restantes aujourd'hui</div>
                  <div className="text-lg font-semibold">98/100</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3">
                <div className="bg-amber-50 p-2 rounded-full flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Dernière participation</div>
                  <div className="text-lg font-semibold">Il y a 4 min</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full flex-shrink-0">
                  <LucideUsers className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Places disponibles</div>
                  <div className="text-lg font-semibold">6 places restantes</div>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="w-full md:w-auto text-lg py-6 px-8 group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg quiz-cta" 
                onClick={startQuiz}
                aria-label="Commencer mon bilan nutritionnel personnalisé"
              >
                <span>Commencer mon bilan</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>

              <p className="text-sm text-center text-muted-foreground mt-6">
                Environ 5 minutes • 100% confidentiel • Utilisé par {getStableParticipantNumber()} membres
              </p>

              {/* Urgency countdown */}
              <div className="mt-8">
                <UrgencyCountdown 
                  initialMinutes={30}
                  message={personalizationFactors ? getPersonalizedMessage(personalizationFactors, 'urgency') : "Dernière session d'analyse disponible aujourd'hui"}
                  variant="featured"
                />
              </div>

              {/* Social proof */}
              <div className="mt-8">
                <SocialProofIndicator
                  baseText={personalizationFactors ? getPersonalizedMessage(personalizationFactors, 'social') : undefined}
                  location={userLocation}
                  variant="detailed"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Quiz ou résultats */
          <div className="max-w-4xl mx-auto">
            {!quizCompleted ? (
              /* Questionnaire nutritionnel */
              <NutritionalQuiz 
                onComplete={handleQuizComplete} 
                onUserInfoUpdate={handleUserInfoUpdate}
                behavioralTracking={{
                  startQuestionTracking,
                  trackAnswer,
                  trackHover,
                  trackFocus
                }}
              />
            ) : (
              /* Résultats du quiz */
              <QuizResults
                recommendations={generateRecommendations(responses)} // Using generateRecommendations
                quizResponses={responses}
                behavioralMetrics={behavioralData}
                neuroProfile={{
                  stressIndex: 68,
                  decisionConfidence: 73,
                  attentionScore: 81,
                  consistencyIndex: 85
                }}
                onSaveProfile={() => {
                  // Sauvegarde du profil (simulation)
                  toast.success('Votre profil a été sauvegardé avec succès!');
                }}
                onViewArticles={() => {
                  // Navigation vers les articles recommandés
                  toast.info('Découvrez nos articles scientifiques recommandés...');
                  // Redirection vers la page d'articles serait implémentée ici
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Pied de page avec informations légales */}
      <div className="bg-gray-50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          <p className="mb-2">
            Les informations fournies sont à titre éducatif et ne remplacent pas un avis médical professionnel.
            Ce site ne commercialise aucun produit.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button variant="link" size="sm" className="text-xs text-gray-500">
              Mentions légales
            </Button>
            <Button variant="link" size="sm" className="text-xs text-gray-500">
              Politique de confidentialité
            </Button>
            <Button variant="link" size="sm" className="text-xs text-gray-500">
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Bannière RGPD */}
      <GDPRCompliance />
    </div>
  );
};

export default Quiz;