import { Link } from "gatsby";
import React from "react";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";

const NotFoundTemplate: React.FC = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle} slug="/404.html">
      <Sidebar />
      <Page title="Oh no! page be lost">
        <p>
          You've stumbled upon a link that doesn't work anymore :(
          <br />
          Use the menu to navigate around or click <Link to="/">here</Link> to go to the main page.
        </p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
