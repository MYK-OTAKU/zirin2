import { useState } from 'react';
import { Target } from 'lucide-react';
import { ZirinBrand } from '../components/ui/ZirinBrand';
import type { RiddleLevel } from '../domain/riddles';
import { RiddleHubView } from '../features/riddles/RiddleHubView';
import { RiddlePlayCard } from '../features/riddles/RiddlePlayCard';
import { RiddleResultsView } from '../features/riddles/RiddleResultsView';
import { useRiddleGame } from '../features/riddles/useRiddleGame';

export function RiddlesPage() {
  const [activeView, setActiveView] = useState<'hub' | 'play'>('hub');
  const game = useRiddleGame('facile');
  const { resumeOrStartGame, isFinished, stats, resetAllStats } = game;

  const handleSelectLevel = (level: RiddleLevel) => {
    resumeOrStartGame(level);
    setActiveView('play');
  };

  const handleBackToHub = () => {
    setActiveView('hub');
  };

  return (
    <section className="mx-auto flex w-full min-w-0 min-h-full max-w-6xl flex-col px-4 pt-4 pb-28 sm:px-8 sm:pt-6">
      {/* Brand & navigation bar */}
      <header className="flex w-full min-w-0 flex-col items-start gap-3 border-b border-zirin-brown/10 pb-4">
        <ZirinBrand />

        <div className="flex w-full flex-col items-start gap-2">
          {activeView === 'play' ? (
            <button
              type="button"
              onClick={handleBackToHub}
              className="inline-flex items-center gap-1.5 rounded-full border border-zirin-brown/15 bg-zirin-sand/70 px-3.5 py-1 text-xs font-semibold text-zirin-brown transition hover:bg-zirin-sand"
            >
              <Target className="h-3.5 w-3.5 text-zirin-primary" aria-hidden="true" />
              <span>Toutes les catégories</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zirin-brown/15 bg-zirin-sand/60 px-3.5 py-1 text-xs font-semibold text-zirin-brown">
              <Target className="h-3.5 w-3.5 text-zirin-primary" aria-hidden="true" />
              <span>Espace Devinettes</span>
            </span>
          )}
        </div>
      </header>

      {/* Main content according to active view */}
      <main className="mt-6 w-full min-w-0 flex-1">
        {activeView === 'hub' ? (
          <RiddleHubView
            stats={stats}
            onSelectLevel={handleSelectLevel}
            onResetStats={resetAllStats}
          />
        ) : isFinished ? (
          <RiddleResultsView
            game={game}
            onSelectLevel={handleSelectLevel}
            onBackToHub={handleBackToHub}
          />
        ) : (
          <RiddlePlayCard game={game} onBackToMenu={handleBackToHub} />
        )}
      </main>
    </section>
  );
}
