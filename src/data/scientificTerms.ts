export interface ScientificTerm {
  id: string;
  title: string;
  description: string;
  category: string;
  relatedTerms?: string[];
}

export const scientificTerms: ScientificTerm[] = [
  {
    id: 'circadian-rhythm',
    title: 'Rythme Circadien',
    description: 'Cycle naturel du corps sur 24 heures qui régule les cycles sommeil-éveil et de nombreuses fonctions biologiques comme la production d\'hormones, la température corporelle et le métabolisme.',
    category: 'chronobiologie',
    relatedTerms: ['cortisol', 'melatonin']
  },
  {
    id: 'cortisol',
    title: 'Cortisol',
    description: 'Hormone du stress produite par les glandes surrénales qui joue un rôle dans la régulation du métabolisme, la réponse immunitaire et la réponse au stress.',
    category: 'endocrinologie',
    relatedTerms: ['adaptogens', 'stress-response']
  },
  {
    id: 'microbiome',
    title: 'Microbiome',
    description: 'Ensemble des micro-organismes (bactéries, virus, champignons) vivant dans l\'intestin humain, essentiels pour la digestion, l\'immunité et même la santé mentale.',
    category: 'microbiologie',
    relatedTerms: ['probiotics', 'gut-brain-axis']
  },
  {
    id: 'inflammation',
    title: 'Inflammation',
    description: 'Réponse protectrice de l\'organisme impliquant des cellules immunitaires, vaisseaux sanguins et médiateurs moléculaires. L\'inflammation chronique est liée à de nombreuses maladies.',
    category: 'immunologie',
    relatedTerms: ['antioxidant', 'cytokines']
  },
  {
    id: 'probiotics',
    title: 'Probiotiques',
    description: 'Micro-organismes vivants qui, administrés en quantités adéquates, confèrent un bénéfice pour la santé de l\'hôte, particulièrement au niveau intestinal.',
    category: 'microbiologie',
    relatedTerms: ['microbiome', 'gut-health']
  },
  {
    id: 'vitamin-d',
    title: 'Vitamine D',
    description: 'Nutriment liposoluble essentiel régulant l\'absorption du calcium et la santé osseuse, avec des effets significatifs sur le système immunitaire et la santé globale.',
    category: 'nutrition',
    relatedTerms: ['calcium', 'immune-function']
  },
  {
    id: 'antioxidant',
    title: 'Antioxydant',
    description: 'Molécule capable de ralentir ou prévenir l\'oxydation d\'autres molécules, protégeant ainsi les cellules contre les dommages des radicaux libres.',
    category: 'biochimie',
    relatedTerms: ['free-radicals', 'oxidative-stress']
  },
  {
    id: 'adaptogens',
    title: 'Adaptogènes',
    description: 'Substances naturelles (souvent des plantes) qui aident le corps à s\'adapter au stress et à retrouver l\'équilibre homéostatique.',
    category: 'phytothérapie',
    relatedTerms: ['cortisol', 'stress-response']
  },
  {
    id: 'bioavailability',
    title: 'Biodisponibilité',
    description: 'Proportion d\'un nutriment ou médicament qui est absorbée et utilisée par l\'organisme pour ses fonctions physiologiques.',
    category: 'pharmacologie',
    relatedTerms: ['absorption', 'metabolism']
  },
  {
    id: 'rda',
    title: 'AJR (Apports Journaliers Recommandés)',
    description: 'Quantité moyenne quotidienne de nutriments suffisante pour répondre aux besoins de 97-98% des individus en bonne santé dans une catégorie spécifique.',
    category: 'nutrition',
    relatedTerms: ['nutritional-requirements', 'dietary-guidelines']
  },
  {
    id: 'gut-brain-axis',
    title: 'Axe Intestin-Cerveau',
    description: 'Système de communication bidirectionnelle entre le système nerveux central et le système nerveux entérique, influençant à la fois la digestion et la santé mentale.',
    category: 'neurobiologie',
    relatedTerms: ['microbiome', 'vagus-nerve']
  },
  {
    id: 'oxidative-stress',
    title: 'Stress Oxydatif',
    description: 'Déséquilibre entre la production de radicaux libres et la capacité antioxydante de l\'organisme, pouvant endommager les cellules et tissus.',
    category: 'biochimie',
    relatedTerms: ['antioxidant', 'free-radicals']
  },
  {
    id: 'melatonin',
    title: 'Mélatonine',
    description: 'Hormone produite par la glande pinéale qui régule les cycles de sommeil-éveil et est influencée par l\'exposition à la lumière.',
    category: 'endocrinologie',
    relatedTerms: ['circadian-rhythm', 'sleep']
  },
  {
    id: 'polyphenols',
    title: 'Polyphénols',
    description: 'Composés chimiques produits par les plantes, possédant des propriétés antioxydantes et anti-inflammatoires bénéfiques pour la santé.',
    category: 'phytochimie',
    relatedTerms: ['antioxidant', 'flavonoids']
  },
  {
    id: 'omega-3',
    title: 'Oméga-3',
    description: 'Acides gras essentiels polyinsaturés importants pour la santé cardiovasculaire, la fonction cérébrale et la réduction de l\'inflammation.',
    category: 'nutrition',
    relatedTerms: ['epa', 'dha', 'inflammation']
  }
];

export const getTermById = (id: string): ScientificTerm | undefined => {
  return scientificTerms.find(term => term.id === id);
};

export const getTermsByCategory = (category: string): ScientificTerm[] => {
  return scientificTerms.filter(term => term.category === category);
};