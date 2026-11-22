import { ArrowRight, BookOpen, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionLink } from '../components/ui/Button';
import { HomeBackdrop } from '../components/ui/HomeBackdrop';
import { ZirinBrand } from '../components/ui/ZirinBrand';

export function HomePage() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden px-6 pt-5 pb-24 sm:px-10 sm:pt-7 sm:pb-28 lg:h-full lg:min-h-0 lg:px-16">
      <HomeBackdrop />

      {/* Top brand bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <ZirinBrand />
        <Link
          to="/contes"
          className="group inline-flex items-center gap-2.5 rounded-full border border-zirin-brown/15 bg-zirin-ivory/90 py-1.5 pr-4 pl-2 text-sm font-semibold text-zirin-brown shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-zirin-primary/40 hover:bg-zirin-ivory hover:shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zirin-primary"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zirin-primary/15 text-zirin-primary transition-transform duration-200 group-hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Contes &amp; Devinettes</span>
        </Link>
      </header>

      {/* Hero core — centered right over the griot at the heart of the circle */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center py-4 text-center">
        <p className="rounded-full bg-zirin-ivory/75 px-3.5 py-1 text-xs font-bold tracking-wider text-zirin-primary-text uppercase shadow-2xs backdrop-blur-[2px] sm:text-sm">
          Patrimoine oral malien et africain
        </p>

        <h1 className="mt-3 max-w-2xl text-3xl leading-[1.1] font-bold text-zirin-brown [text-shadow:0_2px_18px_rgba(255,249,240,0.98),0_0_8px_rgba(255,249,240,0.95)] sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
          Les contes de notre enfance reprennent vie.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed font-semibold text-zirin-ink [text-shadow:0_1px_14px_rgba(255,249,240,0.98),0_0_6px_rgba(255,249,240,0.95)] sm:mt-4 sm:text-base lg:text-lg">
          Lisez des récits transmis de génération en génération et testez votre
          esprit avec des devinettes pensées pour les petits et les grands.
        </p>

        <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:gap-3.5">
          <ActionLink to="/contes" variant="primary" className="w-full shadow-md sm:w-auto">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <span>Découvrir les contes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>

          <ActionLink
            to="/devinettes"
            variant="secondary"
            className="w-full bg-zirin-ivory/95 shadow-sm backdrop-blur-xs sm:w-auto"
          >
            <Target className="h-5 w-5" aria-hidden="true" />
            <span>Jouer aux devinettes</span>
          </ActionLink>
        </div>
      </div>

      {/* Bottom spacer to balance vertical centering above the floating dock */}
      <div className="relative z-10 mx-auto hidden w-full max-w-5xl lg:block" aria-hidden="true" />
    </section>
  );
}
