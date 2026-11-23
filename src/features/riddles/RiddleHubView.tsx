import { useState } from 'react';
import {
  Award,
  Brain,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Smile,
  Sparkles,
  TrendingUp,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  AdinkraNyansapo,
  BogolanBackground,
  MalianFrieze,
  MalianToronAccent,
} from '../../components/ui/AfricanDecorations';
import {
  BaobabIllustration,
  DogonMaskIllustration,
  GazelleIllustration,
  HeroAfricanIllustration,
} from '../../components/ui/AfricanIllustrations';
import { riddleStorage } from '../../data/repositories/riddleStorage';
import { RIDDLE_LEVELS, type RiddleLevel, type RiddleUserStats } from '../../domain/riddles';
import { africanAudio } from './africanAudio';
import { RiddleLibraryView } from './RiddleLibraryView';

import banniereImg from '../../assets/images/devinettes/banniere.jpg';
import facileImg from '../../assets/images/devinettes/facile.jpg';
import moyenImg from '../../assets/images/devinettes/moyen.jpg';
import difficileImg from '../../assets/images/devinettes/difficile.jpg';

interface RiddleHubViewProps {
  stats: RiddleUserStats;
  onSelectLevel: (level: RiddleLevel) => void;
  onResetStats: () => void;
}

const CATEGORY_IMAGES: Record<RiddleLevel, string> = {
  facile: facileImg,
  moyen: moyenImg,
  difficile: difficileImg,
};

export function RiddleHubView({
  stats,
  onSelectLevel,
  onResetStats,
}: RiddleHubViewProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isMuted, setIsMuted] = useState(() => africanAudio.getIsMuted());

  const handleToggleSound = () => {
    const next = africanAudio.toggleMute();
    setIsMuted(next);
  };

  const handleStartLevel = (lvl: RiddleLevel) => {
    africanAudio.playStartSound();
    onSelectLevel(lvl);
  };

  const totalRiddles = 45;
  const solvedCount = stats.solvedRiddleIds.length;
  const remainingCount = Math.max(0, totalRiddles - solvedCount);
  const progressPercent = Math.min(100, Math.round((solvedCount / totalRiddles) * 100));

  return (
    <div className="flex w-full min-w-0 flex-col gap-8 pb-12 animate-in fade-in duration-300">
      {/* 1. Hero Cultural Banner with Traditional Malian Village Image */}
      <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-gold-warm/40 bg-gradient-to-br from-[#2D1B10] via-[#4A2E1B] to-[#1A1412] p-6 text-white shadow-xl sm:p-10">
        <BogolanBackground className="text-zirin-gold-warm/10" />

        <div className="relative z-10 flex flex-col gap-8">
          {/* Left Text & Cultural Context */}
          <div className="flex flex-col items-start gap-4">
            {/* Top row with Cultural Badge and Audio Toggle */}
            <div className="flex w-full min-w-0 flex-col items-start gap-3">
              <div className="inline-flex max-w-full items-start gap-2 rounded-full border border-zirin-gold-warm/50 bg-[#1A1412]/80 px-4 py-1.5 text-xs font-bold text-zirin-gold-light uppercase tracking-wider whitespace-normal break-words backdrop-blur-md shadow-inner">
                <AdinkraNyansapo className="h-4 w-4 text-zirin-gold-warm" />
                <span className="min-w-0">Sagesse du Mandé &amp; Veillées d’Afrique</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="flex min-h-11 max-w-full items-center gap-1.5 rounded-full border border-zirin-gold-warm/40 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-zirin-gold-light backdrop-blur-md transition hover:bg-white/20"
                title={isMuted ? 'Activer les sons d’ambiance' : 'Désactiver le son'}
                aria-label={isMuted ? 'Activer les sons' : 'Désactiver le son'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-4 w-4 text-rose-300" />
                    <span className="hidden sm:inline">Son désactivé</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-300" />
                    <span className="hidden sm:inline">Ambiance active</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="w-full max-w-full break-words text-3xl font-black leading-tight text-[#FFF8ED] sm:text-4xl lg:text-5xl font-display">
              Devinettes africaines
            </h1>

            <p className="w-full max-w-3xl break-words text-base leading-relaxed text-[#EAD4B3] sm:text-lg font-medium">
              Teste ton intelligence et relève les défis inspirés de la vie quotidienne,
              de la nature et des récits traditionnels du Mali et d’Afrique de l’Ouest.
            </p>

            <MalianToronAccent className="text-zirin-gold-warm/60" />

            {/* Quick Metrics */}
            <div className="mt-2 flex w-full flex-col items-start gap-3 text-xs font-semibold text-[#F6E8D2]">
              <span className="inline-flex max-w-full items-start gap-1.5 rounded-full bg-zirin-terracotta/40 border border-zirin-terracotta/60 px-3.5 py-1.5 whitespace-normal break-words">
                <Sparkles className="h-3.5 w-3.5 text-zirin-gold-warm" />
                <span>45 Énigmes traditionnelles</span>
              </span>
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 whitespace-normal break-words">
                <span>3 Niveaux d’initiation</span>
              </span>
            </div>
          </div>

          {/* Right Visual: Traditional Village & Sunset Artwork */}
          <div className="relative w-full min-w-0">
            <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-2xl border-2 border-zirin-gold-warm/50 shadow-2xl">
              <img
                src={banniereImg}
                alt="Village traditionnel malien au coucher du soleil"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <HeroAfricanIllustration className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1412]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-4 right-4 flex flex-col items-start gap-1 text-xs text-[#FFF9F0]">
                <span className="max-w-full break-words font-bold tracking-wide text-zirin-gold-light">
                  « L’énigme éveille la mémoire »
                </span>
                <span className="text-[11px] opacity-80">Mali traditionnel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Frieze */}
      <MalianFrieze className="text-zirin-terracotta/60" />

      {/* 2. Global Progress Section */}
      <section
        className="relative w-full min-w-0 overflow-hidden rounded-3xl border-2 border-zirin-brown/20 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] p-6 shadow-md sm:p-8"
        aria-label="Statistiques de progression"
      >
        <BogolanBackground className="text-zirin-brown/5" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3 border-b border-zirin-brown/15 pb-4">
            <div className="flex w-full min-w-0 flex-col items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zirin-gold-warm/20 text-zirin-brown shadow-inner">
                <TrendingUp className="h-5 w-5 text-zirin-terracotta" aria-hidden="true" />
              </div>
              <div>
                <h2 className="break-words text-lg font-bold text-zirin-brown sm:text-xl font-display">
                  Votre progression globale
                </h2>
                <p className="break-words text-xs text-zirin-ink-muted">
                  Parcours accompli sur l’ensemble du recueil de 45 énigmes
                </p>
              </div>
            </div>

            <div className="flex max-w-full items-center gap-2 rounded-full border border-zirin-gold-warm/40 bg-zirin-sand/80 px-4 py-1.5 text-xs font-bold text-zirin-brown">
              <span>{progressPercent}% complété</span>
            </div>
          </div>

          {/* Golden Sahel Progress Bar with animated shimmer */}
          <div>
            <div
              className="h-3.5 w-full overflow-hidden rounded-full border border-zirin-brown/20 bg-zirin-sand/80 p-0.5 shadow-inner"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progression globale : ${progressPercent}%`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-zirin-gold-warm to-zirin-terracotta transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="flex w-full flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Réussies
              </span>
              <div className="mt-1 flex flex-col items-start gap-1.5">
                <span className="text-3xl font-black text-emerald-950 font-display">
                  {solvedCount}
                </span>
                <span className="text-xs font-semibold text-emerald-800">/ {totalRiddles}</span>
              </div>
              <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                <CheckCircle className="h-3.5 w-3.5" /> Résolues
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/60 p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Restantes
              </span>
              <div className="mt-1 flex flex-col items-start gap-1.5">
                <span className="text-3xl font-black text-amber-950 font-display">
                  {remainingCount}
                </span>
                <span className="text-xs font-semibold text-amber-800">à découvrir</span>
              </div>
              <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-800">
                <HelpCircle className="h-3.5 w-3.5" /> En attente
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-[#E06D28]/40 bg-gradient-to-br from-[#FFF5EC] to-[#FCE4D6] p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B3471A]">
                Score total
              </span>
              <div className="mt-1 flex flex-col items-start gap-1.5">
                <span className="text-3xl font-black text-[#5E2D13] font-display">
                  {stats.totalScore}
                </span>
                <span className="text-xs font-bold text-[#B3471A]">points</span>
              </div>
              <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#B3471A]">
                <Award className="h-3.5 w-3.5" /> Cumulés
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 border-zirin-brown/25 bg-gradient-to-br from-zirin-sand/60 to-zirin-sand p-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-zirin-brown-deep">
                Complétion
              </span>
              <div className="mt-1 flex flex-col items-start gap-1.5">
                <span className="text-3xl font-black text-zirin-brown-deep font-display">
                  {progressPercent}
                </span>
                <span className="text-xs font-bold text-zirin-brown">%</span>
              </div>
              <span className="mt-2 text-[11px] font-bold text-zirin-brown">
                du recueil conquis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Traditional Frieze Separator */}
      <MalianFrieze className="text-zirin-gold-warm/60" />

      {/* 3. The 3 Refined Level Cards with Specific Prompts */}
      <section className="w-full min-w-0" aria-label="Catégories de difficulté">
        <div className="mb-6 flex flex-col items-start gap-2">
          <div>
            <h2 className="break-words text-2xl font-black text-zirin-brown font-display sm:text-3xl">
              Niveaux d’initiation
            </h2>
            <p className="mt-1 text-sm text-zirin-ink-muted">
              Choisissez votre défi selon votre envie de découverte
            </p>
          </div>
          <span className="max-w-full rounded-full border border-zirin-brown/20 bg-zirin-sand/60 px-3.5 py-1 text-xs font-bold text-zirin-brown">
            15 énigmes par niveau
          </span>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-7">
          {RIDDLE_LEVELS.map((lvl) => {
            const inProgress = riddleStorage.getProgress(lvl.id);
            const bestScore = stats.bestScoreByLevel[lvl.id] ?? 0;
            const gamesPlayed = stats.gamesPlayedByLevel[lvl.id] ?? 0;
            const maxPoints = lvl.count * lvl.points;
            const illustrationSrc = CATEGORY_IMAGES[lvl.id];

            // Strict requirements for Level cards
            const config =
              lvl.id === 'facile'
                ? {
                    title: 'Facile',
                    subtitle: 'Pour commencer en douceur',
                    icon: Smile,
                    colorLabel: 'Vert naturel',
                    cardBorder: 'border-2 border-emerald-500/60 hover:border-emerald-600',
                    cardBg: 'bg-gradient-to-b from-[#F2F8F4] via-[#FCFDFB] to-[#E5F2E9]',
                    badgeBg: 'bg-emerald-800 text-white',
                    pointsBadge: 'bg-emerald-100 text-emerald-950 border border-emerald-300',
                    VectorFallback: GazelleIllustration,
                  }
                : lvl.id === 'moyen'
                  ? {
                      title: 'Moyen',
                      subtitle: 'Mets ton intelligence à l\'épreuve',
                      icon: Brain,
                      colorLabel: 'Orange et jaune',
                      cardBorder: 'border-2 border-amber-500/60 hover:border-amber-600',
                      cardBg: 'bg-gradient-to-b from-[#FFFBF2] via-[#FFFCF6] to-[#FCEEC8]',
                      badgeBg: 'bg-[#B37400] text-white',
                      pointsBadge: 'bg-amber-100 text-amber-950 border border-amber-300',
                      VectorFallback: BaobabIllustration,
                    }
                  : {
                      title: 'Difficile',
                      subtitle: 'Réservé aux grands esprits',
                      icon: Lightbulb,
                      colorLabel: 'Rouge profond et noir',
                      cardBorder: 'border-2 border-zirin-terracotta/70 hover:border-zirin-terracotta',
                      cardBg: 'bg-gradient-to-b from-[#FFF5F0] via-[#FFFAF7] to-[#FCD9C8]',
                      badgeBg: 'bg-zirin-red-trad text-white',
                      pointsBadge: 'bg-orange-100 text-orange-950 border border-orange-300',
                      VectorFallback: DogonMaskIllustration,
                    };

            const IconComponent = config.icon;
            const VectorFallback = config.VectorFallback;

            return (
              <article
                key={lvl.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${config.cardBorder} ${config.cardBg} backdrop-blur-sm`}
              >
                <BogolanBackground className="text-zirin-brown/5" />

                <div className="relative z-10 flex flex-col">
                  {/* Top Badges */}
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider shadow-xs ${config.badgeBg}`}
                    >
                      <IconComponent className="h-3.5 w-3.5" />
                      <span>{config.title}</span>
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${config.pointsBadge}`}
                    >
                      +{lvl.points} pt{lvl.points > 1 ? 's' : ''} / énigme
                    </span>
                  </div>

                  {/* Artwork Showcase (Specific African Illustration) */}
                  <div className="relative my-4 aspect-[16/7] w-full overflow-hidden rounded-2xl border-2 border-zirin-gold-warm/40 bg-zirin-sand/50 shadow-md">
                    <img
                      src={illustrationSrc}
                      alt={`Illustration ${lvl.label}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <VectorFallback className="h-full w-full object-cover" />

                    {/* Subtitle tag over image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl bg-[#1A1412]/85 px-3 py-1.5 text-center text-xs font-extrabold text-zirin-gold-light backdrop-blur-sm">
                      {config.subtitle}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col items-start gap-2">
                    <IconComponent className="h-5 w-5 text-zirin-terracotta" />
                    <h3 className="text-xl font-bold text-zirin-brown font-display sm:text-2xl">
                      Niveau {lvl.label}
                    </h3>
                  </div>

                  <p className="mt-2 break-words text-sm leading-relaxed text-zirin-ink-muted">
                    {lvl.description}
                  </p>

                  {/* Stats snippet */}
                  <div className="mt-5 flex flex-col items-start gap-2 border-t border-zirin-brown/15 pt-3.5 text-xs">
                    <span className="text-zirin-ink-muted">
                      Meilleur score :{' '}
                      <strong className="text-zirin-brown-deep font-bold">
                        {bestScore} / {maxPoints} pts
                      </strong>
                    </span>
                    <span className="font-semibold text-zirin-brown">
                      {lvl.count} énigmes
                    </span>
                    <span className="font-semibold text-zirin-ink-muted">
                      {gamesPlayed} partie{gamesPlayed > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Specific African Button « Commencer » :
                    - Fond orange terre cuite
                    - Texte blanc
                    - Motif africain discret
                    - Animation fluide au survol
                    - Effet de légère élévation au clic
                */}
                <div className="relative z-10 mt-6 pt-1">
                  <button
                    type="button"
                    onClick={() => handleStartLevel(lvl.id)}
                    className="group/btn relative flex min-h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-zirin-terracotta via-zirin-terracotta-warm to-zirin-terracotta px-6 py-3.5 text-sm font-extrabold text-white shadow-md shadow-zirin-terracotta/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zirin-terracotta/35 active:translate-y-0.5 active:shadow-inner"
                  >
                    {/* Discrete African Pattern on Button */}
                    <span className="pointer-events-none absolute inset-0 opacity-15">
                      <MalianFrieze className="h-full w-full text-white" />
                    </span>
                    <Play className="relative z-10 h-4 w-4 fill-current transition-transform group-hover/btn:scale-110" aria-hidden="true" />
                    <span className="relative z-10">
                      {inProgress
                        ? `Reprendre (Q. ${inProgress.currentIndex + 1}/15)`
                        : 'Commencer l’épreuve'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-label="Liste des devinettes">
        <RiddleLibraryView />
      </section>

      {/* 5. Cultural Proverb & Reset Footer */}
      <footer className="mt-4 flex w-full flex-col items-start gap-4 border-t-2 border-zirin-brown/15 pt-6 text-xs text-zirin-ink-muted">
        <div className="flex flex-col items-start gap-2 italic">
          <AdinkraNyansapo className="h-4 w-4 text-zirin-terracotta shrink-0" />
          <span>« Quand l’homme sage parle en énigmes, le jeune esprit grandit en vérité. » — Proverbe ouest-africain</span>
        </div>

        <div>
          {!showConfirmReset ? (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center gap-1.5 font-bold text-zirin-brown underline-offset-4 hover:text-zirin-terracotta hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Réinitialiser les statistiques</span>
            </button>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <span className="font-bold text-rose-800">Confirmer la réinitialisation ?</span>
              <button
                type="button"
                onClick={() => {
                  onResetStats();
                  setShowConfirmReset(false);
                }}
                className="rounded-full bg-rose-700 px-3.5 py-1 font-bold text-white shadow-xs hover:bg-rose-800"
              >
                Oui, effacer
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="rounded-full border border-zirin-brown/20 bg-zirin-sand px-3 py-1 font-semibold text-zirin-brown hover:bg-zirin-sand-strong"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
