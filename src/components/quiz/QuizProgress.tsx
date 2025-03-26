
import { Badge } from "@/components/ui/badge";
import { Beaker } from "lucide-react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progressPercentage = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-indigo-700" />
          <h2 className="text-lg font-semibold text-indigo-900">Analyse Nutritionnelle</h2>
        </div>
        <Badge variant="pill" className="text-indigo-700 bg-indigo-100">
          {currentStep + 1}/{totalSteps}
        </Badge>
      </div>
      
      <div className="relative w-full h-8 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
        {/* Éprouvette graduée */}
        <div className="absolute inset-0 flex justify-between p-0.5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={index} 
              className="h-full w-px bg-slate-200"
              style={{ left: `${index * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Liquide */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500 ease-out"
          style={{ 
            height: '100%', 
            width: `${progressPercentage}%`,
            clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="h-1 w-full bg-white/40"></div>
            <div className="h-1 w-full bg-white/30 mt-1"></div>
            <div className="h-1 w-full bg-white/20 mt-1"></div>
          </div>
        </div>
        
        {/* Bulle */}
        {progressPercentage > 5 && progressPercentage < 95 && (
          <>
            <div 
              className="absolute rounded-full bg-white/50 w-2 h-2 animate-pulse"
              style={{ left: `${progressPercentage * 0.7}%`, bottom: '8px' }}
            ></div>
            <div 
              className="absolute rounded-full bg-white/50 w-1.5 h-1.5 animate-pulse"
              style={{ left: `${progressPercentage * 0.4}%`, bottom: '16px', animationDelay: '0.5s' }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizProgress;
