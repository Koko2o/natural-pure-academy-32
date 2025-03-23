
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "./types";

interface ChallengesProps {
  challenges: Challenge[];
}

const Challenges = ({ challenges }: ChallengesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vos défis en cours</CardTitle>
        <CardDescription>Suivez votre progression et relevez de nouveaux défis pour améliorer votre santé</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {challenges.map((defi) => (
            <div key={defi.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{defi.name}</h3>
                <Badge>{defi.days} jours</Badge>
              </div>
              <div className="space-y-2">
                <Progress value={defi.progress} />
                <div className="flex justify-between text-sm">
                  <span>Progression: {defi.progress}%</span>
                  <span className="text-primary font-medium">
                    {defi.progress < 50 ? "Continuez vos efforts!" : "Excellente progression!"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button>Découvrir de nouveaux défis</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;
