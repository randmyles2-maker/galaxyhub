import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (like index.html, css, js)
app.use(express.static(__dirname));

// Simple proxy endpoint
app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    // Copy all headers except ones that block iframes
    const headers = {};
    response.headers.forEach((value, key) => {
      if (
        !["x-frame-options", "content-security-policy"].includes(
          key.toLowerCase()
        )
      ) {
        headers[key] = value;
      }
    });

    const contentType = response.headers.get("content-type") || "text/html";
    res.writeHead(response.status, { ...headers, "content-type": contentType });

    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => console.log(`🌌 GalaxyHub Proxy running on ${PORT}`));
