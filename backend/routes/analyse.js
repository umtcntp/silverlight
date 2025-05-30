const express = require("express");
const router = express.Router();

const { analyseTechnologies } = require("../services/builtwithService");
const { countPages } = require("../services/pageCounter");

router.post("/", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" })
    };

    try {
        const technologies = await analyseTechnologies(url);
        const pageCount = await countPages(url);

        res.json({ domain: url, technologies, pageCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;