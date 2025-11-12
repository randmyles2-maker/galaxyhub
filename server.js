import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Needed for ES modules to use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve your index.html and all files in this directory
app.use(express.static(__dirname));

// Send index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`🌌 GalaxyHub running on port ${port}`);
});
