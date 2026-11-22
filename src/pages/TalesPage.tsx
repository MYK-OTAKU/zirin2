import { BookOpen, Clock3, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTaleAgeRanges, getTaleCategories, getTales } from '../data/tales';
import { ZirinBrand } from '../components/ui/ZirinBrand';

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

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-6xl flex-col px-6 pt-6 pb-28 sm:px-10 sm:pt-8 lg:h-full lg:min-h-0 lg:pb-6">
      <header className="flex items-center justify-between">
        <ZirinBrand />
        <span className="rounded-full border border-zirin-brown/15 bg-white/70 px-3.5 py-1 text-xs font-medium text-zirin-brown">
          {tales.length} histoires à découvrir
        </span>
      </header>

      <div className="mt-7 flex min-h-0 flex-1 flex-col">
        <div className="mb-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-zirin-primary-text">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Un moment de lecture à partager
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Le catalogue des contes</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zirin-ink-muted sm:text-base">
            Des histoires originales à lire en famille, avec une morale et une
            durée de lecture pour chacune.
          </p>
        </div>

        <div className="grid gap-3 rounded-2xl border border-zirin-brown/10 bg-white/75 p-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(11rem,0.7fr)_minmax(10rem,0.55fr)] sm:p-4">
          <label className="relative block">
            <span className="sr-only">Rechercher un conte</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zirin-ink-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un conte…"
              className="min-h-11 w-full rounded-xl border border-zirin-brown/15 bg-zirin-ivory py-2 pr-3 pl-10 text-sm text-zirin-ink placeholder:text-zirin-ink-muted/75"
            />
          </label>

          <label className="block">
            <span className="sr-only">Filtrer par catégorie</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-zirin-brown/15 bg-zirin-ivory px-3 text-sm text-zirin-ink"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Filtrer par âge</span>
            <select
              value={ageRange}
              onChange={(event) => setAgeRange(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-zirin-brown/15 bg-zirin-ivory px-3 text-sm text-zirin-ink"
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

        <div className="mt-4 flex items-center justify-between text-sm text-zirin-ink-muted">
          <p aria-live="polite">
            {filteredTales.length} {filteredTales.length > 1 ? 'contes trouvés' : 'conte trouvé'}
          </p>
          {(query || category || ageRange) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('');
                setAgeRange('');
              }}
              className="min-h-10 rounded-full px-3 font-semibold text-zirin-brown underline-offset-4 hover:underline"
            >
              Effacer les filtres
            </button>
          )}
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-2">
          {filteredTales.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list">
              {filteredTales.map((tale) => (
                <li key={tale.id}>
                  <Link
                    to={`/contes/${tale.slug}`}
                    className="group flex h-full min-h-52 flex-col rounded-2xl border border-zirin-brown/12 bg-white/80 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zirin-primary/45 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zirin-primary"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zirin-sand text-zirin-brown">
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-zirin-sand/75 px-3 py-1 text-xs font-medium text-zirin-brown">
                        {tale.category}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold transition-colors group-hover:text-zirin-primary-text">
                      {tale.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zirin-ink-muted">
                      {tale.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-zirin-brown/10 pt-3 text-xs text-zirin-ink-muted">
                      <span>{tale.ageRange}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                        {tale.readingTime} min
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-zirin-brown/25 bg-white/50 px-6 text-center">
              <BookOpen className="h-8 w-8 text-zirin-primary-text" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">Aucun conte trouvé</h2>
              <p className="mt-1 max-w-md text-sm text-zirin-ink-muted">
                Essaie un autre mot ou retire un filtre pour retrouver les histoires.
              </p>
            </div>
          )}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-zirin-ink-muted">
          Ces récits sont des créations contemporaines inspirées. Ils ne sont pas
          présentés comme des transcriptions de contes traditionnels.
        </p>
      </div>
    </section>
  );
}
