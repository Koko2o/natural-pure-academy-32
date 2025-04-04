import React from "react";
import { QuizStepProps } from "./types";

interface ObjectivesStepProps {
  data?: string[];
  updateData?: (data: string[]) => void;
}

// Accepter les deux interfaces de props
const ObjectivesStep = (props: QuizStepProps | ObjectivesStepProps) => {
  // Déterminer quelle interface est utilisée
  const isLegacyProps = 'data' in props;

  // Pour le débogage
  console.log("ObjectivesStep props:", JSON.stringify(props, null, 2));

  const objectives = [
    "Plus d'énergie",
    "Meilleur sommeil",
    "Améliorer ma concentration",
    "Renforcer mon immunité",
    "Réduire mon stress",
    "Soutenir ma digestion",
    "Améliorer ma peau",
    "Équilibrer mon poids",
  ];

  const toggleObjective = (objective: string) => {
    const currentObjectives = [...(isLegacyProps ? props.data : props.responses.objectives || [])];
    if (currentObjectives.includes(objective)) {
      if (isLegacyProps) {
        props.updateData?.(currentObjectives.filter((obj) => obj !== objective));
      } else {
        props.updateResponse("objectives", currentObjectives.filter((obj) => obj !== objective));
      }
    } else {
      if (isLegacyProps) {
        props.updateData?.([...currentObjectives, objective]);
      } else {
        props.updateResponse("objectives", [...currentObjectives, objective]);
      }
    }
  };

  return (
    <div className="space-y-3">
      <p className="font-medium mb-2">Sélectionnez vos objectifs (plusieurs choix possibles)</p>
      <div className="grid md:grid-cols-2 gap-3">
        {objectives.map((objective) => (
          <div
            key={objective}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              (isLegacyProps ? props.data?.includes(objective) : props.responses.objectives?.includes(objective))
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => toggleObjective(objective)}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={isLegacyProps ? props.data?.includes(objective) : props.responses.objectives?.includes(objective)}
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
  );
};

export default ObjectivesStep;