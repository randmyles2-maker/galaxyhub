import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS
app.use(cors());

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (this lets you load site.html, CSS, JS, etc.)
app.use(express.static(__dirname));

// Default route — optional
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "site.html"));
});

// Proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing URL parameter");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    res.set("Access-Control-Allow-Origin", "*");
    res.set("X-Frame-Options", "ALLOWALL");
    res.set("Content-Type", response.headers.get("content-type") || "text/html");

    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ GalaxyHub Proxy is running on port ${PORT}`);
});
