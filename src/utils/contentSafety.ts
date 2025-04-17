// Lists of terms to check for Google Ad Grants compliance
export const bannedTerms = [
  "achat", "promotion", "promo", "prix", "soldes", "remise", "discount",
  "offre", "exclusif", "limité", "gratuit", "free", "buy", "purchase", 
  "shopping", "shop", "deal", "coupon", "avantage", "profitez"
];

export const warningTerms = [
  "cure", "traitement", "guérison", "solution", "thérapie", "therapy",
  "miracle", "résout", "soulage", "améliore", "improves", "resolves",
  "drogues", "drugs", "narcotiques", "narcotic", "toxicomanie", "addiction"
];

// Detect banned terms in content
export const detectBannedTerms = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return bannedTerms.filter(term => 
    lowercaseContent.includes(term.toLowerCase())
  );
};

// Detect warning terms that may cause issues
export const detectWarningTerms = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return warningTerms.filter(term => 
    lowercaseContent.includes(term.toLowerCase())
  );
};

// More advanced detection with word boundary check
export const detectBannedTermsWithContext = (content: string): string[] => {
  const lowercaseContent = content.toLowerCase();
  return bannedTerms.filter(term => {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'i');
    return regex.test(lowercaseContent);
  });
};

// NLP-based detection to consider context (simplified)
export const detectBannedTermsWithNLP = (content: string): Array<{term: string, context: string}> => {
  const results: Array<{term: string, context: string}> = [];
  const sentences = content.split(/[.!?]+/);

  for (const term of bannedTerms) {
    for (const sentence of sentences) {
      if (sentence.toLowerCase().includes(term.toLowerCase())) {
        // Get surrounding context (the whole sentence)
        results.push({
          term,
          context: sentence.trim()
        });
        // Only get first occurrence per sentence
        break;
      }
    }
  }

  return results;
};

// Check if term appears in educational context
export const isEducationalContext = (context: string): boolean => {
  const educationalMarkers = [
    "research", "study", "science", "scientific", "education", "educational",
    "learn", "learning", "recherche", "étude", "science", "scientifique", 
    "éducation", "éducatif", "apprendre", "apprentissage"
  ];

  const lowercaseContext = context.toLowerCase();
  return educationalMarkers.some(marker => 
    lowercaseContext.includes(marker)
  );
};

// Add semantic variety to content while keeping educational intent
export const semanticRotator = (originalText: string): string => {
  const replacements: Record<string, string[]> = {
    "buy": ["explore", "discover", "learn about"],
    "achat": ["découverte", "exploration", "apprentissage sur"],
    "price": ["value", "benefit", "advantage"],
    "prix": ["valeur", "bénéfice", "avantage"],
    "shop": ["browse", "view", "explore"],
    "shopping": ["browsing", "exploring", "learning"],
    "offer": ["provide", "present", "share"],
    "offre": ["propose", "présente", "partage"]
  };

  let result = originalText;

  Object.entries(replacements).forEach(([term, alternatives]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    result = result.replace(regex, () => {
      const randomIndex = Math.floor(Math.random() * alternatives.length);
      return alternatives[randomIndex];
    });
  });

  return result;
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

  // Check for "Buy Now" or "Purchase" type call-to-action
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

// Validate redirect URLs for policy compliance
export const validateRedirectUrl = (url: string): boolean => {
  // Check for common e-commerce platforms that would violate policy
  const prohibitedDomains = [
    'amazon.com', 'amazon.fr', 'ebay.com', 'shopify.com', 
    'etsy.com', 'aliexpress.com'
  ];

  return !prohibitedDomains.some(domain => url.includes(domain));
};

// URL compliance check for Google Ad Grant
// URL compliance check for Google Ad Grant
export const isUrlCompliant = (url: string): boolean => {
  // Check for prohibited URL patterns
  const prohibitedPatterns = [
    /\/shop\//i,
    /\/store\//i,
    /\/pricing\//i,
    /\/buy\//i,
    /\/checkout\//i,
    /\/cart\//i,
    /\/purchase\//i
  ];

  // Check for prohibited parameters
  const prohibitedParams = [
    'product_id',
    'sku',
    'item',
    'price',
    'coupon',
    'discount'
  ];

  // Check URL against prohibited patterns
  const hasProhibitedPattern = prohibitedPatterns.some(pattern => pattern.test(url));
  if (hasProhibitedPattern) {
    return false;
  }
  
  // Check URL params for prohibited terms
  const urlParams = new URL(url, 'https://example.com').searchParams;
  for (const param of prohibitedParams) {
    if (urlParams.has(param)) {
      return false;
    }
  }
  
  return true;eturn false;
  }

  // Check URL parameters
  try {
    const urlObj = new URL(url);
    const hasProhibitedParam = prohibitedParams.some(param => 
      urlObj.searchParams.has(param)
    );
    if (hasProhibitedParam) {
      return false;
    }
  } catch (error) {
    // Invalid URL format
    return false;
  }

  // Check domain (reuse validateRedirectUrl logic)
  return validateRedirectUrl(url);
};

// Generate a compliant page title for Google Ad Grant
export const generateCompliantTitle = (originalTitle: string): string => {
  // Replace commercial terms with educational alternatives
  let compliantTitle = semanticRotator(originalTitle);

  // Add educational qualifier if not present
  const educationalQualifiers = ['Guide to', 'Understanding', 'Learning About', 'The Science of'];
  const hasQualifier = educationalQualifiers.some(q => compliantTitle.includes(q));

  if (!hasQualifier && compliantTitle.length < 50) {
    const randomQualifier = educationalQualifiers[Math.floor(Math.random() * educationalQualifiers.length)];
    compliantTitle = `${randomQualifier} ${compliantTitle}`;
  }

  return compliantTitle;
};

// Scan content for banned terms with context awareness
export const scanForBannedTerms = (content: string, bannedTerms: string): string[] => {
  const terms = bannedTerms.split(',').map(term => term.trim().toLowerCase());
  const detectedTerms: string[] = [];

  // Allowed contexts for terms like "free" in educational/scientific context
  const allowedContexts = [
    'test gratuit', 
    'evaluation gratuite',
    'ressources gratuites',
    'documentation gratuite',
    'articles gratuits',
    'education gratuite',
    'formation gratuite',
    'outils gratuits'
  ];

  terms.forEach(term => {
    // Skip checking if this is "gratuit" in a scientific/educational context
    if (term === 'gratuit' || term === 'free') {
      // Check if term appears in allowed context
      const termIsInAllowedContext = allowedContexts.some(context => 
        content.toLowerCase().includes(context)
      );

      if (!termIsInAllowedContext && content.toLowerCase().includes(term)) {
        detectedTerms.push(term);
      }
    } 
    // For all other commercial terms, check directly
    else if (content.toLowerCase().includes(term)) {
      detectedTerms.push(term);
    }
  });

  return detectedTerms;
};