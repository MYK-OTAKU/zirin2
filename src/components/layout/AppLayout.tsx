import type { ReactNode } from 'react';
import { AppDock } from '../navigation/AppDock';
import { PageTransition } from '../navigation/PageTransition';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-zirin-ivory text-zirin-ink lg:h-dvh lg:overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-zirin-brown focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zirin-ivory"
      >
        Aller au contenu principal
      </a>

      <main
        id="main-content"
        className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto pb-24"
      >
        <PageTransition>{children}</PageTransition>
      </main>

      <AppDock />
    </div>
  );
}
