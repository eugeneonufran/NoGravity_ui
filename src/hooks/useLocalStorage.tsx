export const useLocalStorage = () => {
  const clearLS = () => {
    localStorage.clear();
  };

  const setItemInLS = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItemFromLS = (key: string) => {
    localStorage.removeItem(key);
  };

  const getItemFromLS = (key: string) => {
    const item = localStorage.getItem(key);

    const obj = item ? JSON.parse(item) : [];
    return obj;
  };

  return { setItemInLS, getItemFromLS, removeItemFromLS, clearLS };
};
