import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizStepProps } from "./types";

const dietaryOptions = [
  "Régime végétarien",
  "Régime végétalien",
  "Régime sans gluten",
  "Régime sans lactose",
  "Régime paléo",
  "Régime cétogène (keto)",
  "Jeûne intermittent",
  "Alimentation intuitive",
  "Régime méditerranéen",
  "Aucun régime particulier"
];

// Interface pour les anciennes props
interface LegacyDietaryHabitsStepProps {
  data?: string[];
  updateData?: (data: string[]) => void;
}

// Accepter les deux interfaces de props
const DietaryHabitsStep = (props: QuizStepProps | LegacyDietaryHabitsStepProps) => {
  // Déterminer quelle interface est utilisée
  const isLegacyProps = 'data' in props;

  const toggleOption = (option: string) => {
    try {
      if (isLegacyProps) {
        // Utiliser l'interface legacy
        const { data = [], updateData } = props as LegacyDietaryHabitsStepProps;
        if (!updateData) return;

        if (data.includes(option)) {
          updateData(data.filter(item => item !== option));
        } else {
          updateData([...data, option]);
        }
      } else {
        // Utiliser l'interface QuizStepProps
        const { responses, updateResponse } = props as QuizStepProps;
        if (!updateResponse) return;

        const currentOptions = Array.isArray(responses?.dietaryHabits) ? [...responses.dietaryHabits] : [];

        if (currentOptions.includes(option)) {
          updateResponse(
            "dietaryHabits",
            currentOptions.filter(item => item !== option)
          );
        } else {
          updateResponse("dietaryHabits", [...currentOptions, option]);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des habitudes alimentaires:", error);
    }
  };

  return (
    <div>
      <p className="font-medium mb-4">Sélectionnez vos habitudes alimentaires :</p>
      <div className="grid md:grid-cols-2 gap-3">
        {dietaryOptions.map((option) => (
          <div 
            key={option}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              isLegacyProps 
                ? ((props as LegacyDietaryHabitsStepProps).data || []).includes(option)
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
                : Array.isArray((props as QuizStepProps).responses?.dietaryHabits) && 
                  (props as QuizStepProps).responses.dietaryHabits.includes(option)
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
            }`}
            onClick={() => toggleOption(option)}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  isLegacyProps 
                    ? ((props as LegacyDietaryHabitsStepProps).data || []).includes(option)
                    : Array.isArray((props as QuizStepProps).responses?.dietaryHabits) && 
                      (props as QuizStepProps).responses.dietaryHabits.includes(option)
                }
                onCheckedChange={() => toggleOption(option)}
                id={`diet-${option}`}
              />
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryHabitsStep;