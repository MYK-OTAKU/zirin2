export interface TaleChapter {
  title: string;
  text: string;
}

export interface Tale {
  id: string;
  title: string;
  slug: string;
  origin: {
    country: string | null;
    culture: string | null;
    status: string;
    source: string | null;
    note: string;
  };
  type: string;
  ageRange: string;
  category: string;
  summary: string;
  content: {
    introduction: string;
    chapters: TaleChapter[];
    conclusion: string;
  };
  moral: string;
  readingTime: number;
  language: string;
  audioUrl: string | null;
  coverImage: string | null;
  tags: string[];
}
