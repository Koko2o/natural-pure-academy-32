
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface NutritionalQuizProps {
  onComplete: (responses: Record<string, any>) => void;
  onUserInfoUpdate: (info: {name: string, email: string}) => void;
}

const NutritionalQuiz = ({ onComplete, onUserInfoUpdate }: NutritionalQuizProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({
    name: "",
    email: "",
    objectives: [],
    dietaryHabits: "",
    meatConsumption: "",
    fishConsumption: "",
    fruitVegConsumption: "",
    exerciseFrequency: "",
    sleepQuality: "",
    stressLevel: "",
    symptoms: [],
  });

  // Définition des étapes du quiz
  const quizSteps = [
    {
      id: "userInfo",
      title: "Pour commencer",
      description: "Parlez-nous un peu de vous",
    },
    {
      id: "objectives",
      title: "Vos objectifs",
      description: "Qu'aimeriez-vous améliorer ?",
    },
    {
      id: "dietaryHabits",
      title: "Votre alimentation",
      description: "Comment décririez-vous vos habitudes alimentaires ?",
    },
    {
      id: "proteinConsumption",
      title: "Consommation de protéines",
      description: "À quelle fréquence consommez-vous ces aliments ?",
    },
    {
      id: "lifestyle",
      title: "Votre mode de vie",
      description: "Parlons de vos habitudes quotidiennes",
    },
    {
      id: "symptoms",
      title: "Symptômes actuels",
      description: "Ressentez-vous l'un de ces symptômes ?",
    },
  ];

  const handleNext = () => {
    // Validation basique selon l'étape
    if (currentStepIndex === 0 && (!responses.name || !responses.email)) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (currentStepIndex === 1 && (!responses.objectives || responses.objectives.length === 0)) {
      toast.error("Veuillez sélectionner au moins un objectif");
      return;
    }

    if (currentStepIndex === 0) {
      onUserInfoUpdate({
        name: responses.name,
        email: responses.email
      });
    }

    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const updateResponse = (field: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleObjective = (objective: string) => {
    const currentObjectives = [...(responses.objectives || [])];
    if (currentObjectives.includes(objective)) {
      updateResponse(
        "objectives",
        currentObjectives.filter((obj) => obj !== objective)
      );
    } else {
      updateResponse("objectives", [...currentObjectives, objective]);
    }
  };

  const toggleSymptom = (symptom: string) => {
    const currentSymptoms = [...(responses.symptoms || [])];
    if (currentSymptoms.includes(symptom)) {
      updateResponse(
        "symptoms",
        currentSymptoms.filter((sym) => sym !== symptom)
      );
    } else {
      updateResponse("symptoms", [...currentSymptoms, symptom]);
    }
  };

  const progress = ((currentStepIndex + 1) / quizSteps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Étape {currentStepIndex + 1} sur {quizSteps.length}</span>
          <span>{Math.round(progress)}% complété</span>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">
            {quizSteps[currentStepIndex].title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {quizSteps[currentStepIndex].description}
          </p>

          {currentStepIndex === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Votre prénom</Label>
                <Input
                  id="name"
                  value={responses.name}
                  onChange={(e) => updateResponse("name", e.target.value)}
                  placeholder="Prénom"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Votre email</Label>
                <Input
                  id="email"
                  type="email"
                  value={responses.email}
                  onChange={(e) => updateResponse("email", e.target.value)}
                  placeholder="email@exemple.com"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Nous utiliserons cette adresse pour vous envoyer vos résultats
                </p>
              </div>
            </div>
          )}

          {currentStepIndex === 1 && (
            <div className="space-y-3">
              <p className="font-medium mb-2">Sélectionnez vos objectifs (plusieurs choix possibles)</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Plus d'énergie",
                  "Meilleur sommeil",
                  "Améliorer ma concentration",
                  "Renforcer mon immunité",
                  "Réduire mon stress",
                  "Soutenir ma digestion",
                  "Améliorer ma peau",
                  "Équilibrer mon poids",
                ].map((objective) => (
                  <div 
                    key={objective}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      responses.objectives?.includes(objective) 
                        ? "border-primary bg-primary/5" 
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => toggleObjective(objective)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={responses.objectives?.includes(objective)}
                        onCheckedChange={() => toggleObjective(objective)}
                        id={`objective-${objective}`}
                      />
                      <label 
                        htmlFor={`objective-${objective}`}
                        className="cursor-pointer flex-grow"
                      >
                        {objective}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStepIndex === 2 && (
            <div>
              <p className="font-medium mb-4">Quel régime alimentaire suivez-vous ?</p>
              <RadioGroup
                value={responses.dietaryHabits}
                onValueChange={(value) => updateResponse("dietaryHabits", value)}
                className="space-y-3"
              >
                {[
                  { value: "omnivore", label: "Omnivore (je mange de tout)" },
                  { value: "flexitarian", label: "Flexitarien (je limite ma consommation de viande)" },
                  { value: "pescatarian", label: "Pescetarien (je mange du poisson mais pas de viande)" },
                  { value: "vegetarian", label: "Végétarien (pas de viande ni poisson)" },
                  { value: "vegan", label: "Végan (aucun produit animal)" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStepIndex === 3 && (
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-3">À quelle fréquence consommez-vous de la viande ?</p>
                <RadioGroup
                  value={responses.meatConsumption}
                  onValueChange={(value) => updateResponse("meatConsumption", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "daily", label: "Quotidiennement" },
                    { value: "weekly", label: "Plusieurs fois par semaine" },
                    { value: "monthly", label: "Quelques fois par mois" },
                    { value: "rarely", label: "Rarement ou jamais" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`meat-${option.value}`} />
                      <Label htmlFor={`meat-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-3">À quelle fréquence consommez-vous du poisson ou des fruits de mer ?</p>
                <RadioGroup
                  value={responses.fishConsumption}
                  onValueChange={(value) => updateResponse("fishConsumption", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "daily", label: "Quotidiennement" },
                    { value: "weekly", label: "Plusieurs fois par semaine" },
                    { value: "monthly", label: "Quelques fois par mois" },
                    { value: "rarely", label: "Rarement ou jamais" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`fish-${option.value}`} />
                      <Label htmlFor={`fish-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-3">Combien de portions de fruits et légumes consommez-vous par jour ?</p>
                <RadioGroup
                  value={responses.fruitVegConsumption}
                  onValueChange={(value) => updateResponse("fruitVegConsumption", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "0-1", label: "0 à 1 portion" },
                    { value: "2-3", label: "2 à 3 portions" },
                    { value: "4-5", label: "4 à 5 portions" },
                    { value: "6+", label: "6 portions ou plus" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`fruitveg-${option.value}`} />
                      <Label htmlFor={`fruitveg-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStepIndex === 4 && (
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-3">À quelle fréquence pratiquez-vous une activité physique ?</p>
                <RadioGroup
                  value={responses.exerciseFrequency}
                  onValueChange={(value) => updateResponse("exerciseFrequency", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "daily", label: "Quotidiennement" },
                    { value: "weekly", label: "2-3 fois par semaine" },
                    { value: "monthly", label: "Quelques fois par mois" },
                    { value: "rarely", label: "Rarement ou jamais" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`exercise-${option.value}`} />
                      <Label htmlFor={`exercise-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-3">Comment évaluez-vous la qualité de votre sommeil ?</p>
                <RadioGroup
                  value={responses.sleepQuality}
                  onValueChange={(value) => updateResponse("sleepQuality", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "excellent", label: "Excellent - Je me réveille frais et dispos" },
                    { value: "good", label: "Bon - Quelques difficultés occasionnelles" },
                    { value: "average", label: "Moyen - Difficultés fréquentes (endormissement, réveils)" },
                    { value: "poor", label: "Mauvais - Problèmes chroniques de sommeil" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`sleep-${option.value}`} />
                      <Label htmlFor={`sleep-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-3">Comment évaluez-vous votre niveau de stress ?</p>
                <RadioGroup
                  value={responses.stressLevel}
                  onValueChange={(value) => updateResponse("stressLevel", value)}
                  className="space-y-3"
                >
                  {[
                    { value: "low", label: "Faible - Je me sens généralement détendu" },
                    { value: "moderate", label: "Modéré - Stress occasionnel" },
                    { value: "high", label: "Élevé - Stress fréquent" },
                    { value: "severe", label: "Sévère - Stress chronique" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`stress-${option.value}`} />
                      <Label htmlFor={`stress-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStepIndex === 5 && (
            <div>
              <p className="font-medium mb-4">Sélectionnez les symptômes que vous ressentez fréquemment :</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Fatigue",
                  "Troubles du sommeil",
                  "Stress/Anxiété",
                  "Problèmes digestifs",
                  "Douleurs articulaires",
                  "Problèmes de peau",
                  "Maux de tête",
                  "Sautes d'humeur",
                  "Fringales",
                  "Manque de concentration",
                  "Sensibilité au froid",
                  "Cheveux/Ongles fragiles",
                ].map((symptom) => (
                  <div 
                    key={symptom}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      responses.symptoms?.includes(symptom) 
                        ? "border-primary bg-primary/5" 
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={responses.symptoms?.includes(symptom)}
                        onCheckedChange={() => toggleSymptom(symptom)}
                        id={`symptom-${symptom}`}
                      />
                      <label 
                        htmlFor={`symptom-${symptom}`}
                        className="cursor-pointer flex-grow"
                      >
                        {symptom}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          Précédent
        </Button>
        <Button onClick={handleNext}>
          {currentStepIndex < quizSteps.length - 1 ? "Continuer" : "Voir mes résultats"}
        </Button>
      </div>
    </div>
  );
};

export default NutritionalQuiz;
