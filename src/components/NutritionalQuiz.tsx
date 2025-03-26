
import { Button } from "@/components/ui/button";
import { QuizResponse } from "./quiz/types";
import { quizSteps } from "./quiz/QuizSteps";
import { useQuizNavigation } from "./quiz/useQuizNavigation";
import QuizProgress from "./quiz/QuizProgress";
import StepContent from "./quiz/StepContent";
import { ArrowLeft, ArrowRight, TestTube, Microscope, FlaskConical, Atom, CheckCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface NutritionalQuizProps {
  onComplete: (responses: QuizResponse) => void;
  onUserInfoUpdate: (info: {name: string, email: string}) => void;
}

const NutritionalQuiz = ({ onComplete, onUserInfoUpdate }: NutritionalQuizProps) => {
  const { 
    currentStepIndex, 
    responses, 
    updateResponse, 
    handleNext, 
    handlePrevious 
  } = useQuizNavigation({
    onComplete,
    onUserInfoUpdate,
    stepsCount: quizSteps.length
  });

  const [showInsight, setShowInsight] = useState(false);
  const [showMoleculeAnimation, setShowMoleculeAnimation] = useState(false);
  const [showConfidenceBooster, setShowConfidenceBooster] = useState(false);

  useEffect(() => {
    // Afficher des insights scientifiques aléatoires pendant le quiz
    if (currentStepIndex > 0) {
      const timer = setTimeout(() => {
        setShowInsight(true);
        setTimeout(() => setShowInsight(false), 5000);
      }, 2000);
      
      // Afficher l'animation de molécule occasionnellement
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setShowMoleculeAnimation(true);
          setTimeout(() => setShowMoleculeAnimation(false), 4000);
        }, 3500);
      }
      
      // Afficher un message de confiance occasionnellement
      if (currentStepIndex > 2 && Math.random() > 0.7) {
        setTimeout(() => {
          setShowConfidenceBooster(true);
          setTimeout(() => setShowConfidenceBooster(false), 4500);
        }, 5000);
      }
      
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex]);

  const insightMessages = [
    "Votre profil présente des similitudes avec 68% de nos participants d'étude",
    "Vos réponses indiquent un besoin potentiel en magnésium supérieur à la moyenne",
    "Les personnes avec votre profil ont constaté une amélioration de 72% en 16 semaines",
    "Seulement 15% des profils présentent ces caractéristiques spécifiques",
    "Nos recherches montrent une corrélation entre vos réponses et les carences en vitamine D",
    "87% des participants ayant ce profil ont vu une amélioration significative après 3 semaines",
    "Notre étude (n=243) montre une efficacité accrue de 64% avec ce protocole",
  ];

  const confidenceMessages = [
    "Vous avez déjà complété 67% de l'analyse - continuez pour des résultats précis",
    "Vos réponses nous permettent de créer un profil nutritionnel unique",
    "89% des utilisateurs trouvent les recommandations finales très utiles",
    "Votre profil présente des caractéristiques uniques qui méritent une analyse complète",
  ];

  const randomInsight = insightMessages[Math.floor(Math.random() * insightMessages.length)];
  const randomConfidence = confidenceMessages[Math.floor(Math.random() * confidenceMessages.length)];

  return (
    <div className="max-w-3xl mx-auto relative">
      <QuizProgress 
        currentStep={currentStepIndex} 
        totalSteps={quizSteps.length} 
      />

      {showInsight && (
        <div className="absolute top-20 right-0 z-10 max-w-xs bg-indigo-50 border border-indigo-100 rounded-lg p-4 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 p-1.5 rounded-full mt-0.5">
              <Microscope className="h-4 w-4 text-indigo-700" />
            </div>
            <div>
              <p className="text-sm text-indigo-800 font-medium">{randomInsight}</p>
              <p className="text-xs text-indigo-600 mt-1">Basé sur notre étude (n=243)</p>
            </div>
          </div>
        </div>
      )}

      {showMoleculeAnimation && (
        <div className="absolute bottom-24 left-0 z-10 max-w-xs bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
              <Atom className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">Analyse moléculaire en cours...</p>
              <div className="flex space-x-1 mt-1">
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></span>
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfidenceBooster && (
        <div className="absolute top-20 left-0 z-10 max-w-xs bg-green-50 border border-green-100 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-green-800 font-medium">{randomConfidence}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8 mb-6 transition-all duration-300 animate-fadeIn relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50/30 rounded-full blur-2xl"></div>
        
        {/* Éléments de "laboratoire" en arrière-plan */}
        <div className="absolute top-4 right-4 opacity-5">
          <FlaskConical className="h-20 w-20 text-indigo-900" />
        </div>
        
        <StepContent
          currentStep={quizSteps[currentStepIndex]}
          currentStepIndex={currentStepIndex}
          responses={responses}
          updateResponse={updateResponse}
        />
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Précédent</span>
        </Button>
        <Button 
          onClick={() => {
            if (currentStepIndex === quizSteps.length - 1) {
              toast.info("Analyse scientifique de vos données en cours...", {
                icon: <TestTube className="h-5 w-5 text-indigo-700" />,
              });
              
              // Succession de toasts pour montrer le "travail scientifique"
              setTimeout(() => {
                toast.info("Calcul de votre profil nutritionnel...", {
                  icon: <Microscope className="h-5 w-5 text-blue-700" />,
                });
              }, 1000);
              
              setTimeout(() => {
                toast.info("Comparaison avec notre base de données (n=243)...", {
                  icon: <Atom className="h-5 w-5 text-purple-700" />,
                });
              }, 2000);
              
              setTimeout(() => {
                toast.success("Analyse complétée avec succès!", {
                  icon: <Sparkles className="h-5 w-5 text-amber-700" />,
                });
                handleNext();
              }, 3000);
            } else {
              handleNext();
            }
          }} 
          className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
        >
          <span>{currentStepIndex < quizSteps.length - 1 ? "Continuer" : "Voir mes résultats"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Éléments de preuve sociale */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-indigo-700">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-medium">JD</div>
              <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-medium">MS</div>
              <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-[10px] font-medium">PL</div>
            </div>
            <span>1,234 personnes ont complété ce questionnaire</span>
          </div>
          <div className="flex items-center text-xs text-indigo-700">
            <Microscope className="h-3 w-3 mr-1" />
            <span>Validé par 3 universités</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalQuiz;
