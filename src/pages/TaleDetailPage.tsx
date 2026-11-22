import { ArrowLeft, BookOpen, Clock3, Headphones } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getTaleBySlug } from '../data/tales';
import { ZirinBrand } from '../components/ui/ZirinBrand';

export function TaleDetailPage() {
  const { slug } = useParams();
  const tale = slug ? getTaleBySlug(slug) : undefined;

  if (!tale) {
    return <Navigate to="/contes" replace />;
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-6xl flex-col px-6 pt-6 pb-28 sm:px-10 sm:pt-8 lg:h-full lg:min-h-0 lg:pb-6">
      <header className="flex shrink-0 items-center justify-between">
        <ZirinBrand />
        <Link
          to="/contes"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-zirin-brown hover:bg-zirin-sand/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zirin-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Retour aux contes</span>
        </Link>
      </header>

      <div className="mt-6 min-h-0 flex-1 overflow-y-auto pb-4">
        <article className="mx-auto w-full max-w-3xl">
          <div className="rounded-3xl border border-zirin-brown/10 bg-white/75 p-5 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-zirin-primary-text">{tale.category}</p>
            <h1 className="mt-2 text-3xl leading-tight font-bold sm:text-4xl">
              {tale.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zirin-ink-muted">
              {tale.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zirin-brown/10 pt-4 text-sm text-zirin-ink-muted">
              <span>{tale.ageRange}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {tale.readingTime} min de lecture
              </span>
              {tale.audioUrl ? (
                <span className="inline-flex items-center gap-1.5">
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  Écoute disponible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Lecture écrite
                </span>
              )}
            </div>
            {tale.audioUrl && (
              <audio
                controls
                preload="none"
                src={tale.audioUrl}
                className="mt-5 w-full"
              >
                Votre navigateur ne prend pas en charge la lecture audio.
              </audio>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-zirin-primary/20 bg-zirin-sand/45 p-4 text-sm leading-relaxed text-zirin-brown">
            <p className="font-semibold">À propos de ce récit</p>
            <p className="mt-1">{tale.origin.note}</p>
          </div>

          <div className="mt-6 rounded-3xl border border-zirin-brown/10 bg-zirin-ivory px-5 py-6 sm:px-10 sm:py-9">
            <p className="font-[family-name:var(--font-display)] text-lg leading-relaxed text-zirin-brown sm:text-xl">
              {tale.content.introduction}
            </p>

            <div className="mt-7 space-y-7">
              {tale.content.chapters.map((chapter, index) => (
                <section key={`${chapter.title}-${index}`}>
                  <h2 className="text-xl font-bold">{chapter.title}</h2>
                  <p className="mt-3 whitespace-pre-line text-base leading-[1.9] text-zirin-ink sm:text-lg">
                    {chapter.text}
                  </p>
                </section>
              ))}
            </div>

            <p className="mt-7 border-t border-zirin-brown/10 pt-6 text-base leading-[1.9] text-zirin-ink sm:text-lg">
              {tale.content.conclusion}
            </p>
          </div>

          <aside className="mt-4 rounded-2xl bg-zirin-sand/70 p-5">
            <h2 className="text-lg font-bold">La morale</h2>
            <p className="mt-2 leading-relaxed text-zirin-ink">{tale.moral}</p>
          </aside>
        </article>
      </div>
    </section>
  );
}
