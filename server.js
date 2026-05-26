import cors from "cors";
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

const DATA_FILE = "data/shared_survey.json";

// Load current survey state
app.get("/load", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json({});
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Save survey state
app.post("/save", (req, res) => {
  let currentData = {};

  if (fs.existsSync(DATA_FILE)) {
    currentData = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  const updatedData = { ...currentData, ...req.body };

  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));

  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
