import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  Eye,
  HelpCircle,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ActionButton } from '../../components/ui/Button';
import {
  AdinkraNyansapo,
  BogolanBackground,
  MalianFrieze,
  MalianToronAccent,
} from '../../components/ui/AfricanDecorations';
import {
  PuzzledThinkerArt,
  SuccessCelebrationArt,
} from '../../components/ui/FeedbackAfricanIllustrations';
import type { UseRiddleGameReturn } from './useRiddleGame';
import { africanAudio } from './africanAudio';

import facileImg from '../../assets/images/devinettes/facile.jpg';
import moyenImg from '../../assets/images/devinettes/moyen.jpg';
import difficileImg from '../../assets/images/devinettes/difficile.jpg';
import reussiteImg from '../../assets/images/devinettes/reussite.jpg';

interface RiddlePlayCardProps {
  game: UseRiddleGameReturn;
  onBackToMenu: () => void;
}

const LEVEL_THUMBNAILS = {
  facile: facileImg,
  moyen: moyenImg,
  difficile: difficileImg,
};

export function RiddlePlayCard({ game, onBackToMenu }: RiddlePlayCardProps) {
  const {
    level,
    currentIndex,
    totalInLevel,
    currentRiddle,
    currentQuestionState,
    currentInputText,
    setInputText,
    checkAnswer,
    revealAnswer,
    goToNext,
    goToPrevious,
    canGoPrevious,
    isLastQuestion,
    sessionScore,
    restartGame,
  } = game;

  const [isMuted, setIsMuted] = useState(() => africanAudio.getIsMuted());
  const [playMode, setPlayMode] = useState<'text' | 'qcm'>('text');

  const handleToggleSound = () => {
    const next = africanAudio.toggleMute();
    setIsMuted(next);
  };

  const handleVerify = () => {
    if (!currentQuestionState.isChecked && currentInputText.trim()) {
      checkAnswer();
      // Audio feedback trigger
      setTimeout(() => {
        // Evaluate immediately after hook state update
        if (currentInputText.trim().toLowerCase().includes(currentRiddle?.answer.trim().toLowerCase() || '')) {
          africanAudio.playSuccessSound();
        } else {
          africanAudio.playWrongSound();
        }
      }, 50);
    }
  };

  const handleReveal = () => {
    revealAnswer();
    africanAudio.playWrongSound();
  };

  const handleNextWithSound = () => {
    goToNext();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleVerify();
  };

  if (!currentRiddle) {
    return (
      <div className="relative overflow-hidden rounded-3xl border-2 border-zirin-gold-warm/40 bg-[#FFFDF9] p-8 text-center shadow-lg">
        <BogolanBackground className="text-zirin-brown/5" />
        <p className="text-zirin-ink-muted">Aucune devinette disponible.</p>
        <ActionButton variant="secondary" onClick={onBackToMenu} className="mt-4">
          Retour au menu
        </ActionButton>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / totalInLevel) * 100);

  const levelTheme =
    level === 'facile'
      ? {
          label: 'Facile',
          subtitle: 'Pour commencer en douceur',
          pointsLabel: '+1 point',
          border: 'border-emerald-500/60',
          badgeBg: 'bg-emerald-800 text-white',
          glow: 'from-emerald-500/20',
          progressGrad: 'from-emerald-600 to-zirin-gold-warm',
          accentColor: 'text-emerald-800',
        }
      : level === 'moyen'
        ? {
            label: 'Moyen',
            subtitle: 'Mets ton intelligence à l\'épreuve',
            pointsLabel: '+2 points',
            border: 'border-amber-500/60',
            badgeBg: 'bg-[#B37400] text-white',
            glow: 'from-amber-500/20',
            progressGrad: 'from-[#C27D00] to-zirin-terracotta',
            accentColor: 'text-amber-900',
          }
        : {
            label: 'Difficile',
            subtitle: 'Réservé aux grands esprits',
            pointsLabel: '+3 points',
            border: 'border-zirin-terracotta/70',
            badgeBg: 'bg-zirin-red-trad text-white',
            glow: 'from-zirin-terracotta/20',
            progressGrad: 'from-zirin-terracotta to-zirin-red-deep',
            accentColor: 'text-zirin-red-trad',
          };

  const thumbnailImg = LEVEL_THUMBNAILS[level];

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex w-full flex-col items-stretch gap-3">
        <button
          type="button"
          onClick={onBackToMenu}
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-zirin-brown/20 bg-white/85 px-4 py-2 text-xs font-bold text-zirin-brown shadow-xs backdrop-blur-sm transition-all hover:border-zirin-terracotta hover:bg-zirin-sand hover:text-zirin-terracotta"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>Toutes les catégories</span>
        </button>

        <div className="flex w-full flex-col items-stretch gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="flex min-h-11 w-full items-center justify-center rounded-full border border-zirin-brown/20 bg-white/85 text-zirin-brown shadow-xs transition hover:bg-zirin-sand"
            title={isMuted ? 'Activer le son' : 'Couper le son'}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-rose-500" /> : <Volume2 className="h-4 w-4 text-emerald-600" />}
          </button>

          {/* Score Badge */}
          <div className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-zirin-gold-warm/40 bg-gradient-to-r from-zirin-sand/80 to-[#FFF9F0] px-4 py-1.5 text-xs font-black text-zirin-brown-deep shadow-xs">
            <Award className="h-4 w-4 text-zirin-terracotta" />
            <span>Score : <strong className="text-zirin-terracotta">{sessionScore}</strong> pts</span>
          </div>

          <button
            type="button"
            onClick={restartGame}
            title="Recommencer ce niveau"
            className="flex min-h-11 w-full items-center justify-center rounded-full border border-zirin-brown/20 bg-white/85 text-zirin-brown shadow-xs transition hover:border-zirin-terracotta hover:bg-zirin-sand"
            aria-label="Recommencer ce niveau"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Central Riddle Card with Bogolan Border */}
      <article
        className={`relative w-full min-w-0 overflow-hidden rounded-3xl border-2 ${levelTheme.border} bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EBE0] p-6 shadow-xl backdrop-blur-sm sm:p-10`}
      >
        <BogolanBackground className="text-zirin-brown/5" />

        {/* Decorative Top Bar with Bogolan Craft motif */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-3">
            <div className="flex w-full flex-col items-start gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider shadow-xs ${levelTheme.badgeBg}`}
              >
                <AdinkraNyansapo className="h-3.5 w-3.5 fill-current" />
                <span>Niveau {levelTheme.label}</span>
              </span>
              <span className="rounded-full border border-zirin-brown/20 bg-white/80 px-2.5 py-0.5 text-xs font-bold text-zirin-brown">
                {levelTheme.pointsLabel}
              </span>
            </div>

            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-xs font-bold text-zirin-brown">Énigme</span>
              <span className="rounded-full bg-zirin-sand-strong px-3 py-0.5 text-xs font-black text-zirin-brown-deep shadow-xs">
                {currentIndex + 1} / {totalInLevel}
              </span>
            </div>
          </div>

          {/* Golden Progress Bar */}
          <div
            className="h-2.5 w-full overflow-hidden rounded-full border border-zirin-brown/20 bg-zirin-sand/80 p-0.5 shadow-inner"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression : ${currentIndex + 1} sur ${totalInLevel}`}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${levelTheme.progressGrad} transition-all duration-500 shadow-xs`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Subtle Decorative Frieze */}
        <div className="relative z-10 my-3 opacity-60">
          <MalianFrieze className="text-zirin-gold-warm" />
        </div>

        {/* Central Layout: Level Decorative Artwork + Question */}
        <div className="relative z-10 my-6 flex flex-col items-center text-center sm:my-8">
          {/* Decorative Level Miniature Emblem */}
          <div className="mb-4 h-16 w-16 overflow-hidden rounded-2xl border-2 border-zirin-gold-warm/50 shadow-md">
            <img
              src={thumbnailImg}
              alt={`Emblème ${level}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="inline-flex items-center justify-center gap-2">
            <MalianToronAccent className="text-zirin-terracotta/70" />
            <p className="text-xs font-black tracking-widest text-zirin-terracotta uppercase">
              Parole de sagesse
            </p>
            <MalianToronAccent className="text-zirin-terracotta/70 rotate-180" />
          </div>

          <h2 className="mt-4 text-2xl font-black leading-relaxed text-zirin-brown-deep sm:text-3xl lg:text-4xl font-display">
            « {currentRiddle.question} »
          </h2>
        </div>

        {/* Mode Selector Toggle: Saisie Libre vs QCM (4 choix) */}
        <div className="relative z-10 mb-5 flex w-full flex-col items-stretch">
          <div className="flex w-full flex-col items-stretch gap-1 rounded-2xl border border-zirin-brown/20 bg-white/80 p-1 text-xs font-bold shadow-xs">
            <button
              type="button"
              onClick={() => setPlayMode('text')}
              className={`min-h-11 w-full rounded-xl px-3.5 py-1.5 transition ${
                playMode === 'text'
                  ? 'bg-zirin-brown text-white shadow-xs'
                  : 'text-zirin-brown hover:bg-zirin-sand'
              }`}
            >
              ✍️ Saisie libre
            </button>
            <button
              type="button"
              onClick={() => setPlayMode('qcm')}
              className={`min-h-11 w-full rounded-xl px-3.5 py-1.5 transition ${
                playMode === 'qcm'
                  ? 'bg-zirin-brown text-white shadow-xs'
                  : 'text-zirin-brown hover:bg-zirin-sand'
              }`}
            >
              🔤 4 Choix (QCM)
            </button>
          </div>
        </div>

        {/* User Input Form */}
        <form onSubmit={handleSubmit} className="relative z-10 mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4">
          <label htmlFor="user-answer-input" className="sr-only">
            Votre proposition de réponse
          </label>

          {playMode === 'text' ? (
            <div className="relative">
              <input
                id="user-answer-input"
                type="text"
                autoComplete="off"
                value={currentInputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tapez votre réponse ici (ex: le soleil, le baobab...)"
                className="w-full rounded-2xl border-2 border-zirin-brown/20 bg-[#FCF8F2] px-5 py-4 text-base font-semibold text-zirin-brown-deep placeholder:text-zirin-ink-muted/50 shadow-inner transition focus:border-zirin-terracotta focus:bg-white focus:outline-none focus:ring-4 focus:ring-zirin-gold-warm/30 sm:text-lg"
              />
            </div>
          ) : (
            /* 4 Propositions plausibles (QCM) */
            <div className="flex w-full min-w-0 flex-col gap-2.5">
              {currentRiddle.options.map((option, idx) => {
                const label = ['A', 'B', 'C', 'D'][idx] ?? `${idx + 1}`;
                const isSelected = currentInputText === option;
                return (
                  <button
                    key={`${currentRiddle.id}-opt-${idx}`}
                    type="button"
                    onClick={() => setInputText(option)}
                    className={`flex min-h-14 w-full min-w-0 items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all ${
                      isSelected
                        ? 'border-zirin-terracotta bg-zirin-sand/90 text-zirin-brown-deep ring-2 ring-zirin-gold-warm/40 font-bold'
                        : 'border-zirin-brown/15 bg-white/80 text-zirin-brown hover:border-zirin-brown/30 hover:bg-zirin-sand/40'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        isSelected
                          ? 'bg-zirin-terracotta text-white'
                          : 'bg-zirin-sand text-zirin-brown'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="min-w-0 flex-1 break-words text-sm font-semibold">{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* African Styled Buttons:
              1. « Vérifier ma réponse » :
                 - Fond vert profond
                 - Icône de validation
                 - Animation de pression au clic
              2. « Voir la réponse » :
                 - Couleur jaune or
                 - Icône œil
                 - Apparition progressive de la réponse
          */}
          <div className="flex w-full flex-col items-stretch gap-3.5 pt-2">
            {/* Bouton 1: Vérifier ma réponse */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={!currentInputText.trim()}
              className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-zirin-forest px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/20 transition-all duration-150 hover:bg-zirin-forest-light active:scale-95 disabled:pointer-events-none disabled:opacity-40"
            >
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <span>Vérifier ma réponse</span>
            </button>

            {/* Bouton 2: Voir la réponse */}
            <button
              type="button"
              onClick={handleReveal}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#D4AF37] bg-gradient-to-r from-zirin-gold-warm to-[#D4AF37] px-6 py-3.5 text-sm font-extrabold text-[#1A1412] shadow-md transition-all duration-150 hover:from-[#D4AF37] hover:to-[#B8860B] active:scale-95"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Voir la réponse</span>
            </button>
          </div>
        </form>

        {/* Feedback Section with specific African Illustrations:
            - Animation de célébration en cas de bonne réponse (Image Réussite)
            - Animation humoristique en cas de mauvaise réponse (Image Pensif)
        */}
        {currentQuestionState.isChecked && (
          <div
            className={`relative z-10 mx-auto mt-6 w-full min-w-0 overflow-hidden rounded-3xl border-2 p-5 text-sm transition-all sm:text-base animate-in fade-in duration-300 shadow-lg ${
              currentQuestionState.isCorrect
                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-[#F2F8F4] text-emerald-950'
                : currentQuestionState.revealed
                  ? 'border-zirin-gold-warm/60 bg-gradient-to-br from-[#FFF9EE] to-zirin-sand/50 text-zirin-brown-deep'
                  : 'border-amber-400 bg-gradient-to-br from-amber-50 to-[#FFF7ED] text-amber-950'
            }`}
            role="status"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Illustrated Badge Thumbnail */}
              <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-zirin-gold-warm/50 shadow-md sm:mx-0">
                {currentQuestionState.isCorrect ? (
                  <img
                    src={reussiteImg}
                    alt="Victoire festive"
                    className="h-full w-full object-cover animate-pulse"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <PuzzledThinkerArt className="h-full w-full object-cover" />
                )}
                {currentQuestionState.isCorrect && (
                  <SuccessCelebrationArt className="h-full w-full object-cover" />
                )}
              </div>

              <div className="w-full min-w-0 text-center">
                <div className="flex flex-col items-center gap-2">
                  {currentQuestionState.isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-black text-white">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Félicitations, bonne réponse !</span>
                    </span>
                  ) : currentQuestionState.revealed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zirin-brown px-3 py-1 text-xs font-black text-white">
                      <Eye className="h-4 w-4" />
                      <span>Solution officielle de la tradition</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1 text-xs font-black text-white">
                      <HelpCircle className="h-4 w-4" />
                      <span>Ce n’est pas tout à fait cela !</span>
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed">
                  {currentQuestionState.isCorrect ? (
                    <>
                      Excellente intuition ! Vous avez trouvé :{' '}
                      <strong className="underline underline-offset-2">
                        {currentRiddle.answer}
                      </strong>
                      . Vous remportez{' '}
                      <strong className="text-emerald-900 font-black">
                        +{currentRiddle.points} point{currentRiddle.points > 1 ? 's' : ''}
                      </strong>{' '}
                      !
                    </>
                  ) : currentQuestionState.revealed ? (
                    <>
                      La solution ancestrale transmise est :{' '}
                      <strong className="font-black text-zirin-brown-deep underline underline-offset-2">
                        {currentRiddle.answer}
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Ne vous découragez pas ! Tentez une autre formulation, ou
                      cliquez sur « Voir la réponse » pour découvrir l’énigme.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons:
            - « Devinette précédente »
            - « Devinette suivante » (Fond orange, icône flèche, transition latérale)
        */}
        <div className="relative z-10 mt-8 flex w-full flex-col items-stretch gap-3 border-t-2 border-zirin-brown/15 pt-6">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-zirin-brown/20 bg-white/90 px-5 py-2.5 text-sm font-bold text-zirin-brown transition hover:border-zirin-terracotta hover:bg-zirin-sand disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Devinette précédente</span>
          </button>

          {/* Bouton Devinette suivante :
              - Fond orange
              - Icône flèche
              - Transition latérale
          */}
          <button
            type="button"
            onClick={handleNextWithSound}
            className="group flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-zirin-primary px-7 py-2.5 text-sm font-black text-white shadow-md shadow-zirin-primary/25 transition-all duration-200 hover:bg-zirin-primary-hover hover:shadow-lg active:scale-95"
          >
            <span>{isLastQuestion ? 'Voir les résultats du niveau' : 'Devinette suivante'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
