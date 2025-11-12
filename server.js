import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve your GalaxyHub HTML

// Proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("No URL provided.");

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");
    res.set("content-type", contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching site: " + err.message);
  }
});

// For all other routes, serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 GalaxyHub Proxy running on port ${port}`));
