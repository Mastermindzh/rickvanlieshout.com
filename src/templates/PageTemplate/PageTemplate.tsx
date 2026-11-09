import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";
import { getContactHref } from "@/utils";

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle, author, url } = useSiteMetadata();
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
        {slugSegment === "resume" && (
          <header className="resume-header">
            <div className="resume-header__identity">
              <img src={author.photo} alt={author.name} width={110} height={110} />
              <div>
                <p className="resume-header__name">{author.name}</p>
                <p>CTO · Tech Lead · Software Architect</p>
              </div>
            </div>
            <div className="resume-header__details">
              <dl className="resume-header__contacts">
                <dt>Based in</dt>
                <dd>{author.location}</dd>
                <dt>Email</dt>
                <dd>
                  <a href={getContactHref("email", author.contacts.email)}>
                    {author.contacts.email}
                  </a>
                </dd>
                <dt>Phone</dt>
                <dd>
                  <a href={getContactHref("phone", author.contacts.phone)}>{author.phoneDisplay}</a>
                </dd>
                <dt>Online</dt>
                <dd className="resume-header__profiles">
                  <a href={`${getContactHref("linkedin", author.contacts.linkedin)}/`}>LinkedIn</a>
                  <a href={getContactHref("github", author.contacts.github)}>GitHub</a>
                  <a href={`${url}/`}>Website</a>
                </dd>
              </dl>
              <a className="resume-header__download" href="/resume.pdf" download>
                Download resume (PDF)
              </a>
            </div>
          </header>
        )}
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
