import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load merged data
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/merged_output.json"), "utf-8"),
);

// Helper function
const renderResponses = (responses, field = "value") => {
  if (!responses || responses.length === 0) {
    return [new Paragraph("—")];
  }

  let result = [];

  responses.forEach((r) => {
    result.push(
      new Paragraph({
        children: [
          new TextRun({
            text: r.contributor,
            bold: true,
          }),
        ],
      }),
    );

    result.push(
      new Paragraph({
        children: [new TextRun(r[field] || "—")],
      }),
    );
  });

  return result;
};

// Create document
const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          text: "Review of the national statistical system – Self-assessment questionnaire",
          heading: HeadingLevel.TITLE,
        }),

        new Paragraph({
          text: "Papua New Guinea",
          heading: HeadingLevel.HEADING_1,
        }),

        // Contributors
        new Paragraph({
          text: "Primay contact / focal point",
          heading: HeadingLevel.HEADING_2,
        }),

        ...data.contributors.map(
          (c) => new Paragraph(`${c.name} – ${c.organisation}`),
        ),

        // -------------------------
        // PART 1
        // -------------------------
        new Paragraph({
          text: "Part 1 – Legal framework, professional independence and statistical confidentiality",
          heading: HeadingLevel.HEADING_1,
        }),

        new Paragraph({
          text: "Legal framework",
          heading: HeadingLevel.HEADING_2,
        }),

        new Paragraph("Legal framework:"),
        ...renderResponses(data.part1?.legal_basis),

        new Paragraph("Legal framework:"),
        ...renderResponses(data.part1?.ssa),
        
        new Paragraph({
          text: "Professional independence",
          heading: HeadingLevel.HEADING_2,
        }),
        
        new Paragraph("Procedures for appointment and dismissal:"),
        ...renderResponses(data.part1?.independence_appointment_dismissal),

        new Paragraph("Freedom from interference:"),
        ...renderResponses(data.part1?.independence_freedom_from_interference),

        new Paragraph("Statistical methodologies and data sources:"),
        ...renderResponses(data.part1?.methodology_and_sources),

        new Paragraph("Budget autonomy:"),
        ...renderResponses(data.part1?.budget_autonomy),

        new Paragraph("Areas for improvement:"),
        ...renderResponses(data.part1?.areas_for_improvement),

        new Paragraph("Support needed:"),
        ...renderResponses(data.part1?.support_needed),

        new Paragraph({
          text: "Safeguarding statistical confidentiality",
          heading: HeadingLevel.HEADING_2,
        }),
        
        new Paragraph("Procedures for appointment and dismissal:"),
        ...renderResponses(data.part1?.statistical_confidentiality),

        new Paragraph("Areas for improvement:"),
        ...renderResponses(data.part1?.areas_for_improvement),

        new Paragraph("Support needed:"),
        ...renderResponses(data.part1?.support_needed),

        // -------------------------
        // PART 2
        // -------------------------
        new Paragraph({
          text: "Part 2 – Main Statistical Domains",
          heading: HeadingLevel.HEADING_1,
        }),

        ...Object.entries(data.subject_areas || {}).flatMap(
          ([domain, responses]) => [
            new Paragraph({
              text: domain,
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph("Main developments:"),
            ...renderResponses(responses, "developments"),

            new Paragraph("International standards:"),
            ...renderResponses(responses, "standards"),

            new Paragraph("Data sources / registers:"),
            ...renderResponses(responses, "data_sources"),

            new Paragraph("Main challenges:"),
            ...renderResponses(responses, "challenges"),

            new Paragraph("Future developments:"),
            ...renderResponses(responses, "future_plans"),

            new Paragraph("Support needed:"),
            ...renderResponses(responses, "support_needed"),
          ],
        ),
      ],
    },
  ],
});

// Write file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("data/consolidated_review.docx", buffer);
  console.log("✅ Word document created: data/consolidated_review.docx");
});
