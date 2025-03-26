
import { Badge } from "@/components/ui/badge";
import { Beaker, TestTube } from "lucide-react";

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
      
      <div className="relative w-full h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
        {/* Tube gradué - mesures verticales */}
        <div className="absolute inset-0 flex justify-between px-0.5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={index} 
              className="h-full w-px bg-slate-200"
              style={{ left: `${index * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Echelle de mesure - chiffres */}
        <div className="absolute -bottom-6 w-full flex justify-between px-2 text-xs text-slate-500">
          {[0, 20, 40, 60, 80, 100].map((value) => (
            <div 
              key={value} 
              className="relative"
              style={{ left: `${value - 2}%` }}
            >
              {value}%
            </div>
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
        
        {/* Reflet et effet tube à essai */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-transparent"></div>
        
        {/* Bulles d'animation */}
        {progressPercentage > 5 && progressPercentage < 95 && (
          <>
            <div 
              className="absolute rounded-full bg-white/50 w-2 h-2 animate-pulse"
              style={{ 
                left: `${progressPercentage * 0.7}%`, 
                bottom: '8px',
                animation: 'bubble 2.5s infinite ease-in-out'
              }}
            ></div>
            <div 
              className="absolute rounded-full bg-white/50 w-1.5 h-1.5 animate-pulse"
              style={{ 
                left: `${progressPercentage * 0.4}%`, 
                bottom: '16px',
                animation: 'bubble 3s infinite ease-in-out'
              }}
            ></div>
            <div 
              className="absolute rounded-full bg-white/50 w-1 h-1 animate-pulse"
              style={{ 
                left: `${progressPercentage * 0.2}%`, 
                bottom: '12px',
                animation: 'bubble 2s infinite ease-in-out' 
              }}
            ></div>
          </>
        )}
        
        {/* Icône tube à essai qui avance avec la progression */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ left: `${Math.min(progressPercentage, 96)}%` }}
        >
          <div className="bg-white rounded-full p-1 shadow-md relative -left-4">
            <TestTube className="h-4 w-4 text-indigo-700" />
          </div>
        </div>
      </div>
      
      {/* Ajout d'un style pour l'animation des bulles */}
      <style jsx>{`
        @keyframes bubble {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default QuizProgress;
