import { createContext, useContext, type ReactNode } from 'react';

type BookNavigationContextValue = {
  currentIndex: number;
  totalPages: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
};

const BookNavigationContext = createContext<BookNavigationContextValue | null>(null);

export function BookNavigationProvider({
  currentIndex,
  totalPages,
  goToNext,
  goToPrev,
  goToIndex,
  children,
}: BookNavigationContextValue & { children: ReactNode }) {
  const value: BookNavigationContextValue = {
    currentIndex,
    totalPages,
    goToNext,
    goToPrev,
    goToIndex,
  };
  return (
    <BookNavigationContext.Provider value={value}>
      {children}
    </BookNavigationContext.Provider>
  );
}

export function useBookNavigation() {
  const ctx = useContext(BookNavigationContext);
  if (!ctx) throw new Error('useBookNavigation must be used within BookNavigationProvider');
  return ctx;
}
