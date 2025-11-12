import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve your HTML

// Proxy endpoint that removes X-Frame restrictions
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing ?url parameter");

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    // Clone headers, but remove security ones that block embedding
    const headers = {};
    response.headers.forEach((value, key) => {
      if (
        ![
          "content-security-policy",
          "x-frame-options",
          "x-content-type-options",
          "referrer-policy"
        ].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    const body = await response.text();
    res.set(headers);
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching site: " + err.message);
  }
});

// Serve your app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 10000;
app.listen(port, () =>
  console.log(`🚀 GalaxyHub proxy running on port ${port}`)
);
