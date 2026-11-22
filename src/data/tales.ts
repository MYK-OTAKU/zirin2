import corpus from './zirin-contes-15-corrige.json';
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

let validatedCorpus: TaleCorpus | undefined;

export function getTales(): readonly Tale[] {
  validatedCorpus ??= parseTaleCorpus(corpus);
  return validatedCorpus.tales;
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
