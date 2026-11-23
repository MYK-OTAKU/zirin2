import { useEffect } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Eye,
  ListOrdered,
  RefreshCw,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { ActionButton } from '../../components/ui/Button';
import {
  AdinkraNyansapo,
  BogolanBackground,
  MalianFrieze,
  MalianToronAccent,
} from '../../components/ui/AfricanDecorations';
import { SuccessCelebrationArt } from '../../components/ui/FeedbackAfricanIllustrations';
import type { RiddleLevel } from '../../domain/riddles';
import type { UseRiddleGameReturn } from './useRiddleGame';
import { africanAudio } from './africanAudio';

import reussiteImg from '../../assets/images/devinettes/reussite.jpg';

interface RiddleResultsViewProps {
  game: UseRiddleGameReturn;
  onSelectLevel: (level: RiddleLevel) => void;
  onBackToHub: () => void;
}

export function RiddleResultsView({
  game,
  onSelectLevel,
  onBackToHub,
}: RiddleResultsViewProps) {
  const { gameSummary, restartGame, level } = game;
  const {
    totalQuestions,
    correctCount,
    incorrectCount,
    score,
    percentage,
    history,
  } = gameSummary;

  // Play celebratory sound on mount if score is good
  useEffect(() => {
    africanAudio.playVictorySound();
  }, []);

  const getVerdict = () => {
    if (percentage === 100) {
      return {
        badge: 'Griot Suprême',
        title: 'Sans faute digne des grands sages !',
        comment:
          'Une sagacité remarquable ! Vous avez triomphé de toutes les énigmes sans faillir. La tradition orale salue votre esprit éclairé.',
      };
    }
    if (percentage >= 75) {
      return {
        badge: 'Maître du Verbe',
        title: 'Excellente réussite !',
        comment:
          'Votre perspicacité honore la sagesse ancestrale. Vous avez su déjouer la quasi-totalité des pièges de la veillée.',
      };
    }
    if (percentage >= 50) {
      return {
        badge: 'Sage en Devenir',
        title: 'Beau parcours d’initiation !',
        comment:
          'Plus de la moitié des devinettes résolues ! Chaque énigme enrichit votre regard et aiguise votre intuition.',
      };
    }
    return {
      badge: 'Apprenti Conteur',
      title: 'L’initiation se poursuit !',
      comment:
        'La devinette demande patience et écoute. Consultez les réponses ci-dessous pour retenir la sagesse des anciens et retentez votre chance !',
    };
  };

  const verdict = getVerdict();

  const nextLevel: RiddleLevel | null =
    level === 'facile' ? 'moyen' : level === 'moyen' ? 'difficile' : null;

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-8 pb-12 animate-in fade-in duration-300">
      {/* 1. Main Royal Score Card */}
      <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-gold-warm/60 bg-gradient-to-br from-[#2D1B10] via-[#4A2E1B] to-[#1A1412] p-6 text-center text-white shadow-2xl sm:p-10">
        <BogolanBackground className="text-zirin-gold-warm/10" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Trophy & Festive Artwork Showcase */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-3xl border-2 border-zirin-gold-warm shadow-xl sm:h-32 sm:w-32">
              <img
                src={reussiteImg}
                alt="Victoire et célébration africaine"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <SuccessCelebrationArt className="h-full w-full object-cover" />
            </div>

            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-zirin-terracotta shadow-md">
              <Trophy className="h-5 w-5 text-zirin-gold-light" />
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zirin-gold-warm/40 bg-[#1A1412]/80 px-4 py-1.5 text-xs font-bold text-zirin-gold-light uppercase tracking-wider backdrop-blur-md">
            <AdinkraNyansapo className="h-3.5 w-3.5 text-zirin-gold-warm" />
            <span>{verdict.badge} • Niveau {level}</span>
          </div>

          <h1 className="mt-3 max-w-full break-words text-3xl font-black text-[#FFF8ED] sm:text-4xl lg:text-5xl font-display">
            {verdict.title}
          </h1>

          <p className="mx-auto mt-2 w-full max-w-xl break-words text-sm leading-relaxed text-[#EAD4B3] sm:text-base">
            {verdict.comment}
          </p>

          <MalianToronAccent className="my-3 text-zirin-gold-warm/60" />

          {/* 4 Cultural Stats Cards */}
          <div className="mt-6 flex w-full flex-col gap-3.5">
            <div className="flex flex-col rounded-2xl border border-emerald-400/40 bg-emerald-950/50 p-4 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Bonnes réponses
              </span>
              <span className="mt-1 text-3xl font-black text-emerald-100 font-display">
                {correctCount}
              </span>
              <span className="text-xs text-emerald-300/80">sur {totalQuestions}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-rose-400/40 bg-rose-950/50 p-4 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Non trouvées
              </span>
              <span className="mt-1 text-3xl font-black text-rose-100 font-display">
                {incorrectCount}
              </span>
              <span className="text-xs text-rose-300/80">ou révélées</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-zirin-gold-warm/50 bg-[#3A2315]/80 p-4 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-zirin-gold-light">
                Score obtenu
              </span>
              <div className="mt-1 flex flex-col items-center gap-1">
                <span className="text-3xl font-black text-zirin-gold-warm font-display">
                  {score}
                </span>
                <span className="text-xs font-bold text-zirin-gold-light">pts</span>
              </div>
              <span className="text-xs text-zirin-gold-light/80">gagnés</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F6E8D2]">
                Réussite
              </span>
              <span className="mt-1 text-3xl font-black text-[#FFF9F0] font-display">
                {percentage}%
              </span>
              <span className="text-xs text-[#EAD4B3]">taux d’esprit</span>
            </div>
          </div>

          {/* The 3 Required Action Buttons:
              1. Bouton « Rejouer » :
                 - Couleur verte
                 - Icône de renouvellement
                 - Animation légère
              2. Bouton « Choisir un autre niveau »
              3. Bouton « Retour aux devinettes »
          */}
          <div className="mt-10 flex w-full flex-col items-stretch gap-4 border-t border-zirin-gold-warm/20 pt-8">
            {/* Bouton 1: Rejouer (Couleur verte, icône renouvellement, animation légère) */}
            <button
              type="button"
              onClick={restartGame}
              className="group flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:bg-emerald-800 hover:shadow-xl active:scale-95"
            >
              <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
              <span>Rejouer ce niveau</span>
            </button>

            {/* Bouton 2: Choisir un autre niveau */}
            {nextLevel ? (
              <ActionButton
                variant="primary"
                onClick={() => onSelectLevel(nextLevel)}
                className="w-full bg-gradient-to-r from-zirin-terracotta to-zirin-gold-warm text-white hover:from-zirin-terracotta-deep hover:to-zirin-gold"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Niveau {nextLevel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionButton>
            ) : (
              <ActionButton
                variant="primary"
                onClick={onBackToHub}
                className="w-full bg-gradient-to-r from-zirin-terracotta to-zirin-gold-warm text-white hover:from-zirin-terracotta-deep hover:to-zirin-gold"
              >
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Choisir un autre niveau</span>
              </ActionButton>
            )}

            {/* Bouton 3: Retour aux devinettes */}
            <ActionButton
              variant="ghost"
              onClick={onBackToHub}
              className="w-full text-zirin-gold-light hover:bg-white/10"
            >
              <span>Retour aux devinettes</span>
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <MalianFrieze className="text-zirin-terracotta/60" />

      {/* 2. Detailed Riddle Breakdown Table */}
      <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-brown/20 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] p-6 shadow-md backdrop-blur-sm sm:p-8">
        <BogolanBackground className="text-zirin-brown/5" />

        <div className="relative z-10 flex flex-col items-start gap-3 border-b border-zirin-brown/15 pb-4">
          <div className="flex w-full min-w-0 flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zirin-gold-warm/20 text-zirin-brown shadow-inner">
              <ListOrdered className="h-5 w-5 text-zirin-terracotta" aria-hidden="true" />
            </div>
            <div>
              <h2 className="break-words text-lg font-black text-zirin-brown sm:text-xl font-display">
                Récapitulatif des 15 énigmes du niveau {level}
              </h2>
              <p className="break-words text-xs text-zirin-ink-muted">
                Consultez les réponses officielles pour enrichir votre mémoire
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 divide-y divide-zirin-brown/10">
          {history.map((record, index) => (
            <div key={record.riddleId} className="py-4 text-sm">
              <div className="flex flex-col items-start gap-3">
                <div className="w-full min-w-0">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zirin-sand-strong text-xs font-black text-zirin-brown-deep">
                      {index + 1}
                    </span>
                    <p className="min-w-0 break-words font-bold text-zirin-brown-deep">
                      {record.question}
                    </p>
                  </div>

                  <div className="mt-2.5 flex flex-col gap-2 pl-8 text-xs">
                    <div>
                      <span className="text-zirin-ink-muted">Votre saisie : </span>
                      <span
                        className={
                          record.isCorrect
                            ? 'font-bold text-emerald-800'
                            : 'font-semibold text-rose-800 line-through'
                        }
                      >
                        {record.userAnswer}
                      </span>
                    </div>

                    <div>
                      <span className="text-zirin-ink-muted">Réponse transmise : </span>
                      <strong className="text-zirin-brown-deep font-bold underline underline-offset-2">
                        {record.correctAnswer}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pl-8">
                  {record.isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-black text-emerald-900 shadow-xs">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      +{record.pointsEarned} pt{record.pointsEarned > 1 ? 's' : ''}
                    </span>
                  ) : record.revealed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zirin-gold-warm/40 bg-zirin-sand px-3.5 py-1 text-xs font-bold text-zirin-brown">
                      <Eye className="h-3.5 w-3.5" />
                      Révélée
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-300 px-3.5 py-1 text-xs font-bold text-rose-900">
                      <AlertCircle className="h-3.5 w-3.5" />
                      0 pt
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
