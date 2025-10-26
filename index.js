import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send("🚀 GalaxyHub Proxy is running!");
});

// Proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL parameter");

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
      },
    });

    let body = await response.text();

    // 🧩 Remove headers that block embedding
    res.set("Access-Control-Allow-Origin", "*");
    res.set("X-Frame-Options", "ALLOWALL");
    res.set("Content-Security-Policy", "frame-ancestors *");
    res.set("Content-Type", "text/html");

    // 🧠 Optional: fix absolute URLs to go through your proxy
    body = body.replace(/href="https?:\/\//g, `href="/proxy?url=https://`);
    body = body.replace(/src="https?:\/\//g, `src="/proxy?url=https://`);

    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ GalaxyHub Proxy running on port ${PORT}`);
});
