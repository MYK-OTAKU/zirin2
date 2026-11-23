import { useState } from 'react';
import {
  Award,
  Eye,
  RotateCw,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import {
  AdinkraNyansapo,
  BogolanBackground,
  MalianFrieze,
  MalianToronAccent,
} from '../../components/ui/AfricanDecorations';
import { riddleRepository } from '../../data/repositories/riddleRepository';
import type { RiddleItem } from '../../domain/riddles';
import { africanAudio } from './africanAudio';

export function RiddleExpressView() {
  const allRiddles = riddleRepository.getAll();
  const [currentRiddle, setCurrentRiddle] = useState<RiddleItem>(() => {
    const randomIndex = Math.floor(Math.random() * allRiddles.length);
    return allRiddles[randomIndex] ?? allRiddles[0]!;
  });
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleNextRandom = () => {
    setIsRevealed(false);
    let next: RiddleItem;
    do {
      const idx = Math.floor(Math.random() * allRiddles.length);
      next = allRiddles[idx] ?? allRiddles[0]!;
    } while (next.id === currentRiddle.id && allRiddles.length > 1);

    setCurrentRiddle(next);
    africanAudio.playStartSound();
  };

  const handleReveal = () => {
    setIsRevealed(true);
    africanAudio.playSuccessSound();
  };

  const levelColor =
    currentRiddle.level === 'facile'
      ? { badge: 'bg-emerald-800 text-white', border: 'border-emerald-500' }
      : currentRiddle.level === 'moyen'
        ? { badge: 'bg-[#B37400] text-white', border: 'border-amber-500' }
        : { badge: 'bg-zirin-red-trad text-white', border: 'border-zirin-terracotta' };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-zirin-brown font-display sm:text-3xl">
            Énigme Express
          </h2>
          <p className="text-xs text-zirin-ink-muted sm:text-sm">
            Une devinette tirée au hasard parmi les 45 du recueil
          </p>
        </div>

        <button
          type="button"
          onClick={handleNextRandom}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-zirin-terracotta to-zirin-gold-warm px-5 py-2.5 text-xs font-black text-white shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Shuffle className="h-4 w-4" />
          <span>Tirer une autre énigme</span>
        </button>
      </div>

      {/* Main Flash Card */}
      <article
        className={`relative overflow-hidden rounded-3xl border-2 ${levelColor.border} bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EBE0] p-6 shadow-xl backdrop-blur-sm sm:p-10`}
      >
        <BogolanBackground className="text-zirin-brown/5" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top metadata */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-xs ${levelColor.badge}`}
            >
              <AdinkraNyansapo className="h-3.5 w-3.5 fill-current" />
              <span>Niveau {currentRiddle.level}</span>
            </span>

            <span className="flex items-center gap-1 text-xs font-bold text-zirin-brown">
              <Sparkles className="h-3.5 w-3.5 text-zirin-gold-warm" />
              <span>+{currentRiddle.points} pt{currentRiddle.points > 1 ? 's' : ''}</span>
            </span>
          </div>

          <MalianFrieze className="text-zirin-gold-warm/60" />

          {/* Prompt */}
          <div className="my-4 text-center sm:my-6">
            <div className="inline-flex items-center justify-center gap-2">
              <MalianToronAccent className="text-zirin-terracotta/70" />
              <p className="text-xs font-black tracking-widest text-zirin-terracotta uppercase">
                Défi instantané
              </p>
              <MalianToronAccent className="text-zirin-terracotta/70 rotate-180" />
            </div>

            <h3 className="mt-4 text-2xl font-black leading-relaxed text-zirin-brown-deep sm:text-3xl font-display">
              « {currentRiddle.question} »
            </h3>
          </div>

          {/* Reveal Area */}
          <div className="mt-2 flex flex-col items-center justify-center">
            {!isRevealed ? (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs italic text-zirin-ink-muted">
                  Prenez quelques secondes pour réfléchir avant de dévoiler la réponse...
                </p>
                <button
                  type="button"
                  onClick={handleReveal}
                  className="flex min-h-12 items-center gap-2 rounded-full border-2 border-[#D4AF37] bg-gradient-to-r from-zirin-gold-warm to-[#D4AF37] px-7 py-3 text-sm font-black text-[#1A1412] shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Eye className="h-4 w-4" />
                  <span>Dévoiler la solution</span>
                </button>
              </div>
            ) : (
              <div className="w-full max-w-lg rounded-2xl border-2 border-zirin-gold-warm/80 bg-gradient-to-br from-[#FFF9EE] to-zirin-sand/80 p-5 text-center shadow-lg animate-in fade-in duration-300">
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-zirin-terracotta" />
                  <span className="text-xs font-black text-zirin-terracotta uppercase tracking-wider">
                    Réponse de la tradition
                  </span>
                </div>
                <p className="mt-2 text-xl font-black text-zirin-brown-deep sm:text-2xl font-display underline underline-offset-4 decoration-zirin-gold-warm">
                  {currentRiddle.answer}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-between border-t-2 border-zirin-brown/15 pt-5">
            <span className="text-xs text-zirin-ink-muted">
              Énigme #{currentRiddle.originalId} du niveau {currentRiddle.level}
            </span>

            <button
              type="button"
              onClick={handleNextRandom}
              className="flex items-center gap-2 rounded-full border border-zirin-brown/20 bg-white/90 px-5 py-2.5 text-xs font-bold text-zirin-brown transition hover:bg-zirin-sand"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>En tirer une autre</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
