import cors from "cors";
import express from "express";
import fs from "fs";
import cors from "cors";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

app.get("/export-word", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data/shared_survey.json", "utf-8"));

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Global Assessment – Self-Assessment",
                  bold: true,
                  size: 32,
                }),
              ],
            }),

            new Paragraph(""),

            ...Object.entries(data).map(([key, value]) => {
              return new Paragraph({
                children: [
                  new TextRun({ text: `${key}: `, bold: true }),
                  new TextRun({ text: JSON.stringify(value) }),
                ],
              });
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=assessment.docx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).send("Error generating document");
  }
});

