
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "./types";
import { Trophy, Plus, ArrowRight } from "lucide-react";

interface ChallengesProps {
  challenges: Challenge[];
}

const Challenges = ({ challenges }: ChallengesProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>Vos défis en cours</CardTitle>
        </div>
        <CardDescription>Suivez votre progression et relevez de nouveaux défis pour améliorer votre santé</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((defi) => (
            <div key={defi.id} className="bg-white border rounded-lg p-5 hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{defi.name}</h3>
                <Badge variant="outline" className="bg-primary/5">{defi.days} jours</Badge>
              </div>
              <div className="space-y-3">
                <Progress value={defi.progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span>Progression: {defi.progress}%</span>
                  <span className="text-primary font-medium">
                    {defi.progress < 50 ? "Continuez vos efforts!" : "Excellente progression!"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-secondary/20 border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center min-h-[180px] cursor-pointer hover:bg-secondary/30 transition-colors">
            <div className="bg-secondary rounded-full p-3 mb-4">
              <Plus className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-medium mb-2">Nouveau défi</h3>
            <p className="text-sm text-muted-foreground">Relevez un nouveau défi pour améliorer votre santé</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2">
            <span>Découvrir tous les défis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;
