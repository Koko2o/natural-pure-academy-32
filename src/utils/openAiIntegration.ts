
/**
 * Module d'intégration avec l'API OpenAI pour l'enrichissement des recommandations
 */

import { secureStorageService } from './secureStorage';
import { Recommendation, QuizResponse } from './types';

interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenAICompletionRequest {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens: number;
}

/**
 * Configure la clé API OpenAI
 */
export const setOpenAIApiKey = (apiKey: string): void => {
  secureStorageService.setItem('openai_api_key', apiKey);
};

/**
 * Vérifie si la clé API OpenAI est configurée
 */
export const hasOpenAIApiKey = (): boolean => {
  const apiKey = secureStorageService.getItem('openai_api_key');
  return !!apiKey;
};

/**
 * Utilise l'API OpenAI pour enrichir les recommandations avec des explications plus détaillées
 */
export const getEnrichedRecommendations = async (
  recommendations: Recommendation[],
  quizResponses: QuizResponse,
  userProfile: any
): Promise<Recommendation[]> => {
  try {
    const apiKey = secureStorageService.getItem('openai_api_key');
    
    if (!apiKey) {
      console.log("Clé API OpenAI non configurée");
      return recommendations;
    }
    
    // Construire le prompt pour ChatGPT
    const systemPrompt = `Vous êtes un expert en nutrition et suppléments nutritionnels spécialisé dans les approches personnalisées basées sur des preuves scientifiques.
    
Analysez les réponses au quiz de santé de l'utilisateur et les recommandations initiales générées par notre système.
Votre tâche est d'enrichir ces recommandations avec:
1. Des explications scientifiques plus détaillées adaptées au profil spécifique
2. Des ajustements de dosage personnalisés si nécessaire
3. Des indications sur les synergies potentielles entre les suppléments recommandés
4. Des conseils d'utilisation optimale (moment de la journée, avec/sans nourriture, etc.)

Basez vos recommandations uniquement sur des données scientifiques solides. N'inventez pas de propriétés ou de bénéfices non prouvés.
Votre réponse doit être structurée et scientifiquement précise.`;

    const userPrompt = `Voici les informations sur l'utilisateur:

PROFIL UTILISATEUR:
${JSON.stringify(userProfile, null, 2)}

RÉPONSES AU QUIZ DE SANTÉ:
${JSON.stringify(quizResponses, null, 2)}

RECOMMANDATIONS INITIALES:
${JSON.stringify(recommendations, null, 2)}

Veuillez analyser ces informations et fournir des recommandations enrichies au format JSON.
Chaque recommandation doit inclure: id, name, description, recommendedDose, detailedExplanation, usageInstructions, synergies, scientificExplanation`;

    // Préparer la requête
    const requestData: OpenAICompletionRequest = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };
    
    // Appeler l'API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }
    
    const data: OpenAICompletionResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Réponse API vide");
    }
    
    // Extraire et parser la réponse
    const content = data.choices[0].message.content;
    
    // Rechercher le JSON dans la réponse
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                      content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Format JSON non trouvé dans la réponse");
      return recommendations;
    }
    
    const jsonContent = jsonMatch[1] || jsonMatch[0];
    
    try {
      const enrichedRecommendations = JSON.parse(jsonContent);
      
      // Fusionner avec les recommandations d'origine
      return recommendations.map((rec, index) => {
        const enriched = enrichedRecommendations[index] || enrichedRecommendations.find((e: any) => e.id === rec.id);
        
        if (enriched) {
          return {
            ...rec,
            detailedExplanation: enriched.detailedExplanation || rec.scientificBasis,
            usageInstructions: enriched.usageInstructions || `Prenez ${rec.recommendedDose} quotidiennement`,
            synergies: enriched.synergies || [],
            scientificExplanation: enriched.scientificExplanation || rec.scientificBasis,
            aiEnriched: true
          };
        }
        
        return rec;
      });
      
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse JSON:", parseError);
      return recommendations;
    }
    
  } catch (error) {
    console.error("Erreur lors de l'enrichissement via OpenAI:", error);
    return recommendations;
  }
};

/**
 * Utilise l'API OpenAI pour générer une explication personnalisée pour un supplément spécifique
 */
export const generatePersonalizedExplanation = async (
  supplementId: string,
  userProfile: any
): Promise<string> => {
  try {
    const apiKey = secureStorageService.getItem('openai_api_key');
    
    if (!apiKey) {
      return "Explication détaillée non disponible (clé API manquante)";
    }
    
    const supplementCatalog = secureStorageService.getItem('supplementCatalog');
    
    if (!supplementCatalog || !supplementCatalog[supplementId]) {
      return "Information sur ce supplément non disponible";
    }
    
    const supplement = supplementCatalog[supplementId];
    
    // Construire le prompt
    const prompt = `Générez une explication personnalisée et scientifique sur le supplément "${supplement.name}" (${supplement.scientificName}) 
    adaptée au profil suivant:
    
    ${JSON.stringify(userProfile, null, 2)}
    
    Informations sur le supplément:
    ${JSON.stringify(supplement, null, 2)}
    
    Votre explication doit couvrir:
    1. Comment ce supplément fonctionne dans le corps
    2. Pourquoi il est particulièrement adapté à ce profil utilisateur
    3. Comment maximiser ses bénéfices
    4. Précautions à prendre pour ce profil spécifique`;
    
    // Préparer la requête
    const requestData = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert scientifique en nutrition et suppléments. Fournissez uniquement des informations précises basées sur la science."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };
    
    // Appeler l'API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Réponse API vide");
    }
    
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error("Erreur lors de la génération d'explication personnalisée:", error);
    return "Impossible de générer une explication personnalisée pour ce supplément.";
  }
};

/**
 * Analyse les symptômes décrits en texte libre pour identifier les catégories de symptômes
 */
export const analyzeSymptomText = async (
  symptomText: string
): Promise<string[]> => {
  try {
    const apiKey = secureStorageService.getItem('openai_api_key');
    
    if (!apiKey) {
      return [];
    }
    
    // Construire le prompt
    const prompt = `Analysez le texte suivant qui décrit des symptômes et classez-les dans ces catégories:
    - stress
    - sleep
    - energy
    - mood
    - focus
    - digestion
    - immunity
    - inflammation
    
    Texte à analyser: "${symptomText}"
    
    Répondez uniquement avec un tableau JSON des catégories identifiées, sans explications.`;
    
    // Préparer la requête
    const requestData = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un assistant d'analyse médicale spécialisé dans la catégorisation des symptômes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    };
    
    // Appeler l'API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API OpenAI: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Réponse API vide");
    }
    
    const content = data.choices[0].message.content;
    
    try {
      // Extraire le JSON
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
      
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse:", parseError);
      return [];
    }
    
  } catch (error) {
    console.error("Erreur lors de l'analyse des symptômes:", error);
    return [];
  }
};
