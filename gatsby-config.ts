import path from "path";

import config from "./content/config.json";
import * as types from "./internal/gatsby/types";

export default {
  pathPrefix: config.pathPrefix,
  trailingSlash: "always",
  siteMetadata: {
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
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
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
              }
            `,
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
            options: { background: "rgb(0, 0, 0,50%)" },
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
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|[^:]static\/)/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "StaleWhileRevalidate",
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-htaccess",
      options: {
        www: true,
        host: "www.rickvanlieshout.com",
        https: true,
        redirect: [
          "RewriteRule ^/?home/(.*)$ /$1 [L,R=301]",
          "RewriteRule ^/?cookies/(.*)$ /pages/legal/cookies$1 [L,R=301]",
          "RewriteRule ^/?disclaimer/(.*)$ /pages/legal/disclaimer$1 [L,R=301]",
          "RewriteRule ^/?contact/(.*)$ /pages/contact$1 [L,R=301]",
          "RewriteRule ^/?resume/(.*)$ /pages/resume$1 [L,R=301]",
          "RewriteRule ^/?about/(.*)$ /pages/about$1 [L,R=301]",
          "RewriteRule ^/?blog/My_brand_new_blog/(.*)$ /posts/2014/my-brand-new-blog/$1 [L,R=301]",
          "RewriteRule ^/?blog/Raspberry_pi_cluster_the_parts/(.*)$ /posts/2014/pi-cluster-1-shopping/$1 [L,R=301]",
          "RewriteRule ^/?blog/Raspberry_pi_cluster_the_build/(.*)$ /posts/2014/pi-cluster-2-the-build/$1 [L,R=301]",
          "RewriteRule ^/?blog/Raspberry_pi_cluster_installing_the_os/(.*)$ /posts/2014/pi-cluster-3-installing-the-os/$1 [L,R=301]",
          "RewriteRule ^/?blog/Raspberry_pi_cluster_setting_up_the_master_node/(.*)$ /posts/2014/pi-cluster-4-setting-up-the-master-node/$1 [L,R=301]",
          "RewriteRule ^/?blog/Raspberry_pi_cluster_expanding_the_cluster/(.*)$ /posts/2014/pi-cluster-5-expanding-the-cluster/$1 [L,R=301]",
          "RewriteRule ^/?blog/Using_the_cluster_for_home_automation/(.*)$ /posts/2014/using-the-cluster-for-home-automation/$1 [L,R=301]",
          "RewriteRule ^/?blog/Shellshock_dont_get_your_panties_in_a_bunch/(.*)$ /posts/2014/shellshock-why-you-shouldnt-get-your-panties-in-a-bunch/$1 [L,R=301]",
          "RewriteRule ^/?blog/Me_my_blog_and_projects/(.*)$ /posts/2014/me-my-blog-and-projects/$1 [L,R=301]",
          "RewriteRule ^/?blog/status_update/(.*)$ /posts/2014/a-status-update/$1 [L,R=301]",
          "RewriteRule ^/?blog/new_look_new_comments_new_everything/(.*)$ /posts/2015/new-look-new-comments-new-everything/$1 [L,R=301]",
          "RewriteRule ^/?blog/what_ive_been_doing posts/2015/what-ive-been-doing/$1 [L,R=301]",
          "RewriteRule ^/?blog/raspberry_pi_screen/(.*)$ /posts/2015/raspberry-pi-screen/$1 [L,R=301]",
          "RewriteRule ^/?blog/making_things/(.*)$ /posts/2015/making-things/$1 [L,R=301]",
          "RewriteRule ^/?blog/TekTree-part-1/(.*)$ /posts/2015/tektree-part-1-a-christmas-surprise/$1 [L,R=301]",
          "RewriteRule ^/?blog/TekTree-part-2/(.*)$ /posts/2015/tektree-part-2-lasercutting/$1 [L,R=301]",
          "RewriteRule ^/?blog/TekTree-part-3/(.*)$ /posts/2015/tektree-part-3-wiring/$1 [L,R=301]",
          "RewriteRule ^/?blog/TekTree-part-4/(.*)$ /posts/2015/tektree-part-4-programming/$1 [L,R=301]",
          "RewriteRule ^/?blog/my-extended-leave/(.*)$ /posts/2016/extended-leave-status-updates-and-other-stuff/$1 [L,R=301]",
          "RewriteRule ^/?blog/slsw-day0/(.*)$ /posts/2017/scala-day-0-what-is-scala/$1 [L,R=301]",
          "RewriteRule ^/?blog/slsw-day1/(.*)$ /posts/2017/scala-day-1-the-basics/$1 [L,R=301]",
          "RewriteRule ^/?blog/slsw-day2/(.*)$ /posts/2017/scala-day-2-lets-get-functional/$1 [L,R=301]",
          "RewriteRule ^/?blog/slsw-day3/(.*)$ /posts/2017/scala-day-3-concurrency-is-key/$1 [L,R=301]",
          "RewriteRule ^/?blog/slsw-day4/(.*)$ /posts/2017/scala-day-4-a-challenge/$1 [L,R=301]",
          "RewriteRule ^/?blog/keep-a-sata-port-available/(.*)$ /posts/2017/keep-a-sata-port-available/$1 [L,R=301]",
          "RewriteRule ^/?old/(.*)$ /new/$1 [L,R=301]",
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-sass",
  ],
};
