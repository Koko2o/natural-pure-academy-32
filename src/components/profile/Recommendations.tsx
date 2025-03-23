
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recommendation } from "./types";
import { Sparkles, ArrowRight, Heart, Brain, Flask, Leaf, Pill } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

// Fonction pour obtenir une icône basée sur la catégorie
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "compléments":
      return <Pill className="h-4 w-4 text-purple-500" />;
    case "bien-être":
      return <Heart className="h-4 w-4 text-rose-500" />;
    case "nutrition":
      return <Leaf className="h-4 w-4 text-emerald-500" />;
    default:
      return <Flask className="h-4 w-4 text-blue-500" />;
  }
};

// Fonction pour obtenir une couleur de badge basée sur la catégorie
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "compléments":
      return "bg-purple-50 text-purple-600 border-purple-100";
    case "bien-être":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "nutrition":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    default:
      return "bg-blue-50 text-blue-600 border-blue-100";
  }
};

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  // Mois actuel en français
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b border-purple-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-purple-700">Recommandations personnalisées</CardTitle>
        </div>
        <CardDescription>
          Suggestions spéciales pour vous ce mois de {capitalizedMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="bg-white border rounded-lg p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
              <Badge className={`mb-3 self-start flex items-center gap-1.5 ${getCategoryColor(rec.category)}`}>
                {getCategoryIcon(rec.category)}
                <span>{rec.category}</span>
              </Badge>
              <h3 className="font-medium text-lg mb-4 flex-grow">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recommandation personnalisée basée sur votre profil et vos objectifs de santé actuels.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full group">
                <Link to={`/article/${rec.id}`} className="flex items-center justify-center gap-2">
                  <span>Découvrir</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
          
          {/* Carte personnalisée du mois */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border rounded-lg p-5 flex flex-col h-full shadow-sm">
            <Badge className="mb-3 self-start bg-purple-100 text-purple-600 border-purple-200">
              Spécial {capitalizedMonth}
            </Badge>
            <h3 className="font-medium text-lg mb-2 text-purple-700">
              Votre bilan nutritionnel mensuel
            </h3>
            <p className="text-sm text-purple-600/80 mb-4 flex-grow">
              Découvrez votre analyse personnalisée et vos tendances de santé du mois de {capitalizedMonth}.
            </p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Voir mon bilan
            </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <span>Voir toutes les recommandations</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
