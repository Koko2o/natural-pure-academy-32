
export interface ScientificTerm {
  id: string;
  title: string;
  definition: string;
  source?: string;
  relatedTerms?: string[];
}

export const scientificTerms: ScientificTerm[] = [
  {
    id: "vitamin-d",
    title: "Vitamine D",
    definition: "Vitamine liposoluble essentielle pour l'absorption du calcium et la santé osseuse. Elle joue également un rôle crucial dans la fonction immunitaire et la régulation de l'humeur.",
    source: "Journal of Clinical Endocrinology & Metabolism, 2011",
    relatedTerms: ["calcium", "vitamin-k2"]
  },
  {
    id: "microbiome",
    title: "Microbiome intestinal",
    definition: "Communauté complexe de micro-organismes vivant dans l'intestin humain qui influence la digestion, le système immunitaire et la santé métabolique.",
    source: "Nature Reviews Gastroenterology & Hepatology, 2019",
    relatedTerms: ["probiotics", "inflammation"]
  },
  {
    id: "probiotics",
    title: "Probiotiques",
    definition: "Micro-organismes vivants qui, lorsqu'ils sont administrés en quantités adéquates, confèrent un bénéfice pour la santé de l'hôte, notamment en améliorant l'équilibre du microbiome intestinal.",
    source: "World Health Organization, 2001",
    relatedTerms: ["microbiome", "digestion"]
  },
  {
    id: "inflammation",
    title: "Inflammation chronique",
    definition: "Réponse immunitaire prolongée qui peut endommager les tissus sains et contribuer à diverses maladies chroniques comme les maladies cardiaques, le diabète et l'arthrite.",
    source: "New England Journal of Medicine, 2020",
    relatedTerms: ["antioxidant", "cortisol"]
  },
  {
    id: "antioxidant",
    title: "Antioxydants",
    definition: "Composés qui protègent les cellules contre les dommages causés par les radicaux libres, molécules instables produites lors du métabolisme ou par exposition à des toxines environnementales.",
    source: "Free Radical Biology and Medicine, 2018",
    relatedTerms: ["inflammation", "oxidative-stress"]
  },
  {
    id: "cortisol",
    title: "Cortisol",
    definition: "Hormone stéroïde produite par les glandes surrénales en réponse au stress. Elle régule le métabolisme, la réponse immunitaire et la pression artérielle, mais des niveaux chroniquement élevés peuvent nuire à la santé.",
    source: "Journal of Endocrinology, 2020",
    relatedTerms: ["adaptogens", "circadian-rhythm"]
  },
  {
    id: "adaptogens",
    title: "Adaptogènes",
    definition: "Substances naturelles, généralement des plantes, qui aident l'organisme à résister aux divers stress (physiques, chimiques ou biologiques) en normalisant les fonctions physiologiques.",
    source: "Pharmaceuticals, 2010",
    relatedTerms: ["cortisol", "stress-response"]
  },
  {
    id: "circadian-rhythm",
    title: "Rythme circadien",
    definition: "Cycle naturel d'environ 24 heures qui régule de nombreux processus physiologiques et comportementaux, notamment le cycle veille-sommeil, la libération d'hormones et le métabolisme.",
    source: "Nature Reviews Neuroscience, 2019",
    relatedTerms: ["melatonin", "cortisol"]
  },
  {
    id: "bioavailability",
    title: "Biodisponibilité",
    definition: "Proportion d'une substance qui pénètre dans la circulation systémique lorsqu'elle est introduite dans l'organisme et la vitesse à laquelle ce processus se produit.",
    source: "European Journal of Clinical Nutrition, 2013",
    relatedTerms: ["absorption", "nutrient-timing"]
  },
  {
    id: "rda",
    title: "Apport Journalier Recommandé (AJR)",
    definition: "Niveau moyen d'apport nutritionnel quotidien suffisant pour répondre aux besoins nutritionnels de presque toutes les personnes en bonne santé (97-98%) dans un groupe d'âge et de sexe particulier.",
    source: "Institute of Medicine, 2006",
    relatedTerms: ["bioavailability", "micronutrients"]
  },
  {
    id: "magnesium-glycinate",
    title: "Magnésium Glycinate",
    definition: "Forme de magnésium liée à l'acide aminé glycine, connue pour sa biodisponibilité élevée et sa bonne tolérance digestive. Joue un rôle dans plus de 300 réactions enzymatiques dans le corps.",
    source: "Journal of the American College of Nutrition, 2018",
    relatedTerms: ["bioavailability", "sleep"]
  },
  {
    id: "omega3",
    title: "Acides gras Oméga-3",
    definition: "Acides gras polyinsaturés essentiels, incluant l'EPA et le DHA, qui ont des effets anti-inflammatoires et sont importants pour la santé cardiovasculaire et cérébrale.",
    source: "American Journal of Clinical Nutrition, 2015",
    relatedTerms: ["inflammation", "dha-epa"]
  },
  {
    id: "micronutrients",
    title: "Micronutriments",
    definition: "Vitamines et minéraux nécessaires en petites quantités pour le développement et le fonctionnement normal de l'organisme. Contrairement aux macronutriments, ils ne fournissent pas d'énergie.",
    source: "World Health Organization, 2015",
    relatedTerms: ["rda", "bioavailability"]
  },
  {
    id: "oxidative-stress",
    title: "Stress oxydatif",
    definition: "Déséquilibre entre la production de radicaux libres et la capacité de l'organisme à contrecarrer leurs effets nocifs par les antioxydants. Contribue au vieillissement et à diverses pathologies.",
    source: "Free Radical Research, 2016",
    relatedTerms: ["antioxidant", "inflammation"]
  },
  {
    id: "melatonin",
    title: "Mélatonine",
    definition: "Hormone produite par la glande pinéale qui régule le cycle veille-sommeil. Sa production augmente avec l'obscurité, favorisant l'endormissement et la qualité du sommeil.",
    source: "Journal of Pineal Research, 2017",
    relatedTerms: ["circadian-rhythm", "sleep"]
  },
  {
    id: "dha-epa",
    title: "DHA et EPA",
    definition: "Acides gras oméga-3 à longue chaîne (acide docosahexaénoïque et acide eicosapentaénoïque) présents principalement dans les poissons gras et les algues. Essentiels pour la santé cérébrale et cardiovasculaire.",
    source: "Prostaglandins, Leukotrienes and Essential Fatty Acids, 2018",
    relatedTerms: ["omega3", "brain-health"]
  },
  {
    id: "sleep",
    title: "Sommeil réparateur",
    definition: "Phase de sommeil profond où se produisent la restauration cellulaire, la consolidation de la mémoire et la libération d'hormones importantes. Essentiel pour la récupération physiologique et psychologique.",
    source: "Sleep Medicine Reviews, 2018",
    relatedTerms: ["melatonin", "circadian-rhythm"]
  },
  {
    id: "gut-brain-axis",
    title: "Axe intestin-cerveau",
    definition: "Système de communication bidirectionnel entre le système nerveux entérique et le système nerveux central, impliquant des voies neuronales, endocriniennes et immunitaires.",
    source: "Annals of Gastroenterology, 2019",
    relatedTerms: ["microbiome", "probiotics"]
  },
  {
    id: "methylation",
    title: "Méthylation",
    definition: "Processus biochimique crucial impliquant le transfert d'un groupe méthyle (CH3) à une molécule. Influence l'expression génétique, la détoxification et la synthèse des neurotransmetteurs.",
    source: "Journal of Nutritional Biochemistry, 2014",
    relatedTerms: ["b-vitamins", "epigenetics"]
  },
  {
    id: "b-vitamins",
    title: "Vitamines du groupe B",
    definition: "Groupe de huit vitamines hydrosolubles jouant des rôles essentiels dans le métabolisme cellulaire, la fonction neurologique et la production d'énergie.",
    source: "Nutrients, 2016",
    relatedTerms: ["methylation", "energy-production"]
  },
  {
    id: "l-theanine",
    title: "L-Théanine",
    definition: "Acide aminé présent principalement dans le thé vert qui favorise la relaxation sans somnolence, en augmentant les ondes alpha cérébrales et en modulant les neurotransmetteurs.",
    source: "Journal of Functional Foods, 2019",
    relatedTerms: ["gaba", "stress-response"]
  },
  {
    id: "vitamin-c",
    title: "Vitamine C",
    definition: "Puissant antioxydant hydrosoluble qui joue un rôle essentiel dans la synthèse du collagène, l'absorption du fer et la fonction immunitaire.",
    source: "Advances in Nutrition, 2017",
    relatedTerms: ["antioxidant", "immune-function"]
  },
  {
    id: "ashwagandha",
    title: "Ashwagandha",
    definition: "Herbe adaptogène (Withania somnifera) utilisée traditionnellement en médecine ayurvédique pour réduire le stress, améliorer la concentration et augmenter l'énergie.",
    source: "Journal of Alternative and Complementary Medicine, 2014",
    relatedTerms: ["adaptogens", "cortisol"]
  },
  {
    id: "curcumin",
    title: "Curcumine",
    definition: "Composé actif principal du curcuma aux puissantes propriétés anti-inflammatoires et antioxydantes. Sa biodisponibilité naturelle est faible mais peut être améliorée par diverses formulations.",
    source: "Foods, 2017",
    relatedTerms: ["inflammation", "bioavailability"]
  },
  {
    id: "coq10",
    title: "Coenzyme Q10",
    definition: "Composé liposoluble présent dans presque toutes les cellules du corps, essentiel à la production d'énergie mitochondriale et possédant des propriétés antioxydantes.",
    source: "Journal of the American College of Nutrition, 2018",
    relatedTerms: ["mitochondria", "energy-production"]
  },
  {
    id: "zinc",
    title: "Zinc",
    definition: "Oligo-élément essentiel impliqué dans plus de 300 réactions enzymatiques, la fonction immunitaire, la synthèse de l'ADN, la cicatrisation des plaies et le métabolisme.",
    source: "Nutrients, 2017",
    relatedTerms: ["immune-function", "micronutrients"]
  },
  {
    id: "iron",
    title: "Fer",
    definition: "Minéral vital pour la formation de l'hémoglobine et des globules rouges, le transport de l'oxygène, la production d'énergie cellulaire et de nombreuses réactions enzymatiques.",
    source: "Journal of Research in Medical Sciences, 2014",
    relatedTerms: ["hemoglobin", "energy-production"]
  }
];

export const SCIENTIFIC_TERMS_DATABASE = scientificTerms.reduce((acc, term) => {
  acc[term.id] = term;
  return acc;
}, {} as Record<string, ScientificTerm>);
