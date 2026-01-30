import path from "node:path";
import { CreateWebpackConfigArgs } from "gatsby";
import { CompilerOptions } from "typescript";

import { compilerOptions } from "../../tsconfig.json";

const onCreateWebpackConfig = (
  (options: Pick<CompilerOptions, "paths">) =>
  ({ actions, getConfig }: CreateWebpackConfigArgs) => {
    // Keep existing TS path aliases in webpack
    actions.setWebpackConfig({
      resolve: {
        alias: Object.entries(options.paths || []).reduce(
          (aliases, [name, [target]]) => ({
            // biome-ignore lint/performance/noAccumulatingSpread: old code
            ...aliases,
            [name]: path.resolve(target),
          }),
          {},
        ),
      },
    });

    // Workaround: Gatsby's webpack ESLint plugin is incompatible with ESLint v9+ options
    // on some environments. Remove the plugin from the webpack pipeline during development
    // to prevent build failures like "Invalid Options: Unknown options: extensions, useEslintrc".
    // We still keep linting via npm scripts.
    try {
      const config = getConfig();
      if (config?.plugins?.length) {
        const beforeCount = config.plugins.length;
        config.plugins = config.plugins.filter((plugin: any) => {
          const name = plugin?.constructor?.name;
          return name !== "ESLintWebpackPlugin" && name !== "ESLintPlugin";
        });
        const afterCount = config.plugins.length;
        // Only replace when we've actually modified the plugins array
        if (afterCount !== beforeCount) {
          actions.replaceWebpackConfig(config);
        }
      }
    } catch {
      // noop – if Gatsby changes internals, don't crash the build
    }
  }
)(compilerOptions);

export { onCreateWebpackConfig };
