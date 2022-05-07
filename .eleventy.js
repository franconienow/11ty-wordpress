const path = require("path");
const glob = require("glob");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = (eleventyConfig) => {
  // Add plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Ignore assets folder
  eleventyConfig.ignores.add(path.join("src", "assets", "/**"));

  // Add filters
  const filtersDir = glob.sync("src/filters/*.js");
  filtersDir.forEach((filterFile) => {
    const filter = require(path.resolve(filterFile));
    eleventyConfig.addLiquidFilter(path.parse(filterFile).name, filter);
  });

  // Add HTML minifier transformation
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      includes: "includes",
      layouts: "layouts",
      data: "data",
      output: "dist",
    },
  };
};
