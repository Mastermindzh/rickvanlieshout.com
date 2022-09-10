import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import CategoryTemplate from "./CategoryTemplate";
import * as mocks from "@/mocks";


const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("CategoryTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const props = {
      data: {
        allMarkdownRemark: mocks.allMarkdownRemark,
      },
      pageContext: mocks.pageContext,
    };

    const tree = renderer.create(<CategoryTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
