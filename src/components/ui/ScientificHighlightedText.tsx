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
      parts.push({ type: 'text', text: text.substring(lastIndex, match.index) });
    }

    // Add the scientific term with tooltip
    const [, termId, displayText] = match;
    parts.push({ type: 'term', id: termId, text: displayText });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', text: text.substring(lastIndex) });
  }

  const termData = scientificTerms.reduce((acc, term) => ({ ...acc, [term.id]: term }), {});

  return (
    <React.Fragment>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.text}</span>;
        } else {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <span 
                  className="font-medium text-primary underline decoration-dotted underline-offset-4 cursor-help"
                >
                  {part.text}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">{termData[part.id]?.title || part.id}</h4>
                  <p className="text-sm">{termData[part.id]?.definition || "Définition non disponible"}</p>
                  {termData[part.id]?.source && (
                    <p className="text-xs text-muted-foreground italic">
                      Source: {termData[part.id].source}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ScientificHighlightedText;