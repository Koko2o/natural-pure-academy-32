
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScientificHighlightedTextProps {
  text: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Composant qui met en évidence des termes scientifiques dans un texte
 * et affiche des tooltips explicatifs sur ces termes
 */
const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  tooltipPlacement = 'top' 
}) => {
  // Détection de patterns comme [[keyword:texte]] dans le texte
  const renderTextWithHighlights = () => {
    // Si pas de texte, retourner null
    if (!text) return null;

    // Regex pour trouver les patterns [[keyword:texte]]
    const regex = /\[\[([\w-]+):([\w\s\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ'',.()]+)\]\]/g;
    
    // Séparation du texte en segments (texte normal et texte surligné)
    const segments = [];
    let lastIndex = 0;
    let match;

    // Pour chaque pattern trouvé
    while ((match = regex.exec(text)) !== null) {
      // Ajouter le texte avant le pattern
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      // Ajouter le pattern avec son keyword et son texte
      segments.push({
        type: 'highlight',
        keyword: match[1],
        content: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    // Ajouter le reste du texte après le dernier pattern
    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    // Mapping des keywords à leurs explications
    const explanations: Record<string, string> = {
      'nutrigenomics': 'La nutrigénomique étudie comment les aliments affectent l\'expression de nos gènes, permettant une nutrition personnalisée basée sur notre profil génétique.',
      'micronutrient-balance': 'L\'équilibre des micronutriments est crucial pour optimiser les fonctions cellulaires et les processus biochimiques dans l\'organisme.',
      'research-methodology': 'Notre méthodologie combine des analyses de biomarqueurs, études cliniques et modèles prédictifs pour formuler des recommandations personnalisées.',
      'cortisol-levels': 'Les niveaux de cortisol affectent la gestion du stress, l\'immunité et le métabolisme. Des niveaux équilibrés sont essentiels pour une santé optimale.',
      'side-effects': 'Contrairement aux médicaments synthétiques, nos approches nutritionnelles ciblent les voies naturelles sans perturber d\'autres systèmes biologiques.',
      'clinical-studies': 'Nos recommandations sont basées sur des études cliniques publiées dans des revues scientifiques à comité de lecture.',
      'bioavailability': 'La biodisponibilité mesure l\'efficacité avec laquelle une substance est absorbée et utilisée par l\'organisme.',
      'synergistic-effect': 'L\'effet synergique se produit lorsque des composés combinés produisent un effet supérieur à la somme de leurs effets individuels.'
    };

    // Rendu du texte avec tooltips sur les mots surlignés
    return segments.map((segment, index) => {
      if (segment.type === 'text') {
        return <React.Fragment key={index}>{segment.content}</React.Fragment>;
      } else {
        const explanation = explanations[segment.keyword] || 'Information scientifique';
        
        return (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <span className="bg-primary/10 text-primary px-1 rounded cursor-help border-b border-dashed border-primary/40">
                  {segment.content}
                </span>
              </TooltipTrigger>
              <TooltipContent side={tooltipPlacement} className="max-w-xs">
                <p className="text-sm">{explanation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    });
  };

  return <>{renderTextWithHighlights()}</>;
};

export default ScientificHighlightedText;
