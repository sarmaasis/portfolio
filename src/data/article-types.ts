export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  /** The on-page H1. */
  title: string;
  /** The <title> tag, kept under ~60 characters. Falls back to `title`. */
  seoTitle?: string;
  description: string;
  capsule: string;
  date: string;
  updated?: string;
  tags: string[];
  /** Legacy structured posts: one paragraph per section. */
  sections: ArticleSection[];
  /** Markdown posts (content/blog/*.md): the body, rendered by utils/markdown. */
  markdown?: string;
  takeaways?: string[];
  faqs?: ArticleFaq[];
  /** Reachable, but kept out of lists and the sitemap, and marked noindex. */
  hidden?: boolean;
}
