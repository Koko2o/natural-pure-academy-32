
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

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
        evidence: "Le magnésium a démontré des effets positifs sur la qualité du sommeil",
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
      });
      
      recommendations.push({
        id: "vitamin-d",
        title: "Vitamine D3+K2",
        description: "Essentielle pour l'absorption du calcium et la santé osseuse.",
        priority: "Élevée",
        dosage: "2000 UI par jour avec un repas contenant des graisses",
        evidence: "Recommandée pour la plupart des personnes, particulièrement importante pour les végétaliens",
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
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Bonjour {userInfo.name}, voici vos recommandations personnalisées
        </h2>
        <p className="text-muted-foreground mb-6">
          Basées sur vos réponses, nous avons identifié les compléments alimentaires 
          qui pourraient vous aider à atteindre vos objectifs de santé. Nous avons envoyé 
          une copie détaillée à {userInfo.email}.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {quizResponses.objectives?.map((objective: string) => (
            <div key={objective} className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
              <span>{objective}</span>
            </div>
          ))}
        </div>
        
        <div className="space-y-6">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>{rec.title}</CardTitle>
                  <Badge>{rec.priority}</Badge>
                </div>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Dosage recommandé</h4>
                      <p className="text-sm text-muted-foreground">{rec.dosage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Bénéfices attendus</h4>
                      <p className="text-sm text-muted-foreground">
                        Amélioration sous 2-4 semaines avec prise régulière
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Base scientifique</h4>
                    <p className="text-sm text-muted-foreground">{rec.evidence}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/articles">En savoir plus</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">Suivez-nous sur Instagram</h3>
            <p className="text-muted-foreground">
              Obtenez votre rapport complet et des conseils personnalisés en nous suivant sur Instagram
            </p>
          </div>
          <Button asChild>
            <a href="https://instagram.com/naturalpure" target="_blank" rel="noopener noreferrer">
              Suivre @NaturalPure
            </a>
          </Button>
        </div>
      </div>
      
      <div className="text-center">
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
