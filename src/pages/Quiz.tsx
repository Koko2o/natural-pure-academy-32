
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NutritionalQuiz from "@/components/NutritionalQuiz";
import QuizResults from "@/components/QuizResults";
import { toast } from "sonner";
import { Beaker, ChevronRight, Award, Microscope, Users, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QuizResponse } from "@/components/quiz/types";
import LabEffects from "@/components/quiz/LabEffects";
import { secureStorage } from "@/utils/complianceFilter";
import GDPRCompliance from "@/components/GDPRCompliance";
import UrgencyCountdown from "@/components/quiz/UrgencyCountdown";
import DynamicSocialProof from "@/components/quiz/DynamicSocialProof";
import { collectPersonalizationFactors, getPersonalizedMessage } from "@/utils/dynamicPersonalization";

const Quiz = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [quizResponses, setQuizResponses] = useState<QuizResponse>({
    name: '',
    email: '',
    objectives: [],
    dietaryHabits: '',
    meatConsumption: '',
    fishConsumption: '',
    fruitVegConsumption: '',
    exerciseFrequency: '',
    sleepQuality: '',
    stressLevel: '',
    symptoms: []
  });
  const [showMolecules, setShowMolecules] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');
  const [personalizationFactors, setPersonalizationFactors] = useState<any>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  
  // Récupérer les facteurs de personnalisation
  useEffect(() => {
    const fetchPersonalizationData = async () => {
      const factors = await collectPersonalizationFactors();
      setPersonalizationFactors(factors);
      
      // Stocker la localisation pour utilisation dans les composants enfants
      if (factors.geo) {
        setUserLocation(factors.geo);
      }
      
      // Générer le message de bienvenue personnalisé
      const message = getPersonalizedMessage(factors, 'welcome');
      setWelcomeMessage(message);
    };
    
    fetchPersonalizationData();
  }, []);
  
  // Utilisation du stockage sécurisé pour le suivi de progression
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await secureStorage.get<{
          step?: 'intro' | 'quiz' | 'results';
          responses?: QuizResponse;
        }>('quiz_progress', {});
        
        if (savedProgress.step) {
          setStep(savedProgress.step);
          if (savedProgress.responses) {
            setQuizResponses(savedProgress.responses);
          }
          if (savedProgress.step !== 'intro') {
            setShowMolecules(true);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la progression:", error);
        // Utiliser la version synchrone comme fallback
        const fallbackProgress = secureStorage.getSync<{
          step?: 'intro' | 'quiz' | 'results';
          responses?: QuizResponse;
        }>('quiz_progress', {});
        
        if (fallbackProgress.step) {
          setStep(fallbackProgress.step);
          if (fallbackProgress.responses) {
            setQuizResponses(fallbackProgress.responses);
          }
          if (fallbackProgress.step !== 'intro') {
            setShowMolecules(true);
          }
        }
      }
    };
    
    loadProgress();
  }, []);
  
  // Sauvegarder la progression à chaque changement d'étape
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await secureStorage.set('quiz_progress', {
          step,
          responses: quizResponses
        });
        
        // Mettre à jour les facteurs de personnalisation lorsque les réponses au quiz changent
        if (quizResponses.symptoms.length > 0 || quizResponses.objectives.length > 0) {
          const factors = await collectPersonalizationFactors({
            symptoms: quizResponses.symptoms,
            objectives: quizResponses.objectives,
            progress: step === 'intro' ? 0 : step === 'quiz' ? 0.5 : 1
          });
          setPersonalizationFactors(factors);
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la progression:", error);
        // Utiliser la version synchrone comme fallback
        secureStorage.setSync('quiz_progress', {
          step,
          responses: quizResponses
        });
      }
    };
    
    saveProgress();
  }, [step, quizResponses]);

  const startQuiz = () => {
    setStep('quiz');
    setShowMolecules(true);
    toast.success("Préparation de votre profil nutritionnel...");
  };

  const handleQuizComplete = (responses: QuizResponse) => {
    setQuizResponses(responses);
    setStep('results');
    toast.success("Analyse complétée ! Voici vos recommandations personnalisées");
  };

  const handleUserInfoUpdate = (info: {name: string, email: string}) => {
    setQuizResponses(prev => ({
      ...prev,
      name: info.name,
      email: info.email
    }));
  };

  const handleRestartQuiz = async () => {
    setStep('intro');
    setShowMolecules(false);
    setQuizResponses({
      name: '',
      email: '',
      objectives: [],
      dietaryHabits: '',
      meatConsumption: '',
      fishConsumption: '',
      fruitVegConsumption: '',
      exerciseFrequency: '',
      sleepQuality: '',
      stressLevel: '',
      symptoms: []
    });
    // Effacer les données du quiz pour la conformité
    await secureStorage.remove('quiz_progress');
  };
  
  const getStableParticipantNumber = () => {
    const date = new Date();
    const dayOfMonth = date.getDate();
    return 1234 + ((dayOfMonth * 7) % 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50 relative">
      <LabEffects active={showMolecules} />
      
      {/* Bannière de consentement GDPR */}
      <GDPRCompliance 
        services={['basic_analytics', 'heatmaps']}
        lang="fr"
        policyLink="/politique-confidentialite"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {step === 'intro' && (
          <div className="text-center mb-10">
            <div className="flex flex-wrap gap-3 justify-center mb-8" role="list" aria-label="Badges de certification et statistiques">
              <Badge variant="indigo" className="flex items-center gap-1" role="listitem">
                <Beaker className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Laboratoire Indépendant</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1" role="listitem">
                <Microscope className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Étude 16 semaines</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1" role="listitem">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                <span>243 participants</span>
              </Badge>
              <Badge variant="active" className="flex items-center gap-1" role="listitem">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                <span>72% de réduction des symptômes</span>
              </Badge>
              <Badge variant="pill" className="flex items-center gap-1" role="listitem">
                <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Analyse Neuropsychologique</span>
              </Badge>
            </div>
            
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full mb-6" aria-hidden="true">
              <FlaskIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
              Votre Profil Nutritionnel Personnalisé
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {welcomeMessage || "Basé sur les dernières recherches scientifiques en nutrition"}
            </p>
          </div>
        )}
        
        {step === 'intro' && (
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 rounded-full blur-2xl" aria-hidden="true"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-100/30 to-teal-100/30 rounded-full blur-2xl" aria-hidden="true"></div>
            
            <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Découvrez les compléments dont vous avez besoin</h2>
            <p className="text-muted-foreground mb-8">
              Répondez à notre questionnaire de 5 minutes et obtenez des recommandations personnalisées 
              basées sur votre mode de vie, votre alimentation et vos objectifs de santé.
            </p>
            
            <div className="grid gap-6 mb-10" role="list" aria-label="Avantages de notre quiz">
              <div className="flex items-start gap-4" role="listitem">
                <div className="bg-indigo-100 p-2 rounded-full" aria-hidden="true">
                  <Microscope className="h-5 w-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-indigo-900">Basé sur la science</h3>
                  <p className="text-muted-foreground">Nos recommandations s'appuient sur une étude menée auprès de 243 participants</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" role="listitem">
                <div className="bg-indigo-100 p-2 rounded-full" aria-hidden="true">
                  <Brain className="h-5 w-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-indigo-900">Personnalisé pour vous</h3>
                  <p className="text-muted-foreground">Notre algorithme analyse vos besoins spécifiques que 15% des laboratoires connaissent</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" role="listitem">
                <div className="bg-indigo-100 p-2 rounded-full" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2"/><path d="M9 14c-.2-1-.7-1.7-1.5-2"/><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/><path d="M18 5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5Z"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg text-indigo-900">Gratuit et sans engagement</h3>
                  <p className="text-muted-foreground">Recevez des conseils sans aucun coût ni obligation d'achat</p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full text-lg py-6 group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg quiz-cta" 
              onClick={startQuiz}
              aria-label="Commencer mon bilan nutritionnel personnalisé"
            >
              <span>Commencer mon bilan</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-6">
              Environ 5 minutes • 100% confidentiel • Utilisé par {getStableParticipantNumber()} membres
            </p>
            
            {/* Urgency countdown */}
            <div className="mt-8">
              <UrgencyCountdown 
                initialMinutes={30}
                message={personalizationFactors ? getPersonalizedMessage(personalizationFactors, 'urgency') : "Dernière session d'analyse disponible aujourd'hui"}
                variant="featured"
              />
            </div>
            
            {/* Social proof */}
            <div className="mt-8">
              <DynamicSocialProof
                baseText={personalizationFactors ? getPersonalizedMessage(personalizationFactors, 'social') : undefined}
                location={userLocation}
                variant="detailed"
              />
            </div>
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
            responses={quizResponses}
            onRestart={handleRestartQuiz}
            personalizationFactors={personalizationFactors}
          />
        )}
      </div>
      
      {/* Styles pour l'animation pulse-glow */}
      <style>
      {`
        @keyframes pulse-glow {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.1); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        
        .quiz-cta {
          animation: pulse-glow 2s infinite ease-in-out;
          box-shadow: 0 4px 14px rgba(89, 86, 213, 0.3);
          transition: all 0.3s ease;
        }
        
        .quiz-cta:hover {
          box-shadow: 0 6px 20px rgba(89, 86, 213, 0.4);
          animation: none;
        }
      `}
      </style>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const FlaskIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M10 2v7.31"></path>
    <path d="M14 9.3V2"></path>
    <path d="M8.5 2h7"></path>
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
    <path d="M5.52 16h12.96"></path>
  </svg>
);

export default Quiz;
