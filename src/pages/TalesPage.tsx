import { ArrowRight, BookOpen, Clock3, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZirinBrand } from '../components/ui/ZirinBrand';
import {
  BogolanBackground,
  MalianFrieze,
  MalianToronAccent,
} from '../components/ui/AfricanDecorations';
import storyImage from '../assets/illustrations/hero.jpg';
import { getTaleAgeRanges, getTaleCategories, getTales } from '../data/tales';

export function TalesPage() {
  const tales = getTales();
  const categories = getTaleCategories();
  const ageRanges = getTaleAgeRanges();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const filteredTales = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');

    return tales.filter((tale) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [tale.title, tale.summary, tale.category, ...tale.tags]
          .join(' ')
          .toLocaleLowerCase('fr')
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (!category || tale.category === category) &&
        (!ageRange || tale.ageRange === ageRange)
      );
    });
  }, [ageRange, category, query, tales]);

  const hasActiveFilters = Boolean(query || category || ageRange);

  function clearFilters() {
    setQuery('');
    setCategory('');
    setAgeRange('');
  }

  return (
    <section className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 pt-4 pb-28 sm:px-8 sm:pt-6">
      <header className="flex w-full min-w-0 flex-col items-start gap-3 border-b border-zirin-brown/10 pb-4">
        <ZirinBrand />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zirin-brown/15 bg-zirin-sand/60 px-3.5 py-1 text-xs font-semibold text-zirin-brown">
          <BookOpen className="h-3.5 w-3.5 text-zirin-primary" aria-hidden="true" />
          Espace des contes
        </span>
      </header>

      <div className="mt-6 flex w-full min-w-0 flex-1 flex-col gap-7">
        <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-gold-warm/40 bg-gradient-to-br from-[#2D1B10] via-[#4A2E1B] to-[#1A1412] p-6 text-white shadow-xl sm:p-10">
          <BogolanBackground className="text-zirin-gold-warm/10" />

          <div className="relative z-10 flex min-w-0 flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-zirin-gold-warm/50 bg-[#1A1412]/80 px-4 py-1.5 text-xs font-bold tracking-wider text-zirin-gold-light uppercase backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-zirin-gold-warm" aria-hidden="true" />
                Sagesse du Mandé et veillées d’Afrique
              </span>

              <h1 className="w-full max-w-full break-words text-3xl leading-tight font-black text-[#FFF8ED] sm:text-4xl lg:text-5xl">
                Les contes du Mali
              </h1>
              <p className="w-full max-w-3xl text-base leading-relaxed font-medium text-[#EAD4B3] sm:text-lg">
                Retrouve les récits de sagesse, de courage et de transmission, et fais vivre la
                parole des conteurs.
              </p>
              <MalianToronAccent className="text-zirin-gold-warm/60" />

              <div className="mt-1 flex w-full flex-wrap gap-3 text-xs font-semibold text-[#F6E8D2]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zirin-terracotta/60 bg-zirin-terracotta/40 px-3.5 py-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-zirin-gold-warm" aria-hidden="true" />
                  {tales.length} récits à découvrir
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-zirin-gold-light" aria-hidden="true" />
                  {tales.length - 15} contes complémentaires
                </span>
              </div>
            </div>

            <div className="relative w-full min-w-0 lg:w-[42%]">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-zirin-gold-warm/50 bg-zirin-brown-deep shadow-2xl">
                <img
                  src={storyImage}
                  alt="Un conteur partage une histoire autour du feu sous un baobab"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1412]/80 via-transparent to-transparent" />
                <p className="absolute right-4 bottom-3 left-4 text-sm font-bold tracking-wide text-zirin-gold-light">
                  « La parole est le fil qui relie les générations. »
                </p>
              </div>
            </div>
          </div>
        </section>

        <MalianFrieze className="text-zirin-terracotta/60" />

        <section
          aria-label="Rechercher et filtrer les contes"
          className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-brown/20 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] p-5 shadow-md sm:p-8"
        >
          <BogolanBackground className="text-zirin-brown/5" />

          <div className="relative z-10 flex min-w-0 flex-col gap-5">
            <div className="flex min-w-0 items-start gap-3 border-b border-zirin-brown/15 pb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zirin-gold-warm/20 text-zirin-brown shadow-inner">
                <BookOpen className="h-5 w-5 text-zirin-terracotta" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="break-words text-lg font-bold text-zirin-brown sm:text-xl">
                  Le grand recueil des contes
                </h2>
                <p className="mt-1 text-xs text-zirin-ink-muted">
                  Recherche une histoire ou choisis un thème et un âge.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(10rem,0.8fr)_minmax(9rem,0.65fr)]">
              <label className="block min-w-0">
                <span className="mb-1.5 block pl-1 text-xs font-bold tracking-wider text-zirin-ink-muted uppercase">
                  Rechercher
                </span>
                <span className="relative block">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zirin-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Titre, lieu ou personnage…"
                    className="min-h-12 w-full min-w-0 rounded-2xl border-2 border-zirin-brown/20 bg-white py-3 pr-4 pl-11 text-sm font-semibold text-zirin-brown-deep placeholder:text-zirin-ink-muted/60 focus:border-zirin-terracotta focus:outline-none focus:ring-2 focus:ring-zirin-gold-warm/30"
                  />
                </span>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block pl-1 text-xs font-bold tracking-wider text-zirin-ink-muted uppercase">
                  Thème
                </span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="min-h-12 w-full min-w-0 rounded-2xl border-2 border-zirin-brown/20 bg-white px-3 text-sm font-semibold text-zirin-brown-deep focus:border-zirin-terracotta focus:outline-none focus:ring-2 focus:ring-zirin-gold-warm/30"
                >
                  <option value="">Tous les thèmes</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block pl-1 text-xs font-bold tracking-wider text-zirin-ink-muted uppercase">
                  Âge
                </span>
                <select
                  value={ageRange}
                  onChange={(event) => setAgeRange(event.target.value)}
                  className="min-h-12 w-full min-w-0 rounded-2xl border-2 border-zirin-brown/20 bg-white px-3 text-sm font-semibold text-zirin-brown-deep focus:border-zirin-terracotta focus:outline-none focus:ring-2 focus:ring-zirin-gold-warm/30"
                >
                  <option value="">Tous les âges</option>
                  {ageRanges.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex min-w-0 flex-col items-start gap-2 border-t border-zirin-brown/10 pt-4 text-xs font-semibold text-zirin-ink-muted sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite">
                <span className="font-black text-zirin-brown">
                  {filteredTales.length}
                </span>{' '}
                conte{filteredTales.length === 1 ? '' : 's'} trouvé
                {filteredTales.length === 1 ? '' : 's'}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-11 rounded-full border border-zirin-brown/20 bg-zirin-sand/70 px-4 py-2 font-bold text-zirin-brown transition hover:bg-zirin-sand"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>
        </section>

        <MalianFrieze className="text-zirin-gold-warm/60" />

        {filteredTales.length > 0 ? (
          <ul className="flex w-full min-w-0 flex-col gap-4" role="list">
            {filteredTales.map((tale, index) => (
              <li key={tale.id}>
                <Link
                  to={`/contes/${tale.slug}`}
                  className="group relative flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-zirin-brown/15 bg-white p-5 shadow-sm transition hover:border-zirin-terracotta/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zirin-primary sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                >
                  <BogolanBackground className="text-zirin-brown/5" />

                  <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="max-w-full rounded-full border border-zirin-gold-warm/50 bg-zirin-sand/70 px-3 py-1 text-[10px] font-extrabold tracking-wider text-zirin-brown uppercase">
                        {tale.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zirin-brown">
                        <Sparkles className="h-3 w-3 text-zirin-gold-warm" aria-hidden="true" />
                        Conte #{index + 1}
                      </span>
                    </div>

                    <h2 className="mt-3 break-words text-lg leading-snug font-bold text-zirin-brown-deep transition-colors group-hover:text-zirin-terracotta sm:text-xl">
                      {tale.title}
                    </h2>
                    <p className="mt-2 break-words text-sm leading-relaxed text-zirin-ink-muted">
                      {tale.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zirin-brown/10 pt-3 text-xs font-medium text-zirin-ink-muted">
                      <span>{tale.ageRange}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-zirin-terracotta" aria-hidden="true" />
                        {tale.readingTime} min de lecture
                      </span>
                    </div>
                  </div>

                  <span className="relative z-10 mt-5 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-zirin-terracotta via-zirin-terracotta-warm to-zirin-terracotta px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-zirin-terracotta/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg sm:mt-0 sm:w-auto">
                    Lire le conte
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <section className="relative flex min-h-56 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-zirin-brown/25 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] px-6 py-10 text-center shadow-sm">
            <BogolanBackground className="text-zirin-brown/5" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zirin-gold-warm/20 text-zirin-brown">
                <BookOpen className="h-6 w-6 text-zirin-terracotta" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-zirin-brown">Aucun conte trouvé</h2>
              <p className="mt-1 max-w-md text-sm text-zirin-ink-muted">
                Essaie un autre mot ou retire un filtre pour retrouver les histoires.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 min-h-11 rounded-full bg-gradient-to-r from-zirin-terracotta to-zirin-terracotta-warm px-5 py-2 text-sm font-bold text-white shadow-md transition hover:shadow-lg"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </section>
        )}

        <MalianFrieze className="text-zirin-gold-warm/60" />

        <footer className="flex w-full flex-col items-start gap-2 border-t-2 border-zirin-brown/15 pt-5 text-xs leading-relaxed text-zirin-ink-muted sm:flex-row sm:items-center sm:gap-3">
          <BookOpen className="h-4 w-4 shrink-0 text-zirin-terracotta" aria-hidden="true" />
          <p>
            Les récits indiquent leur source et leur statut éditorial; aucune provenance
            traditionnelle n’est présentée comme authentifiée sans source vérifiable.
          </p>
        </footer>
      </div>
    </section>
  );
}
