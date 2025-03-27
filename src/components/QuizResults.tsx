
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
  Brain,
  FlaskConical,
  Gauge,
  Lightbulb
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { QuizResponse } from "./quiz/types";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { generateNeuroProfile, getUrgencyMessage } from "./quiz/NeuroEngine";
import { calculateRiskScore, getRiskColor } from "@/utils/contentSafety";

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
  const [activeTab, setActiveTab] = useState<"recommendations" | "report" | "neuroProfile">("recommendations");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [neuroProfile, setNeuroProfile] = useState<any>(null);
  const [urgencyMessage, setUrgencyMessage] = useState<{message: string; level: string; countdownMinutes?: number}>({
    message: "",
    level: "low"
  });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<string>('France');
  const animationRef = useRef<any>(null);
  
  // Simuler la récupération de la localisation de l'utilisateur
  useEffect(() => {
    // Dans un cas réel, nous utiliserions une API de géolocalisation
    const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nantes', 'Strasbourg'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setUserLocation(randomCity);
  }, []);

  useEffect(() => {
    // Récupérer le temps passé (simulé pour l'exemple)
    const timeSpent = Math.random() * 180 + 90; // entre 90 et 270 secondes
    const scrollSpeed = Math.random() * 2 + 0.5; // vitesse de défilement simulée
    
    // Générer le profil neurologique
    const profile = generateNeuroProfile(responses, {
      scrollSpeed,
      timeSpent,
      clickPatterns: [Math.random(), Math.random() * 1.5, Math.random()],
      hoverTime: {},
      rereadCount: Math.floor(Math.random() * 3)
    });
    
    setNeuroProfile(profile);
    
    // Générer un message d'urgence contextuel
    const urgency = getUrgencyMessage({
      userProfile: profile,
      currentTraffic: Math.random() > 0.6 ? 'high' : 'low',
      userLocation,
    });
    
    setUrgencyMessage(urgency);
    
    if (urgency.countdownMinutes) {
      setTimeRemaining(urgency.countdownMinutes * 60);
    }
    
    // Démarrer l'animation de laboratoire
    startMoleculeAnimation();
    
    // Nettoyage
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [responses, userLocation]);
  
  // Animation de molécules en arrière-plan
  const startMoleculeAnimation = () => {
    const canvas = document.getElementById('molecule-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const molecules: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }> = [];
    
    // Initialiser les molécules
    for (let i = 0; i < 30; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.random() * 0.4 + 0.1})`,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les molécules
      molecules.forEach(molecule => {
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
        ctx.fillStyle = molecule.color;
        ctx.fill();
        
        // Déplacer les molécules
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;
        
        // Rebondir sur les bords
        if (molecule.x < 0 || molecule.x > canvas.width) molecule.vx *= -1;
        if (molecule.y < 0 || molecule.y > canvas.height) molecule.vy *= -1;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  // Compte à rebours
  useEffect(() => {
    if (timeRemaining === null) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeRemaining]);
  
  // Format du compte à rebours
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

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
  
  // Calculer un score de risque dynamique
  const riskScore = calculateRiskScore(
    neuroProfile ? 180 + Math.random() * 120 : 120, // temps passé (secondes)
    responses.objectives ? responses.objectives.length : 0, // questions répondues
    responses.symptoms ? responses.symptoms.length : 0 // réponses critiques
  );
  
  // Obtenir la couleur du score de risque
  const riskColor = getRiskColor(riskScore);

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <canvas 
        id="molecule-canvas" 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        width="800"
        height="600"
      />
      
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
        
        {/* Message d'urgence contextuel */}
        {urgencyMessage.message && (
          <div className={cn(
            "mb-6 p-4 rounded-lg flex items-center gap-3",
            urgencyMessage.level === 'high' ? "bg-red-50 border border-red-100" :
            urgencyMessage.level === 'medium' ? "bg-amber-50 border border-amber-100" :
            "bg-blue-50 border border-blue-100"
          )}>
            <div className={cn(
              "p-2 rounded-full",
              urgencyMessage.level === 'high' ? "bg-red-100" :
              urgencyMessage.level === 'medium' ? "bg-amber-100" :
              "bg-blue-100"
            )}>
              {urgencyMessage.level === 'high' ? (
                <Clock className={cn("h-5 w-5", urgencyMessage.level === 'high' ? "text-red-600" : 
                  urgencyMessage.level === 'medium' ? "text-amber-600" : "text-blue-600")} />
              ) : (
                <Info className={cn("h-5 w-5", urgencyMessage.level === 'high' ? "text-red-600" : 
                  urgencyMessage.level === 'medium' ? "text-amber-600" : "text-blue-600")} />
              )}
            </div>
            <div className="flex-1">
              <p className={cn(
                "font-medium",
                urgencyMessage.level === 'high' ? "text-red-800" :
                urgencyMessage.level === 'medium' ? "text-amber-800" :
                "text-blue-800"
              )}>
                {urgencyMessage.message}
              </p>
              {timeRemaining !== null && timeRemaining > 0 && (
                <p className={cn(
                  "text-sm mt-1",
                  urgencyMessage.level === 'high' ? "text-red-600" :
                  urgencyMessage.level === 'medium' ? "text-amber-600" :
                  "text-blue-600"
                )}>
                  Expire dans : {formatTime(timeRemaining)}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Affichage du profil social */}
        <div className="mb-6 p-4 bg-white border border-indigo-100 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-indigo-900 font-medium">
                {Math.round(40 + Math.random() * 45)}% des utilisateurs de {userLocation} ont complété leur analyse
              </p>
              <p className="text-sm text-indigo-600">
                Vous faites partie des {neuroProfile ? Math.round(neuroProfile.attentionScore / 10) : 8}% des utilisateurs les plus engagés
              </p>
            </div>
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
          <button
            className={cn(
              "py-2 px-4 font-medium text-sm focus:outline-none",
              activeTab === "neuroProfile" 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab("neuroProfile")}
          >
            Profil Neuropsychologique
            {neuroProfile && <span className="ml-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs">Nouveau</span>}
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
            
            {/* Affichage du score de risque */}
            <div className="p-5 bg-white border border-indigo-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Gauge className="h-5 w-5 mr-2 text-indigo-600" />
                <span>Votre Indice de Risque Nutritionnel</span>
              </h3>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Score Global</span>
                  <span className="text-sm font-bold" style={{ color: riskColor }}>{riskScore}/100</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${riskScore}%`, backgroundColor: riskColor }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {riskScore < 30 ? 
                  "Votre profil présente un risque nutritionnel élevé. Une supplémentation adaptée est fortement recommandée." :
                  riskScore < 70 ?
                  "Votre profil présente quelques lacunes nutritionnelles qui pourraient bénéficier d'une supplémentation ciblée." :
                  "Votre profil nutritionnel est généralement bon. Une supplémentation ciblée peut optimiser certains aspects spécifiques."
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800">Risque Élevé</h4>
                  <p className="text-xs text-red-600">0-30</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-800">Risque Modéré</h4>
                  <p className="text-xs text-amber-600">31-70</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800">Risque Faible</h4>
                  <p className="text-xs text-green-600">71-100</p>
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
        
        {activeTab === "neuroProfile" && neuroProfile && (
          <div className="space-y-6">
            <div className="bg-violet-50 p-5 rounded-lg border border-violet-100">
              <div className="flex items-start mb-4">
                <div className="bg-violet-100 p-2 rounded-full mr-3">
                  <Brain className="h-6 w-6 text-violet-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-900">Votre Profil Neuropsychologique</h3>
                  <p className="text-sm text-violet-700">
                    Notre algorithme a analysé vos réponses et comportements pour générer ce profil unique
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Niveau de Stress Cognitif</h4>
                    <div className="flex items-center">
                      <div className="w-full mr-3">
                        <div className="h-4 w-full bg-violet-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-300 to-violet-500 rounded-full"
                            style={{ width: `${neuroProfile.stressLevel}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-violet-700">{neuroProfile.stressLevel}%</span>
                    </div>
                    <p className="text-xs text-violet-600 mt-1">
                      {neuroProfile.stressLevel > 70 ? 
                        "Niveau élevé - Une gestion active du stress est recommandée" :
                        neuroProfile.stressLevel > 40 ? 
                        "Niveau modéré - À surveiller, certaines techniques de gestion seraient bénéfiques" :
                        "Niveau faible - Vous gérez bien le stress quotidien"
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Score d'Attention et Concentration</h4>
                    <div className="flex items-center">
                      <div className="w-full mr-3">
                        <div className="h-4 w-full bg-violet-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-300 to-violet-500 rounded-full"
                            style={{ width: `${neuroProfile.attentionScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-violet-700">{neuroProfile.attentionScore}%</span>
                    </div>
                    <p className="text-xs text-violet-600 mt-1">
                      {neuroProfile.attentionScore > 75 ? 
                        "Excellente capacité de concentration et d'attention aux détails" :
                        neuroProfile.attentionScore > 45 ? 
                        "Capacité d'attention moyenne - Des suppléments ciblés pourraient l'améliorer" :
                        "Attention diffuse - Une optimisation cognitive serait bénéfique"
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-violet-100 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Force Cognitive Principale</h4>
                    <div className="flex items-center">
                      <Lightbulb className="h-5 w-5 text-violet-600 mr-2" />
                      <span className="text-violet-900">{neuroProfile.cognitiveStrength}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-violet-800 mb-2">Domaines d'Intérêt Prioritaires</h4>
                    <div className="flex flex-wrap gap-2">
                      {neuroProfile.focusAreas.map((area: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-violet-100 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Style d'Apprentissage Dominant</h4>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-violet-600 mr-2" />
                      <span className="text-violet-900">{neuroProfile.learningStyle}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-violet-200">
                    <h4 className="text-sm font-medium text-violet-800 mb-2">Recommandations Neuropsychologiques</h4>
                    <ul className="space-y-2 text-sm">
                      {neuroProfile.stressLevel > 60 && (
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span>Techniques de respiration et méditation guidée</span>
                        </li>
                      )}
                      {neuroProfile.attentionScore < 70 && (
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span>Suppléments à base de Bacopa et Ginkgo biloba</span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span>Protocole nutritionnel adapté à votre profil cognitif</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-violet-100/50 rounded-lg">
                <p className="text-xs text-violet-700 italic">
                  Ce profil est généré à partir de l'analyse de vos réponses et de vos interactions avec le questionnaire. 
                  Il peut évoluer avec le temps et n'a pas vocation à remplacer un avis médical professionnel.
                </p>
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

@keyframes molecule-drift {
  0% { transform: translateY(-5%) rotate(3deg); }
  100% { transform: translateY(15%) rotate(-2deg); }
}

.molecule-background {
  background: url('/molecule-grid.svg');
  animation: molecule-drift 45s infinite alternate;
  opacity: 0.1;
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

const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default QuizResults;
