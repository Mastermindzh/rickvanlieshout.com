import React from "react";

import { graphql } from "gatsby";

import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { AllMarkdownRemark, PageContext } from "@/types";

interface Props {
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
  pageContext: PageContext;
}

const TagTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { group, pagination } = pageContext;
  const { currentPage, prevPagePath, nextPagePath, hasPrevPage, hasNextPage } = pagination;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `${group} - Page ${currentPage} - ${siteTitle}` : `${group} - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle} slug={`/tag/${group}/`}>
      <Sidebar />
      <Page title={group}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagTemplate($group: String, $limit: Int!, $offset: Int!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $offset
      filter: {
        frontmatter: { tags: { in: [$group] }, template: { eq: "post" }, draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default TagTemplate;
