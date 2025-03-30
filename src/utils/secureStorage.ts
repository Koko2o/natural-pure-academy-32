
/**
 * Service de stockage sécurisé pour les données sensibles
 */

const ENCRYPTION_KEY = 'votre-clé-de-chiffrement'; // En production, utiliser une clé générée de manière sécurisée

class SecureStorageService {
  /**
   * Chiffre les données avant stockage
   */
  private encrypt(data: string): string {
    try {
      // Dans une implémentation réelle, utiliser une bibliothèque de cryptographie
      // Pour l'instant, nous utilisons un encodage base64 basique comme simulation
      return btoa(data);
    } catch (error) {
      console.error('Erreur lors du chiffrement des données:', error);
      return data;
    }
  }

  /**
   * Déchiffre les données après récupération
   */
  private decrypt(data: string): string {
    try {
      // Déchiffrement simulé (base64 decode)
      return atob(data);
    } catch (error) {
      console.error('Erreur lors du déchiffrement des données:', error);
      return data;
    }
  }

  /**
   * Stocke les données chiffrées dans le localStorage
   */
  setItem(key: string, value: string): void {
    try {
      const encryptedData = this.encrypt(value);
      localStorage.setItem(`secure_${key}`, encryptedData);
    } catch (error) {
      console.error('Erreur lors du stockage sécurisé:', error);
    }
  }

  /**
   * Récupère et déchiffre les données du localStorage
   */
  getItem(key: string): string | null {
    try {
      const encryptedData = localStorage.getItem(`secure_${key}`);
      if (!encryptedData) return null;
      return this.decrypt(encryptedData);
    } catch (error) {
      console.error('Erreur lors de la récupération du stockage sécurisé:', error);
      return null;
    }
  }

  /**
   * Supprime les données du localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(`secure_${key}`);
    } catch (error) {
      console.error('Erreur lors de la suppression du stockage sécurisé:', error);
    }
  }

  /**
   * Nettoie toutes les données sécurisées
   */
  clear(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('secure_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Erreur lors du nettoyage du stockage sécurisé:', error);
    }
  }
}

// Exporter une instance singleton
export const secureStorageService = new SecureStorageService();
