
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizStepProps } from "./types";

const objectiveOptions = [
  "Perte de poids",
  "Gain de masse musculaire",
  "Amélioration des performances sportives",
  "Optimisation du sommeil",
  "Réduction du stress",
  "Amélioration de la digestion",
  "Renforcement du système immunitaire",
  "Augmentation de l'énergie",
  "Amélioration de la concentration"
];

// Interface pour les props héritées
interface LegacyObjectivesStepProps {
  data?: any[];
  updateData?: (data: any[]) => void;
}

const ObjectivesStep = (props: QuizStepProps | LegacyObjectivesStepProps) => {
  // Déterminer quelle interface est utilisée
  const isLegacyProps = 'data' in props;

  // Pour le débogage
  console.log("ObjectivesStep props:", JSON.stringify(props, null, 2));

  const toggleOption = (option: string) => {
    try {
      if (isLegacyProps) {
        // Utiliser l'interface LegacyObjectivesStepProps
        const { data = [], updateData } = props as LegacyObjectivesStepProps;
        if (!updateData) return;

        const updatedOptions = [...data];
        if (updatedOptions.includes(option)) {
          updateData(updatedOptions.filter(item => item !== option));
        } else {
          updateData([...updatedOptions, option]);
        }
      } else {
        // Utiliser l'interface QuizStepProps
        const { responses = {}, updateResponse } = props as QuizStepProps;
        if (!updateResponse) return;

        // S'assurer que responses.objectives existe et est un tableau
        const currentOptions = Array.isArray(responses?.objectives) 
          ? [...responses.objectives] 
          : (responses?.objectives ? [responses.objectives] : []);

        if (currentOptions.includes(option)) {
          updateResponse(
            "objectives", 
            currentOptions.filter(item => item !== option)
          );
        } else {
          updateResponse("objectives", [...currentOptions, option]);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des objectifs:", error);
    }
  };

  return (
    <div>
      <p className="font-medium mb-4">Sélectionnez vos objectifs de santé principaux :</p>
      <div className="grid md:grid-cols-2 gap-3">
        {objectiveOptions.map((option) => (
          <div 
            key={option}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              isLegacyProps 
                ? ((props as LegacyObjectivesStepProps).data || []).includes(option)
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
                : Array.isArray((props as QuizStepProps).responses?.objectives) && 
                  (props as QuizStepProps).responses.objectives.includes(option)
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
            }`}
            onClick={() => toggleOption(option)}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  isLegacyProps 
                    ? ((props as LegacyObjectivesStepProps).data || []).includes(option)
                    : Array.isArray((props as QuizStepProps).responses?.objectives) 
                      ? (props as QuizStepProps).responses.objectives.includes(option)
                      : false
                }
                onCheckedChange={() => toggleOption(option)}
                id={`objective-${option}`}
              />
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectivesStep;
