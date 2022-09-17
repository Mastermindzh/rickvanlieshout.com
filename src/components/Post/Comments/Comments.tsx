import React from "react";

import { DiscussionEmbed } from "disqus-react";

import { useSiteMetadata } from "@/hooks";

interface Props {
  postTitle: string;
  postSlug: string;
  disqusId?: string;
}

const Comments: React.FC<Props> = ({ postTitle, postSlug, disqusId }: Props) => {
  const { url, disqusShortname } = useSiteMetadata();

  if (!disqusShortname) {
    return null;
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={{
        url: url + postSlug,
        identifier: disqusId ?? postTitle,
        title: postTitle,
      }}
    />
  );
};

export default Comments;
