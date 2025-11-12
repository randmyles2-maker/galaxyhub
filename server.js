import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type");
    res.set("content-type", contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching URL: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`🌌 GalaxyHub Proxy is running on port ${port}`);
});
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type");
    res.set("content-type", contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching URL: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`🌌 GalaxyHub Proxy is running on port ${port}`);
});
