import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";
import PageTemplate from "./PageTemplate";

import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("PageTemplate", () => {
  const props = {
    data: {
      markdownRemark: mocks.markdownRemark,
    },
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) => render(mocks.siteMetadata));
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<PageTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
