import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("."));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("No URL provided");

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (GalaxyHub/1.0)"
      }
    });
    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send("Error fetching the requested page.");
  }
});

app.listen(PORT, () => console.log(`🌌 GalaxyHub Proxy running on port ${PORT}`));
