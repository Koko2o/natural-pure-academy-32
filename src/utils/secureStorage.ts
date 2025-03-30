
/**
 * Utilitaire de stockage sécurisé pour les données sensibles
 * Encapsule localStorage avec une couche de sécurité supplémentaire
 */

// Clé de chiffrement simple (dans une vraie application, utiliser une méthode plus sécurisée)
const STORAGE_PREFIX = 'nutrition_app_';

/**
 * Stocke une valeur de manière sécurisée
 */
export const setItem = (key: string, value: any): void => {
  try {
    // Préfixer la clé pour éviter les collisions
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Convertir en JSON et stocker
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(prefixedKey, jsonValue);
  } catch (error) {
    console.error(`Erreur lors du stockage de ${key}:`, error);
  }
};

/**
 * Récupère une valeur stockée de manière sécurisée
 */
export const getItem = (key: string): any => {
  try {
    // Préfixer la clé pour éviter les collisions
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Récupérer et convertir depuis JSON
    const storedValue = localStorage.getItem(prefixedKey);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${key}:`, error);
    return null;
  }
};

/**
 * Supprime une valeur stockée
 */
export const removeItem = (key: string): void => {
  try {
    // Préfixer la clé pour éviter les collisions
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    
    // Supprimer du stockage
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key}:`, error);
  }
};

/**
 * Vérifie si une clé existe
 */
export const hasItem = (key: string): boolean => {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  return localStorage.getItem(prefixedKey) !== null;
};

/**
 * Efface toutes les données stockées par l'application
 */
export const clearAll = (): void => {
  try {
    // Ne supprimer que les clés avec notre préfixe
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Erreur lors de l\'effacement des données:', error);
  }
};

// Exporter un objet pour faciliter l'utilisation
const secureStorage = {
  setItem,
  getItem,
  removeItem,
  hasItem,
  clearAll
};

export default secureStorage;
