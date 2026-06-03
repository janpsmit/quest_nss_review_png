// helpers

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

const renderDomain = (title, prefix, data) => {
  return [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Which international standards are used?",
      data[`${prefix}_standards`]
    ),

    ...renderField(
      "What data sources are used?",
      data[`${prefix}_data_sources`]
    ),

    ...renderField(
      "What are the main challenges currently?",
      data[`${prefix}_challenges`]
    ),

    ...renderField(
      "What are the plans for future development?",
      data[`${prefix}_future_plans`]
    ),

    ...renderField(
      "What support is needed from international organizations?",
      data[`${prefix}_support_needed`]
    ),
  ];
};

const renderDocumentsList = (title, items) => {
  if (!items || items.length === 0) {
    return [
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph("—"),
      new Paragraph(""),
    ];
  }

  const blocks = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_2,
    }),
  ];

  items.forEach((item, index) => {
    blocks.push(
      new Paragraph({
        text: `Document ${index + 1}`,
        heading: HeadingLevel.HEADING_3,
      }),

      new Paragraph({
        children: [new TextRun({ text: "Description:", bold: true })],
      }),
      new Paragraph(item.description || "—"),

      new Paragraph({
        children: [new TextRun({ text: "Link:", bold: true })],
      }),
      new Paragraph(item.link || "—"),

      new Paragraph("")
    );
  });

  return blocks;
};

// later…

export const buildDocumentContent = (data) => {
  return [

    new Paragraph({
      text: "Review of the national statistical system of Papua New Guinea – Self-assessment questionnaire",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),

    new Paragraph("Primary contact:"),
    new Paragraph(data.contributor_name || "—"),

    new Paragraph(""),

    // -------------------------
    // PART 1
    // -------------------------

    new Paragraph({
      text: "Part 1 - Legal framework, professional independence and statistical confidentiality",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),

    // ✅ PANEL: Legal framework
    new Paragraph({
      text: "Legal framework",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "The Statistical Services Act dates back to 1980. Which are main issues any revision of the act in your view should address?",
      data.ssa
    ),

    ...renderField(
      "Please list and briefly describe any other main pieces of legislation relevant for official statistics in the country, e.g., censuses, civil registration, civil service, data protection, central bank etc.",
      data.legislation_overview
    ),

    // ✅ PANEL: Professional independence
    new Paragraph({
      text: "Professional independence",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "How are the appointment and dismissal procedures of top management ensured by national statistical legislation and in practice?",
      data.independence_appointment_dismissal
    ),

    ...renderField(
      "How is freedom from any interference in statistical processes ensured by national statistical legislation and in practice?",
      data.independence_freedom_from_interference
    ),

    ...renderField(
      "To what extent are statistical methodologies and choices of data sources determined according to strictly professional considerations?",
      data.methodology_and_sources
    ),

    ...renderField(
      "To what extent do the national statistical authorities have autonomy in the allocation of the budget?",
      data.budget_autonomy
    ),

    ...renderField(
      "What do you think needs to be improved in the area of professional independence?",
      data.areas_for_improvement
    ),

    ...renderField(
      "What support do you need from international organizations in the area of professional independence?",
      data.support_needed
    ),

    // ✅ PANEL: Statistical confidentiality
    new Paragraph({
      text: "Safeguarding statistical confidentiality",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "How is statistical confidentiality safeguarded by national statistical legislation and in practice?",
      data.statistical_confidentiality
    ),

    ...renderField(
      "What do you think needs to be improved in the area of safeguarding statistical confidentiality?",
      data.statistical_confidentiality_areas_for_improvement
    ),

    ...renderField(
      "What support do you need from international organizations in the area of safeguarding statistical confidentiality?",
      data.statistical_confidentiality_support_needed
    ),

    new Paragraph(""),

    // -------------------------
    // PART 2
    // -------------------------

    new Paragraph({
      text: "Part 2 - National statistical system",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),

    // ✅ Members
    new Paragraph({
      text: "Members",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Which State agencies, apart from the National Statistical Office, are in practice considered producing official statistics in accordance with articles 2 and 17 of the Statistical Services Act 1980 and therewith practically members of the national statistical system?",
      data.members_q1
    ),

    // ✅ Coordination
    new Paragraph({
      text: "Coordination",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "How does the National Statistical Office in practice exert its power to coordinate the national statistical system in accordance with article 4 of the Statistical Services Act 1980?",
      data.coordination_q1
    ),

    ...renderField(
      "What mechanism(s) is/are in place to ensure the coordination of the production and dissemination of official statistics across the national statistical system, including programming, standards, and resource sharing?",
      data.coordination_q2
    ),

    // ✅ Data sources
    new Paragraph({
      text: "Data sources",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Please list censuses, surveys, administrative registers, non-traditional data sources, and data integration techniques used in statistical production.",
      data.data_sources_q1
    ),

    // ✅ Access to administrative data
    new Paragraph({
      text: "Access to administrative data",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "How does the National Statistical Office ensure access to administrative data in accordance with article 5 of the Statistical Services Act 1980?",
      data.access_q1
    ),

    // ✅ Quality assurance
    new Paragraph({
      text: "Quality assurance",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Please describe the quality assurance policy and instruments used across the national statistical system.",
      data.quality_assurance_q1
    ),

    // ✅ User consultation
    new Paragraph({
      text: "User consultation",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "What mechanisms ensure that official statistics meet evolving user needs across government, public, business, research, and media?",
      data.consultation_q1
    ),

    new Paragraph(""),

    // -------------------------
    // PART 3
    // -------------------------

    new Paragraph({
      text: "Part 3 - National Statistical Office",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),


    // ✅ Organization
    new Paragraph({
      text: "Organization",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Please describe how the National Statistical Office is organized. What are its main units and subunits, what are their responsibilities, how are they staffed, and are there local offices?",
      data.organization_q1
    ),


    // ✅ Resources
    new Paragraph({
      text: "Resources and resource management",
      heading: HeadingLevel.HEADING_2,
    }),

    // Financial resources
    new Paragraph({
      text: "Financial resources",
      heading: HeadingLevel.HEADING_3,
    }),

    ...renderField(
      "Please describe the financial resources available to the NSO and whether they are sufficient to meet strategic objectives.",
      data.financial
    ),

    // Human resources
    new Paragraph({
      text: "Human resources",
      heading: HeadingLevel.HEADING_3,
    }),

    // Recruitment
    new Paragraph({
      text: "Recruitment",
      heading: HeadingLevel.HEADING_4,
    }),

    ...renderField(
      "Please describe the recruitment processes of the NSO and whether they ensure appropriate staffing levels and expertise.",
      data.recruitment
    ),

    // Retention
    new Paragraph({
      text: "Retention",
      heading: HeadingLevel.HEADING_4,
    }),

    ...renderField(
      "Please describe challenges related to staff retention and any measures in place to address them.",
      data.retention
    ),

    // Training
    new Paragraph({
      text: "Training and development",
      heading: HeadingLevel.HEADING_4,
    }),

    ...renderField(
      "Please describe how the NSO develops staff capacity and ensures continuous professional development.",
      data.training
    ),

    // ICT resources
    new Paragraph({
      text: "ICT resources",
      heading: HeadingLevel.HEADING_3,
    }),

    ...renderField(
      "Please describe the ICT infrastructure available to the NSO and whether it is sufficient to meet strategic objectives.",
      data.ict
    ),


    // ✅ Dissemination
    new Paragraph({
      text: "Dissemination policy and practices",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Please describe dissemination policies, including use of online platforms, release calendars, and equal access to data.",
      data.dissemination_q1
    ),


    // ✅ Stakeholder consultation
    new Paragraph({
      text: "Relations and communication with main stakeholders",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "How does the NSO engage with stakeholders and consult on user needs and work programmes?",
      data.stakeholder_consultation_q1
    ),


    // ✅ International cooperation
    new Paragraph({
      text: "International cooperation",
      heading: HeadingLevel.HEADING_2,
    }),

    ...renderField(
      "Please describe international support received by the NSO over the last five years.",
      data.international_relations_q1
    ),

    new Paragraph(""),

    // -------------------------
    // PART 4
    // -------------------------

    new Paragraph({
      text: "Part 4 – Main statistical subject-matter domains",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),


    // ✅ Domains
    ...renderDomain("Population statistics", "population", data),
    ...renderDomain("Migration statistics", "migration", data),
    ...renderDomain("Labour statistics", "labour", data),
    ...renderDomain("Education statistics", "education", data),
    ...renderDomain("Health statistics", "health", data),
    ...renderDomain("Income and consumption statistics", "income", data),
    ...renderDomain("Social protection statistics", "social", data),
    ...renderDomain("Human settlements and housing statistics", "housing", data),
    ...renderDomain("Culture statistics", "culture", data),
    ...renderDomain("Time-use statistics", "time", data),
    ...renderDomain("Macroeconomic accounts and statistics", "macro", data),
    ...renderDomain("Business statistics", "business", data),
    ...renderDomain("Economic sectoral statistics", "sectoral", data),
    ...renderDomain("International trade statistics", "trade", data),
    ...renderDomain("Price statistics", "price", data),
    ...renderDomain("Science, technology and innovation statistics", "science", data),
    ...renderDomain("Environment statistics", "environment", data),
    ...renderDomain("Governance statistics", "governance", data),
    ...renderDomain("Sustainable development statistics", "sdg", data),
    ...renderDomain("Human rights statistics", "hr", data),
    ...renderDomain("Gender statistics", "gender", data),
    ...renderDomain("Statistics on special population groups", "special", data),
    ...renderDomain("Living conditions and poverty statistics", "living", data),
    ...renderDomain("Climate statistics", "climate", data),
    ...renderDomain("Regional and small area statistics", "regional", data),
    ...renderDomain("Information society and digitalization statistics", "digital", data),
    ...renderDomain("Circular economy statistics", "circular", data),

    new Paragraph(""),

    // -------------------------
    // PART 5
    // -------------------------

    new Paragraph({
      text: "Part 5 – Supporting documents",
      heading: HeadingLevel.HEADING_1,
    }),

    new Paragraph(""),


    // ✅ Laws (dynamic list)
    ...renderDocumentsList(
      "Relevant laws and other legal documents",
      data.law_documents
    ),

    // ✅ Org chart
    ...renderField(
      "Organization chart for the National Statistical Office",
      data.org_chart_link
    ),

    // ✅ Work programme
    ...renderField(
      "Annual work programme",
      data.work_programme_link
    ),

    // ✅ Staff overview
    ...renderField(
      "Staff overview (number of staff, by category)",
      data.staff_overview_link
    ),

    // ✅ Budget overview
    ...renderField(
      "Budget overview",
      data.budget_overview_link
    ),

    // ✅ Release calendar
    ...renderField(
      "Statistical release calendar",
      data.release_calendar_link
    ),

    // ✅ Policy documents (dynamic list)
    ...renderDocumentsList(
      "Policy documents",
      data.policy_documents
    ),

    // ✅ Methodology documents (dynamic list)
    ...renderDocumentsList(
      "Methodology documents",
      data.methodology_documents
    )
  ];
};

