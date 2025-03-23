
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HealthSync = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connectez vos données de santé</CardTitle>
        <CardDescription>Synchronisez vos applications de santé pour des recommandations encore plus pertinentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <h3 className="text-lg font-semibold mb-2">Apple Health</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Connectez vos données Apple Health pour un suivi intégré de vos activités quotidiennes
            </p>
            <Button variant="outline">Connecter</Button>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 15v2"/><path d="M10 14v1a2 2 0 1 0 4 0v-1"/></svg>
            <h3 className="text-lg font-semibold mb-2">Google Fit</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Importez vos données Google Fit pour recevoir des recommandations nutritionnelles adaptées
            </p>
            <Button variant="outline">Connecter</Button>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-center">
            La connexion avec les services de santé vous permettra de recevoir des conseils hyper-personnalisés 
            basés sur votre activité physique, votre sommeil et d'autres métriques de santé.
            <br />
            <span className="text-muted-foreground">
              Note: Cette fonctionnalité sera pleinement opérationnelle dans la prochaine mise à jour.
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSync;
