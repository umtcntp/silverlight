const fetchHTML = require("../utils/fetchHTML");
const cheerio = require("cheerio");

async function countPages(url) {
    try {
        const html = await fetchHTML(url);
        const $ = cheerio.load(html);
        const links = new Set();

        $("a").each((_, el) => {
            const href = $(el).attr("href");
            if (href && href.startsWith("/") && !href.startsWith("//")) {
                links.add(href.split("#")[0]);
            }
        });

        return links.size;
    } catch (err) {
        console.error("countPages error:", err.message);
        return 0;
    }
}

module.exports = { countPages };
