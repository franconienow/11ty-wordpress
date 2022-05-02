const path = require("path");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addLiquidFilter("getCategoryPage", (catId, pages) => {
    for (const page of pages) {
      if (page.id == catId) {
        return page;
      }
    }
  });

  eleventyConfig.addLiquidFilter("getRelatedPosts", (posts, catList, curId) => {
    const relatedPosts = [];
    for (const curCategory of catList) {
      for (const post of posts) {
        if (post.categories.includes(curCategory) && post.id != curId) {
          if (!relatedPosts.map((rPost) => rPost.id).includes(post.id)) {
            relatedPosts.push(post);
          }
        }
      }
    }

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array
    };

    if (relatedPosts.length > 0) {
      const shuffled = shuffleArray(Array.from(relatedPosts));
      return shuffled.slice(0, 2);
    }

    return false;

    // TODO: Testar shuffle
  });

  eleventyConfig.ignores.add(path.join("src", "assets", "/**"));

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
