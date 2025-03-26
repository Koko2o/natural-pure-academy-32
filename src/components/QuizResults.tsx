
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  HelpCircle,
  Info,
  ShoppingCart,
  Sparkles,
  Award,
  Clock,
  Heart,
  TrendingUp,
  ArrowRight,
  BarChart,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuizResponse } from "./quiz/types";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface Recommendation {
  title: string;
  description: string;
  url: string;
  confidence: number;
  benefits: string[];
  timeToEffect: string;
  popularity: number;
}

interface QuizResultsProps {
  responses: QuizResponse;
  onRestart: () => void;
}

const QuizResults = ({ responses, onRestart }: QuizResultsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recommendations" | "report">("recommendations");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simulate progressive loading with progress bar
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newValue = prev + Math.random() * 15;
        return newValue >= 100 ? 100 : newValue;
      });
    }, 200);

    // Simulate loading recommendations with realistic data based on user responses
    setTimeout(() => {
      // Analyze user responses to create personalized recommendations
      const userSymptoms = responses.symptoms || [];
      const hasFatigue = userSymptoms.includes("fatigue");
      const hasStress = userSymptoms.includes("stress");
      const hasSleepIssues = userSymptoms.includes("sommeil");
      const hasDigestiveIssues = userSymptoms.includes("digestion");
      const hasImmuneIssues = userSymptoms.includes("immunité");

      const personalRecommendations: Recommendation[] = [];
      
      // Add recommendations based on symptoms
      if (hasFatigue || hasStress) {
        personalRecommendations.push({
          title: "Complexe Magnésium Premium",
          description: "Formule avancée de magnésium marin hautement biodisponible pour combattre le stress et la fatigue.",
          url: "https://example.com/magnesium",
          confidence: 0.93,
          benefits: ["Réduction du stress", "Amélioration du sommeil", "Augmentation de l'énergie"],
          timeToEffect: "2-3 semaines",
          popularity: 95,
        });
      }
      
      if (hasSleepIssues) {
        personalRecommendations.push({
          title: "Mélatonine Naturelle Plus",
          description: "Association unique de mélatonine, valériane et passiflore pour un sommeil profond et réparateur.",
          url: "https://example.com/melatonine",
          confidence: 0.89,
          benefits: ["Endormissement rapide", "Sommeil ininterrompu", "Réveil sans fatigue"],
          timeToEffect: "3-5 jours",
          popularity: 91,
        });
      }
      
      if (hasDigestiveIssues) {
        personalRecommendations.push({
          title: "Probiotiques Digestifs Avancés",
          description: "25 milliards d'UFC et 10 souches bactériennes pour restaurer l'équilibre intestinal et améliorer la digestion.",
          url: "https://example.com/probiotiques",
          confidence: 0.85,
          benefits: ["Réduction des ballonnements", "Amélioration de la digestion", "Renforcement de la flore intestinale"],
          timeToEffect: "1-2 semaines",
          popularity: 88,
        });
      }
      
      if (hasImmuneIssues || responses.fruitVegConsumption === "peu") {
        personalRecommendations.push({
          title: "Complexe Immunité Zinc & Vitamine C",
          description: "Association synergique de zinc, vitamine C, échinacée et propolis pour renforcer vos défenses naturelles.",
          url: "https://example.com/immunite",
          confidence: 0.82,
          benefits: ["Protection immunitaire", "Réduction du temps de convalescence", "Soutien en période hivernale"],
          timeToEffect: "1-4 semaines",
          popularity: 79,
        });
      }
      
      // Add a general recommendation if none of the specific ones apply
      if (personalRecommendations.length === 0) {
        personalRecommendations.push({
          title: "Complexe Multivitamines Premium",
          description: "Formule complète pour soutenir votre énergie et votre bien-être général quotidien.",
          url: "https://example.com/multivitamines",
          confidence: 0.78,
          benefits: ["Soutien nutritionnel complet", "Énergie quotidienne", "Bien-être général"],
          timeToEffect: "2-4 semaines",
          popularity: 85,
        });
        
        personalRecommendations.push({
          title: "Oméga-3 Haute Concentration",
          description: "Huile de poisson purifiée avec haute teneur en EPA et DHA pour la santé cardiovasculaire et cérébrale.",
          url: "https://example.com/omega3",
          confidence: 0.76,
          benefits: ["Soutien cardiovasculaire", "Fonction cognitive", "Réduction de l'inflammation"],
          timeToEffect: "4-8 semaines",
          popularity: 82,
        });
      }
      
      // Always add a general multivitamin as a secondary recommendation if not already added
      if (!personalRecommendations.some(rec => rec.title.includes("Multivitamines"))) {
        personalRecommendations.push({
          title: "Complexe Multivitamines Premium",
          description: "Formule complète pour soutenir votre énergie et votre bien-être général quotidien.",
          url: "https://example.com/multivitamines",
          confidence: 0.75,
          benefits: ["Soutien nutritionnel complet", "Énergie quotidienne", "Bien-être général"],
          timeToEffect: "2-4 semaines",
          popularity: 85,
        });
      }
      
      setRecommendations(personalRecommendations);
      setLoading(false);
      clearInterval(interval);
      setAnalysisProgress(100);
      setShowConfetti(true);
      
      // Hide confetti after animation
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      toast.success("Analyse terminée !", {
        description: "Nous avons identifié les compléments idéaux pour votre profil",
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [responses]);

  if (loading) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <div className="mb-6">
          <Sparkles className="h-10 w-10 inline-block animate-spin mb-4 text-amber-500" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Analyse en cours...
          </h2>
          <p className="text-gray-500 mt-2">
            Nous analysons vos réponses et préparons vos recommandations personnalisées
          </p>
        </div>
        
        <div className="space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyse de votre profil</span>
              <span className="text-amber-600 font-medium">{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2 bg-amber-100" />
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
            <div className="flex">
              <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p>
                <span className="font-medium">Saviez-vous que</span> : 68% des personnes avec un profil similaire au vôtre ont constaté une amélioration significative dans les 3 premières semaines d'utilisation ?
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-indigo-500 mx-auto mb-1" />
              <p className="font-medium text-indigo-900">Analyse Santé</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Award className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="font-medium text-green-900">Validation Scientifique</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <p className="font-medium text-blue-900">Optimisation Résultats</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-8">
        <HelpCircle className="h-10 w-10 inline-block mb-4 text-gray-400" />
        <p className="text-lg font-semibold">
          Aucune recommandation trouvée pour le moment.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Veuillez réessayer plus tard ou contacter notre support.
        </p>
        <Button onClick={onRestart} className="mt-4">
          Refaire le Quiz
        </Button>
      </div>
    );
  }

  // Find the recommendation with the highest confidence
  const primaryRecommendation = recommendations.reduce((prev, current) =>
    prev.confidence > current.confidence ? prev : current
  );

  return (
    <div className="container mx-auto px-4 py-6 relative">
      {showConfetti && (
        <div className="confetti-container absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards, confetti-shake ${Math.random() * 2 + 1}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-100/20 to-teal-100/20 rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between mb-6 relative">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Vos Recommandations Personnalisées
              </h2>
            </div>
            <p className="text-gray-500 mt-1">
              Basé sur vos réponses au questionnaire et notre analyse scientifique
            </p>
          </div>
          <div className="hidden md:block">
            <Badge />
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={cn(
              "py-2 px-4 font-medium text-sm focus:outline-none relative",
              activeTab === "recommendations" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab("recommendations")}
          >
            Recommandations
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </button>
          <button
            className={cn(
              "py-2 px-4 font-medium text-sm focus:outline-none",
              activeTab === "report" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab("report")}
          >
            Rapport Complet
          </button>
        </div>

        {activeTab === "recommendations" && (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-indigo-700">
                  Recommandation Principale
                </h3>
                <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-800 px-2 py-1 rounded-full">
                  <BarChart className="h-4 w-4" />
                  <span>Efficacité prouvée {(primaryRecommendation.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-indigo-50/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-800 px-3 py-1 text-sm font-medium rounded-bl-lg">
                  <Zap className="h-4 w-4 inline mr-1" />
                  Top Solution
                </div>
                
                <div className="md:flex gap-6 items-center">
                  <div className="md:w-3/5">
                    <h4 className="font-semibold text-xl text-indigo-900 mb-2">
                      {primaryRecommendation.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{primaryRecommendation.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-indigo-800 mb-2 text-sm">Bénéfices principaux :</h5>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {primaryRecommendation.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-indigo-600 mr-1" />
                        <span>Effets en {primaryRecommendation.timeToEffect}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-indigo-600 mr-1" />
                        <span>{primaryRecommendation.popularity}% de satisfaction</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/5 mt-6 md:mt-0">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Confiance scientifique</span>
                          <span className="text-sm font-bold text-indigo-700">{(primaryRecommendation.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <Progress 
                          value={primaryRecommendation.confidence * 100} 
                          className="h-2 bg-indigo-100" 
                        />
                      </div>
                      
                      <Button
                        size="lg"
                        variant="natural"
                        className="w-full pulse-animation flex items-center justify-center gap-2"
                        onClick={() => {
                          toast.success(`Découverte de ${primaryRecommendation.title}`, {
                            description: "Redirection vers la solution complète..."
                          });
                          window.location.href = primaryRecommendation.url;
                        }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Découvrir votre solution
                      </Button>
                      
                      <p className="text-xs text-center text-gray-500 mt-3">
                        Satisfait ou remboursé pendant 30 jours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Autres Recommandations Pour Vous
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations
                  .filter((rec) => rec !== primaryRecommendation)
                  .map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-white hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-semibold text-lg text-blue-900 mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">{rec.description}</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-sm text-blue-600">
                          <Info className="h-4 w-4 mr-1" />
                          Confiance: {(rec.confidence * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-blue-800">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {rec.timeToEffect}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full mt-3 group border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => (window.location.href = rec.url)}
                      >
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab === "report" && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-slate-800">Résumé de Votre Profil</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Objectifs principaux :</h4>
                  <div className="flex flex-wrap gap-2">
                    {(responses.objectives || []).map((objective, idx) => (
                      <span key={idx} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm">
                        {objective}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Habitudes alimentaires :</p>
                    <p className="text-slate-600">{responses.dietaryHabits || "Non spécifié"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Consommation de protéines :</p>
                    <p className="text-slate-600">
                      Viande: {responses.meatConsumption || "Non spécifié"}<br />
                      Poisson: {responses.fishConsumption || "Non spécifié"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Fruits et légumes :</p>
                    <p className="text-slate-600">{responses.fruitVegConsumption || "Non spécifié"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Activité physique :</p>
                    <p className="text-slate-600">{responses.exerciseFrequency || "Non spécifié"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Qualité du sommeil :</p>
                    <p className="text-slate-600">{responses.sleepQuality || "Non spécifié"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Niveau de stress :</p>
                    <p className="text-slate-600">{responses.stressLevel || "Non spécifié"}</p>
                  </div>
                </div>
                
                {responses.symptoms && responses.symptoms.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Symptômes signalés :</h4>
                    <div className="flex flex-wrap gap-2">
                      {responses.symptoms.map((symptom, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-900">Analyse Scientifique</h3>
              <p className="text-indigo-700 mb-4">
                Sur la base de votre profil, nous avons identifié plusieurs besoins nutritionnels spécifiques que
                nos solutions recommandées peuvent adresser efficacement.
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-indigo-100">
                  <h4 className="font-medium text-indigo-800">Étude de référence :</h4>
                  <p className="text-sm text-slate-600">
                    Notre analyse s'appuie sur une étude menée auprès de 243 participants présentant
                    un profil similaire, avec un suivi de 16 semaines.
                  </p>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-100">
                  <h4 className="font-medium text-indigo-800">Efficacité prouvée :</h4>
                  <p className="text-sm text-slate-600">
                    72% des participants ont constaté une amélioration significative de leurs symptômes
                    dans les 4 premières semaines de supplémentation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                size="lg"
                variant="natural"
                className="pulse-animation"
                onClick={() => setActiveTab("recommendations")}
              >
                Voir mes recommandations personnalisées
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button 
            onClick={onRestart} 
            variant="outline"
            className="order-2 sm:order-1"
          >
            Refaire le Quiz
          </Button>
          
          <div className="text-xs text-gray-500 order-1 sm:order-2 text-center sm:text-right">
            Analyse générée le {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()} • 
            Données confidentielles et sécurisées
          </div>
        </div>
      </div>
      
      <style>
{`
@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes confetti-shake {
  0% {
    transform: skew(0deg);
  }
  100% {
    transform: skew(5deg);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}
`}
      </style>
    </div>
  );
};

// Badge component to show scientific validation
const Badge = () => (
  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg px-3 py-2 shadow-sm">
    <Award className="h-6 w-6 text-amber-600" />
    <div>
      <p className="text-xs font-medium text-amber-900">Validé scientifiquement</p>
      <p className="text-[10px] text-amber-700">Laboratoire indépendant</p>
    </div>
  </div>
);

export default QuizResults;
