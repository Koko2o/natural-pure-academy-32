
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recommendation } from "./types";
import { Sparkles, ArrowRight } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Recommandations personnalisées</CardTitle>
        </div>
        <CardDescription>Basées sur vos lectures et interactions précédentes</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white border rounded-lg p-5 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <Badge className="mb-3 self-start">{rec.category}</Badge>
              <h3 className="font-medium text-lg mb-4 flex-grow">{rec.title}</h3>
              <Button variant="outline" size="sm" asChild className="w-full group">
                <Link to={`/article/${rec.id}`} className="flex items-center justify-center gap-2">
                  <span>Découvrir</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2">
            <span>Voir toutes les recommandations</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
