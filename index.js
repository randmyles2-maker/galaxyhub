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
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    // Copy headers except frame-blocking ones
    const headers = {};
    for (const [key, value] of response.headers.entries()) {
      if (
        !["x-frame-options", "content-security-policy"].includes(
          key.toLowerCase()
        )
      ) {
        headers[key] = value;
      }
    }

    // Allow embedding and CORS
    res.set({
      ...headers,
      "Access-Control-Allow-Origin": "*",
      "X-Frame-Options": "ALLOWALL",
      "Content-Security-Policy": "",
    });

    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ GalaxyHub Proxy running on port ${PORT}`);
});
