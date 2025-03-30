/**
 * Secure storage utility for handling sensitive data
 * This implementation uses localStorage but in production would use more secure methods
 */

const secureStorage = {
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};

export default secureStorage;