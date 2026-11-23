import type {
  RiddleLevel,
  RiddleUserStats,
  SavedLevelProgress,
} from '../../domain/riddles';

const STATS_KEY = 'zirin_riddles_stats_v1';
const PROGRESS_PREFIX = 'zirin_riddles_progress_v1_';

const DEFAULT_STATS: RiddleUserStats = {
  solvedRiddleIds: [],
  totalScore: 0,
  gamesPlayedByLevel: {
    facile: 0,
    moyen: 0,
    difficile: 0,
  },
  bestScoreByLevel: {
    facile: 0,
    moyen: 0,
    difficile: 0,
  },
  lastPlayedAt: null,
};

class RiddleStorage {
  private memoryStats: RiddleUserStats = { ...DEFAULT_STATS };
  private memoryProgress: Map<string, SavedLevelProgress> = new Map();

  private isStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public getStats(): RiddleUserStats {
    if (!this.isStorageAvailable()) {
      return this.memoryStats;
    }

    try {
      const raw = window.localStorage.getItem(STATS_KEY);
      if (!raw) return DEFAULT_STATS;
      const parsed = JSON.parse(raw) as Partial<RiddleUserStats>;

      return {
        solvedRiddleIds: Array.isArray(parsed.solvedRiddleIds)
          ? parsed.solvedRiddleIds
          : [],
        totalScore: typeof parsed.totalScore === 'number' ? parsed.totalScore : 0,
        gamesPlayedByLevel: {
          facile: parsed.gamesPlayedByLevel?.facile ?? 0,
          moyen: parsed.gamesPlayedByLevel?.moyen ?? 0,
          difficile: parsed.gamesPlayedByLevel?.difficile ?? 0,
        },
        bestScoreByLevel: {
          facile: parsed.bestScoreByLevel?.facile ?? 0,
          moyen: parsed.bestScoreByLevel?.moyen ?? 0,
          difficile: parsed.bestScoreByLevel?.difficile ?? 0,
        },
        lastPlayedAt: parsed.lastPlayedAt ?? null,
      };
    } catch {
      return DEFAULT_STATS;
    }
  }

  public saveStats(stats: RiddleUserStats): void {
    this.memoryStats = stats;
    if (!this.isStorageAvailable()) return;

    try {
      window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {
      // Ignore quota error gracefully
    }
  }

  /**
   * Registers a solved riddle if not already solved, avoiding double score counting.
   */
  public recordRiddleSolved(
    riddleId: string,
    points: number,
  ): { stats: RiddleUserStats; wasNewlySolved: boolean } {
    const current = this.getStats();
    if (current.solvedRiddleIds.includes(riddleId)) {
      return { stats: current, wasNewlySolved: false };
    }

    const updated: RiddleUserStats = {
      ...current,
      solvedRiddleIds: [...current.solvedRiddleIds, riddleId],
      totalScore: current.totalScore + points,
      lastPlayedAt: new Date().toISOString(),
    };

    this.saveStats(updated);
    return { stats: updated, wasNewlySolved: true };
  }

  /**
   * Records a finished game session and updates best scores.
   */
  public recordGameCompleted(
    level: RiddleLevel,
    finalScore: number,
  ): RiddleUserStats {
    const current = this.getStats();
    const prevBest = current.bestScoreByLevel[level] ?? 0;
    const prevGames = current.gamesPlayedByLevel[level] ?? 0;

    const updated: RiddleUserStats = {
      ...current,
      gamesPlayedByLevel: {
        ...current.gamesPlayedByLevel,
        [level]: prevGames + 1,
      },
      bestScoreByLevel: {
        ...current.bestScoreByLevel,
        [level]: Math.max(prevBest, finalScore),
      },
      lastPlayedAt: new Date().toISOString(),
    };

    this.saveStats(updated);
    this.clearProgress(level);
    return updated;
  }

  /**
   * Saves partial in-progress state for resuming later.
   */
  public saveProgress(progress: SavedLevelProgress): void {
    const key = `${PROGRESS_PREFIX}${progress.level}`;
    this.memoryProgress.set(key, progress);
    if (!this.isStorageAvailable()) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }

  public getProgress(level: RiddleLevel): SavedLevelProgress | null {
    const key = `${PROGRESS_PREFIX}${level}`;
    if (!this.isStorageAvailable()) {
      return this.memoryProgress.get(key) ?? null;
    }

    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as SavedLevelProgress;
    } catch {
      return null;
    }
  }

  public clearProgress(level: RiddleLevel): void {
    const key = `${PROGRESS_PREFIX}${level}`;
    this.memoryProgress.delete(key);
    if (!this.isStorageAvailable()) return;

    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  }

  public resetAll(): RiddleUserStats {
    this.memoryStats = { ...DEFAULT_STATS };
    this.memoryProgress.clear();

    if (this.isStorageAvailable()) {
      try {
        window.localStorage.removeItem(STATS_KEY);
        for (const lvl of ['facile', 'moyen', 'difficile']) {
          window.localStorage.removeItem(`${PROGRESS_PREFIX}${lvl}`);
        }
      } catch {
        // Ignore
      }
    }

    return { ...DEFAULT_STATS };
  }
}

export const riddleStorage = new RiddleStorage();
