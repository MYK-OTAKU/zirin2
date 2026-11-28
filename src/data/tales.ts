import corpus from './zirin-contes-15-corrige.json';
import djeliBabaCollection from './contes-maliens-djeli-baba.json';
import societyTaleCollection from '../../../contes_societe_malienne.json';
import societyTaleCollectionVol2 from './contes-societe-malienne-vol2.json';
import type { Tale, TaleChapter } from '../domain/tale';

interface TaleCorpus {
  schemaVersion: string;
  title: string;
  language: string;
  editorialNote: string;
  tales: Tale[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNullableString(value: unknown): value is string | null {
  return value === null || isString(value);
}

function isChapter(value: unknown): value is TaleChapter {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.text)
  );
}

function isTale(value: unknown): value is Tale {
  if (!isRecord(value) || !isRecord(value.origin) || !isRecord(value.content)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.title) &&
    isString(value.slug) &&
    isNullableString(value.origin.country) &&
    isNullableString(value.origin.culture) &&
    isString(value.origin.status) &&
    isNullableString(value.origin.source) &&
    isString(value.origin.note) &&
    isString(value.type) &&
    isString(value.ageRange) &&
    isString(value.category) &&
    isString(value.summary) &&
    isString(value.content.introduction) &&
    Array.isArray(value.content.chapters) &&
    value.content.chapters.length > 0 &&
    value.content.chapters.every(isChapter) &&
    isString(value.content.conclusion) &&
    isString(value.moral) &&
    typeof value.readingTime === 'number' &&
    value.readingTime > 0 &&
    isString(value.language) &&
    isNullableString(value.audioUrl) &&
    isNullableString(value.coverImage) &&
    Array.isArray(value.tags) &&
    value.tags.every(isString)
  );
}

function parseTaleCorpus(value: unknown): TaleCorpus {
  if (!isRecord(value)) {
    throw new Error('Le fichier de contes Zirin ne respecte pas le schéma attendu.');
  }

  const { schemaVersion, title, language, editorialNote, tales: rawTales } = value;

  if (
    !isString(schemaVersion) ||
    !isString(title) ||
    !isString(language) ||
    !isString(editorialNote) ||
    !Array.isArray(rawTales)
  ) {
    throw new Error('Le fichier de contes Zirin ne respecte pas le schéma attendu.');
  }

  const tales = rawTales.filter(isTale);
  const ids = new Set(tales.map((tale) => tale.id));
  const slugs = new Set(tales.map((tale) => tale.slug));

  if (
    tales.length !== 15 ||
    tales.length !== rawTales.length ||
    ids.size !== tales.length ||
    slugs.size !== tales.length
  ) {
    throw new Error(
      'Le corpus Zirin doit contenir 15 contes valides avec des identifiants et des slugs uniques.',
    );
  }

  return { schemaVersion, title, language, editorialNote, tales };
}

const supplementalCategories = [
  'Justice et vérité',
  'Générosité et solidarité',
  'Nature et respect',
  'Travail et fraternité',
  'Paix et parole',
  'Bonté et humilité',
  'Prudence et sagesse',
  'Patience et savoir-faire',
  'Ruse et courage',
  'Nature et transmission',
] as const;

const supplementalSummaries = [
  'À Ségou, un tambour sacré révèle qui dit vrai lorsque le trésor royal disparaît.',
  'Au cœur de la saison sèche, le dernier geste généreux de Kadiatou change le destin de Siby.',
  'Un jeune chasseur choisit d’épargner une biche mystérieuse et découvre le pouvoir de la retenue.',
  'Trois frères découvrent que le trésor de leur père se cache dans le travail accompli ensemble.',
  'Un griot rappelle à deux villages leurs liens communs et transforme une querelle en partage.',
  'La bonté de Balla est récompensée par un baobab, tandis que l’arrogance de sa marâtre se retourne contre elle.',
  'Une tortue doit apprendre à garder le silence pour traverser le ciel sans danger.',
  'À Djenné, un apprenti tisserand comprend que la patience donne à son travail une valeur durable.',
  'Un lièvre fait appel à son intelligence pour libérer les animaux de la tyrannie du lion.',
  'Un pêcheur transmet à son fils une promesse de respect et de protection du fleuve Djoliba.',
] as const;

const supplementalTales: Tale[] = djeliBabaCollection.contes.map((tale, index) => {
  const category = supplementalCategories[index];
  const summary = supplementalSummaries[index];

  if (!category || !summary) {
    throw new Error(`Les métadonnées du conte supplémentaire ${tale.id} sont manquantes.`);
  }

  return {
    id: `conte-${String(tale.id + 15).padStart(3, '0')}`,
    title: tale.titre,
    slug: tale.titre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('fr')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    origin: {
      country: 'Mali',
      culture: null,
      status: 'creation_originale_inspiree',
      source: djeliBabaCollection.collection,
      note: `Création contemporaine inspirée de la tradition orale malienne et de l'art du griot (${djeliBabaCollection.inspiration}). Ce récit n'est pas présenté comme une transcription traditionnelle authentifiée.`,
    },
    type: 'creation_inspiree',
    ageRange: '8-12 ans',
    category,
    summary,
    content: {
      introduction: tale.proverbe_introductif,
      chapters: [{ title: 'Le récit', text: tale.recit }],
      conclusion: '',
    },
    moral: tale.morale,
    readingTime: Math.ceil(tale.duree_estimee_sec / 60),
    language: djeliBabaCollection.langue,
    audioUrl: null,
    coverImage: null,
    tags: [tale.theme, tale.lieu, ...tale.personnages],
  };
});

const societyTales: Tale[] = societyTaleCollection.contes.map((tale) => {
  const firstSentence = tale.histoire.trim().split(/(?<=[.!?])\s+/u)[0] ?? tale.histoire;
  const summary =
    firstSentence.length > 160 ? `${firstSentence.slice(0, 157).trimEnd()}…` : firstSentence;

  return {
    id: `conte-societe-${String(tale.id).padStart(3, '0')}`,
    title: tale.titre,
    slug: tale.titre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('fr')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    origin: {
      country: 'Mali',
      culture: null,
      status: 'creation_originale_inspiree',
      source: societyTaleCollection.collection,
      note: `Récit issu de la collection « ${societyTaleCollection.collection} ». Le fichier fourni ne précise pas de source de collecte permettant de l’authentifier comme transcription traditionnelle.`,
    },
    type: 'creation_inspiree',
    ageRange: '8-12 ans',
    category: tale.theme,
    summary,
    content: {
      introduction: '',
      chapters: [{ title: 'Le récit', text: tale.histoire }],
      conclusion: '',
    },
    moral: tale.moralite,
    readingTime: Math.max(1, Math.ceil(tale.histoire.trim().split(/\s+/).length / 200)),
    language: 'fr',
    audioUrl: null,
    coverImage: null,
    tags: [tale.region, tale.theme],
  };
});

const societyTalesVol2: Tale[] = societyTaleCollectionVol2.contes.map((tale) => {
  const firstSentence = tale.histoire.trim().split(/(?<=[.!?])\s+/u)[0] ?? tale.histoire;
  const summary =
    firstSentence.length > 160 ? `${firstSentence.slice(0, 157).trimEnd()}…` : firstSentence;

  return {
    id: `conte-societe-vol2-${String(tale.id).padStart(3, '0')}`,
    title: tale.titre,
    slug: tale.titre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('fr')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    origin: {
      country: 'Mali',
      culture: null,
      status: 'creation_originale_inspiree',
      source: societyTaleCollectionVol2.collection,
      note: `Récit issu de la collection « ${societyTaleCollectionVol2.collection} ». Le fichier fourni ne précise pas de source de collecte permettant de l’authentifier comme transcription traditionnelle.`,
    },
    type: 'creation_inspiree',
    ageRange: '8-12 ans',
    category: tale.theme,
    summary,
    content: {
      introduction: '',
      chapters: [{ title: 'Le récit', text: tale.histoire }],
      conclusion: '',
    },
    moral: tale.moralite,
    readingTime: Math.max(1, Math.ceil(tale.histoire.trim().split(/\s+/).length / 200)),
    language: 'fr',
    audioUrl: null,
    coverImage: null,
    tags: [tale.region, tale.theme],
  };
});

let validatedCorpus: TaleCorpus | undefined;

export function getTales(): readonly Tale[] {
  validatedCorpus ??= parseTaleCorpus(corpus);
  return [...validatedCorpus.tales, ...supplementalTales, ...societyTales, ...societyTalesVol2];
}

export function getTaleBySlug(slug: string): Tale | undefined {
  return getTales().find((tale) => tale.slug === slug);
}

export function getTaleCategories(): string[] {
  return [...new Set(getTales().map((tale) => tale.category))].sort((a, b) =>
    a.localeCompare(b, 'fr'),
  );
}

export function getTaleAgeRanges(): string[] {
  return [...new Set(getTales().map((tale) => tale.ageRange))].sort();
}
