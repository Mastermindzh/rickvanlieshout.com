import React from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../../hooks";
import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import * as styles from "./Post.module.scss";
import { Tags } from "./Tags";
import type { Node } from "@/types";

interface Props {
  post: Node;
}

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug, readingTime } = post.fields;
  const { tags, title, date, disqusId, category } = post.frontmatter;
  const { url } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content={url} />
        <meta property="article:section" content={category} />
        <meta property="article:tag" content={tags ? tags[0] : ""} />
      </Helmet>

      <div className={styles.post}>
        <div className={styles.content}>
          <Content body={html} title={title} subTitle={readingTime?.text} />
        </div>

        <div className={styles.footer}>
          <Meta date={date} />
          {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
          <Author />
        </div>

        <div className={`${styles.comments} hideInPrintView`}>
          <Comments disqusId={disqusId} postSlug={slug} postTitle={post.frontmatter.title} />
        </div>
      </div>
    </>
  );
};

export default Post;
