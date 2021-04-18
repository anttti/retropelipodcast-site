const escape = require("lodash.escape");
const rfc822Date = require("rfc822-date");
const { DateTime } = require("luxon");
const global = require("../src/_data/global");

module.exports = function (eleventyConfig) {
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

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("d.M.yyyy");
  });

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

  return {
    dir: { input: "src", output: "_site" },
  };
};
