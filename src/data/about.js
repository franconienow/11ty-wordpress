const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
  const url = "https://admin.bigtuna.site/wp-json/wp/v2/pages/43?acf_format=standard";
  return EleventyFetch(url, {
    directory: ".11ty.cache",
    duration: "30m",
    type: "json",
  });
};