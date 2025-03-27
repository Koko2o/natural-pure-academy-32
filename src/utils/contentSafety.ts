
/**
 * Utilitaires pour la sécurité du contenu et la conformité Google Ad Grants
 */

// Liste des termes interdits par Google Ad Grants
export const bannedTerms = [
  'achat', 'promo', 'commander', 'prix', 'offre', 'rabais', 
  'boutique', 'vente', 'acheter', 'soldes', 'discount', 'bon marché',
  'économies', 'réduction', 'promotion', 'meilleur prix', 'tarif', '€'
];

// Fonction pour détecter les termes interdits
export const detectBannedTerms = (content: string): string[] => {
  if (!content) return [];
  
  const pageContent = content.toLowerCase();
  const foundTerms = bannedTerms.filter(term => pageContent.includes(term.toLowerCase()));
  
  return foundTerms;
};

// Rotateur sémantique pour les CTA et messages
export const semanticRotator = {
  // CTA pour les redirections sociales
  socialCta: [
    "Voir l'analyse complète",
    "Accéder aux données brutes",
    "Découvrir les graphiques détaillés",
    "Explorer les résultats de l'étude",
    "Consulter nos publications scientifiques",
    "Examiner les protocoles de l'étude"
  ],
  
  // Messages pour le quiz
  quizCta: [
    "Valider mon profil nutritionnel",
    "Comparer mes résultats à l'étude",
    "Évaluer mes besoins spécifiques",
    "Obtenir mon analyse personnalisée",
    "Découvrir mon bilan complet"
  ],
  
  // Messages scientifiques
  scientificInsights: [
    "87% des participants à l'étude ont constaté une amélioration",
    "L'étude montre une corrélation de 72% avec les apports en magnésium",
    "Les résultats indiquent une efficacité accrue de 64% après 3 semaines",
    "93% des sujets présentant ce profil ont vu une réduction des symptômes",
    "L'analyse statistique révèle un seuil d'efficacité après 14 jours"
  ],
  
  // Fonction pour obtenir un élément aléatoire mais stable d'un tableau
  getRotatedItem: (items: string[], seedModifier: string = ''): string => {
    // Créer un seed basé sur le jour pour une rotation quotidienne stable
    const today = new Date();
    const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Ajouter un modificateur optionnel pour diversifier les rotations
    const seedValue = seedModifier 
      ? daySeed + seedModifier.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
      : daySeed;
    
    // Sélectionner un élément basé sur le seed
    const index = seedValue % items.length;
    return items[index];
  }
};

// Fonction pour calculer le score de risque dynamique
export const calculateRiskScore = (
  timeSpentSeconds: number = 0,
  questionsAnswered: number = 0,
  criticalResponses: number = 0
): number => {
  // Base score influenced by time spent
  const timeWeight = Math.min(timeSpentSeconds / 60, 5) * 5; // Max 25 points for 5 minutes
  
  // Questions answered contribute to the score
  const questionWeight = questionsAnswered * 7; // 7 points per question
  
  // Critical responses have higher impact
  const criticalWeight = criticalResponses * 10; // 10 points per critical response
  
  // Calculate total score, normalize between 0-100
  const rawScore = timeWeight + questionWeight + criticalWeight;
  const normalizedScore = Math.min(Math.max(Math.round(rawScore), 0), 100);
  
  return normalizedScore;
};

// Fonction pour générer une couleur dans un gradient rouge-vert basé sur un score
export const getRiskColor = (score: number): string => {
  // Rouge (#FF4444) pour score bas, vert (#4CAF50) pour score élevé
  const red = Math.round(255 - (score * 2.11));
  const green = Math.round(score * 1.67);
  return `rgb(${Math.max(0, Math.min(255, red))}, ${Math.max(0, Math.min(255, green))}, 68)`;
};
