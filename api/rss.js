const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing RSS URL");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Certains serveurs RSS exigent un User-Agent pour ne pas bloquer
        "User-Agent": "Mozilla/5.0 (compatible; RSSProxy/1.0)"
      },
      redirect: "follow" // Suivre les redirections HTTP (301/302)
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch RSS");
    }

    const text = await response.text();
    res.setHeader("Content-Type", "application/xml");
    res.send(text);
  } catch (err) {
    console.error("Erreur RSS proxy:", err);
    res.status(500).send("Failed to fetch RSS");
  }
};
