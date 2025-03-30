/**
 * Secure storage utility for handling sensitive data
 * This implementation uses localStorage but in production would use more secure methods
 */

const secureStorage = {
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to secure storage:', error);
    }
  },

  getItem: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error retrieving from secure storage:', error);
      return defaultValue;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from secure storage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
    }
  }
};

export default secureStorage;