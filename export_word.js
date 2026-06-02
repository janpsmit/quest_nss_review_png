const doc = new Document({
  sections: [
    {
      children: [

        new Paragraph({
          text: "Review of the national statistical system of Papua New Guinea – Self-assessment questionnaire",
          heading: HeadingLevel.HEADING_1,
        }),

        new Paragraph(""),

        new Paragraph(
          JSON.stringify(data, null, 2)
        ),

      ],
    },
  ],
});
