// index.js
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Path setup for static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Root route serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL parameter.");

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    res.setHeader("content-type", contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error.");
  }
});

app.listen(PORT, () => console.log(`🌌 GalaxyHub running on port ${PORT}`));
