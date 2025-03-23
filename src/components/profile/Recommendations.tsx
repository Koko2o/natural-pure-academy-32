
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recommendation } from "./types";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommandations personnalisées</CardTitle>
        <CardDescription>Basées sur vos lectures et interactions précédentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
              <Badge className="mb-2">{rec.category}</Badge>
              <h3 className="font-medium mb-4">{rec.title}</h3>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to={`/article/${rec.id}`}>Découvrir</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
