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

  const handleExport = () => {
    const text = JSON.stringify(survey.data, null, 2);

    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "survey_output.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      {/* ✅ Download button */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleExport}>Download Word report</button>
      </div>

      {/* ✅ Survey */}
      <Survey model={survey} />
    </div>
  );
}
