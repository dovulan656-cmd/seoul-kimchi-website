module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "css": "css" });
    eleventyConfig.addPassthroughCopy({ "js": "js" });
    eleventyConfig.addPassthroughCopy({ "image": "image" });
    eleventyConfig.addPassthroughCopy({ "manifest.json": "manifest.json" });
    eleventyConfig.addPassthroughCopy({ "browserconfig.xml": "browserconfig.xml" });
    eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
    eleventyConfig.addPassthroughCopy({ "sitemap.xml": "sitemap.xml" });

    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};


