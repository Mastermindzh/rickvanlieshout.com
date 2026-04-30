import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: body } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title, description = "", socialImage } = frontmatter;
  const metaDescription = description || siteSubtitle;
  const slug = data.markdownRemark.fields.slug;
  const slugSegment =
    slug
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .pop() ?? "";
  const bodyClassName = slugSegment ? `page-${slugSegment}` : undefined;

  return (
    <Layout
      title={`${title} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage?.publicURL}
      slug={data.markdownRemark.fields.slug}
    >
      {bodyClassName && <Helmet bodyAttributes={{ class: bodyClassName }} />}
      <Sidebar />
      <Page title={title} bodyClassName={bodyClassName}>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: static rendering */}
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        description
        socialImage {
          publicURL
        }
      }
    }
  }
`;

export default PageTemplate;
