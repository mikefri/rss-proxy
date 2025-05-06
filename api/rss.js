const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing RSS URL");
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader("Content-Type", "application/xml");
    res.send(text);
  } catch (err) {
    res.status(500).send("Failed to fetch RSS");
  }
};
