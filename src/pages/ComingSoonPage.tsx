import { ArrowLeft } from 'lucide-react';
import { ActionLink } from '../components/ui/Button';
import { ZirinBrand } from '../components/ui/ZirinBrand';

interface ComingSoonPageProps {
  title: string;
  description: string;
}

/**
 * Honest placeholder for upcoming MVP pages during Phase 1.
 */
export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-5xl flex-col px-6 pt-6 pb-8 sm:px-10 sm:pt-8 lg:h-full lg:min-h-0">
      <header className="flex items-center justify-between">
        <ZirinBrand />
      </header>

      <div className="my-auto flex max-w-xl flex-col items-start py-12">
        <span className="rounded-full bg-zirin-sand px-3 py-1 text-xs font-semibold text-zirin-brown">
          Étape suivante du MVP
        </span>
        <h1 className="mt-4 text-3xl font-bold text-zirin-brown sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zirin-ink-muted">
          {description}
        </p>
        <ActionLink to="/" variant="secondary" className="mt-7">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Retour à l&apos;accueil</span>
        </ActionLink>
      </div>
    </section>
  );
}
