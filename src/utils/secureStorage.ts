
/**
 * Module de stockage sécurisé pour les données sensibles
 */

// Clé d'encryption simple (à remplacer par une solution plus sécurisée en production)
const ENCRYPTION_KEY = 'cle_temporaire_pour_demo_uniquement';

/**
 * Chiffre les données avant stockage
 */
const encryptData = (data: any): string => {
  try {
    // Version simplifiée pour la démonstration
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors du chiffrement des données:", error);
    return '';
  }
};

/**
 * Déchiffre les données stockées
 */
const decryptData = (encryptedData: string): any => {
  try {
    // Version simplifiée pour la démonstration
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error("Erreur lors du déchiffrement des données:", error);
    return null;
  }
};

/**
 * API de stockage sécurisé
 */
const secureStorage = {
  /**
   * Stocke les données de manière sécurisée
   */
  setItem: (key: string, value: any): void => {
    try {
      const encryptedValue = encryptData(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error("Erreur lors du stockage sécurisé:", error);
    }
  },

  /**
   * Récupère les données stockées de manière sécurisée
   */
  getItem: (key: string): any => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      return decryptData(encryptedValue);
    } catch (error) {
      console.error("Erreur lors de la récupération du stockage sécurisé:", error);
      return null;
    }
  },

  /**
   * Supprime les données stockées
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Erreur lors de la suppression du stockage sécurisé:", error);
    }
  }
};

export default secureStorage;
