import { useEffect } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";
import intro from "./survey/intro_guidance.json";
import contributorInfo from "./survey/contributor_info.json";
import legalFramework from "./survey/part1_legal_framework.json";
import nationalStatisticalSystem from "./survey/part2_national_statistical_system.json";
import nationalStatisticalOffice from "./survey/part3_national_statistical_office.json";
import subjectAreas from "./survey/part4_subject_areas.json";
import supportDocuments from "./survey/part5_supporting_documents.json";

export default function App() {
  const survey = new Model({
    title:
      "Review of the national statistical system of Papua New Guinea – Self-assessment questionnaire",
    pages: [
      ...intro.pages,
      ...contributorInfo.pages,
      ...legalFramework.pages,
      ...nationalStatisticalSystem.pages,
      ...nationalStatisticalOffice.pages,
      ...subjectAreas.pages,
      ...supportDocuments.pages,
    ],
  });

// ✅ ADD IT HERE
setTimeout(() => {
  if (!survey.getValue("subject_areas") || survey.getValue("subject_areas").length === 0) {
    survey.setValue("subject_areas", [
      { domain: "Population statistics" },
      { domain: "Migration statistics" },
      { domain: "Labour statistics" },
      { domain: "Education statistics" },
      { domain: "Health statistics" },
      { domain: "Income and consumption statistics" },
      { domain: "Social protection statistics" },
      { domain: "Human settlements and housing statistics" },
      { domain: "Culture statistics" },
      { domain: "Time-use statistics" },
      { domain: "Macroeconomic accounts and statistics" },
      { domain: "Business statistics" },
      { domain: "Economic sectoral statistics" },
      { domain: "International trade statistics" },
      { domain: "Price statistics" },
      { domain: "Science, technology and innovation statistics" },
      { domain: "Environment statistics" },
      { domain: "Governance statistics" },
      { domain: "Sustainable development statistics" },
      { domain: "Human rights statistics" },
      { domain: "Gender statistics" },
      { domain: "Statistics on special population groups" },
      { domain: "Living conditions and poverty statistics" },
      { domain: "Climate statistics" },
      { domain: "Regional and small area statistics" },
      { domain: "Information society and digitalization statistics" },
      { domain: "Circular economy statistics" }
    ]);
  }
}, 100);

  // ✅ Enable HTML in titles (THIS IS THE FIX)
  survey.allowHtmlInTitles = true;
  survey.showTOC = true;
  survey.tocLocation = "left";
  survey.showProgressBar = "top";
  survey.progressBarType = "pages";
  survey.showCompleteButton = false;

  // ✅ Completion logic
  const getDomainStatus = (domain) => {
    if (!domain) return "empty";

    const fields = [
      domain.developments,
      domain.standards,
      domain.data_sources,
      domain.challenges,
      domain.future_plans,
      domain.support_needed,
    ];

    const filled = fields.filter((f) => f && f.toString().trim() !== "");

    if (filled.length === 0) return "empty";
    if (filled.length < 3) return "started";
    return "filled";
  };

  const API_URL = "https://png-nss-review-self-assessment.onrender.com";

  // ✅ Load shared data
useEffect(() => {
  fetch(`${API_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({})  // 🔥 force overwrite backend data
  }).then(() => {
    // ✅ load clean state AFTER reset
    survey.data = {};
  });
}, []);

  // ✅ Save + update status
  survey.onValueChanged.add((sender, options) => {
    // ✅ save to backend
    fetch(`${API_URL}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [options.name]: options.value,
      }),
    });
  });

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      {/* ✅ Download button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => {
            window.open(`${API_URL}/export-word`, "_blank");
          }}
          style={{
            backgroundColor: "#5B92E5",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Word report
        </button>
      </div>

      {/* ✅ Survey */}
      <Survey model={survey} />
    </div>
  );
}
