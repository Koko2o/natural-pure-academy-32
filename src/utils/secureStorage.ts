
// src/utils/secureStorage.ts
const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to secureStorage:', error);
    }
  },
  
  getItem: (key: string): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving from secureStorage:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from secureStorage:', error);
    }
  }
};

export default secureStorage;
