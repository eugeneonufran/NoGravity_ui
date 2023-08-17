import { useState } from "react";

type SetValueFunction<T> = (value: T | ((prevValue: T) => T)) => void;

function useSessionStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, SetValueFunction<T>, () => void] {
  const storedValue = sessionStorage.getItem(key);
  const initial: T | undefined = storedValue
    ? JSON.parse(storedValue)
    : initialValue;

  const [value, setValue] = useState<T | undefined>(initial);

  const setStoredValue: SetValueFunction<T> = (newValue) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value as T) : newValue;
    setValue(valueToStore);
    sessionStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const deleteStoredValue = () => {
    setValue(undefined);
    sessionStorage.removeItem(key);
  };

  return [value, setStoredValue, deleteStoredValue];
}

export default useSessionStorage;
