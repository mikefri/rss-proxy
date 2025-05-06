const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/rss", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing RSS URL");

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.set("Content-Type", "application/xml");
    res.send(text);
  } catch (err) {
    res.status(500).send("Failed to fetch RSS");
  }
});

app.listen(3000, () => console.log("Proxy RSS en ligne sur le port 3000"));
