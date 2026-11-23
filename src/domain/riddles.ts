export type RiddleLevel = 'facile' | 'moyen' | 'difficile';

export interface RiddleRaw {
  readonly id: number;
  readonly question: string;
  readonly reponse: string;
}

export interface RiddleCategoryRaw {
  readonly niveau: string;
  readonly devinettes: readonly RiddleRaw[];
}

export interface RiddleDatasetRaw {
  readonly titre: string;
  readonly description: string;
  readonly categories: readonly RiddleCategoryRaw[];
}

export interface RiddleItem {
  readonly id: string; // ex: "facile-1"
  readonly originalId: number;
  readonly level: RiddleLevel;
  readonly question: string;
  readonly answer: string;
  readonly points: number; // 1 pour facile, 2 pour moyen, 3 pour difficile
  readonly options: readonly string[]; // 4 choix plausibles
}

export interface RiddleLevelConfig {
  readonly id: RiddleLevel;
  readonly label: string;
  readonly subtitle: string;
  readonly description: string;
  readonly count: number;
  readonly points: number;
  readonly colorTheme: {
    readonly bgCard: string;
    readonly borderCard: string;
    readonly textBadge: string;
    readonly bgBadge: string;
    readonly progressBg: string;
    readonly accent: string;
  };
}

export const RIDDLE_POINTS_BY_LEVEL: Record<RiddleLevel, number> = {
  facile: 1,
  moyen: 2,
  difficile: 3,
};

export const RIDDLE_LEVELS: readonly RiddleLevelConfig[] = [
  {
    id: 'facile',
    label: 'Facile',
    subtitle: 'Pour commencer en douceur',
    description: 'Devinettes joyeuses et accessibles, idéales pour éveiller l’esprit et commencer l’initiation.',
    count: 15,
    points: 1,
    colorTheme: {
      bgCard: 'bg-emerald-50/80',
      borderCard: 'border-emerald-400',
      textBadge: 'text-emerald-900',
      bgBadge: 'bg-emerald-100',
      progressBg: 'bg-emerald-600',
      accent: 'emerald',
    },
  },
  {
    id: 'moyen',
    label: 'Moyen',
    subtitle: 'Mets ton intelligence à l\'épreuve',
    description: 'Énigmes stimulantes demandant un esprit d’observation, de réflexion et de sagacité.',
    count: 15,
    points: 2,
    colorTheme: {
      bgCard: 'bg-amber-50/80',
      borderCard: 'border-amber-400',
      textBadge: 'text-amber-950',
      bgBadge: 'bg-amber-100',
      progressBg: 'bg-amber-600',
      accent: 'amber',
    },
  },
  {
    id: 'difficile',
    label: 'Difficile',
    subtitle: 'Réservé aux grands esprits',
    description: 'Défis subtils, jeux de mots et pièges d’esprit inspirés des grands sages et griots.',
    count: 15,
    points: 3,
    colorTheme: {
      bgCard: 'bg-red-50/80',
      borderCard: 'border-red-400',
      textBadge: 'text-red-950',
      bgBadge: 'bg-red-100',
      progressBg: 'bg-zirin-red-trad',
      accent: 'red',
    },
  },
] as const;

export interface RiddleAnswerRecord {
  readonly riddleId: string;
  readonly question: string;
  readonly correctAnswer: string;
  readonly userAnswer: string;
  readonly isCorrect: boolean;
  readonly pointsEarned: number;
  readonly revealed: boolean;
}

export interface RiddleUserStats {
  readonly solvedRiddleIds: string[]; // Identifiants uniques réussis
  readonly totalScore: number;
  readonly gamesPlayedByLevel: Record<RiddleLevel, number>;
  readonly bestScoreByLevel: Record<RiddleLevel, number>;
  readonly lastPlayedAt: string | null;
}

export interface SavedLevelProgress {
  readonly level: RiddleLevel;
  readonly currentIndex: number;
  readonly answers: Record<string, string>; // riddleId -> user typed text
  readonly validatedRiddles: Record<string, { isCorrect: boolean; revealed: boolean; pointsAwarded: number }>;
  readonly updatedAt: string;
}
