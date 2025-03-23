
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NutritionalQuiz from "@/components/NutritionalQuiz";
import QuizResults from "@/components/QuizResults";
import { toast } from "sonner";
import { Beaker, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {step === 'intro' && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Beaker className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Votre Bilan Nutritionnel Personnalisé
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Basé sur les dernières recherches scientifiques en nutrition
            </p>
          </div>
        )}
        
        {step === 'intro' && (
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Découvrez les compléments dont vous avez besoin</h2>
            <p className="text-muted-foreground mb-8">
              Répondez à notre questionnaire de 5 minutes et obtenez des recommandations personnalisées 
              basées sur votre mode de vie, votre alimentation et vos objectifs de santé.
            </p>
            
            <div className="grid gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Basé sur la science</h3>
                  <p className="text-muted-foreground">Nos recommandations s'appuient sur des études scientifiques récentes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Personnalisé pour vous</h3>
                  <p className="text-muted-foreground">Chaque recommandation est adaptée à votre profil unique</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 14c.2-1 .7-1.7 1.5-2"/><path d="M9 14c-.2-1-.7-1.7-1.5-2"/><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/><path d="M18 5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5Z"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Gratuit et sans engagement</h3>
                  <p className="text-muted-foreground">Recevez des conseils sans aucun coût ni obligation d'achat</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="w-full text-lg py-6 group" onClick={startQuiz}>
              <span>Commencer mon bilan</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-6">
              Environ 5 minutes • 100% confidentiel • Basé sur la science
            </p>
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
    </div>
  );
};

export default Quiz;
