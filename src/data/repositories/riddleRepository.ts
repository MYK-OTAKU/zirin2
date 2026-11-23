import rawData from '../json/Devinettes_africaines_45.json';
import {
  RIDDLE_POINTS_BY_LEVEL,
  type RiddleDatasetRaw,
  type RiddleItem,
  type RiddleLevel,
} from '../../domain/riddles';

/**
 * Validates the loaded JSON structure at runtime to ensure integrity.
 */
function validateDataset(data: unknown): asserts data is RiddleDatasetRaw {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Le fichier de devinettes est invalide ou corrompu.');
  }

  const candidate = data as Partial<RiddleDatasetRaw>;
  if (typeof candidate.titre !== 'string' || !Array.isArray(candidate.categories)) {
    throw new Error('Structure JSON de devinettes non conforme.');
  }

  const expectedLevels = ['facile', 'moyen', 'difficile'];
  const presentLevels = candidate.categories.map((c) => c.niveau?.toLowerCase());

  for (const expected of expectedLevels) {
    if (!presentLevels.includes(expected)) {
      throw new Error(`Catégorie manquante dans le fichier JSON : "${expected}".`);
    }
  }
}

// Runtime check at module evaluation
validateDataset(rawData);

/**
 * Generates 4 plausible options for a riddle using other answers from the same level.
 */
function generateOptions(
  riddleId: number,
  correctAnswer: string,
  levelAnswers: readonly string[],
  allAnswers: readonly string[],
): string[] {
  const sameLevelCandidates = levelAnswers.filter(
    (ans) => ans.trim().toLowerCase() !== correctAnswer.trim().toLowerCase(),
  );

  const fallbackCandidates = allAnswers.filter(
    (ans) =>
      ans.trim().toLowerCase() !== correctAnswer.trim().toLowerCase() &&
      !sameLevelCandidates.includes(ans),
  );

  const pool = [...sameLevelCandidates, ...fallbackCandidates];
  const distractors: string[] = [];
  const poolLength = pool.length;

  for (let step = 0; step < 3 && step < poolLength; step++) {
    const targetIndex = (riddleId * 7 + step * 5) % poolLength;
    const candidate = pool[targetIndex]!;
    if (!distractors.includes(candidate)) {
      distractors.push(candidate);
    } else {
      const fallback = pool.find((p) => p !== candidate && !distractors.includes(p));
      if (fallback) distractors.push(fallback);
    }
  }

  const correctSlot = (riddleId * 3) % 4;
  const options = [...distractors];
  options.splice(correctSlot, 0, correctAnswer);

  return options;
}

/**
 * Normalized in-memory store parsed directly from Devinettes_africaines_45.json
 */
class RiddleRepository {
  private readonly itemsByLevel: Map<RiddleLevel, RiddleItem[]> = new Map();
  private readonly itemsById: Map<string, RiddleItem> = new Map();
  private readonly allItems: RiddleItem[] = [];
  public readonly datasetTitle: string;
  public readonly datasetDescription: string;

  constructor(data: RiddleDatasetRaw) {
    this.datasetTitle = data.titre;
    this.datasetDescription = data.description;

    const allAnswersList: string[] = [];
    for (const cat of data.categories) {
      for (const r of cat.devinettes) {
        allAnswersList.push(r.reponse);
      }
    }

    for (const category of data.categories) {
      const level = category.niveau.trim().toLowerCase() as RiddleLevel;
      const categoryAnswers = category.devinettes.map((r) => r.reponse);
      const riddles: RiddleItem[] = [];

      category.devinettes.forEach((rawRiddle) => {
        const options = generateOptions(
          rawRiddle.id,
          rawRiddle.reponse,
          categoryAnswers,
          allAnswersList,
        );

        const item: RiddleItem = {
          id: `${level}-${rawRiddle.id}`,
          originalId: rawRiddle.id,
          level,
          question: rawRiddle.question,
          answer: rawRiddle.reponse,
          points: RIDDLE_POINTS_BY_LEVEL[level],
          options,
        };

        riddles.push(item);
        this.itemsById.set(item.id, item);
        this.allItems.push(item);
      });

      this.itemsByLevel.set(level, riddles);
    }
  }

  public getByLevel(level: RiddleLevel): readonly RiddleItem[] {
    return this.itemsByLevel.get(level) ?? [];
  }

  public getById(id: string): RiddleItem | undefined {
    return this.itemsById.get(id);
  }

  public getAll(): readonly RiddleItem[] {
    return this.allItems;
  }

  public getSummary() {
    return {
      title: this.datasetTitle,
      description: this.datasetDescription,
      totalCount: this.allItems.length,
      countByLevel: {
        facile: this.getByLevel('facile').length,
        moyen: this.getByLevel('moyen').length,
        difficile: this.getByLevel('difficile').length,
      },
    };
  }
}

export const riddleRepository = new RiddleRepository(rawData);
