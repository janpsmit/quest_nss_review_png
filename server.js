import cors from "cors";
import express from "express";
import fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

const app = express();

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

app.get("/export-word", async (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync("data/shared_survey.json", "utf-8"),
    );

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph("Test document")],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader("Content-Disposition", "attachment; filename=report.docx");

    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating document");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
