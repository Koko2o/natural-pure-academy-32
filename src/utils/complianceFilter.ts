
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
 * Crée une redirection sécurisée avec délai aléatoire amélioré
 */
export const safeRedirect = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!validateRedirectUrl(url)) {
      console.warn('Tentative de redirection vers un domaine non autorisé:', url);
      resolve();
      return;
    }
    
    // Générer un délai aléatoire entre 1300 et 3700ms (plus réaliste)
    const delay = Math.floor(Math.random() * 2400) + 1300;
    
    // Générer un hash cryptographique pour le paramètre URL
    const generateHash = async (input: string): Promise<string> => {
      try {
        // Utiliser l'API Web Crypto pour générer un hash SHA-256
        const encoder = new TextEncoder();
        const data = encoder.encode(input + Date.now().toString());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.substring(0, 16); // Utiliser uniquement les 16 premiers caractères
      } catch (e) {
        // Fallback si l'API Web Crypto n'est pas disponible
        return btoa(input).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
      }
    };

    setTimeout(async () => {
      try {
        // Générer un hash unique pour cette redirection
        const urlHash = await generateHash(url);
        // Rediriger via la passerelle de conformité avec un hash cryptographique
        window.location.href = `/redirect/social?target=${btoa(url)}&ref=${urlHash}`;
        resolve();
      } catch (error) {
        // Fallback en cas d'erreur
        window.location.href = `/redirect/social?target=${btoa(url)}`;
        resolve();
      }
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

/**
 * Amélioration: Détection de termes interdits avec analyse contextuelle (NLP simplifié)
 */

// Contextes sécurisés qui peuvent contenir des termes normalement interdits
const SAFE_CONTEXTS = [
  'étude scientifique',
  'recherche montre',
  'selon les études',
  'à titre informatif',
  'but éducatif',
  'contexte pédagogique',
  'recherche médicale',
  'publication scientifique'
];

// Fonctionnalité NLP simplifiée pour analyser le contexte
export const analyzeContext = (text: string, term: string): boolean => {
  if (!text || !term) return false;
  
  // Convertir en minuscules pour la comparaison
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  
  // Trouver la position du terme
  const termIndex = lowerText.indexOf(lowerTerm);
  if (termIndex === -1) return false;
  
  // Extraire un segment de contexte autour du terme (100 caractères)
  const contextStart = Math.max(0, termIndex - 50);
  const contextEnd = Math.min(lowerText.length, termIndex + term.length + 50);
  const context = lowerText.substring(contextStart, contextEnd);
  
  // Vérifier si le contexte contient l'un des contextes sécurisés
  return SAFE_CONTEXTS.some(safeContext => context.includes(safeContext));
};

// Fonction améliorée pour détecter les termes interdits avec NLP
export const detectBannedTermsWithNLP = (content: string): { 
  terms: string[], 
  contexts: { term: string, context: string, isSafe: boolean }[] 
} => {
  if (!content) return { terms: [], contexts: [] };
  
  const lowerContent = content.toLowerCase();
  const contexts: { term: string, context: string, isSafe: boolean }[] = [];
  
  // Extraire tous les termes potentiellement interdits
  const bannedTermsRegex = /\b(offre|promo|exclusivité|achat|commander|prix|rabais|boutique|vente|acheter|soldes|discount|bon marché|économies|réduction)\b/gi;
  const terms: string[] = [];
  
  let match;
  while ((match = bannedTermsRegex.exec(lowerContent)) !== null) {
    const term = match[0];
    const termIndex = match.index;
    
    // Extraire le contexte
    const contextStart = Math.max(0, termIndex - 50);
    const contextEnd = Math.min(lowerContent.length, termIndex + term.length + 50);
    const context = content.substring(contextStart, contextEnd);
    
    // Analyser le contexte
    const isSafe = analyzeContext(context, term);
    
    // Ajouter aux résultats si non sécurisé
    if (!isSafe) {
      terms.push(term);
    }
    
    contexts.push({
      term,
      context,
      isSafe
    });
  }
  
  return {
    terms: [...new Set(terms)], // Éliminer les doublons
    contexts
  };
};
