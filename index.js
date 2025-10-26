import express from "express";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Get the current directory name (for ES module support)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve site.html at the root ("/")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "site.html"));
});

// --- Proxy Setup ---
app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "text/html");

    const body = await response.text();
    res.send(body);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error fetching the requested URL.");
  }
});

app.listen(port, () => {
  console.log(`GalaxyHub running on port ${port}`);
});
