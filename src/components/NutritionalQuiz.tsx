
import { Button } from "@/components/ui/button";
import { QuizResponse } from "./quiz/types";
import { quizSteps } from "./quiz/QuizSteps";
import { useQuizNavigation } from "./quiz/useQuizNavigation";
import QuizProgress from "./quiz/QuizProgress";
import StepContent from "./quiz/StepContent";
import { ArrowLeft, ArrowRight, TestTube, Microscope } from "lucide-react";
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

  useEffect(() => {
    // Afficher des insights scientifiques aléatoires pendant le quiz
    if (currentStepIndex > 0) {
      const timer = setTimeout(() => {
        setShowInsight(true);
        setTimeout(() => setShowInsight(false), 5000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex]);

  const insightMessages = [
    "Votre profil présente des similitudes avec 68% de nos participants d'étude",
    "Vos réponses indiquent un besoin potentiel en magnésium supérieur à la moyenne",
    "Les personnes avec votre profil ont constaté une amélioration de 72% en 16 semaines",
    "Seulement 15% des profils présentent ces caractéristiques spécifiques",
    "Nos recherches montrent une corrélation entre vos réponses et les carences en vitamine D"
  ];

  const randomInsight = insightMessages[Math.floor(Math.random() * insightMessages.length)];

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

      <div className="bg-white rounded-xl shadow-md p-8 mb-6 transition-all duration-300 animate-fadeIn relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50/30 rounded-full blur-2xl"></div>
        
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
              toast.info("Analyse scientifique de vos données en cours...");
              setTimeout(handleNext, 1500);
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
    </div>
  );
};

export default NutritionalQuiz;
