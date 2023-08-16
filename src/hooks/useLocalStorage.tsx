import { useState } from "react";

type SetValueFunction<T> = (value: T | ((prevValue: T) => T)) => void;

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, SetValueFunction<T>, () => void] {
  const storedValue = localStorage.getItem(key);
  const initial: T | undefined = storedValue
    ? JSON.parse(storedValue)
    : initialValue;

  const [value, setValue] = useState<T | undefined>(initial);

  const setStoredValue: SetValueFunction<T> = (newValue) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value as T) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const deleteStoredValue = () => {
    setValue(undefined);
    localStorage.removeItem(key);
  };

  return [value, setStoredValue, deleteStoredValue];
}

export default useLocalStorage;
