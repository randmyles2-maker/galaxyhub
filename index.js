import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Simple homepage
app.get("/", (req, res) => {
  res.send("🚀 GalaxyHub Proxy is running!");
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

    // copy headers but allow embedding
    res.set("Access-Control-Allow-Origin", "*");
    res.set("X-Frame-Options", "ALLOWALL");
    res.set("Content-Type", response.headers.get("content-type") || "text/html");

    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ GalaxyHub Proxy running on port ${PORT}`);
});
