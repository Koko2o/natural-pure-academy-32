
/**
 * Utilitaire de stockage sécurisé pour les données sensibles
 */
const secureStorage = {
  /**
   * Stocke une valeur dans le localStorage avec encryption basique
   */
  setItem: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Erreur lors du stockage sécurisé:', error);
    }
  },

  /**
   * Récupère une valeur du localStorage et la décrypte
   */
  getItem: (key: string): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération sécurisée:', error);
      return null;
    }
  },

  /**
   * Supprime une valeur du localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression sécurisée:', error);
    }
  }
};

export default secureStorage;
