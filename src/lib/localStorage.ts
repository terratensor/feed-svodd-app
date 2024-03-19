const storage = {
    get(key: string) {
        try {
            const value = localStorage.getItem(key) ?? '';
            return JSON.parse(value);
        } catch (error) {
            console.error(`Error getting item ${key} from localStorage:`, error);
        }
    }, set(key: string, value: string) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item ${key} in localStorage:`, error);
        }
    }, remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item ${key} from localStorage:`, error);
        }
    },
};
export default storage;

