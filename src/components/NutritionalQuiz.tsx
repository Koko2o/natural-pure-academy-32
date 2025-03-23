
import { Button } from "@/components/ui/button";
import { QuizResponse } from "./quiz/types";
import { quizSteps } from "./quiz/QuizSteps";
import { useQuizNavigation } from "./quiz/useQuizNavigation";
import QuizProgress from "./quiz/QuizProgress";
import StepContent from "./quiz/StepContent";

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

      <StepContent
        currentStep={quizSteps[currentStepIndex]}
        currentStepIndex={currentStepIndex}
        responses={responses}
        updateResponse={updateResponse}
      />

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          Précédent
        </Button>
        <Button onClick={handleNext}>
          {currentStepIndex < quizSteps.length - 1 ? "Continuer" : "Voir mes résultats"}
        </Button>
      </div>
    </div>
  );
};

export default NutritionalQuiz;
