import cors from "cors";
import express from "express";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
} from "docx";

const renderResponse = (response) => {
  if (!response || response.length === 0) {
    return [new Paragraph("—")];
  }

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: response[0]?.value || "—",
        }),
      ],
    }),
    new Paragraph(""),
  ];
};

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

let exporting = false;

app.get("/export-word", async (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync("data/shared_survey.json", "utf-8"),
    );

    const doc = new Document({
      sections: [
        {
          children: [
            // -------------------------
            // TITLE
            // -------------------------
            new Paragraph({
              text: "Review of the national statistical system – Self-assessment questionnaire",
              heading: HeadingLevel.TITLE,
            }),

            new Paragraph(""),

            // -------------------------
            // COUNTRY
            // -------------------------
            new Paragraph({
              text: data.country || "Papua New Guinea",
              heading: HeadingLevel.HEADING_1,
            }),

            new Paragraph(""),

            // -------------------------
            // FOCAL POINT
            // -------------------------
            new Paragraph({
              text: "Primary contact / focal point",
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph(data.contributor_name || "—"),
            new Paragraph(data.contributor_organisation || "—"),

            new Paragraph(""),

            // -------------------------
            // PART 1
            // -------------------------

            new Paragraph({
              text: "Part 1 – Legal framework, professional independence and statistical confidentiality",
              heading: HeadingLevel.HEADING_1,
            }),

            // 1. Legal framework
            new Paragraph({
              text: "1. Legal framework",
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              children: [new TextRun({ text: "Legal framework:", bold: true })],
            }),
            ...renderResponse(data.part1?.legal_basis),

            new Paragraph({
              children: [
                new TextRun({ text: "Statistical system act:", bold: true }),
              ],
            }),
            ...renderResponse(data.part1?.ssa),

            // 2. Professional independence
            new Paragraph({
              text: "2. Professional independence",
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Procedures for appointment and dismissal:",
                  bold: true,
                }),
              ],
            }),
            ...renderResponse(data.part1?.independence_appointment_dismissal),

            new Paragraph({
              children: [
                new TextRun({ text: "Freedom from interference:", bold: true }),
              ],
            }),
            ...renderResponse(
              data.part1?.independence_freedom_from_interference,
            ),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Statistical methodologies and data sources:",
                  bold: true,
                }),
              ],
            }),
            ...renderResponse(data.part1?.methodology_and_sources),

            new Paragraph({
              children: [new TextRun({ text: "Budget autonomy:", bold: true })],
            }),
            ...renderResponse(data.part1?.budget_autonomy),

            new Paragraph({
              children: [
                new TextRun({ text: "Areas for improvement:", bold: true }),
              ],
            }),
            ...renderResponse(data.part1?.areas_for_improvement),

            new Paragraph({
              children: [new TextRun({ text: "Support needed:", bold: true })],
            }),
            ...renderResponse(data.part1?.support_needed),

            // 3. Confidentiality
            new Paragraph({
              text: "3. Safeguarding statistical confidentiality",
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Statistical confidentiality:",
                  bold: true,
                }),
              ],
            }),
            ...renderResponse(data.part1?.statistical_confidentiality),

            new Paragraph({
              children: [
                new TextRun({ text: "Areas for improvement:", bold: true }),
              ],
            }),
            ...renderResponse(data.part1?.areas_for_improvement),

            new Paragraph({
              children: [new TextRun({ text: "Support needed:", bold: true })],
            }),
            ...renderResponse(data.part1?.support_needed),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.writeHead(200, {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=report.docx",
      "Content-Length": buffer.length,
    });

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
