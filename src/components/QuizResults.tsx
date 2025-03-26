import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  HelpCircle,
  Info,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuizResponse } from "./quiz/types";

interface Recommendation {
  title: string;
  description: string;
  url: string;
  confidence: number;
}

interface QuizResultsProps {
  responses: QuizResponse;
  onRestart: () => void;
}

const QuizResults = ({ responses, onRestart }: QuizResultsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des recommandations
    setTimeout(() => {
      setRecommendations([
        {
          title: "Complexe Multivitamines Premium",
          description:
            "Formule complète pour soutenir votre énergie et votre bien-être général.",
          url: "https://example.com/multivitamines",
          confidence: 0.95,
        },
        {
          title: "Magnésium Marin Fortifié",
          description:
            "Aide à réduire la fatigue et favorise la relaxation musculaire.",
          url: "https://example.com/magnesium",
          confidence: 0.88,
        },
        {
          title: "Probiotiques Avancés",
          description:
            "Soutient la santé intestinale et renforce votre système immunitaire.",
          url: "https://example.com/probiotiques",
          confidence: 0.75,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, [responses]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <Sparkles className="h-10 w-10 inline-block animate-spin mb-4 text-amber-500" />
        <p className="text-lg font-semibold">
          Analyse de vos réponses et préparation de vos recommandations
          personnalisées...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          (Cela peut prendre quelques secondes)
        </p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-8">
        <HelpCircle className="h-10 w-10 inline-block mb-4 text-gray-400" />
        <p className="text-lg font-semibold">
          Aucune recommandation trouvée pour le moment.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Veuillez réessayer plus tard ou contacter notre support.
        </p>
        <Button onClick={onRestart} className="mt-4">
          Refaire le Quiz
        </Button>
      </div>
    );
  }

  // Trouver la recommandation principale (celle avec la plus haute confiance)
  const primaryRecommendation = recommendations.reduce((prev, current) =>
    prev.confidence > current.confidence ? prev : current
  );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Vos Recommandations Personnalisées
            </h2>
            <p className="text-gray-500">
              Basé sur vos réponses au questionnaire.
            </p>
          </div>
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">
            Recommandation Principale
          </h3>
          <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50">
            <h4 className="font-semibold text-lg text-indigo-900">
              {primaryRecommendation.title}
            </h4>
            <p className="text-gray-700">{primaryRecommendation.description}</p>
            <div className="flex items-center mt-2 text-sm text-indigo-600">
              <Info className="h-4 w-4 mr-1" />
              Confiance: {(primaryRecommendation.confidence * 100).toFixed(0)}%
            </div>
            {/* Change the variant from "cta" to "natural" */}
            <Button
              size="lg"
              variant="natural"
              className="w-full pulse-animation flex items-center justify-center gap-2 mt-4"
              onClick={() => (window.location.href = primaryRecommendation.url)}
            >
              <ShoppingCart className="h-5 w-5" />
              Découvrir votre solution
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Autres Recommandations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations
              .filter((rec) => rec !== primaryRecommendation)
              .map((rec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-blue-200 bg-blue-50"
                >
                  <h4 className="font-semibold text-lg text-blue-900">
                    {rec.title}
                  </h4>
                  <p className="text-gray-700">{rec.description}</p>
                  <div className="flex items-center mt-2 text-sm text-blue-600">
                    <Info className="h-4 w-4 mr-1" />
                    Confiance: {(rec.confidence * 100).toFixed(0)}%
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => (window.location.href = rec.url)}
                  >
                    En savoir plus
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <Button onClick={onRestart} className="mt-8 w-full">
          Refaire le Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
