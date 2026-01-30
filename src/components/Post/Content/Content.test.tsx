import { StaticQuery, useStaticQuery } from "gatsby";
import React from "react";
import renderer from "react-test-renderer";
import { Content } from "@/components/Post/Content";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("Content", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) => render(mocks.siteMetadata));
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });
  it("renders correctly", () => {
    const props = {
      title: mocks.markdownRemark.frontmatter.title,
      body: mocks.markdownRemark.html,
    };

    const tree = renderer.create(<Content {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
