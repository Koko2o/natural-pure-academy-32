import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizStepProps } from "./types";

// Interface pour les anciennes props
interface LegacyProteinConsumptionStepProps {
  data?: string;
  updateData?: (data: string) => void;
}

const proteinOptions = [
  { value: "high", label: "Élevée - Viande ou poisson à chaque repas principal" },
  { value: "moderate", label: "Modérée - Viande ou poisson plusieurs fois par semaine" },
  { value: "low", label: "Faible - Peu de viande ou poisson, alimentation plutôt végétale" },
  { value: "vegan", label: "Je suis végétarien/végétalien" }
];

const ProteinConsumptionStep = (props: QuizStepProps | LegacyProteinConsumptionStepProps) => {
  // Déterminer quelle interface est utilisée
  const isLegacyProps = 'data' in props;

  // Pour le débogage
  console.log("ProteinConsumptionStep props:", JSON.stringify(props, null, 2));

  const handleChange = (value: string) => {
    if (isLegacyProps) {
      // Utiliser l'interface LegacyProteinConsumptionStepProps
      const { updateData } = props as LegacyProteinConsumptionStepProps;
      if (updateData) {
        updateData(value);
      }
    } else {
      // Utiliser l'interface QuizStepProps
      const { updateResponse } = props as QuizStepProps;
      if (updateResponse) {
        updateResponse("proteinConsumption", value);
      }
    }
  };

  // Déterminer la valeur actuelle
  const currentValue = isLegacyProps 
    ? (props as LegacyProteinConsumptionStepProps).data || ""
    : (props as QuizStepProps).responses?.proteinConsumption || "";

  return (
    <div>
      <p className="font-medium mb-3">Quelle est votre consommation habituelle de protéines animales ?</p>
      <RadioGroup
        value={currentValue}
        onValueChange={handleChange}
        className="space-y-3"
      >
        {proteinOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`protein-${option.value}`} />
            <Label htmlFor={`protein-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ProteinConsumptionStep;