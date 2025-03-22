
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import NutritionalQuiz from "@/components/NutritionalQuiz";
import QuizResults from "@/components/QuizResults";
import { toast } from "sonner";

const Quiz = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });
  const [quizResponses, setQuizResponses] = useState<Record<string, any>>({});

  const startQuiz = () => {
    setStep('quiz');
  };

  const handleQuizComplete = (responses: Record<string, any>) => {
    setQuizResponses(responses);
    setStep('results');
    // On pourrait envoyer les données à une API ici
    toast.success("Analyse complétée ! Voici vos recommandations personnalisées");
  };

  const handleUserInfoUpdate = (info: {name: string, email: string}) => {
    setUserInfo(info);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Votre Bilan Nutritionnel Personnalisé
      </h1>
      
      {step === 'intro' && (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Découvrez les compléments dont vous avez besoin</h2>
          <p className="text-muted-foreground mb-6">
            Répondez à notre questionnaire de 5 minutes et obtenez des recommandations personnalisées 
            basées sur votre mode de vie, votre alimentation et vos objectifs de santé.
          </p>
          
          <div className="grid gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Basé sur la science</h3>
                <p className="text-sm text-muted-foreground">Nos recommandations s'appuient sur des études scientifiques récentes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Personnalisé pour vous</h3>
                <p className="text-sm text-muted-foreground">Chaque recommandation est adaptée à votre profil unique</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 14c.2-1 .7-1.7 1.5-2"/><path d="M9 14c-.2-1-.7-1.7-1.5-2"/><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/><path d="M18 5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5Z"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Gratuit et sans engagement</h3>
                <p className="text-sm text-muted-foreground">Recevez des conseils sans aucun coût ni obligation d'achat</p>
              </div>
            </div>
          </div>
          
          <Button size="lg" className="w-full" onClick={startQuiz}>
            Commencer mon bilan
          </Button>
        </div>
      )}
      
      {step === 'quiz' && (
        <NutritionalQuiz 
          onComplete={handleQuizComplete}
          onUserInfoUpdate={handleUserInfoUpdate}
        />
      )}
      
      {step === 'results' && (
        <QuizResults 
          userInfo={userInfo}
          quizResponses={quizResponses}
        />
      )}
    </div>
  );
};

export default Quiz;
