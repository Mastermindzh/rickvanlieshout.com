import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import CategoriesTemplate from "./CategoriesTemplate";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("CategoriesTemplate", () => {
  beforeEach(() => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: mocks.allMarkdownRemark,
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<CategoriesTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
