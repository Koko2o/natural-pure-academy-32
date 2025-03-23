
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPrompt from "@/components/profile/LoginPrompt";
import ReadingHistory from "@/components/profile/ReadingHistory";
import Challenges from "@/components/profile/Challenges";
import Recommendations from "@/components/profile/Recommendations";
import HealthSync from "@/components/profile/HealthSync";
import { mockProfileData } from "@/components/profile/ProfileData";
import { BookOpen, Trophy, Sparkles, Activity } from "lucide-react";

const ProfileSante = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPrompt onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Votre Profil Santé</h1>
          <p className="text-muted-foreground mb-6">
            Bienvenue sur votre tableau de bord personnel. Suivez vos progrès et découvrez des recommandations
            personnalisées basées sur vos activités.
          </p>
        </div>
        
        <Tabs defaultValue="history" className="space-y-8">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="history" className="flex items-center gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span>Historique</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2 py-3">
              <Trophy className="h-4 w-4" />
              <span>Défis</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3">
              <Sparkles className="h-4 w-4" />
              <span>Recommandations</span>
            </TabsTrigger>
            <TabsTrigger value="health-sync" className="flex items-center gap-2 py-3">
              <Activity className="h-4 w-4" />
              <span>Santé connectée</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="space-y-6 animate-fadeIn">
            <ReadingHistory articles={mockProfileData.articles} />
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-6 animate-fadeIn">
            <Challenges challenges={mockProfileData.defis} />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6 animate-fadeIn">
            <Recommendations recommendations={mockProfileData.recommendations} />
          </TabsContent>
          
          <TabsContent value="health-sync" className="space-y-6 animate-fadeIn">
            <HealthSync />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSante;
