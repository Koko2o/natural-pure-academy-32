
/**
 * Base de données des termes scientifiques pour le système de recommandation
 */

export interface ScientificTerm {
  id: string;
  title: string;
  description: string;
  category: string;
  relatedTerms?: string[];
}

export const scientificTerms: ScientificTerm[] = [
  {
    id: "vitamin-d",
    title: "Vitamine D",
    description: "Hormone stéroïde essentielle pour l'absorption du calcium, la fonction immunitaire et la santé osseuse.",
    category: "micronutriment",
    relatedTerms: ["calcium", "sunshine-vitamin"]
  },
  {
    id: "microbiome",
    title: "Microbiome intestinal",
    description: "Écosystème complexe de bactéries, virus et autres micro-organismes présents dans le tractus digestif humain.",
    category: "système-digestif",
    relatedTerms: ["probiotics", "prebiotics"]
  },
  {
    id: "probiotics",
    title: "Probiotiques",
    description: "Micro-organismes vivants qui, lorsqu'ils sont administrés en quantités adéquates, confèrent un bénéfice pour la santé.",
    category: "supplément",
    relatedTerms: ["gut-health", "microbiome"]
  },
  {
    id: "inflammation",
    title: "Inflammation chronique",
    description: "Réponse inflammatoire persistante de l'organisme qui peut contribuer à diverses maladies chroniques.",
    category: "processus-physiologique",
    relatedTerms: ["cytokines", "immune-system"]
  },
  {
    id: "antioxidant",
    title: "Antioxydants",
    description: "Substances qui peuvent neutraliser les radicaux libres et réduire les dommages oxydatifs dans les cellules.",
    category: "biochimie",
    relatedTerms: ["free-radicals", "oxidative-stress"]
  },
  {
    id: "circadian-rhythm",
    title: "Rythme circadien",
    description: "Horloge biologique interne qui régule les cycles de sommeil-éveil et de nombreux processus physiologiques sur une période de 24 heures.",
    category: "chronobiologie",
    relatedTerms: ["melatonin", "sleep-wake-cycle"]
  },
  {
    id: "cortisol",
    title: "Cortisol",
    description: "Hormone stéroïde produite par les glandes surrénales, impliquée dans la réponse au stress et la régulation du métabolisme.",
    category: "hormone",
    relatedTerms: ["stress-hormone", "hpa-axis"]
  },
  {
    id: "adaptogens",
    title: "Adaptogènes",
    description: "Substances naturelles qui aident l'organisme à s'adapter au stress et à retrouver l'équilibre.",
    category: "phytothérapie",
    relatedTerms: ["stress-response", "homeostasis"]
  },
  {
    id: "bioavailability",
    title: "Biodisponibilité",
    description: "Proportion d'un nutriment ou d'une substance qui est absorbée et utilisée par l'organisme.",
    category: "pharmacologie",
    relatedTerms: ["absorption", "metabolism"]
  },
  {
    id: "rda",
    title: "Apports journaliers recommandés",
    description: "Quantité moyenne quotidienne d'un nutriment nécessaire pour répondre aux besoins de la plupart des individus en bonne santé.",
    category: "nutrition",
    relatedTerms: ["dietary-reference-intakes", "nutritional-requirements"]
  }
];

export default scientificTerms;
