
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
