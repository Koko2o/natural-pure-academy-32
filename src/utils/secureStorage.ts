
import CryptoJS from 'crypto-js';

// Clé de chiffrement pour le stockage local (serait idéalement stockée dans des variables d'environnement)
const ENCRYPTION_KEY = 'health_profile_secure_storage_key_2023';

// Fonction pour chiffrer les données
const encrypt = (data: any): string => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error("Erreur lors du chiffrement des données:", error);
    return '';
  }
};

// Fonction pour déchiffrer les données
const decrypt = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Erreur lors du déchiffrement des données:", error);
    return null;
  }
};

// Interface pour le stockage sécurisé
const secureStorage = {
  // Stocker des données chiffrées
  setItem: (key: string, value: any): void => {
    try {
      const encryptedValue = encrypt(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error("Erreur lors du stockage sécurisé:", error);
    }
  },

  // Récupérer et déchiffrer des données
  getItem: (key: string): any => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      return decrypt(encryptedValue);
    } catch (error) {
      console.error("Erreur lors de la récupération du stockage sécurisé:", error);
      return null;
    }
  },

  // Supprimer des données
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Erreur lors de la suppression du stockage sécurisé:", error);
    }
  },

  // Effacer toutes les données
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Erreur lors de l'effacement du stockage sécurisé:", error);
    }
  }
};

export default secureStorage;
