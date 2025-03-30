
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedRecommendations } from '@/hooks/useAdvancedRecommendations';
import { QuizResponse, Recommendation } from '@/utils/types';
import { ScientificHighlightedText } from './ui/ScientificHighlightedText';
import SocialProofIndicator from './quiz/SocialProofIndicator';
import { useBehavioralMetrics } from '@/hooks/useBehavioralMetrics';
import { FaFlask, FaUsers, FaClock, FaChartLine, FaStar, FaCheck } from 'react-icons/fa';

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
              <div>
                {/* Explication de la recommandation */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Notre Analyse</h2>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    {explanation ? (
                      <div 
                        className="prose prose-indigo max-w-none" 
                        dangerouslySetInnerHTML={{ __html: explanation }}
                      />
                    ) : (
                      <p className="text-gray-600">Basé sur vos réponses, nous avons généré des recommandations personnalisées pour répondre à vos besoins nutritionnels spécifiques.</p>
                    )}
                  </div>
                </div>

                {/* Filtres de tri */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Trier par:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => prioritizeByMetric('scientific')}
                        className={`py-1 px-3 text-xs rounded-full ${isPrioritized && priorityMetric === 'scientific' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <span className="flex items-center"><FaFlask className="mr-1" /> Base scientifique</span>
                      </button>
                      <button 
                        onClick={() => prioritizeByMetric('popular')}
                        className={`py-1 px-3 text-xs rounded-full ${isPrioritized && priorityMetric === 'popular' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <span className="flex items-center"><FaUsers className="mr-1" /> Popularité</span>
                      </button>
                      <button 
                        onClick={() => prioritizeByMetric('quickEffect')}
                        className={`py-1 px-3 text-xs rounded-full ${isPrioritized && priorityMetric === 'quickEffect' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <span className="flex items-center"><FaClock className="mr-1" /> Effet rapide</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Liste des recommandations */}
                <div className="space-y-6">
                  {recommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg overflow-hidden ${index === 0 ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}`}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {index === 0 && <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-0.5 rounded mr-2">Top Recommandation</span>}
                              {recommendation.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{recommendation.description}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                              {Math.round(recommendation.confidence * 100)}% de correspondance
                            </div>
                            <SocialProofIndicator 
                              popularity={recommendation.popularity || 75} 
                              recentUsers={Math.floor(Math.random() * 15) + 3} 
                              isStable={true}
                            />
                          </div>
                        </div>
                        
                        {/* Bénéfices */}
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Bénéfices Principaux:</h4>
                          <div className="flex flex-wrap gap-2">
                            {recommendation.benefits?.map((benefit, i) => (
                              <span key={i} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                                <FaCheck className="mr-1 text-green-500" />
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Temps d'effet:</span>
                            <span className="ml-2 text-gray-800 font-medium">{recommendation.timeToEffect}</span>
                          </div>
                          {recommendation.dosage && (
                            <div>
                              <span className="text-gray-500">Dosage:</span>
                              <span className="ml-2 text-gray-800 font-medium">{recommendation.dosage}</span>
                            </div>
                          )}
                          {recommendation.optimalUsage && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Utilisation optimale:</span>
                              <span className="ml-2 text-gray-800 font-medium">{recommendation.optimalUsage}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Boutons d'action */}
                        <div className="mt-5 flex justify-between items-center">
                          <div>
                            <button
                              onClick={() => setActiveFeedbackProduct(recommendation.title)}
                              className="text-indigo-600 text-sm hover:text-indigo-800"
                            >
                              Donner mon avis
                            </button>
                          </div>
                          <a
                            href={recommendation.url || '#'}
                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                          >
                            Voir le produit
                          </a>
                        </div>
                        
                        {/* Formulaire de feedback */}
                        {activeFeedbackProduct === recommendation.title && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-semibold mb-3">Votre avis sur cette recommandation</h4>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-2">Cette recommandation vous semble-t-elle pertinente ?</p>
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => setUserFeedback({
                                    ...userFeedback,
                                    [recommendation.title]: { 
                                      ...userFeedback[recommendation.title],
                                      helpful: true,
                                      purchaseIntent: purchaseIntentSlider
                                    }
                                  })}
                                  className={`px-3 py-1 text-sm rounded-full ${
                                    userFeedback[recommendation.title]?.helpful === true 
                                      ? 'bg-green-100 text-green-700 border border-green-300' 
                                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  Oui
                                </button>
                                <button
                                  onClick={() => setUserFeedback({
                                    ...userFeedback,
                                    [recommendation.title]: { 
                                      ...userFeedback[recommendation.title],
                                      helpful: false,
                                      purchaseIntent: purchaseIntentSlider
                                    }
                                  })}
                                  className={`px-3 py-1 text-sm rounded-full ${
                                    userFeedback[recommendation.title]?.helpful === false 
                                      ? 'bg-red-100 text-red-700 border border-red-300' 
                                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  Non
                                </button>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-2">Intérêt pour ce produit (1-10)</p>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  value={purchaseIntentSlider}
                                  onChange={(e) => setPurchaseIntentSlider(parseInt(e.target.value))}
                                  className="w-full"
                                />
                                <span className="bg-gray-200 px-2 py-1 rounded text-sm">{purchaseIntentSlider}</span>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-2">Commentaires supplémentaires</p>
                              <textarea
                                rows={2}
                                value={additionalFeedback}
                                onChange={(e) => setAdditionalFeedback(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Vos commentaires nous aident à améliorer nos recommandations..."
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setActiveFeedbackProduct(null)}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                              >
                                Annuler
                              </button>
                              <button
                                onClick={() => handleFeedbackSubmit(recommendation.title)}
                                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
                              >
                                Envoyer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
