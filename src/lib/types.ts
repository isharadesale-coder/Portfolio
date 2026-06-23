export type GalleryItem = {
  url: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  role?: string;
  client?: string;
  summary: string;
  /** Longer description, rendered as paragraphs (array of strings) */
  body?: string[];
  /** Accent hex used for the card gradient + detail page */
  accent: string;
  coverUrl?: string;
  gallery?: GalleryItem[];
  tags?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  /** Placeholder project — shown in the grid as "Coming soon", not clickable */
  comingSoon?: boolean;
};
