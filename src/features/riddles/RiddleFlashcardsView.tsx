import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  AdinkraNyansapo,
  BogolanBackground,
  MalianToronAccent,
} from '../../components/ui/AfricanDecorations';
import { riddleRepository } from '../../data/repositories/riddleRepository';
import type { RiddleItem, RiddleLevel } from '../../domain/riddles';
import { africanAudio } from './africanAudio';

export function RiddleFlashcardsView() {
  const [filterLevel, setFilterLevel] = useState<RiddleLevel | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const riddles: readonly RiddleItem[] =
    filterLevel === 'all'
      ? riddleRepository.getAll()
      : riddleRepository.getByLevel(filterLevel);

  const currentRiddle = riddles[currentIndex] ?? riddles[0]!;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % riddles.length);
    africanAudio.playStartSound();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + riddles.length) % riddles.length);
    africanAudio.playStartSound();
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    africanAudio.playSuccessSound();
  };

  const handleFilterChange = (lvl: RiddleLevel | 'all') => {
    setFilterLevel(lvl);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 animate-in fade-in duration-300">
      {/* Header & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-zirin-brown font-display sm:text-3xl">
            Cartes de Veillée
          </h2>
          <p className="text-xs text-zirin-ink-muted sm:text-sm">
            Cartes interactives à retourner, idéales pour jouer à plusieurs ou animer une veillée
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-zirin-brown/20 bg-white/80 p-1 text-xs font-bold shadow-xs">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`rounded-full px-3 py-1 transition ${
              filterLevel === 'all'
                ? 'bg-zirin-brown text-white'
                : 'text-zirin-brown hover:bg-zirin-sand'
            }`}
          >
            Toutes ({riddleRepository.getAll().length})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('facile')}
            className={`rounded-full px-3 py-1 transition ${
              filterLevel === 'facile'
                ? 'bg-emerald-800 text-white'
                : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            Facile (15)
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('moyen')}
            className={`rounded-full px-3 py-1 transition ${
              filterLevel === 'moyen'
                ? 'bg-[#B37400] text-white'
                : 'text-[#B37400] hover:bg-amber-50'
            }`}
          >
            Moyen (15)
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('difficile')}
            className={`rounded-full px-3 py-1 transition ${
              filterLevel === 'difficile'
                ? 'bg-zirin-red-trad text-white'
                : 'text-zirin-red-trad hover:bg-rose-50'
            }`}
          >
            Difficile (15)
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs font-bold text-zirin-brown">
        <span className="flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-zirin-terracotta" />
          <span>Carte {currentIndex + 1} sur {riddles.length}</span>
        </span>
        <span className="text-zirin-ink-muted">Cliquez sur la carte pour la retourner</span>
      </div>

      {/* Interactive Flip Card */}
      <div
        className="group relative h-[360px] w-full cursor-pointer [perspective:1000px] sm:h-[400px]"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-label="Retourner la carte de devinette"
      >
        <div
          className={`relative h-full w-full rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* RECTO: Question */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-zirin-gold-warm/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EBE0] p-6 shadow-xl [backface-visibility:hidden] sm:p-10">
            <BogolanBackground className="text-zirin-brown/5" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zirin-sand-strong px-3.5 py-1 text-xs font-black text-zirin-brown-deep uppercase tracking-wider">
                <AdinkraNyansapo className="h-3.5 w-3.5 text-zirin-terracotta" />
                <span>Niveau {currentRiddle?.level}</span>
              </span>

              <span className="flex items-center gap-1 text-xs font-bold text-zirin-terracotta">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Recto : Question</span>
              </span>
            </div>

            <div className="relative z-10 text-center">
              <MalianToronAccent className="mx-auto mb-3 text-zirin-terracotta/60" />
              <p className="text-xs font-black text-zirin-terracotta uppercase tracking-widest">
                Énigme à deviner
              </p>
              <h3 className="mt-3 text-2xl font-black leading-relaxed text-zirin-brown-deep sm:text-3xl font-display">
                « {currentRiddle?.question} »
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2 text-xs font-bold text-zirin-terracotta">
              <Eye className="h-4 w-4" />
              <span>Cliquez pour découvrir la réponse au verso</span>
            </div>
          </div>

          {/* VERSO: Réponse */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-zirin-terracotta bg-gradient-to-br from-[#2D1B10] via-[#4A2E1B] to-[#1A1412] p-6 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-10">
            <BogolanBackground className="text-zirin-gold-warm/10" />

            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1412] px-3.5 py-1 font-black text-zirin-gold-light uppercase tracking-wider">
                <AdinkraNyansapo className="h-3.5 w-3.5 text-zirin-gold-warm" />
                <span>Verso : Solution</span>
              </span>
              <span className="text-zirin-gold-light font-bold">Tradition orale</span>
            </div>

            <div className="relative z-10 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-zirin-gold-warm">
                La réponse était :
              </span>
              <h3 className="mt-4 text-3xl font-black text-[#FFF8ED] sm:text-4xl font-display underline underline-offset-8 decoration-zirin-gold-warm">
                {currentRiddle?.answer}
              </h3>
              <p className="mt-4 text-xs italic text-[#EAD4B3] opacity-80">
                « La parole est semblable à l'eau : une fois versée, elle nourrit la terre. »
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2 text-xs font-bold text-zirin-gold-light">
              <RotateCcw className="h-4 w-4" />
              <span>Cliquez pour retourner au recto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 border-t-2 border-zirin-brown/15 pt-4">
        <button
          type="button"
          onClick={handlePrev}
          className="flex min-h-12 items-center gap-2 rounded-full border-2 border-zirin-brown/20 bg-white/90 px-6 py-2.5 text-sm font-bold text-zirin-brown transition hover:bg-zirin-sand active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Carte précédente</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-zirin-terracotta to-zirin-gold-warm px-7 py-2.5 text-sm font-black text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          <span>Carte suivante</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
