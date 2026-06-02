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

import fs from "fs";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

app.get("/export-word", async (req, res) => {
  try {
    const data = fs.existsSync("data/shared_survey.json")
      ? JSON.parse(fs.readFileSync("data/shared_survey.json", "utf-8"))
      : {};

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "NSS Self-Assessment",
              heading: HeadingLevel.HEADING_1,
            }),

            new Paragraph(""),

            new Paragraph({
              text: "Primary contact:",
              bold: true,
            }),

            new Paragraph(data.contributor_name || "—"),

            new Paragraph(""),

            new Paragraph({
              text: "Part 1 – Legal framework",
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph(JSON.stringify(data.part1 || {}, null, 2)),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader("Content-Disposition", "attachment; filename=report.docx");

    res.setHeader("Content-Length", buffer.length);

    res.end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating document");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
