/**
 * Smart answer matching engine for African riddles.
 * Normalizes user inputs (accents, punctuation, casing, stop words, articles)
 * and includes semantic aliases for number and sentence riddles.
 */

// French articles to remove from beginning of answers
const ARTICLES_REGEX = /^(l['’]|le\s+|la\s+|les\s+|un\s+|une\s+|des\s+|du\s+|de\s+la\s+|d['’])/i;

/**
 * Strips accents, lowercases, replaces punctuation with spaces, and collapses whitespace.
 */
export function normalizeText(text: string): string {
  if (!text) return '';

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .replace(/[«»"“”'’.,;:!?()\-—_/\\+]/g, ' ') // replace punctuation with spaces
    .replace(ARTICLES_REGEX, '') // remove leading articles
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates Levenshtein edit distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1, // deletion
        dp[i]![j - 1]! + 1, // insertion
        dp[i - 1]![j - 1]! + cost, // substitution
      );
    }
  }

  return dp[m]![n]!;
}

/**
 * Known semantic aliases for riddles where answers contain numbers or explanations.
 */
const RIDDLE_ALIASES: Record<string, string[]> = {
  // Facile
  'facile-1': ['soleil', 'le soleil'],
  'facile-2': ['chien', 'le chien'],
  'facile-3': ['banane', 'la banane'],
  'facile-4': ['pluie', 'la pluie'],
  'facile-5': ['peigne', 'le peigne'],
  'facile-6': ['lion', 'le lion'],
  'facile-7': ['girafe', 'la girafe'],
  'facile-8': ['chat', 'le chat'],
  'facile-9': ['eau', 'eau de lavage', 'eau sale', 'eau de vaisselle'],
  'facile-10': ['vache', 'la vache'],
  'facile-11': ['mais', 'le mais', 'maïs', 'le maïs'],
  'facile-12': ['langue', 'la langue'],
  'facile-13': ['horloge', 'l horloge', 'montre', 'la montre', 'pendule'],
  'facile-14': ['mer', 'la mer', 'ocean', 'l ocean'],
  'facile-15': ['toi', 'toi meme', 'moi', 'moi meme', 'soi meme', 'soi'],

  // Moyen
  'moyen-1': ['livre', 'un livre', 'bouquin'],
  'moyen-2': ['serviette', 'une serviette', 'serviette de bain', 'drap de bain'],
  'moyen-3': ['sel', 'le sel'],
  'moyen-4': ['lumiere', 'la lumiere'],
  'moyen-5': ['avenir', 'l avenir', 'futur', 'le futur'],
  'moyen-6': ['riviere', 'une riviere', 'fleuve', 'le fleuve', 'cours d eau'],
  'moyen-7': ['baobab', 'le baobab', 'arbre de vie'],
  'moyen-8': ['promesse', 'une promesse', 'parole', 'la parole', 'serment'],
  'moyen-9': ['bougie', 'une bougie', 'chandelle'],
  'moyen-10': ['carte', 'une carte', 'carte geographique', 'plan', 'mappe'],
  'moyen-11': ['timbre', 'un timbre', 'timbre poste'],
  'moyen-12': ['echo', 'l echo'],
  'moyen-13': ['air', 'l air', 'oxygene', 'le vent'],
  'moyen-14': ['feu', 'le feu', 'flamme'],
  'moyen-15': ['3', 'trois', 'trois personnes', 'grand pere pere fils', 'grand pere pere et fils'],

  // Difficile
  'difficile-1': ['fils', 'son fils', 'mon fils'],
  'difficile-2': ['5', 'cinq', 'cinq enfants', '5 enfants'],
  'difficile-3': ['avenir', 'l avenir', 'futur', 'le futur'],
  'difficile-4': ['chauve', 'il est chauve', 'parce qu il est chauve', 'pas de cheveux'],
  'difficile-5': ['trou', 'un trou', 'fosse'],
  'difficile-6': ['nulle part', 'aucun cote', 'zero', 'coq ne pond pas', 'un coq ne pond pas', 'impossible', 'jamais'],
  'difficile-7': ['5', 'cinq', 'cinq bougies', '5 bougies', '2', 'deux', 'les deux'],
  'difficile-8': ['9', 'neuf', '9 moutons', 'neuf moutons'],
  'difficile-9': ['promesse', 'une promesse', 'parole', 'la parole', 'serment'],
  'difficile-10': ['3', 'trois', 'trois personnes', 'grand pere pere fils', 'grand pere pere et fils'],
  'difficile-11': ['feu', 'le feu', 'flamme'],
  'difficile-12': ['trop petit', 'petit', 'il est petit', 'petite taille', 'il est trop petit', 'nain'],
  'difficile-13': ['souffle', 'le souffle', 'respiration', 'l air'],
  'difficile-14': ['10', 'dix', '10 poissons', 'dix poissons', 'tous', 'ils restent tous'],
  'difficile-15': ['n', 'lettre n', 'la lettre n'],
};

export interface MatchResult {
  readonly isCorrect: boolean;
  readonly normalizedUser: string;
  readonly normalizedExpected: string;
}

/**
 * Checks if the user answer matches the official answer with intelligent tolerance.
 */
export function checkRiddleAnswer(
  riddleId: string,
  userAnswer: string,
  officialAnswer: string,
): MatchResult {
  const normUser = normalizeText(userAnswer);
  const normExpected = normalizeText(officialAnswer);

  if (!normUser) {
    return { isCorrect: false, normalizedUser: normUser, normalizedExpected: normExpected };
  }

  // 1. Exact normalized match
  if (normUser === normExpected) {
    return { isCorrect: true, normalizedUser: normUser, normalizedExpected: normExpected };
  }

  // 2. Substring containment if user provided key concept
  if (normUser.length >= 3 && normExpected.includes(normUser)) {
    return { isCorrect: true, normalizedUser: normUser, normalizedExpected: normExpected };
  }
  if (normExpected.length >= 4 && normUser.includes(normExpected)) {
    return { isCorrect: true, normalizedUser: normUser, normalizedExpected: normExpected };
  }

  // 3. Known aliases check
  const aliases = RIDDLE_ALIASES[riddleId] ?? [];
  for (const alias of aliases) {
    const normAlias = normalizeText(alias);
    if (normUser === normAlias || (normUser.length >= 3 && normAlias.includes(normUser))) {
      return { isCorrect: true, normalizedUser: normUser, normalizedExpected: normExpected };
    }
  }

  // 4. Levenshtein distance for typos on single words
  if (normExpected.length >= 5) {
    const distance = levenshteinDistance(normUser, normExpected);
    if (distance <= 1) {
      return { isCorrect: true, normalizedUser: normUser, normalizedExpected: normExpected };
    }
  }

  return { isCorrect: false, normalizedUser: normUser, normalizedExpected: normExpected };
}
