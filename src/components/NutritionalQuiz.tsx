
import { Button } from "@/components/ui/button";
import { QuizResponse } from "./quiz/types";
import { quizSteps } from "./quiz/QuizSteps";
import { useQuizNavigation } from "./quiz/useQuizNavigation";
import QuizProgress from "./quiz/QuizProgress";
import StepContent from "./quiz/StepContent";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  return (
    <div className="max-w-3xl mx-auto">
      <QuizProgress 
        currentStep={currentStepIndex} 
        totalSteps={quizSteps.length} 
      />

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6 transition-all duration-300 animate-fadeIn">
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
        <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90">
          <span>{currentStepIndex < quizSteps.length - 1 ? "Continuer" : "Voir mes résultats"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NutritionalQuiz;
