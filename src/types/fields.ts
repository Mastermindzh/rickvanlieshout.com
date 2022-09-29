interface Fields {
  slug: string;
  categorySlug: string;
  tagSlugs?: Array<string>;
  readingTime?: {
    text: string;
  };
}

export default Fields;
