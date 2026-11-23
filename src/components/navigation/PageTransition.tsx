import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Lightweight book-page-inspired transition wrapper.
 * Automatically disabled when prefers-reduced-motion: reduce is active.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="zirin-page-enter min-h-full w-full">
      {children}
    </div>
  );
}
