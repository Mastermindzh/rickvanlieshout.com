import path from "node:path";

import config from "./content/config.json";
import * as types from "./internal/gatsby/types";

export default {
  pathPrefix: config.pathPrefix,
  trailingSlash: "always",
  siteMetadata: {
    siteUrl: config.url,
    url: config.url,
    menu: config.menu,
    legalMenu: config.legalMenu,
    title: config.title,
    author: config.author,
    subtitle: config.subtitle,
    copyright: config.copyright,
    postsLimit: config.postsLimit,
    disqusShortname: config.disqusShortname,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve("content"),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: {
                site: {
                  siteMetadata: {
                    url: string;
                  };
                };
                allMarkdownRemark: {
                  edges: Array<types.Edge>;
                };
              };
            }) =>
              allMarkdownRemark.edges.map(({ node }) => ({
                ...node.frontmatter,
                date: node?.frontmatter?.date,
                description: node?.frontmatter?.description,
                url: site.siteMetadata.url + node?.fields?.slug,
                guid: site.siteMetadata.url + node?.fields?.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `{
              allMarkdownRemark(
                limit: 1000
                sort: {frontmatter: {date: DESC}}
                filter: {frontmatter: {template: {eq: "post"}, draft: {ne: true}}}
              ) {
                edges {
                  node {
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      date
                      title
                      description
                    }
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: config.title,
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              withWebp: true,
              linkImagesToOriginal: false,
              showCaptions: ["title"],
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin-bottom: 1.0725rem" },
          },
          {
            resolve: "gatsby-remark-images-medium-zoom",
            options: { background: "rgb(0, 0, 0,70%)" },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [config.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.title,
        theme_color: "hsl(31, 92%, 62%)",
        background_color: "hsl(0, 0%, 100%)",
        icon: "content/me.png",
        display: "standalone",
        start_url: "/",
      },
    },
    // remove the old service worker if it is available.
    "gatsby-plugin-remove-serviceworker",
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-sass",
    "gatsby-plugin-robots-txt",
  ],
};
