import { useState } from 'react';
import {
  BookOpen,
  Eye,
  EyeOff,
  Filter,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  BogolanBackground,
  MalianFrieze,
} from '../../components/ui/AfricanDecorations';
import { riddleRepository } from '../../data/repositories/riddleRepository';
import type { RiddleLevel } from '../../domain/riddles';

export function RiddleLibraryView() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<RiddleLevel | 'all'>('all');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const allRiddles = riddleRepository.getAll();

  const filteredRiddles = allRiddles.filter((r) => {
    const matchesLevel = selectedLevel === 'all' || r.level === selectedLevel;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      r.question.toLowerCase().includes(term) ||
      r.answer.toLowerCase().includes(term);
    return matchesLevel && matchesSearch;
  });

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealedIds(new Set(filteredRiddles.map((r) => r.id)));
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 pb-12 animate-in fade-in duration-300">
      {/* Header and Search Controls */}
      <div className="flex w-full min-w-0 flex-col gap-4 rounded-3xl border-2 border-zirin-brown/20 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] p-6 shadow-md sm:p-8">
        <div className="flex w-full min-w-0 flex-col items-start gap-3">
          <div className="flex w-full min-w-0 flex-col items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zirin-gold-warm/20 text-zirin-brown shadow-inner">
              <BookOpen className="h-6 w-6 text-zirin-terracotta" />
            </div>
            <div>
              <h2 className="break-words text-xl font-black text-zirin-brown font-display sm:text-2xl">
                Le Grand Recueil des 45 Devinettes
              </h2>
              <p className="break-words text-xs text-zirin-ink-muted">
                Explorez le recueil complet du patrimoine oral, étudiez et révisez les énigmes
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-2">
            <button
              type="button"
              onClick={revealAll}
              className="min-h-11 w-full rounded-full border border-zirin-brown/20 bg-white px-3.5 py-1.5 text-xs font-bold text-zirin-brown shadow-2xs hover:bg-zirin-sand"
            >
              Tout afficher
            </button>
            <button
              type="button"
              onClick={hideAll}
              className="min-h-11 w-full rounded-full border border-zirin-brown/20 bg-white px-3.5 py-1.5 text-xs font-bold text-zirin-brown shadow-2xs hover:bg-zirin-sand"
            >
              Tout masquer
            </button>
          </div>
        </div>

        {/* Search input + Level filters */}
        <div className="mt-2 flex flex-col gap-3">
          {/* Search bar */}
          <div className="relative w-full min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zirin-ink-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une énigme ou un mot (ex: soleil, baobab, mer...)"
              className="min-h-12 w-full min-w-0 rounded-2xl border-2 border-zirin-brown/20 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-zirin-brown-deep placeholder:text-zirin-ink-muted/50 focus:border-zirin-terracotta focus:outline-none focus:ring-2 focus:ring-zirin-gold-warm/30"
            />
          </div>

          {/* Level chips */}
          <div className="flex w-full min-w-0 flex-col items-stretch gap-2 pb-1">
            <Filter className="h-4 w-4 text-zirin-brown shrink-0" />
            <button
              type="button"
              onClick={() => setSelectedLevel('all')}
              className={`min-h-11 w-full rounded-full px-3 py-2 text-left text-xs font-bold whitespace-normal break-words transition ${
                selectedLevel === 'all'
                  ? 'bg-zirin-brown text-white'
                  : 'bg-white text-zirin-brown border border-zirin-brown/20 hover:bg-zirin-sand'
              }`}
            >
              Tous ({allRiddles.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel('facile')}
              className={`min-h-11 w-full rounded-full px-3 py-2 text-left text-xs font-bold whitespace-normal break-words transition ${
                selectedLevel === 'facile'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Facile (15)
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel('moyen')}
              className={`min-h-11 w-full rounded-full px-3 py-2 text-left text-xs font-bold whitespace-normal break-words transition ${
                selectedLevel === 'moyen'
                  ? 'bg-[#B37400] text-white'
                  : 'bg-white text-amber-950 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              Moyen (15)
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel('difficile')}
              className={`min-h-11 w-full rounded-full px-3 py-2 text-left text-xs font-bold whitespace-normal break-words transition ${
                selectedLevel === 'difficile'
                  ? 'bg-zirin-red-trad text-white'
                  : 'bg-white text-rose-950 border border-rose-300 hover:bg-rose-50'
              }`}
            >
              Difficile (15)
            </button>
          </div>
        </div>

        {/* Result summary */}
        <div className="flex w-full flex-col items-start gap-2 text-xs font-semibold text-zirin-ink-muted">
          <span className="max-w-full break-words">{filteredRiddles.length} devinette{filteredRiddles.length > 1 ? 's' : ''} trouvée{filteredRiddles.length > 1 ? 's' : ''}</span>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="min-h-11 max-w-full text-left text-zirin-terracotta underline"
            >
              Effacer la recherche
            </button>
          )}
        </div>
      </div>

      {/* One riddle per full-width card */}
      <div className="flex w-full min-w-0 flex-col gap-4">
        {filteredRiddles.map((riddle) => {
          const isRevealed = revealedIds.has(riddle.id);
          const levelBadgeClass =
            riddle.level === 'facile'
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : riddle.level === 'moyen'
                ? 'bg-amber-100 text-amber-950 border-amber-300'
                : 'bg-rose-100 text-rose-950 border-rose-300';

          return (
            <article
              key={riddle.id}
              className="relative flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-zirin-brown/15 bg-white p-5 shadow-sm transition hover:border-zirin-terracotta/50 hover:shadow-md"
            >
              <BogolanBackground className="text-zirin-brown/5" />

              <div className="relative z-10 flex flex-col">
                <div className="flex flex-col items-start gap-2">
                  <span
                    className={`max-w-full rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider whitespace-normal break-words ${levelBadgeClass}`}
                  >
                    Niveau {riddle.level}
                  </span>

                  <span className="flex items-center gap-1 text-[11px] font-bold text-zirin-brown">
                    <Sparkles className="h-3 w-3 text-zirin-gold-warm" />
                    <span>+{riddle.points} pt{riddle.points > 1 ? 's' : ''}</span>
                  </span>
                </div>

                <div className="mt-3.5">
                  <span className="text-[10px] font-bold text-zirin-terracotta uppercase tracking-wider">
                    Énigme #{riddle.originalId}
                  </span>
                  <h3 className="mt-1 max-w-full break-words text-base font-bold leading-snug text-zirin-brown-deep font-display">
                    « {riddle.question} »
                  </h3>
                </div>
              </div>

              {/* Reveal answer card */}
              <div className="relative z-10 mt-5 border-t border-zirin-brown/10 pt-3">
                {isRevealed ? (
                  <div className="rounded-xl border border-zirin-gold-warm/60 bg-gradient-to-br from-[#FFF8EE] to-zirin-sand/60 p-3 text-center animate-in fade-in duration-200">
                    <span className="text-[10px] font-extrabold text-zirin-terracotta uppercase tracking-wider">
                      Réponse officielle
                    </span>
                    <p className="mt-0.5 text-sm font-black text-zirin-brown-deep font-display underline decoration-zirin-gold-warm">
                      {riddle.answer}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleReveal(riddle.id)}
                      className="mt-2 inline-flex min-h-11 items-center gap-1 text-[11px] font-semibold text-zirin-ink-muted hover:text-zirin-brown"
                    >
                      <EyeOff className="h-3 w-3" />
                      <span>Masquer</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleReveal(riddle.id)}
                    className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full border border-zirin-brown/20 bg-zirin-sand/50 py-2 text-xs font-bold text-zirin-brown transition hover:bg-zirin-sand active:scale-95"
                  >
                    <Eye className="h-3.5 w-3.5 text-zirin-terracotta" />
                    <span>Découvrir la solution</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <MalianFrieze className="mt-4 text-zirin-gold-warm/60" />
    </div>
  );
}
