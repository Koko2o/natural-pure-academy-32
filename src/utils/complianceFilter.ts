
/**
 * Utilitaire pour filtrer les contenus selon les règles de conformité Google Ads Grants
 */

// Termes interdits pour Google Ads Grants
export const BANNED_PHRASES = new RegExp(
  /\b(offre|promo|exclusivité|achat|commander|prix|rabais|boutique|vente|acheter|soldes|discount|bon marché)\b/gi
);

/**
 * Assainit le contenu en remplaçant les termes non conformes
 */
export const sanitizeContent = (text: string): string => 
  text.replace(BANNED_PHRASES, match => '*'.repeat(match.length));

/**
 * Vérifie si une URL est conforme aux règles de redirection sécurisée
 */
export const validateRedirectUrl = (url: string): boolean => {
  // Vérifier si l'URL est une URL interne ou une URL externe approuvée
  if (url.startsWith('/') || url.startsWith(window.location.origin)) {
    return true;
  }
  
  // Liste des domaines externes approuvés (à personnaliser)
  const approvedDomains = [
    'pubmed.ncbi.nlm.nih.gov',
    'scholar.google.com',
    'nih.gov',
    'who.int'
  ];
  
  try {
    const urlObj = new URL(url);
    return approvedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

/**
 * Crée une redirection sécurisée avec délai aléatoire
 */
export const safeRedirect = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!validateRedirectUrl(url)) {
      console.warn('Tentative de redirection vers un domaine non autorisé:', url);
      resolve();
      return;
    }
    
    // Générer un délai aléatoire entre 1000 et 3000ms
    const delay = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(() => {
      // Rediriger via la passerelle de conformité
      window.location.href = `/redirect/social?target=${btoa(url)}`;
      resolve();
    }, delay);
  });
};

/**
 * Interface pour les données utilisateur sécurisées
 */
export interface SecureUserData {
  lastVisit?: string;
  quizProgress?: number;
  consentGiven?: boolean;
}

/**
 * Stockage sécurisé des données utilisateur (sans cookies persistants)
 */
export const secureStorage = {
  set: (key: string, value: any): void => {
    try {
      // Utiliser sessionStorage au lieu de localStorage pour la conformité
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors du stockage sécurisé:', error);
    }
  },
  
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erreur lors de la récupération du stockage sécurisé:', error);
      return defaultValue;
    }
  },
  
  remove: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression du stockage sécurisé:', error);
    }
  },
  
  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Erreur lors de la suppression du stockage sécurisé:', error);
    }
  }
};
