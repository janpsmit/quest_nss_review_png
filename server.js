import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

// Simple test endpoint (optional)
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
