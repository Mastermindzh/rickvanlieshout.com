import type { Node } from "@/types";
import React from "react";
import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import * as styles from "./Post.module.scss";
import { Tags } from "./Tags";

interface Props {
  post: Node;
}

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug, readingTime } = post.fields;
  const { tags, title, date, disqusId } = post.frontmatter;

  return (
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
  );
};

export default Post;
