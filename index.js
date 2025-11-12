import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow your frontend domain to connect
app.use(cors());
app.use(express.static("public"));

// Proxy route
app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing ?url=");
  try {
    const response = await fetch(target);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching: " + err.message);
  }
});

app.listen(PORT, () => console.log(`🌌 GalaxyHub Proxy is running on port ${PORT}`));
