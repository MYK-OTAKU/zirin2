import { ArrowRight, BookOpen, Target } from 'lucide-react';
import { ActionLink } from '../components/ui/Button';
import { HomeBackdrop } from '../components/ui/HomeBackdrop';
import { ZirinBrand } from '../components/ui/ZirinBrand';

export function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-6rem)] flex-col justify-between overflow-hidden px-6 pt-6 pb-8 sm:px-10 sm:pt-8 lg:h-full lg:min-h-0 lg:px-16">
      <HomeBackdrop />

      {/* Top brand bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <ZirinBrand />
        <span className="rounded-full border border-zirin-brown/15 bg-zirin-ivory/80 px-3.5 py-1 text-xs font-medium text-zirin-brown backdrop-blur-sm">
          Contes &amp; Devinettes
        </span>
      </header>

      {/* Hero core */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-start py-10 sm:py-12">
        <p className="text-sm font-semibold tracking-wide text-zirin-primary-text uppercase">
          Patrimoine oral malien et africain
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.12] font-bold text-zirin-brown sm:text-5xl lg:text-6xl">
          Les contes de notre enfance reprennent vie.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-zirin-ink-muted sm:text-lg">
          Lisez des récits transmis de génération en génération et testez votre
          esprit avec des devinettes pensées pour les petits et les grands.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
          <ActionLink to="/contes" variant="primary" className="w-full sm:w-auto">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <span>Découvrir les contes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>

          <ActionLink to="/devinettes" variant="secondary" className="w-full sm:w-auto">
            <Target className="h-5 w-5" aria-hidden="true" />
            <span>Jouer aux devinettes</span>
          </ActionLink>
        </div>
      </div>

      {/* Subtle footer spacer to balance desktop composition above the floating dock */}
      <div className="relative z-10 mx-auto hidden w-full max-w-5xl lg:block" aria-hidden="true" />
    </section>
  );
}
