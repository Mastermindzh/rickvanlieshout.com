import { Link } from "gatsby";
import React, { useState } from "react";

import * as styles from "./OpenSourceHighlights.module.scss";

type HighlightLink = {
  href: string;
  internal?: boolean;
  label: string;
};

type Highlight = {
  description: string;
  links: Array<HighlightLink>;
  title: string;
};

const highlights: Array<Highlight> = [
  {
    title: "Skillful",
    description:
      "Local-first platform for managing reusable AI workflows and organisational knowledge.",
    links: [
      { label: "GitHub", href: "https://github.com/Mastermindzh/skillful" },
      { label: "Website", href: "https://skillful.md" },
      { label: "Article", href: "/posts/2026/introducing-skillful/", internal: true },
    ],
  },
  {
    title: "react-cookie-consent",
    description: "React cookie consent library installed over 20 million times",
    links: [
      { label: "GitHub", href: "https://github.com/Mastermindzh/react-cookie-consent" },
      { label: "npm", href: "https://www.npmjs.com/package/react-cookie-consent" },
      {
        label: "npm-stat",
        href: "https://npm-stat.com/charts.html?package=react-cookie-consent&from=2017-01-15&to=2026-06-15",
      },
    ],
  },
  {
    title: "Tidal-Hifi",
    description: "Desktop client with hi-fi support for Linux, installed on 500k+ machines.",
    links: [{ label: "GitHub", href: "https://github.com/Mastermindzh/tidal-hifi" }],
  },
];

const visibleHighlights = 2;

const OpenSourceHighlights: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const lastStartIndex = highlights.length - visibleHighlights;
  const shownHighlights = highlights.slice(startIndex, startIndex + visibleHighlights);

  return (
    <section className={styles.openSourceHighlights} aria-labelledby="open-source-highlights">
      <div className={styles.heading}>
        <div>
          <h2 id="open-source-highlights" className={styles.title}>
            Featured Work
          </h2>
          <p className={styles.intro}>
            A few open-source projects and tools I've built or maintained over the years.
          </p>
        </div>
        <div className={styles.controls}>
          <button
            aria-label="Previous open-source projects"
            className={styles.control}
            disabled={startIndex === 0}
            onClick={() => setStartIndex((current) => Math.max(current - 1, 0))}
            type="button"
          >
            &lt;
          </button>
          <button
            aria-label="Next open-source projects"
            className={styles.control}
            disabled={startIndex === lastStartIndex}
            onClick={() => setStartIndex((current) => Math.min(current + 1, lastStartIndex))}
            type="button"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.items}>
        {shownHighlights.map((item) => (
          <article className={styles.item} key={item.title}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.links}>
              {item.links.map((link) =>
                link.internal ? (
                  <Link className={styles.link} to={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a
                    className={styles.link}
                    href={link.href}
                    key={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </article>
        ))}
      </div>
      <div className={styles.divider}>
        <span className={styles.dividerLabel}>Latest Articles</span>
      </div>
    </section>
  );
};

export default OpenSourceHighlights;
