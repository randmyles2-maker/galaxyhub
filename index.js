import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Setup file path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like site.html)
app.use(express.static(__dirname));

// ✅ Route to serve site.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "site.html"));
});

// ✅ Proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    const body = await response.text();
    res.send(body);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).send("Proxy Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GalaxyHub Proxy running on port ${PORT}`);
});
