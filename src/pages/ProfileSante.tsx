
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPrompt from "@/components/profile/LoginPrompt";
import ReadingHistory from "@/components/profile/ReadingHistory";
import Challenges from "@/components/profile/Challenges";
import Recommendations from "@/components/profile/Recommendations";
import HealthSync from "@/components/profile/HealthSync";
import { mockProfileData } from "@/components/profile/ProfileData";

const ProfileSante = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPrompt onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Votre Profil Santé</h1>
      <p className="text-muted-foreground mb-8">
        Bienvenue sur votre tableau de bord personnel. Suivez vos progrès et découvrez des recommandations
        personnalisées basées sur vos activités.
      </p>
      
      <Tabs defaultValue="history">
        <TabsList className="mb-6">
          <TabsTrigger value="history">Historique de lecture</TabsTrigger>
          <TabsTrigger value="challenges">Vos défis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          <TabsTrigger value="health-sync">Santé connectée</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <ReadingHistory articles={mockProfileData.articles} />
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <Challenges challenges={mockProfileData.defis} />
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Recommendations recommendations={mockProfileData.recommendations} />
        </TabsContent>
        
        <TabsContent value="health-sync" className="space-y-4">
          <HealthSync />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSante;
