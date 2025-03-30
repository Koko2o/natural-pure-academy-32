
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronRight, MousePointer } from 'lucide-react';

interface ArticleToQuizBridgeProps {
  articleTitle: string;
  articleCategory: string;
  showMicroQuiz?: boolean;
}

/**
 * Composant créant une transition fluide entre les articles et le quiz
 * Augmente le taux de conversion article → quiz
 */
const ArticleToQuizBridge: React.FC<ArticleToQuizBridgeProps> = ({ 
  articleTitle, 
  articleCategory, 
  showMicroQuiz = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [microQuizResponse, setMicroQuizResponse] = useState<string | null>(null);
  const [microQuizStep, setMicroQuizStep] = useState(0);
  const navigate = useNavigate();
  
  // Afficher le composant après un délai pour laisser l'utilisateur lire l'article
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 secondes
    
    return () => clearTimeout(timer);
  }, []);
  
  // Questions du micro-quiz (2 questions simples pour commencer l'engagement)
  const microQuizQuestions = [
    {
      question: `Ressentez-vous souvent des symptômes liés à ${articleCategory.toLowerCase()} ?`,
      options: ['Oui', 'Parfois', 'Rarement']
    },
    {
      question: 'Souhaitez-vous découvrir des solutions scientifiques personnalisées ?',
      options: ['Oui, je suis intéressé(e)', 'Pas maintenant']
    }
  ];
  
  // Répondre à la question du micro-quiz
  const handleMicroQuizResponse = (response: string) => {
    setMicroQuizResponse(response);
    
    // Si c'est la dernière question et que la réponse est positive, rediriger vers le quiz
    if (microQuizStep === microQuizQuestions.length - 1 && response === 'Oui, je suis intéressé(e)') {
      setTimeout(() => {
        navigate('/quiz', { state: { source: 'article', category: articleCategory } });
      }, 800);
    } else {
      // Sinon, passer à la question suivante
      setTimeout(() => {
        setMicroQuizStep(prev => prev + 1);
        setMicroQuizResponse(null);
      }, 800);
    }
  };
  
  // Aller directement au quiz
  const goToQuiz = () => {
    navigate('/quiz', { state: { source: 'article', category: articleCategory } });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="my-10 rounded-xl bg-gradient-to-r from-natural-50 to-natural-100 p-6 border border-natural-200"
        >
          {showMicroQuiz && microQuizStep < microQuizQuestions.length ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-1.5 flex-grow rounded-full bg-natural-200">
                  <div 
                    className="h-full rounded-full bg-natural-500"
                    style={{ width: `${(microQuizStep + 1) / microQuizQuestions.length * 100}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-sm text-natural-600">
                  {microQuizStep + 1}/{microQuizQuestions.length}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-natural-900">
                {microQuizQuestions[microQuizStep].question}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {microQuizQuestions[microQuizStep].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMicroQuizResponse(option)}
                    disabled={microQuizResponse !== null}
                    className={`px-4 py-3 rounded-lg border transition-colors ${
                      microQuizResponse === option
                        ? 'bg-natural-700 text-white border-natural-700'
                        : 'bg-white text-natural-800 border-natural-300 hover:border-natural-500'
                    }`}
                  >
                    {microQuizResponse === option ? (
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {option}
                      </span>
                    ) : (
                      option
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-natural-900">Découvrez votre profil scientifique personnalisé</h3>
                  <p className="text-natural-600 mt-1">
                    Identifiez les solutions spécifiques adaptées à votre profil à travers notre évaluation scientifique.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="rounded-full bg-natural-200 w-16 h-16 flex items-center justify-center">
                    <MousePointer className="w-6 h-6 text-natural-700" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToQuiz}
                  className="px-6 py-3 bg-natural-700 text-white rounded-lg flex items-center font-medium"
                >
                  Commencer l'analyse
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
                
                <Link to="/articles" className="text-natural-700 font-medium px-4 py-3 flex items-center hover:text-natural-900 transition-colors">
                  Explorer d'autres articles
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-natural-200 border-2 border-white flex items-center justify-center text-xs font-medium text-natural-700">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-natural-600 text-sm">
                  <span className="font-medium">243 personnes</span> ont complété cette analyse ce mois-ci
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleToQuizBridge;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, MessageCircle, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScientificHighlightedText } from './ui/ScientificHighlightedText';
import { useArticleEngagement } from '@/hooks/useArticleEngagement';

interface ArticleToQuizBridgeProps {
  articleId: string;
  articleTitle: string;
  problemCategory: string;
  onQuizStart?: () => void;
}

const ArticleToQuizBridge: React.FC<ArticleToQuizBridgeProps> = ({
  articleId,
  articleTitle,
  problemCategory,
  onQuizStart
}) => {
  const [showFullBridge, setShowFullBridge] = useState(false);
  const [activePoint, setActivePoint] = useState(0);
  const { engagementLevel, readingProgression } = useArticleEngagement();

  // Points de conversion adaptés au contexte de l'article
  const conversionPoints = [
    "Découvrez les nutriments qui vous manquent réellement",
    "Obtenez une analyse basée sur les dernières recherches scientifiques",
    "Rejoignez les 963 personnes qui ont déjà identifié leurs besoins nutritionnels"
  ];

  // Afficher le bridge complet après un certain niveau d'engagement
  useEffect(() => {
    if (readingProgression > 70) {
      setShowFullBridge(true);
    }
  }, [readingProgression]);

  // Rotation automatique des points de conversion
  useEffect(() => {
    if (showFullBridge) {
      const interval = setInterval(() => {
        setActivePoint(prev => (prev + 1) % conversionPoints.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [showFullBridge, conversionPoints.length]);

  // Personnalisation du texte en fonction de la catégorie du problème
  const getPersonalizedHeading = () => {
    switch (problemCategory.toLowerCase()) {
      case 'stress':
        return "Évaluez votre niveau de stress et découvrez des solutions naturelles";
      case 'sommeil':
        return "Analysez vos troubles du sommeil et trouvez des remèdes adaptés";
      case 'digestion':
        return "Identifiez les causes de vos problèmes digestifs avec notre quiz scientifique";
      default:
        return "Obtenez une analyse personnalisée de vos besoins nutritionnels";
    }
  };

  const handleQuizClick = () => {
    if (onQuizStart) onQuizStart();
  };

  return (
    <AnimatePresence>
      {/* Version minimale toujours visible */}
      <motion.div 
        className="sticky bottom-0 left-0 right-0 z-10 p-4 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {!showFullBridge ? (
          <motion.div
            className="pointer-events-auto"
            exit={{ opacity: 0, y: 100 }}
          >
            <Button 
              onClick={() => setShowFullBridge(true)}
              className="w-full md:w-auto md:ml-auto md:flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 px-6 rounded-xl shadow-lg group"
              size="lg"
            >
              <span className="text-base">Testez vos besoins nutritionnels</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Card className="w-full bg-white dark:bg-gray-900 shadow-xl border-0 p-6 rounded-xl overflow-hidden">
              <div className="relative">
                {/* Effet de laboratoire */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-100 rounded-full opacity-20 blur-xl"></div>
              
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">{getPersonalizedHeading()}</h3>
                  
                  <div className="mb-6">
                    <div className="h-12 relative">
                      {conversionPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          className="absolute inset-0 flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: activePoint === index ? 1 : 0,
                            y: activePoint === index ? 0 : 10
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <ScientificHighlightedText text={point} />
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Button 
                      onClick={handleQuizClick}
                      asChild
                      className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 group"
                      size="lg"
                    >
                      <Link to="/quiz">
                        <span className="text-base">Démarrer mon test gratuit</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowFullBridge(false)}
                      className="text-xs text-muted-foreground"
                    >
                      Réduire
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">963 personnes ont réalisé le test cette semaine</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleToQuizBridge;
