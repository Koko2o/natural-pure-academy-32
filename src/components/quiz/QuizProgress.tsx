
import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <Progress value={progress} className="h-2 bg-muted" />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>Étape {currentStep + 1} sur {totalSteps}</span>
        <span>{Math.round(progress)}% complété</span>
      </div>
    </div>
  );
};

export default QuizProgress;
