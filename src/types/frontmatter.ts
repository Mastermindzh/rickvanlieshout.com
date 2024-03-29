interface Frontmatter {
  date: string;
  title: string;
  category: string;
  template: string;
  description?: string;
  tags?: Array<string>;
  socialImage?: { publicURL: string };
  disqusId?: string;
}

export default Frontmatter;
