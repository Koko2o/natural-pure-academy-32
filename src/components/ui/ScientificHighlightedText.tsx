import React from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip" // Assumed import

interface ScientificTermTooltip {
  id: string;
  title: string;
  definition: string;
  source?: string;
}

// Sample scientific terms database (in a real app, this would come from an API or central data store)
const scientificTerms: ScientificTermTooltip[] = [
  {
    id: "cortisol",
    title: "Cortisol",
    definition: "Hormone du stress produite par les glandes surrénales qui régule le métabolisme et la réponse immunitaire.",
    source: "Journal of Endocrinology, 2020"
  },
  {
    id: "circadian-rhythm",
    title: "Rythme Circadien",
    definition: "Cycle biologique de 24 heures qui régule de nombreuses fonctions physiologiques, dont le sommeil et le métabolisme.",
    source: "Nature Reviews Neuroscience, 2019"
  },
  {
    id: "microbiome",
    title: "Microbiome",
    definition: "Ensemble des micro-organismes (bactéries, virus, champignons) vivant dans notre système digestif.",
    source: "Cell Host & Microbe, 2021"
  },
  {
    id: "antioxidants",
    title: "Antioxydants",
    definition: "Molécules qui neutralisent les radicaux libres nocifs et réduisent le stress oxydatif cellulaire.",
    source: "Biochemical Journal, 2021"
  },
  {
    id: "research-methodology",
    title: "Méthodologie de Recherche",
    definition: "Approche scientifique développée par notre laboratoire combinant analyse comportementale, biomarqueurs et données nutritionnelles.",
    source: "Journal of Nutritional Science, 2022"
  }
];

interface ScientificHighlightedTextProps {
  text: string;
  className?: string; // Added className prop
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text, className }) => {
  // Regex to match patterns like [[cortisol:stress chronique]]
  const scientificTermRegex = /\[\[([\w-]+):(.*?)\]\]/g;

  // Split the text into parts: normal text and scientific terms
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = scientificTermRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the scientific term with tooltip
    const [, termId, displayText] = match;
    parts.push(
      <Tooltip key={`term-${termId}-${match.index}`}>
        <TooltipTrigger asChild>
          <span className="relative px-0.5 font-medium text-natural-900 bg-gradient-to-br from-indigo-50 to-teal-50 rounded">
            {displayText}
            <div className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 to-teal-400"></div>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <h4 className="font-semibold">{displayText}</h4>
            <p className="text-sm text-muted-foreground">
              Information scientifique sur {termId}.
            </p>
            <div className="text-xs text-right text-muted-foreground">
              Source: Journal of Nutrition, 2023
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
};

export default ScientificHighlightedText;