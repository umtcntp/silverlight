const axios = require("axios");

module.exports = async function fetchHTML(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            timeout: 10000
        });
        return response.data;
    } catch (err) {
        throw new Error(`fetchHTML failed: ${err.message}`);
    }
};
