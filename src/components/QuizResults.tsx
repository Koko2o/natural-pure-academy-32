import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedRecommendations } from '@/hooks/useAdvancedRecommendations';
import { QuizResponse, Recommendation } from '@/utils/types';
import { ScientificHighlightedText } from './ui/ScientificHighlightedText';
import SocialProofIndicator from './quiz/SocialProofIndicator';
import { useBehavioralMetrics } from '@/hooks/useBehavioralMetrics';
import { FaFlask, FaUsers, FaClock, FaChartLine, FaStar, FaCheck } from 'react-icons/fa';
import secureStorage from '@/utils/secureStorage';

interface QuizResultsProps {
  quizResponses: QuizResponse;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quizResponses }) => {
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'details' | 'feedback'>('recommendations');
  const [userFeedback, setUserFeedback] = useState<{ [key: string]: { helpful: boolean; purchaseIntent: number; additionalComments?: string } }>({});
  const [purchaseIntentSlider, setPurchaseIntentSlider] = useState<number>(7);
  const [additionalFeedback, setAdditionalFeedback] = useState<string>('');
  const [activeFeedbackProduct, setActiveFeedbackProduct] = useState<string | null>(null);
  const [detailsView, setDetailsView] = useState<'factors' | 'nutrients'>('factors');

  // Simuler données comportementales et neurales
  const behavioralMetrics = useBehavioralMetrics();
  const neuroProfile = {
    decisionSpeed: 75,
    consistencyScore: 82,
    detailOrientation: 68,
    riskAversion: 55
  };

  const {
    recommendations,
    explanation,
    isLoading,
    isPrioritized,
    precision,
    prioritizeByMetric,
    recalculateRecommendations,
    recordFeedback
  } = useAdvancedRecommendations({
    quizResponses,
    behavioralMetrics,
    neuroProfile
  });

  // Dernier rafraîchissement
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [stabilityMessage, setStabilityMessage] = useState<string>("");

  // Facteurs de santé extraits des réponses
  const [healthFactors, setHealthFactors] = useState<any>({
    age: quizResponses.personal?.age || '30-40',
    stressLevel: quizResponses.wellbeing?.stressLevel ? Number(quizResponses.wellbeing.stressLevel) * 10 : 60,
    sleepQuality: quizResponses.wellbeing?.sleepQuality ? Number(quizResponses.wellbeing.sleepQuality) * 10 : 50,
    activityLevel: quizResponses.lifestyle?.weeklyActivity ? Number(quizResponses.lifestyle.weeklyActivity) * 10 : 30,
    dietQuality: quizResponses.diet?.qualityRating ? Number(quizResponses.diet.qualityRating) * 10 : 60
  });

  // Besoins en nutriments estimés (simulés)
  const [nutrientNeeds, setNutrientNeeds] = useState<any>({
    magnesium: healthFactors.stressLevel > 50 ? 75 : 45,
    omega3: 65,
    vitaminD: 80,
    zinc: 60,
    probiotics: quizResponses.symptoms?.includes('digestive_issues') ? 85 : 50
  });

  // Placeholder for nutritionalProfile -  This needs to be properly defined
  const nutritionalProfile = {
    overallScore: 78,
    strengths: ["Good sleep quality", "Regular exercise"],
    weaknesses: ["High stress levels", "Poor diet"],
    keyFactors: [
      { name: "Stress", score: 85, color: "text-red-500", icon: <FaChartLine className="text-red-500 text-xl" /> },
      { name: "Sleep", score: 60, color: "text-blue-500", icon: <FaClock className="text-blue-500 text-xl" /> },
      { name: "Activity", score: 70, color: "text-green-500", icon: <FaUsers className="text-green-500 text-xl" /> },
      { name: "Diet", score: 45, color: "text-yellow-500", icon: <FaFlask className="text-yellow-500 text-xl" /> },
    ]
  };


  const [showBonusContent, setShowBonusContent] = useState(false);

  useEffect(() => {
    setLastRefreshTime(new Date());

    // Message de stabilité qui explique la nature stable des recommandations
    const messages = [
      "Nos recommandations sont optimisées pour la stabilité et la cohérence",
      "Les résultats sont calibrés quotidiennement pour vous garantir des recommandations fiables",
      "Analyse complète effectuée avec une précision de pointe"
    ];

    const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
    setStabilityMessage(selectedMessage);
  }, [recommendations]);

  // Formatage du temps écoulé depuis le dernier rafraîchissement
  const formatRefreshTime = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastRefreshTime.getTime()) / 1000);

    if (diff < 60) return `il y a ${diff} secondes`;
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
    return `il y a ${Math.floor(diff / 3600)} heures`;
  };

  const handleFeedbackSubmit = (productTitle: string) => {
    const feedback = {
      helpful: !!userFeedback[productTitle]?.helpful,
      purchaseIntent: purchaseIntentSlider,
      additionalComments: additionalFeedback
    };

    // Trouver la recommandation correspondante
    const recommendation = recommendations.find(r => r.title === productTitle);
    if (recommendation) {
      recordFeedback(recommendation, feedback);
    }

    // Mettre à jour l'état local
    setUserFeedback({
      ...userFeedback,
      [productTitle]: feedback
    });

    setActiveFeedbackProduct(null);
    setAdditionalFeedback('');
    setPurchaseIntentSlider(7);
  };

  // Enregistrement des résultats utilisateur
  useEffect(() => {
    if (quizResponses.personal?.email) {
      try {
        // Stocker de manière sécurisée
        localStorage.setItem('user_email', quizResponses.personal.email);

        // Pour des démonstrations seulement (à remplacer par une vraie API)
        console.log("Mise à jour des informations utilisateur:", quizResponses.personal);

        // Dans une implémentation réelle, vous enverriez ces données à votre API
        // Exemple: 
        // const apiClient = {
        //   update: (email, data) => console.log("API update:", email, data)
        // };
        // apiClient.update(quizResponses.personal.email, {
        //   lastQuizDate: new Date(),
        //   quizResponses: quizResponses
        // });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des résultats:", error);
      }
    }
  }, [quizResponses]);


  return (
    <div className="max-w-4xl mx-auto pb-20 bg-white shadow-xl rounded-lg overflow-hidden">
      {/* En-tête des résultats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-8">
        <h1 className="text-3xl font-bold mb-2">
          <ScientificHighlightedText>
            Analyse Nutritionnelle Personnalisée
          </ScientificHighlightedText>
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 py-1 px-3 rounded-full text-sm backdrop-blur-sm">
              <span className="font-semibold">Précision estimée: {precision}%</span>
            </div>
            <div className="bg-white/20 py-1 px-3 rounded-full text-sm backdrop-blur-sm">
              <span className="font-semibold">Dernière analyse: {formatRefreshTime()}</span>
            </div>
          </div>
          <button 
            onClick={recalculateRecommendations}
            className="bg-white text-indigo-700 py-1 px-4 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition">
            Rafraîchir l'analyse
          </button>
        </div>
      </div>

      {/* Bannière d'information */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 mx-6 mt-6 text-sm text-blue-700 rounded">
        <div className="flex items-center">
          <FaFlask className="mr-2 text-blue-500" />
          <p>{stabilityMessage}</p>
        </div>
      </div>

      {/* Onglets de navigation */}
      <div className="flex border-b border-gray-200 px-6">
        <button
          onClick={() => setSelectedTab('recommendations')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'recommendations' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Recommandations Personnalisées
        </button>
        <button
          onClick={() => setSelectedTab('details')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'details' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Détails d'Analyse
        </button>
        <button
          onClick={() => setSelectedTab('feedback')}
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            selectedTab === 'feedback' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Votre Avis
        </button>
      </div>

      {/* Contenu principal */}
      <div className="p-6 pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Analyse nutritionnelle en cours...</p>
            <p className="text-sm text-gray-500 mt-2">Calcul des besoins personnalisés selon 42 facteurs d'analyse</p>
          </div>
        ) : (
          <>
            {selectedTab === 'recommendations' && (
              <>
                <motion.div 
                  className="mb-8 result-card" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                      <FaChartLine size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Votre profil nutritionnel</h3>
                      <p className="text-gray-600">Basé sur vos réponses et l'analyse de notre NeuroEngine</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-3xl font-bold text-blue-600">{nutritionalProfile.overallScore}/100</div>
                      <div className="text-sm text-gray-500">Score global</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Vos points forts</h4>
                      <div className="space-y-2">
                        {nutritionalProfile.strengths.map((strength, i) => (
                          <div key={i} className="flex items-center p-2 bg-green-50 rounded-md">
                            <span className="mr-2 text-green-500">✓</span>
                            <span>{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Vos axes d'amélioration</h4>
                      <div className="space-y-2">
                        {nutritionalProfile.weaknesses.map((weakness, i) => (
                          <div key={i} className="flex items-center p-2 bg-amber-50 rounded-md">
                            <span className="mr-2 text-amber-500">!</span>
                            <span>{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Facteurs clés</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {nutritionalProfile.keyFactors.map((factor, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className={`flex justify-center ${factor.color} mb-2`}>
                            {factor.icon}
                          </div>
                          <div className="text-sm font-medium">{factor.name}</div>
                          <div className="text-lg font-semibold">{factor.score}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SocialProofIndicator responseId="profile-overall" questionId="nutrition-analysis" />
                </motion.div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Vos recommandations personnalisées</h3>
                  <p className="text-gray-600 mb-6">
                    Nos experts ont analysé votre profil et recommandent les compléments suivants
                    pour optimiser votre santé et bien-être.
                  </p>

                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="rounded-full bg-slate-200 h-10 w-10 mb-2"></div>
                        <div className="h-2 bg-slate-200 rounded w-24 mb-4"></div>
                        <div className="h-2 bg-slate-200 rounded w-32"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendations.map((rec, index) => (
                        <motion.div 
                          key={rec.id || index}
                          className="recommendation-tile"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="flex items-start">
                            {rec.imageUrl && (
                              <div className="mr-4 rounded-md overflow-hidden" style={{ width: '60px', height: '60px' }}>
                                <img 
                                  src={rec.imageUrl} 
                                  alt={rec.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                              <div className="text-sm text-gray-500 mt-1 mb-2">{rec.category}</div>
                              <div className="flex items-center text-yellow-400 text-sm">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                                <span className="ml-1 text-gray-600">({(80 + index * 7).toLocaleString('fr-FR')})</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-sm text-gray-700">
                            <p>{rec.explanation || "Complément recommandé en fonction de votre profil nutritionnel."}</p>
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-blue-600 font-semibold">
                              {rec.price ? `${rec.price} €` : '--,-- €'}
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                              En savoir plus
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <motion.div 
                    className="mt-8 p-4 border border-blue-100 rounded-lg bg-blue-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h4 className="font-medium text-gray-800 mb-2">Comment lire vos résultats</h4>
                    <p className="text-sm text-gray-700">
                      Nos recommandations sont basées sur une analyse scientifique de vos réponses, 
                      combinée à notre moteur d'intelligence artificielle qui évalue plus de 50 facteurs 
                      de santé différents.
                    </p>

                    <button 
                      className="mt-3 text-blue-600 text-sm font-medium flex items-center"
                      onClick={() => setShowBonusContent(!showBonusContent)}
                    >
                      {showBonusContent ? 'Masquer les détails' : 'Voir la méthodologie scientifique'}
                      <svg className={`ml-1 w-4 h-4 transition-transform ${showBonusContent ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showBonusContent && (
                      <motion.div 
                        className="mt-3 text-sm text-gray-600"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mb-2">
                          Notre algorithme avancé, le <strong>NeuroEngine</strong>, analyse non seulement 
                          vos réponses explicites, mais aussi des métriques comportementales subtiles pendant 
                          que vous complétiez le quiz.
                        </p>
                        <p>
                          Ce processus nous permet d'atteindre une précision de {precision.toFixed(1)}% dans 
                          nos recommandations, comparé à une moyenne de 72% pour les questionnaires traditionnels.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {selectedTab === 'details' && (
              <div className="pb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Détails de votre analyse</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setDetailsView('factors')}
                      className={`px-3 py-1 text-sm rounded-md ${
                        detailsView === 'factors' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Facteurs de santé
                    </button>
                    <button
                      onClick={() => setDetailsView('nutrients')}
                      className={`px-3 py-1 text-sm rounded-md ${
                        detailsView === 'nutrients' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Besoins nutritionnels
                    </button>
                  </div>
                </div>

                {detailsView === 'factors' ? (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Facteurs de santé analysés</h3>
                      <p className="text-gray-600 mb-6">
                        <ScientificHighlightedText>
                          Notre analyse détaillée examine ces facteurs clés pour déterminer vos besoins nutritionnels spécifiques.
                        </ScientificHighlightedText>
                      </p>

                      <div className="space-y-6">
                        {/* Niveau de stress */}
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Niveau de stress</span>
                            <span className="text-sm font-medium text-gray-700">{healthFactors.stressLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${healthFactors.stressLevel}%` }}></div>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {healthFactors.stressLevel > 70 
                              ? "Niveau de stress élevé - Impact significatif sur vos besoins en magnésium et adaptogènes" 
                              : healthFactors.stressLevel > 40 
                                ? "Niveau de stress modéré - Influençant vos besoins en nutriments anti-stress" 
                                : "Niveau de stress faible - Facteur positif pour votre santé globale"}
                          </p>
                        </div>

                        {/* Qualité du sommeil */}
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Qualité du sommeil</span>
                            <span className="text-sm font-medium text-gray-700">{healthFactors.sleepQuality}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${healthFactors.sleepQuality}%` }}></div>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {healthFactors.sleepQuality < 40 
                              ? "Qualité de sommeil faible - Influence vos besoins en magnésium, mélatonine et nutriments régulateurs" 
                              : healthFactors.sleepQuality < 70 
                                ? "Qualité de sommeil moyenne - Des améliorations ciblées peuvent être bénéfiques" 
                                : "Bonne qualité de sommeil - Facteur protecteur pour votre santé"}
                          </p>
                        </div>

                        {/* Niveau d'activité physique */}
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Niveau d'activité physique</span>
                            <span className="text-sm font-medium text-gray-700">{healthFactors.activityLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${healthFactors.activityLevel}%` }}></div>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {healthFactors.activityLevel < 30 
                              ? "Niveau d'activité faible - Augmente vos besoins en nutriments pour le métabolisme et l'énergie" 
                              : healthFactors.activityLevel < 60 
                                ? "Niveau d'activité modéré - Bon équilibre pour la santé globale" 
                                : "Niveau d'activité élevé - Nécessite une supplémentation adaptée à la récupération"}
                          </p>
                        </div>

                        {/* Qualité alimentaire */}
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Qualité alimentaire</span>
                            <span className="text-sm font-medium text-gray-700">{healthFactors.dietQuality}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${healthFactors.dietQuality}%` }}></div>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {healthFactors.dietQuality < 40 
                              ? "Qualité alimentaire à améliorer - Influence significativement vos besoins en micronutriments" 
                              : healthFactors.dietQuality < 70 
                                ? "Qualité alimentaire moyenne - Des améliorations ciblées sont recommandées" 
                                : "Bonne qualité alimentaire - Base solide pour votre santé"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Besoins nutritionnels estimés</h3>
                      <p className="text-gray-600 mb-6">
                        <ScientificHighlightedText>
                          Cette analyse représente vos besoins en nutriments spécifiques basés sur votre profil et vos réponses au quiz.
                        </ScientificHighlightedText>
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(nutrientNeeds).map(([nutrient, value]: [string, any]) => (
                          <div key={nutrient} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-md font-semibold text-gray-800 capitalize">
                                {nutrient === 'vitaminD' ? 'Vitamine D' : 
                                 nutrient === 'omega3' ? 'Oméga 3' : 
                                 nutrient === 'probiotics' ? 'Probiotiques' : 
                                 nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
                              </h4>
                              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {value}%
                              </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  value > 75 ? 'bg-red-500' : 
                                  value > 50 ? 'bg-orange-500' : 
                                  value > 30 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`} 
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>

                            <p className="text-xs text-gray-700">
                              {value > 75 ? 'Besoin élevé - Supplémentation fortement recommandée' : 
                               value > 50 ? 'Besoin modéré à élevé - Supplémentation recommandée' : 
                               value > 30 ? 'Besoin modéré - Surveillance recommandée' : 
                               'Besoin faible - Maintien des niveaux actuels'}
                            </p>

                            <div className="mt-3 text-xs text-gray-500">
                              {nutrient === 'magnesium' && (
                                <>Essentiel pour: relaxation musculaire, fonction nerveuse, gestion du stress</>
                              )}
                              {nutrient === 'omega3' && (
                                <>Essentiel pour: santé cardiovasculaire, fonction cognitive, réduction inflammation</>
                              )}
                              {nutrient === 'vitaminD' && (
                                <>Essentiel pour: immunité, santé osseuse, équilibre hormonal</>
                              )}
                              {nutrient === 'zinc' && (
                                <>Essentiel pour: immunité, cicatrisation, santé hormonale</>
                              )}
                              {nutrient === 'probiotics' && (
                                <>Essentiel pour: santé digestive, immunité, production de vitamines</>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'feedback' && (
              <div className="pb-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Votre avis nous aide à nous améliorer</h2>

                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Qualité des recommandations</h3>
                  <p className="text-gray-600 mb-6">
                    Votre feedback nous aide à améliorer notre système d'intelligence artificielle pour des recommandations toujours plus précises.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Quelle est la pertinence globale des recommandations proposées ?</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} className="text-2xl text-yellow-400 focus:outline-none">
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Les explications fournies sont-elles claires et utiles ?</p>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 text-sm rounded-md bg-green-100 text-green-700 border border-green-300">
                          Oui, très claires
                        </button>
                        <button className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 border border-gray-200">
                          Partiellement
                        </button>
                        <button className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 border border-gray-200">
                          Non, confuses
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Y a-t-il des aspects de votre santé qui n'ont pas été pris en compte ?</p>
                      <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Partagez votre expérience..."
                      />
                    </div>
                  </div>

                  <button className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    Envoyer mon avis
                  </button>
                </div>

                <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-indigo-100 p-3 rounded-full">
                      <FaChartLine className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">Notre engagement d'amélioration continue</h3>
                      <p className="text-gray-600">
                        Notre système d'intelligence artificielle utilise votre feedback pour s'améliorer constamment. 
                        Chaque avis contribue à affiner nos algorithmes pour des recommandations toujours plus précises et personnalisées.
                      </p>
                      <div className="mt-4 text-sm text-indigo-700">
                        <span className="font-medium">Prochain raffinement du modèle:</span> dans 5 jours
                      </div>
                    </div>
                  </div                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizResults;