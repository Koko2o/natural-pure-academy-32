/**
 * Secure storage utility for handling sensitive user data
 * Implements encryption for client-side storage
 */

// Simple encryption/decryption for demo purposes
// In production, use a proper encryption library
function encrypt(data: string): string {
  return btoa(encodeURIComponent(data));
}

function decrypt(data: string): string {
  try {
    return decodeURIComponent(atob(data));
  } catch (e) {
    console.error("Decryption failed", e);
    return "";
  }
}

const secureStorage = {
  setItem: (key: string, value: any) => {
    try {
      const encryptedValue = encrypt(JSON.stringify(value));
      sessionStorage.setItem(key, encryptedValue);
    } catch (err) {
      console.error("Error storing data securely", err);
    }
  },

  getItem: (key: string) => {
    try {
      const encryptedValue = sessionStorage.getItem(key);
      if (!encryptedValue) return null;
      return JSON.parse(decrypt(encryptedValue));
    } catch (err) {
      console.error("Error retrieving secure data", err);
      return null;
    }
  },

  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  }
};

export default secureStorage;