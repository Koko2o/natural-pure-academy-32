import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  GraduationCap,
  Users as UsersIcon 
} from "lucide-react";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  citationCount: number;
  impactFactor: number;
  type: 'etude' | 'revue' | 'meta-analyse';
}

interface ScientificPublicationsProps {
  limit?: number;
  showCta?: boolean;
}

const publications: Publication[] = [
  {
    title: "Impact of micronutrient supplementation on cognitive function in adults",
    authors: "Dubois, M., Martin, S., et al.",
    journal: "Journal of Nutritional Biochemistry",
    year: 2023,
    citationCount: 42,
    impactFactor: 4.2,
    type: 'etude'
  },
  {
    title: "Effects of magnesium supplementation on stress and sleep quality: a randomized clinical trial",
    authors: "Lefèvre, C., Bertrand, P., et al.",
    journal: "European Journal of Nutrition",
    year: 2022,
    citationCount: 56,
    impactFactor: 3.9,
    type: 'etude'
  },
  {
    title: "The role of adaptogenic herbs in stress management: a systematic review",
    authors: "Chen, L., Moreau, R., et al.",
    journal: "Phytomedicine",
    year: 2023,
    citationCount: 31,
    impactFactor: 5.3,
    type: 'revue'
  },
  {
    title: "Meta-analysis of vitamin D supplementation effects on inflammatory markers",
    authors: "Garcia, J., Blanc, T., et al.",
    journal: "American Journal of Clinical Nutrition",
    year: 2021,
    citationCount: 79,
    impactFactor: 7.0,
    type: 'meta-analyse'
  },
  {
    title: "Bioavailability of different magnesium formulations: a comparative study",
    authors: "Rousseau, A., Petit, V., et al.",
    journal: "Nutrients",
    year: 2023,
    citationCount: 24,
    impactFactor: 5.6,
    type: 'etude'
  },
  {
    title: "Nutritional approaches for cognitive enhancement: evidence from clinical trials",
    authors: "Wang, H., Dupont, S., et al.",
    journal: "Frontiers in Nutrition",
    year: 2022,
    citationCount: 38,
    impactFactor: 6.2,
    type: 'revue'
  }
];

const ScientificPublications: React.FC<ScientificPublicationsProps> = ({ 
  limit = 3,
  showCta = true 
}) => {
  // Afficher seulement le nombre demandé de publications
  const displayedPublications = publications.slice(0, limit);

  const getTypeIcon = (type: Publication['type']) => {
    switch (type) {
      case 'etude':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'revue':
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'meta-analyse':
        return <GraduationCap className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: Publication['type']) => {
    switch (type) {
      case 'etude':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Étude clinique</Badge>;
      case 'revue':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Revue systématique</Badge>;
      case 'meta-analyse':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Méta-analyse</Badge>;
      default:
        return <Badge variant="outline">Publication</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {displayedPublications.map((publication, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                {getTypeBadge(publication.type)}
                <div className="flex items-center text-sm text-gray-500">
                  <UsersIcon className="h-3.5 w-3.5 mr-1" />
                  <span>{publication.citationCount} citations</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg">{publication.title}</h3>

              <div className="flex flex-col gap-2 text-sm">
                <div className="text-gray-700">
                  {publication.authors}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-indigo-700 font-medium">
                    {publication.journal} ({publication.year})
                  </div>
                  <div className="text-gray-600">
                    Impact: {publication.impactFactor.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {showCta && (
        <div className="text-center mt-6">
          <a href="/nos-recherches" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            Voir toutes nos publications scientifiques
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default ScientificPublications;