
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "./types";
import { Trophy, Plus, ArrowRight, Flame, Award, Target } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface ChallengesProps {
  challenges: Challenge[];
}

const Challenges = ({ challenges }: ChallengesProps) => {
  const { t } = useLanguage();

  const getChallengeIcon = (name: string) => {
    if (name.includes(t('hydration', 'Hydratation'))) return <Flame className="h-5 w-5 text-blue-500" />;
    if (name.includes(t('diet', 'Alimentation'))) return <Award className="h-5 w-5 text-green-500" />;
    return <Target className="h-5 w-5 text-indigo-500" />;
  };

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-indigo-600" />
          <CardTitle className="text-indigo-700">{t('your_challenges', 'Vos défis en cours')}</CardTitle>
        </div>
        <CardDescription>
          {t('challenge_description', 'Suivez votre progression et relevez de nouveaux défis pour améliorer votre santé')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((defi) => (
            <div 
              key={defi.id} 
              className="bg-white border rounded-lg p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-indigo-50">
                    {getChallengeIcon(defi.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{defi.name}</h3>
                    <Badge variant="outline" className="bg-primary/5 mt-1">
                      {defi.days} {t('days', 'jours')}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between text-sm">
                  <span>{t('progress', 'Progression')}</span>
                  <span className="font-medium">{defi.progress}%</span>
                </div>
                <Progress value={defi.progress} className="h-2" />
                <p className="text-sm text-gray-600">{defi.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {t('started_on', 'Démarré le')} {defi.startDate}
                  </span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                    {t('view_details', 'Voir détails')} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center">
            <div className="p-3 rounded-full bg-indigo-50 mb-3">
              <Plus className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('add_new_challenge', 'Ajouter un nouveau défi')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('challenge_invitation', 'Relevez un nouveau défi pour continuer à améliorer votre santé')}
            </p>
            <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              {t('explore_challenges', 'Explorer les défis')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;
