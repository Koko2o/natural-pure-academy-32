
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Award, Beaker, BookOpen, ChevronRight, ExternalLink, Instagram, Microscope, Users, Star, ArrowDown, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface QuizResultsProps {
  userInfo: {
    name: string;
    email: string;
  };
  quizResponses: Record<string, any>;
}

const QuizResults = ({ userInfo, quizResponses }: QuizResultsProps) => {
  // Analyse fictive des résultats pour générer des recommandations
  // Dans une application réelle, cela pourrait provenir d'une API ou d'un algorithme plus complexe
  const getRecommendations = () => {
    const recommendations = [];
    
    // Exemples de règles simples pour générer des recommandations
    if (quizResponses.objectives?.includes("Plus d'énergie") || 
        quizResponses.symptoms?.includes("Fatigue")) {
      recommendations.push({
        id: "vitamin-b",
        title: "Complexe de vitamines B",
        description: "Les vitamines du groupe B jouent un rôle crucial dans la production d'énergie cellulaire.",
        priority: "Élevée",
        dosage: "1 comprimé par jour avec le repas",
        evidence: "93% des personnes avec un profil similaire ont rapporté une amélioration de leur niveau d'énergie",
        university: "Université Claude Bernard Lyon 1",
        year: 2023
      });
    }
    
    if (quizResponses.objectives?.includes("Améliorer ma concentration") || 
        quizResponses.symptoms?.includes("Manque de concentration")) {
      recommendations.push({
        id: "omega-3",
        title: "Oméga-3 EPA/DHA",
        description: "Les acides gras oméga-3 sont essentiels au bon fonctionnement cérébral et cognitif.",
        priority: "Élevée",
        dosage: "1000mg par jour avec un repas contenant des graisses",
        evidence: "Études démontrant l'importance des oméga-3 pour les fonctions cognitives",
        university: "Institut de Biochimie de Paris",
        year: 2022
      });
    }
    
    if (quizResponses.sleepQuality === "average" || 
        quizResponses.sleepQuality === "poor" || 
        quizResponses.objectives?.includes("Meilleur sommeil")) {
      recommendations.push({
        id: "magnesium",
        title: "Magnésium bisglycinate",
        description: "Le magnésium aide à la relaxation musculaire et nerveuse, favorisant un sommeil de qualité.",
        priority: "Moyenne",
        dosage: "300mg avant le coucher",
        evidence: "Le magnésium a démontré des effets positifs sur la qualité du sommeil dans 82% des cas",
        university: "Université de Montpellier",
        year: 2023
      });
    }
    
    if (quizResponses.stressLevel === "high" || 
        quizResponses.stressLevel === "severe" ||
        quizResponses.objectives?.includes("Réduire mon stress")) {
      recommendations.push({
        id: "ashwagandha",
        title: "Ashwagandha",
        description: "Cette plante adaptogène aide l'organisme à mieux gérer le stress.",
        priority: "Moyenne",
        dosage: "300-500mg par jour",
        evidence: "L'ashwagandha a démontré réduire les niveaux de cortisol dans plusieurs études cliniques",
        university: "King's College London",
        year: 2021
      });
    }
    
    if (quizResponses.symptoms?.includes("Problèmes digestifs") || 
        quizResponses.objectives?.includes("Soutenir ma digestion")) {
      recommendations.push({
        id: "probiotics",
        title: "Probiotiques multi-souches",
        description: "Les probiotiques aident à maintenir l'équilibre de la flore intestinale.",
        priority: "Moyenne",
        dosage: "10 milliards UFC par jour, à jeun",
        evidence: "Efficacité démontrée pour soutenir la santé digestive et le microbiote intestinal",
        university: "Institut Pasteur",
        year: 2023
      });
    }
    
    // Si peu de fruits et légumes
    if (quizResponses.fruitVegConsumption === "0-1" || quizResponses.fruitVegConsumption === "2-3") {
      recommendations.push({
        id: "multivitamin",
        title: "Multivitamines complètes",
        description: "Une assurance nutritionnelle pour combler les lacunes potentielles de l'alimentation.",
        priority: "Fondamentale",
        dosage: "1 comprimé par jour avec un repas",
        evidence: "Recommandation de base pour les personnes consommant moins de 5 portions de fruits et légumes par jour",
        university: "Harvard Medical School",
        year: 2022
      });
    }
    
    // Si peu de poisson
    if (quizResponses.fishConsumption === "rarely" || quizResponses.fishConsumption === "monthly") {
      if (!recommendations.some(r => r.id === "omega-3")) {
        recommendations.push({
          id: "omega-3",
          title: "Oméga-3 EPA/DHA",
          description: "Les acides gras oméga-3 sont essentiels à la santé cardiovasculaire et cérébrale.",
          priority: "Élevée",
          dosage: "1000mg par jour avec un repas contenant des graisses",
          evidence: "Nutriment essentiel difficile à obtenir sans consommation régulière de poissons gras",
          university: "American Heart Association",
          year: 2023
        });
      }
    }
    
    // Si régime végétarien/végan
    if (quizResponses.dietaryHabits === "vegetarian" || quizResponses.dietaryHabits === "vegan") {
      recommendations.push({
        id: "vitamin-b12",
        title: "Vitamine B12",
        description: "Vitamine essentielle principalement présente dans les produits animaux.",
        priority: "Critique",
        dosage: "1000mcg par jour ou 2000mcg 3 fois par semaine",
        evidence: "Supplémentation nécessaire pour les personnes suivant un régime végétarien ou végan",
        university: "Oxford University",
        year: 2022
      });
      
      recommendations.push({
        id: "vitamin-d",
        title: "Vitamine D3+K2",
        description: "Essentielle pour l'absorption du calcium et la santé osseuse.",
        priority: "Élevée",
        dosage: "2000 UI par jour avec un repas contenant des graisses",
        evidence: "Recommandée pour la plupart des personnes, particulièrement importante pour les végétaliens",
        university: "Université de Copenhague",
        year: 2023
      });
    }
    
    // Si pas assez de recommendations, ajout d'un complément générique
    if (recommendations.length < 3) {
      recommendations.push({
        id: "antioxidants",
        title: "Complexe antioxydant",
        description: "Mélange de vitamines C, E et de quercétine pour renforcer les défenses de l'organisme.",
        priority: "Complémentaire",
        dosage: "1 comprimé par jour",
        evidence: "Les antioxydants aident à lutter contre le stress oxydatif et le vieillissement cellulaire",
        university: "INSERM",
        year: 2022
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  const [showHiddenInsight, setShowHiddenInsight] = useState(false);
  
  useEffect(() => {
    // Afficher l'insight caché après un court délai
    const timer = setTimeout(() => {
      setShowHiddenInsight(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <Badge variant="indigo" className="flex items-center gap-1">
          <Beaker className="h-3.5 w-3.5" />
          <span>Laboratoire Indépendant</span>
        </Badge>
        <Badge variant="pill" className="flex items-center gap-1">
          <Microscope className="h-3.5 w-3.5" />
          <span>Étude 16 semaines</span>
        </Badge>
        <Badge variant="pill" className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          <span>243 participants</span>
        </Badge>
        <Badge variant="active" className="flex items-center gap-1">
          <Award className="h-3.5 w-3.5" />
          <span>72% de réduction des symptômes</span>
        </Badge>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 relative overflow-hidden animate-fade-in">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-100/30 to-teal-100/30 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-900">
              Bonjour {userInfo.name}, voici vos recommandations personnalisées
            </h2>
            
            <Badge variant="cta" className="animate-pulse-slow flex items-center gap-1 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Résultats valides 30 jours</span>
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-6">
            <span className="font-medium">Basées sur nos travaux scientifiques récents</span>, nous avons identifié les compléments alimentaires 
            qui pourraient vous aider à atteindre vos objectifs de santé. Nous avons envoyé 
            une copie détaillée à {userInfo.email}.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {quizResponses.objectives?.map((objective: string, index: number) => (
              <div 
                key={objective} 
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-indigo-100 p-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-indigo-700" />
                </div>
                <span className="text-indigo-900">{objective}</span>
              </div>
            ))}
          </div>
          
          {showHiddenInsight && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-8 animate-fade-in relative">
              <div className="absolute -top-2 -right-2">
                <Badge variant="pill" className="bg-amber-400 text-amber-900">Nouveau</Badge>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-1">
                  <Star className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Découverte récente pour votre profil</h3>
                  <p className="text-amber-800">
                    Notre équipe vient de publier une nouvelle étude montrant que pour des profils similaires au vôtre, 
                    combiner certains nutriments spécifiques augmente l'efficacité de <span className="font-bold">64%</span> par rapport à des 
                    supplémentations isolées.
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <BookOpen className="h-3.5 w-3.5 text-amber-700 mr-1" />
                    <span className="text-amber-700">Publication mai 2024, n=126 participants</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-1">
                <Microscope className="h-5 w-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900 mb-1">Notre découverte scientifique</h3>
                <p className="text-indigo-800">
                  Notre équipe a mis en évidence qu'une combinaison spécifique de nutriments peut amplifier leur efficacité individuelle par un facteur de 2,4 - une synergie rarement exploitée dans les formulations commerciales standard.
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-700 mr-1" />
                  <span className="text-indigo-700">NP-Lab, 2023, n=243 participants</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8 animate-fade-in">
            <ArrowDown className="h-8 w-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
            <p className="text-indigo-800 font-medium">Vos recommandations personnalisées basées sur vos réponses</p>
          </div>
          
          <div className="space-y-6">
            {recommendations.map((rec: any, index: number) => (
              <Card 
                key={rec.id} 
                className={`border-indigo-100 hover:shadow-md transition-all animate-fade-in ${index === 0 ? 'ring-2 ring-indigo-300 ring-offset-2' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-indigo-900">{rec.title}</CardTitle>
                    <Badge variant={
                      rec.priority === "Critique" ? "active" :
                      rec.priority === "Élevée" ? "indigo" :
                      rec.priority === "Fondamentale" ? "pill" : "condition"
                    }>{rec.priority}</Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-indigo-900">Dosage recommandé</h4>
                        <p className="text-sm text-muted-foreground">{rec.dosage}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-indigo-900">Bénéfices attendus</h4>
                        <p className="text-sm text-muted-foreground">
                          Amélioration sous 2-4 semaines avec prise régulière
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-indigo-900">Base scientifique</h4>
                      <p className="text-sm text-muted-foreground">{rec.evidence}</p>
                      <div className="flex justify-between items-center mt-1.5">
                        <Badge variant="pill" className="text-xs">{rec.university}</Badge>
                        <span className="text-xs text-indigo-600">{rec.year}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full group bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 text-indigo-700">
                    <Link to="/articles">
                      <span>Voir les solutions validées par notre labo</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 mb-8 text-white shadow-lg animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">Accédez à nos découvertes exclusives</h3>
            <p className="text-indigo-100">
              Rejoignez notre communauté de 10,234 membres passionnés par la science de la nutrition
            </p>
          </div>
          <Button className="bg-white text-indigo-700 hover:bg-indigo-100" asChild>
            <a href="https://instagram.com/naturalpure" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Instagram className="mr-2 h-5 w-5" />
              Suivre sur Instagram
            </a>
          </Button>
        </div>
      </div>
      
      <div className="text-center animate-fade-in">
        <p className="text-sm text-muted-foreground mb-2">
          Ces recommandations sont fournies à titre informatif uniquement et ne remplacent pas l'avis d'un professionnel de santé.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="link" size="sm" asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
          <Button variant="link" size="sm" asChild>
            <Link to="/nutrition">Explorer nos guides nutritionnels</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
