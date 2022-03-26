type Url = string;

interface Chapter {
  chapNumber: number;
  url: Url;
  images?: Array<Url>;
}

interface Truyen {
  url: Url;
  title: string;
  otherName: Array<string>;
  author: string;
  status: string;
  kind: Array<string>;
  slug: string;
  chapters?: Array<Chapter>;
  detail: string;
  cover: Url;
}

export type { Url, Chapter, Truyen };
