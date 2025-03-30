import React, { useState, useEffect } from 'react';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaChartLine, FaCheck } from 'react-icons/fa';

// Composant d'indicateur statique pour les résultats d'analyse
const AnalysisIndicator = ({ value, label, icon }: { value: string | number, label: string, icon: React.ReactNode }) => (
  <div className="flex items-center mb-2 bg-slate-50 p-3 rounded-lg shadow-sm">
    <div className="text-indigo-600 mr-3">{icon}</div>
    <div>
      <div className="font-semibold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
);

interface QuizResultsProps {
  quizResponse: QuizResponse;
  behavioralMetrics?: BehavioralMetrics;
  recommendations: Recommendation[];
  neuroProfile?: NeuroProfile;
  onRestart?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  quizResponse,
  behavioralMetrics,
  recommendations,
  neuroProfile,
  onRestart
}) => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'profile'>('recommendations');
  const [selectedMetric, setSelectedMetric] = useState<'scientific' | 'popular' | 'quickEffect'>('scientific');
  const [currentParticipants, setCurrentParticipants] = useState<number>(0);
  const [remainingSpots, setRemainingSpots] = useState<number>(0);
  const [lastParticipation, setLastParticipation] = useState<string>("");

  // Initialiser les métriques de manière statique pour éviter les fluctuations
  useEffect(() => {
    // Valeurs statiques pour l'affichage
    setCurrentParticipants(1167);
    setRemainingSpots(6);

    // Dernière participation fixe à "5 minutes" pour éviter les fluctuations
    setLastParticipation("5 minutes");
  }, []);

  // Calculer le pourcentage de confiance basé sur le profil neuro
  const confidenceScore = neuroProfile
    ? Math.round((neuroProfile.stressIndex + neuroProfile.decisionConfidence + neuroProfile.attentionScore) / 3)
    : 98;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyse Complète</h2>
        <p className="text-gray-600">Votre profil nutritionnel et recommandations personnalisées</p>
      </div>

      {/* Indicateurs statiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AnalysisIndicator
          value={`${confidenceScore}/100`}
          label="Indice de confiance"
          icon={<FaChartLine size={18} />}
        />
        <AnalysisIndicator
          value={`Environ ${Math.round(lastParticipation)}`}
          label="Dernière participation il y a"
          icon={<FaClock size={18} />}
        />
        <AnalysisIndicator
          value={`${remainingSpots} places`}
          label="Disponibles pour cette analyse"
          icon={<FaUsers size={18} />}
        />
      </div>

      {/* Bandeau d'information */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <div className="text-amber-500 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Analyses restantes aujourd'hui: 98/100</span>
              <br />Seulement {remainingSpots} places disponibles pour cette analyse complète.
            </p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'recommendations'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommandations
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'profile'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profil Détaillé
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="mb-8">
        {activeTab === 'recommendations' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedMetric('scientific')}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedMetric === 'scientific'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Base scientifique
              </button>
              <button
                onClick={() => setSelectedMetric('popular')}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedMetric === 'popular'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Popularité
              </button>
              <button
                onClick={() => setSelectedMetric('quickEffect')}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedMetric === 'quickEffect'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Effet rapide
              </button>
            </div>

            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{recommendation.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{recommendation.description}</p>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-1">Indice de confiance</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.round(recommendation.confidence * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {Math.round(recommendation.confidence * 100)}%
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendation.benefits.map((benefit, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs flex items-center">
                        <FaCheck className="mr-1" size={10} />
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Effet visible: {recommendation.timeToEffect}</span>
                    <span>Popularité: {recommendation.popularity}/100</span>
                  </div>

                  <div className="mt-4">
                    <a
                      href={recommendation.url}
                      className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Voir cette solution
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Votre Profil Nutritionnel</h3>

            {neuroProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 mb-1">Indice de stress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${neuroProfile.stressIndex}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {neuroProfile.stressIndex}/100
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 mb-1">Confiance décisionnelle</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${neuroProfile.decisionConfidence}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {neuroProfile.decisionConfidence}/100
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 mb-1">Score d'attention</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${neuroProfile.attentionScore}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {neuroProfile.attentionScore}/100
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 mb-1">Indice de cohérence</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${neuroProfile.consistencyIndex}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {neuroProfile.consistencyIndex}/100
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Informations personnelles</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {quizResponse.gender && (
                  <li><span className="font-medium">Genre:</span> {quizResponse.gender === 'male' ? 'Homme' : 'Femme'}</li>
                )}
                {quizResponse.age && (
                  <li><span className="font-medium">Âge:</span> {quizResponse.age} ans</li>
                )}
                {quizResponse.sleep && (
                  <li><span className="font-medium">Sommeil:</span> {quizResponse.sleep === 'good' ? 'Bon' : quizResponse.sleep === 'average' ? 'Moyen' : 'Mauvais'}</li>
                )}
                {quizResponse.stress && (
                  <li><span className="font-medium">Niveau de stress:</span> {quizResponse.stress === 'high' ? 'Élevé' : quizResponse.stress === 'medium' ? 'Moyen' : 'Bas'}</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Recommencer le quiz
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResults;