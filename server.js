import cors from "cors";
import express from "express";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx";

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "data/shared_survey.json";


// ✅ LOAD
app.get("/load", (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.json({});
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.json(data);

  } catch (error) {
    console.error(error);
    res.json({});
  }
});


// ✅ SAVE
app.post("/save", (req, res) => {
  try {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(req.body, null, 2)
    );

    res.json({ status: "ok" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Save failed");
  }
});


// ✅ EXPORT WORD
app.get("/export-word", async (req, res) => {
  try {
    const data = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
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
            new Paragraph("Primary contact:"),
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
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.docx"
    );
    res.setHeader("Content-Length", buffer.length);

    res.end(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating document");
  }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
