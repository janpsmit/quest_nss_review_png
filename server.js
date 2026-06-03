import { buildDocumentContent } from "./export_word.js";
import cors from "cors";
import express from "express";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  Footer,
  AlignmentType,
  PageNumber,
} from "docx";

const doc = new Document({
  sections: [
    {
      children: buildDocumentContent(data),

      footers: {   // ✅ HERE
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun("Page "),
                PageNumber.CURRENT,
              ],
            }),
          ],
        }),
      },
    },
  ],
});

const renderField = (label, value) => {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: label, bold: true })
      ]
    }),
    new Paragraph(value || "—"),
    new Paragraph("")
  ];
};

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
          children: buildDocumentContent(data)
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=png_nss_self_assessment_report.docx",
    });

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
