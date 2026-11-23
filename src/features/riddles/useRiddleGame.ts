import { useCallback, useEffect, useMemo, useState } from 'react';
import { riddleRepository } from '../../data/repositories/riddleRepository';
import { riddleStorage } from '../../data/repositories/riddleStorage';
import { checkRiddleAnswer } from '../../domain/answerMatcher';
import type {
  RiddleAnswerRecord,
  RiddleItem,
  RiddleLevel,
  RiddleUserStats,
  SavedLevelProgress,
} from '../../domain/riddles';

export interface RiddleQuestionState {
  readonly userAnswer: string;
  readonly isChecked: boolean;
  readonly isCorrect: boolean;
  readonly revealed: boolean;
  readonly feedback: string;
  readonly pointsEarned: number;
}

export interface UseRiddleGameReturn {
  readonly level: RiddleLevel;
  readonly riddles: readonly RiddleItem[];
  readonly totalInLevel: number;
  readonly currentIndex: number;
  readonly currentRiddle: RiddleItem | undefined;
  readonly currentQuestionState: RiddleQuestionState;
  readonly currentInputText: string;
  readonly setInputText: (text: string) => void;
  readonly checkAnswer: () => void;
  readonly revealAnswer: () => void;
  readonly goToNext: () => void;
  readonly goToPrevious: () => void;
  readonly jumpToIndex: (index: number) => void;
  readonly canGoPrevious: boolean;
  readonly isLastQuestion: boolean;
  readonly sessionScore: number;
  readonly isFinished: boolean;
  readonly gameSummary: {
    readonly level: RiddleLevel;
    readonly totalQuestions: number;
    readonly correctCount: number;
    readonly incorrectCount: number;
    readonly score: number;
    readonly percentage: number;
    readonly history: readonly RiddleAnswerRecord[];
  };
  readonly stats: RiddleUserStats;
  readonly restartGame: () => void;
  readonly resumeOrStartGame: (lvl: RiddleLevel) => void;
  readonly resetAllStats: () => void;
}

export function useRiddleGame(initialLevel: RiddleLevel = 'facile'): UseRiddleGameReturn {
  const [level, setLevel] = useState<RiddleLevel>(initialLevel);
  const riddles = useMemo(() => riddleRepository.getByLevel(level), [level]);
  const totalInLevel = riddles.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [validationMap, setValidationMap] = useState<
    Record<string, RiddleQuestionState>
  >({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [stats, setStats] = useState<RiddleUserStats>(() => riddleStorage.getStats());

  // Load saved progress on level change
  useEffect(() => {
    const saved = riddleStorage.getProgress(level);
    if (saved && saved.currentIndex < totalInLevel) {
      setCurrentIndex(saved.currentIndex);
      setAnswersMap(saved.answers ?? {});

      const restoredVal: Record<string, RiddleQuestionState> = {};
      for (const [rId, val] of Object.entries(saved.validatedRiddles ?? {})) {
        restoredVal[rId] = {
          userAnswer: saved.answers?.[rId] ?? '',
          isChecked: true,
          isCorrect: val.isCorrect,
          revealed: val.revealed,
          feedback: val.isCorrect
            ? 'Bonne réponse ! Bravo.'
            : val.revealed
              ? 'Réponse révélée.'
              : 'Ce n’est pas tout à fait cela. Réessaie ou consulte la réponse !',
          pointsEarned: val.pointsAwarded ?? 0,
        };
      }
      setValidationMap(restoredVal);
      setIsFinished(false);
    } else {
      setCurrentIndex(0);
      setAnswersMap({});
      setValidationMap({});
      setIsFinished(false);
    }
  }, [level, totalInLevel]);

  const currentRiddle = riddles[currentIndex];
  const currentRiddleId = currentRiddle?.id ?? '';
  const currentInputText = answersMap[currentRiddleId] ?? '';

  const currentQuestionState: RiddleQuestionState = validationMap[currentRiddleId] ?? {
    userAnswer: '',
    isChecked: false,
    isCorrect: false,
    revealed: false,
    feedback: '',
    pointsEarned: 0,
  };

  const setInputText = useCallback(
    (text: string) => {
      if (!currentRiddleId) return;
      setAnswersMap((prev) => ({
        ...prev,
        [currentRiddleId]: text,
      }));
    },
    [currentRiddleId],
  );

  // Auto-save in-progress state to local storage
  const persistCurrentProgress = useCallback(
    (
      newIndex: number,
      newAnswers: Record<string, string>,
      newValidation: Record<string, RiddleQuestionState>,
    ) => {
      const validatedRiddles: SavedLevelProgress['validatedRiddles'] = {};
      for (const [rId, qState] of Object.entries(newValidation)) {
        validatedRiddles[rId] = {
          isCorrect: qState.isCorrect,
          revealed: qState.revealed,
          pointsAwarded: qState.pointsEarned,
        };
      }

      riddleStorage.saveProgress({
        level,
        currentIndex: newIndex,
        answers: newAnswers,
        validatedRiddles,
        updatedAt: new Date().toISOString(),
      });
    },
    [level],
  );

  // Check the answer using smart matcher
  const checkAnswer = useCallback(() => {
    if (!currentRiddle || !currentInputText.trim()) return;

    // Check if points were already awarded previously
    const existing = validationMap[currentRiddle.id];
    const match = checkRiddleAnswer(currentRiddle.id, currentInputText, currentRiddle.answer);

    let pointsToEarn = 0;
    if (match.isCorrect && (!existing || existing.pointsEarned === 0)) {
      pointsToEarn = currentRiddle.points;
      // Record global stat
      const { stats: updatedStats } = riddleStorage.recordRiddleSolved(
        currentRiddle.id,
        pointsToEarn,
      );
      setStats(updatedStats);
    }

    const updatedState: RiddleQuestionState = {
      userAnswer: currentInputText,
      isChecked: true,
      isCorrect: match.isCorrect,
      revealed: false,
      feedback: match.isCorrect
        ? `Excellente réponse ! (+${pointsToEarn || currentRiddle.points} point${(pointsToEarn || currentRiddle.points) > 1 ? 's' : ''})`
        : 'Ce n’est pas tout à fait cela. Réessaie avec d’autres mots ou découvre la solution !',
      pointsEarned: existing?.pointsEarned ? existing.pointsEarned : pointsToEarn,
    };

    const newValidation = {
      ...validationMap,
      [currentRiddle.id]: updatedState,
    };

    setValidationMap(newValidation);
    persistCurrentProgress(currentIndex, answersMap, newValidation);
  }, [
    currentRiddle,
    currentInputText,
    validationMap,
    currentIndex,
    answersMap,
    persistCurrentProgress,
  ]);

  // Reveal answer directly without giving points
  const revealAnswer = useCallback(() => {
    if (!currentRiddle) return;

    const existing = validationMap[currentRiddle.id];
    const updatedState: RiddleQuestionState = {
      userAnswer: currentInputText || '(Consultée)',
      isChecked: true,
      isCorrect: false,
      revealed: true,
      feedback: `Solution officielle : ${currentRiddle.answer}`,
      pointsEarned: existing?.pointsEarned ?? 0,
    };

    const newValidation = {
      ...validationMap,
      [currentRiddle.id]: updatedState,
    };

    setValidationMap(newValidation);
    persistCurrentProgress(currentIndex, answersMap, newValidation);
  }, [
    currentRiddle,
    currentInputText,
    validationMap,
    currentIndex,
    answersMap,
    persistCurrentProgress,
  ]);

  // Calculate current session score without duplicates
  const sessionScore = useMemo(() => {
    let sum = 0;
    for (const qState of Object.values(validationMap)) {
      sum += qState.pointsEarned;
    }
    return sum;
  }, [validationMap]);

  const canGoPrevious = currentIndex > 0;
  const isLastQuestion = currentIndex === totalInLevel - 1;

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const nextIdx = currentIndex - 1;
      setCurrentIndex(nextIdx);
      persistCurrentProgress(nextIdx, answersMap, validationMap);
    }
  }, [currentIndex, answersMap, validationMap, persistCurrentProgress]);

  const goToNext = useCallback(() => {
    if (currentIndex + 1 < totalInLevel) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistCurrentProgress(nextIdx, answersMap, validationMap);
    } else {
      // Finished level
      setIsFinished(true);
      const updatedStats = riddleStorage.recordGameCompleted(level, sessionScore);
      setStats(updatedStats);
    }
  }, [
    currentIndex,
    totalInLevel,
    answersMap,
    validationMap,
    persistCurrentProgress,
    level,
    sessionScore,
  ]);

  const jumpToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalInLevel) {
        setCurrentIndex(index);
        persistCurrentProgress(index, answersMap, validationMap);
      }
    },
    [totalInLevel, answersMap, validationMap, persistCurrentProgress],
  );

  const restartGame = useCallback(() => {
    setCurrentIndex(0);
    setAnswersMap({});
    setValidationMap({});
    setIsFinished(false);
    riddleStorage.clearProgress(level);
  }, [level]);

  const resumeOrStartGame = useCallback((lvl: RiddleLevel) => {
    setLevel(lvl);
    setIsFinished(false);
  }, []);

  const resetAllStats = useCallback(() => {
    const fresh = riddleStorage.resetAll();
    setStats(fresh);
    setAnswersMap({});
    setValidationMap({});
    setCurrentIndex(0);
    setIsFinished(false);
  }, []);

  // Compute final summary
  const gameSummary = useMemo(() => {
    let correctCount = 0;
    let incorrectCount = 0;
    const history: RiddleAnswerRecord[] = [];

    for (const r of riddles) {
      const qState = validationMap[r.id];
      const isCor = qState?.isCorrect ?? false;
      if (isCor) {
        correctCount++;
      } else {
        incorrectCount++;
      }
      history.push({
        riddleId: r.id,
        question: r.question,
        correctAnswer: r.answer,
        userAnswer: qState?.userAnswer || '(Non répondue)',
        isCorrect: isCor,
        pointsEarned: qState?.pointsEarned ?? 0,
        revealed: qState?.revealed ?? false,
      });
    }

    const percentage = totalInLevel > 0 ? Math.round((correctCount / totalInLevel) * 100) : 0;

    return {
      level,
      totalQuestions: totalInLevel,
      correctCount,
      incorrectCount,
      score: sessionScore,
      percentage,
      history,
    };
  }, [riddles, validationMap, totalInLevel, level, sessionScore]);

  return {
    level,
    riddles,
    totalInLevel,
    currentIndex,
    currentRiddle,
    currentQuestionState,
    currentInputText,
    setInputText,
    checkAnswer,
    revealAnswer,
    goToNext,
    goToPrevious,
    jumpToIndex,
    canGoPrevious,
    isLastQuestion,
    sessionScore,
    isFinished,
    gameSummary,
    stats,
    restartGame,
    resumeOrStartGame,
    resetAllStats,
  };
}
