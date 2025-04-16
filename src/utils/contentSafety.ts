
/**
 * Content Safety Module for Google Ad Grant Compliance
 * 
 * This module contains functionality to scan content for terms and patterns
 * that might violate Google Ad Grant policies and trigger account suspension.
 */

// Banned or prohibited terms according to Google Ad Grant policies
export const bannedTerms = [
  // Commercial intent terms (selling products)
  "achat", "acheter", "vente", "commander", "promo", "promotion", "offre spéciale",
  "prix", "tarif", "réduction", "soldes", "gratuit", "livraison",
  "purchase", "buy", "order", "sale", "discount", "special offer", "price",
  
  // Prohibited content categories
  "gambling", "casino", "jeu d'argent", "paris sportifs", "betting",
  "alcohol", "alcool", "vin", "wine", "spirits", "beer", "bière",
  "prescription", "drug", "pharmacy", "pharmacie", "médicament",
  "adult", "adulte", "dating", "rencontre", "escort",
  
  // Other policy violations
  "counterfeit", "contrefaçon", "weapons", "armes", "tobacco", "tabac"
];

// Terms that may indicate problematic content (warning level)
export const warningTerms = [
  "supplement", "supplément", "complément alimentaire",
  "miracle", "cure", "guérison", "healing", "remedy", "remède",
  "guaranteed", "garanti", "promise", "promesse",
  "best", "meilleur", "top", "ultimate", "ultime"
];

/**
 * Scans content for banned terms
 * @param content The text content to scan
 * @returns Array of found banned terms
 */
export const detectBannedTerms = (content: string): string[] => {
  const contentLower = content.toLowerCase();
  return bannedTerms.filter(term => contentLower.includes(term.toLowerCase()));
};

/**
 * Scans content for warning terms
 * @param content The text content to scan
 * @returns Array of found warning terms
 */
export const detectWarningTerms = (content: string): string[] => {
  const contentLower = content.toLowerCase();
  return warningTerms.filter(term => contentLower.includes(term.toLowerCase()));
};

/**
 * Gets the DOM path for an element (for reporting purposes)
 * @param element HTML element
 * @returns String representation of the element's path
 */
export const getElementPath = (element: HTMLElement): string => {
  const path: string[] = [];
  let currentNode: HTMLElement | null = element;
  
  while (currentNode) {
    let selector = currentNode.nodeName.toLowerCase();
    
    if (currentNode.id) {
      selector += `#${currentNode.id}`;
    } else if (currentNode.className) {
      selector += `.${currentNode.className.split(' ').join('.')}`;
    }
    
    path.unshift(selector);
    currentNode = currentNode.parentElement;
  }
  
  return path.join(' > ');
};

/**
 * Performs comprehensive audit of page content for Google Ad Grant compliance
 * @param content HTML content to audit
 * @returns Audit results with compliance status and issues list
 */
export const auditPageContent = (content: string) => {
  const issues: Array<{
    type: 'error' | 'warning';
    message: string;
    details?: string;
  }> = [];
  
  // Check for banned terms
  const foundBannedTerms = detectBannedTerms(content);
  if (foundBannedTerms.length > 0) {
    issues.push({
      type: 'error',
      message: `Content contains banned terms: ${foundBannedTerms.join(', ')}`,
      details: 'These terms may violate Google Ad Grant policies related to commercial intent or prohibited content'
    });
  }
  
  // Check for warning terms
  const foundWarningTerms = detectWarningTerms(content);
  if (foundWarningTerms.length > 0) {
    issues.push({
      type: 'warning',
      message: `Content contains potentially problematic terms: ${foundWarningTerms.join(', ')}`,
      details: 'These terms may trigger policy reviews or affect account quality'
    });
  }
  
  // Check for prohibited patterns (like pricing or payment structures)
  if (/\$\d+|\d+\s?\$|€\d+|\d+\s?€|\d+\s?USD|\d+\s?EUR/gi.test(content)) {
    issues.push({
      type: 'error',
      message: 'Content contains pricing information',
      details: 'Displaying prices may violate Google Ad Grant policies against commercial content'
    });
  }
  
  // Check for "Buy Now" or "Purchase" type calls-to-action
  if (/buy now|add to cart|purchase|commander maintenant|ajouter au panier|acheter|panier d'achat|shopping cart/gi.test(content)) {
    issues.push({
      type: 'error',
      message: 'Content contains commercial calls-to-action',
      details: 'These CTAs may violate Google Ad Grant policies regarding commercial intent'
    });
  }
  
  return {
    isCompliant: issues.filter(issue => issue.type === 'error').length === 0,
    hasWarnings: issues.filter(issue => issue.type === 'warning').length > 0,
    issues
  };
};

/**
 * Checks if a URL is compliant with Google Ad Grant policies
 * @param url The URL to check
 * @returns Boolean indicating compliance status
 */
export const isUrlCompliant = (url: string): boolean => {
  // Check for prohibited URL patterns
  const prohibitedPatterns = [
    /\/shop\//i, 
    /\/store\//i, 
    /\/boutique\//i, 
    /\/achat\//i,
    /\/pricing\//i, 
    /\/tarifs\//i,
    /\/checkout\//i,
    /\/panier\//i,
    /\/cart\//i
  ];
  
  return !prohibitedPatterns.some(pattern => pattern.test(url));
};

/**
 * Checks if a landing page meets the Google Ad Grant quality criteria
 */
export const assessLandingPageQuality = () => {
  // This would be called on page load
  const issues: string[] = [];
  
  // Check for clear nonprofit mission
  const missionElements = document.querySelectorAll('h1, h2, h3, [class*="mission"], [id*="mission"]');
  let hasClearMission = false;
  
  missionElements.forEach(el => {
    if (el.textContent && 
        (/non-?profit|association|501\(c\)\(3\)|charity|organisation/i.test(el.textContent) ||
         /mission|vision|purpose|objectif|but/i.test(el.textContent))) {
      hasClearMission = true;
    }
  });
  
  if (!hasClearMission) {
    issues.push('Landing page does not clearly state nonprofit mission');
  }
  
  // Check for valuable and relevant content
  const contentLength = document.body.textContent?.length || 0;
  if (contentLength < 500) {
    issues.push('Page content may be too thin for Google Ad Grant requirements');
  }
  
  // Check for mobile-friendliness (simple check)
  if (window.innerWidth < 768 && document.documentElement.scrollWidth > window.innerWidth) {
    issues.push('Page may not be fully mobile-friendly');
  }
  
  return {
    isQualityPage: issues.length === 0,
    issues
  };
};
