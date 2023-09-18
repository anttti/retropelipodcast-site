const escape = require("../lib/escape.js");
const rfc822Date = require("../lib/rfc822-date.js");
const global = require("../src/_data/global");

module.exports = function (eleventyConfig) {
  const isPublished = (episode) => !episode.data.draft;
  eleventyConfig.addCollection("publishedEpisodes", (collection) => {
    return collection
      .getFilteredByGlob("./src/episodes/*.md")
      .filter(isPublished);
  });

  eleventyConfig.addFilter("rfc822Date", (dateValue) => {
    return dateValue ? rfc822Date(dateValue) : "";
  });

  eleventyConfig.addFilter("xmlEscape", (value) => escape(value));
  eleventyConfig.addFilter(
    "shownotes",
    (value) => `<![CDATA[${value.templateContent}]]>`
  );

  eleventyConfig.addFilter("collectionLastUpdatedDate", (collection) => {
    if (!collection || !collection.length) {
      throw new Error(
        "Collection is empty in collectionLastUpdatedDate filter."
      );
    }

    return rfc822Date(
      new Date(
        Math.max(...collection.map((item) => item.data.media.publishDate))
      )
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    dateObj.toISOString()
  );

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    dateObj.toLocaleDateString("fi-FI")
  );

  eleventyConfig.addFilter("year", (dateObj) => dateObj.getYear() + 1900);

  eleventyConfig.addFilter("link", (number) => `${global.url}/${number}`);
  eleventyConfig.addFilter(
    "orDefaultType",
    (episodeType) => episodeType || global.episodeType
  );
  eleventyConfig.addFilter(
    "orDefaultSeason",
    (season) => season || global.season
  );
  eleventyConfig.addFilter(
    "orDefaultExplicit",
    (explicit) => explicit || global.explicit
  );
  eleventyConfig.addFilter(
    "orDefaultAuthor",
    (author) => author || global.author
  );
  eleventyConfig.addFilter("orDefaultImage", (image) => image || global.image);

  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });
  eleventyConfig.setBrowserSyncConfig({
    files: [
      "_site/**/*.html",
      "_site/**/*.css",
      "_site/**/*.js",
      "_site/**/*.png",
      "_site/**/*.jpg",
      "_site/**/*.svg",
    ],
  });

  return {
    dir: { input: "src", output: "_site" },
  };
};
