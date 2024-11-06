import { createContext, useContext } from 'react';

export const SaveHistoryContext = createContext<() => Promise<void>>(async () => {});

export const useSaveHistory = () => {
  const ctx = useContext(SaveHistoryContext);
  return ctx;
}
