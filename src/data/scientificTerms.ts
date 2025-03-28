
export interface ScientificTerm {
  id: string;
  title: string;
  definition: string;
  source?: string;
  categories: string[];
}

export const scientificTerms: ScientificTerm[] = [
  {
    id: "vitamin-d",
    title: "Vitamine D",
    definition: "Nutriment essentiel qui aide l'organisme à absorber le calcium et à maintenir des os solides. Elle joue également un rôle crucial dans la régulation du système immunitaire et la prévention de certaines maladies.",
    source: "Journal of Nutritional Science, 2021",
    categories: ["nutrition", "immunité"]
  },
  {
    id: "microbiome",
    title: "Microbiome intestinal",
    definition: "Ensemble des micro-organismes qui peuplent l'intestin humain, comprenant plus de 1000 espèces bactériennes différentes. Il joue un rôle crucial dans la digestion, l'immunité et même la santé mentale.",
    source: "Nature Reviews Microbiology, 2022",
    categories: ["digestion", "immunité"]
  },
  {
    id: "inflammation",
    title: "Inflammation chronique",
    definition: "Réaction inflammatoire prolongée du système immunitaire qui peut endommager les tissus sains. Contrairement à l'inflammation aiguë, elle persiste pendant des mois ou des années et est associée à de nombreuses maladies chroniques.",
    source: "Journal of Clinical Investigation, 2020",
    categories: ["immunité", "maladie"]
  },
  {
    id: "antioxidant",
    title: "Antioxydants",
    definition: "Molécules qui neutralisent les radicaux libres dans l'organisme, réduisant ainsi le stress oxydatif et les dommages cellulaires. On les trouve naturellement dans de nombreux fruits, légumes et certains compléments alimentaires.",
    source: "Free Radical Biology and Medicine, 2022",
    categories: ["nutrition", "biochimie"]
  },
  {
    id: "probiotics",
    title: "Probiotiques",
    definition: "Micro-organismes vivants qui, lorsqu'ils sont administrés en quantités adéquates, confèrent un bénéfice pour la santé de l'hôte. Ils contribuent à l'équilibre de la flore intestinale et renforcent le système immunitaire.",
    source: "International Journal of Molecular Sciences, 2023",
    categories: ["nutrition", "digestion"]
  },
  {
    id: "adaptogens",
    title: "Adaptogènes",
    definition: "Substances naturelles qui aident l'organisme à résister à divers stress biologiques, chimiques et physiques. Ils normalisent les fonctions physiologiques et renforcent la résilience du corps.",
    source: "Journal of Ethnopharmacology, 2021",
    categories: ["phytothérapie", "stress"]
  },
  {
    id: "rda",
    title: "AJR (Apport Journalier Recommandé)",
    definition: "Niveau moyen d'apport quotidien en nutriments suffisant pour répondre aux besoins nutritionnels de presque toutes les personnes en bonne santé dans une population donnée.",
    source: "Organisation Mondiale de la Santé, 2020",
    categories: ["nutrition", "santé publique"]
  },
  {
    id: "bioavailability",
    title: "Biodisponibilité",
    definition: "Proportion d'un nutriment qui est absorbée et utilisée par l'organisme après ingestion. Elle varie selon la forme chimique du nutriment, la composition du repas et l'état de santé individuel.",
    source: "Advanced Drug Delivery Reviews, 2022",
    categories: ["pharmacologie", "nutrition"]
  },
  {
    id: "cortisol",
    title: "Cortisol",
    definition: "Hormone stéroïde produite par les glandes surrénales en réponse au stress. Régule le métabolisme, la réponse immunitaire et la pression artérielle, mais peut devenir nocif à des niveaux chroniquement élevés.",
    source: "Endocrine Reviews, 2021",
    categories: ["endocrinologie", "stress"]
  },
  {
    id: "circadian-rhythm",
    title: "Rythme circadien",
    definition: "Cycle biologique d'environ 24 heures qui régule de nombreux processus physiologiques comme le sommeil, la digestion et la température corporelle. Il est influencé par la lumière et d'autres facteurs environnementaux.",
    source: "Science Translational Medicine, 2023",
    categories: ["chronobiologie", "sommeil"]
  }
];

export const getTermById = (id: string): ScientificTerm | undefined => {
  return scientificTerms.find(term => term.id === id);
};

export const getTermsByCategory = (category: string): ScientificTerm[] => {
  return scientificTerms.filter(term => term.categories.includes(category));
};
