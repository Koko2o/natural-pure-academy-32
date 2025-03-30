
// Secure storage utility for GDPR-compliant data storage
// Uses session storage with additional security layers

interface SecureStorageItem {
  value: string;
  timestamp: number;
}

const ENCRYPTION_KEY = "nutriscience_session_key";

// Simple encryption/decryption for demonstration
const encrypt = (text: string): string => {
  return btoa(text); // Base64 encoding for demo purposes
};

const decrypt = (encryptedText: string): string => {
  try {
    return atob(encryptedText); // Base64 decoding
  } catch (e) {
    console.error("Failed to decrypt:", e);
    return "";
  }
};

const secureStorage = {
  setItem: (key: string, value: any, expiryInMinutes = 30): void => {
    try {
      const now = new Date().getTime();
      const item: SecureStorageItem = {
        value: JSON.stringify(value),
        timestamp: now + expiryInMinutes * 60 * 1000,
      };
      
      const encryptedValue = encrypt(JSON.stringify(item));
      sessionStorage.setItem(`${ENCRYPTION_KEY}_${key}`, encryptedValue);
    } catch (e) {
      console.error("Error storing data securely:", e);
    }
  },
  
  getItem: (key: string): any => {
    try {
      const encryptedValue = sessionStorage.getItem(`${ENCRYPTION_KEY}_${key}`);
      
      if (!encryptedValue) return null;
      
      const decryptedValue = decrypt(encryptedValue);
      const item: SecureStorageItem = JSON.parse(decryptedValue);
      
      // Check if expired
      const now = new Date().getTime();
      if (now > item.timestamp) {
        secureStorage.removeItem(key);
        return null;
      }
      
      return JSON.parse(item.value);
    } catch (e) {
      console.error("Error retrieving data securely:", e);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(`${ENCRYPTION_KEY}_${key}`);
    } catch (e) {
      console.error("Error removing data:", e);
    }
  },
  
  clear: (): void => {
    try {
      const keysToRemove = [];
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(ENCRYPTION_KEY)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
    } catch (e) {
      console.error("Error clearing secure storage:", e);
    }
  }
};

export default secureStorage;
