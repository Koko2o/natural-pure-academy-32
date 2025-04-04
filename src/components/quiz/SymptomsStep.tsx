import { Checkbox } from "@/components/ui/checkbox";
import { QuizStepProps } from "./types";

const symptoms = [
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
];

// Accepter soit les props QuizStepProps, soit les props legacy { data, updateData }
interface LegacyProps {
  data?: string[];
  updateData?: (data: string[]) => void;
}

const SymptomsStep = (props: QuizStepProps | LegacyProps) => {
  // Détecter quelle interface est utilisée
  const isLegacyProps = 'data' in props;
  
  const toggleSymptom = (symptom: string) => {
    try {
      if (isLegacyProps) {
        // Utiliser l'interface legacy
        const { data = [], updateData } = props as LegacyProps;
        if (!updateData) return;
        
        const currentSymptoms = [...data];
        if (currentSymptoms.includes(symptom)) {
          updateData(currentSymptoms.filter(sym => sym !== symptom));
        } else {
          updateData([...currentSymptoms, symptom]);
        }
      } else {
        // Utiliser l'interface QuizStepProps
        const { responses, updateResponse } = props as QuizStepProps;
        if (!updateResponse) return;
        
        const currentSymptoms = Array.isArray(responses?.symptoms) ? [...responses.symptoms] : [];
        
        if (currentSymptoms.includes(symptom)) {
          updateResponse(
            "symptoms",
            currentSymptoms.filter((sym) => sym !== symptom)
          );
        } else {
          updateResponse("symptoms", [...currentSymptoms, symptom]);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des symptômes:", error);
    }
  };

  return (
    <div>
      <p className="font-medium mb-4">Sélectionnez les symptômes que vous ressentez fréquemment :</p>
      <div className="grid md:grid-cols-2 gap-3">
        {symptoms.map((symptom) => (
          <div 
            key={symptom}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              isLegacyProps 
                ? ((props as LegacyProps).data || []).includes(symptom) 
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
                : Array.isArray((props as QuizStepProps).responses?.symptoms) && 
                  (props as QuizStepProps).responses.symptoms.includes(symptom)
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
            }`}
            onClick={() => toggleSymptom(symptom)}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={
                  isLegacyProps 
                    ? ((props as LegacyProps).data || []).includes(symptom)
                    : Array.isArray((props as QuizStepProps).responses?.symptoms) && 
                      (props as QuizStepProps).responses.symptoms.includes(symptom)
                }
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
  );
};

export default SymptomsStep;