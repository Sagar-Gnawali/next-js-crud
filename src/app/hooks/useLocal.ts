import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, sessionStoreageKey: T) {
  const [session, setSession] = useState<T>(() => {
    if (typeof localStorage === "undefined") {
      return sessionStoreageKey;
    }
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    return sessionStoreageKey;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(session));
  }, [key, session]);

  return [session, setSession] as const;
}
