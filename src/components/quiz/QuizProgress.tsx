
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`relative flex-1 ${index < totalSteps - 1 ? "after:content-[''] after:absolute after:top-[50%] after:h-[2px] after:w-full after:bg-muted" : ""}`}
          >
            <div className={`
              relative z-10 w-8 h-8 mx-auto rounded-full flex items-center justify-center
              transition-all duration-300
              ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
            `}>
              {index < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : index === currentStep ? (
                <span className="text-sm font-medium">{index + 1}</span>
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Progress value={progress} className="h-2 bg-muted" />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>Étape {currentStep + 1} sur {totalSteps}</span>
        <span>{Math.round(progress)}% complété</span>
      </div>
    </div>
  );
};

export default QuizProgress;
