const https = require("https");

function analyseTechnologies(url) {
    const apiKey = process.env.BUILTWITH_API_KEY;
    const apiUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LOOKUP=${encodeURIComponent(url)}`;

    return new Promise((resolve, reject) => {
        https.get(apiUrl, res => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    const techs = parsed?.Results?.[0]?.Result?.Paths?.[0]?.Technologies || [];
                    const names = techs.map(t => t.Name);
                    resolve(names);
                } catch (e) {
                    reject(new Error("Failed to parse BuiltWith response"));
                }
            });
        }).on("error", reject);
    });
}

module.exports = { analyseTechnologies };
