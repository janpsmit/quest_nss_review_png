import { useEffect } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";
import intro from "./survey/intro_guidance.json";
import contributorInfo from "./survey/contributor_info.json";
import legalFramework from "./survey/part1_legal_framework.json";
import subjectAreas from "./survey/part2_subject_areas.json";
import documents from "./survey/part3_supporting_documents.json";

export default function App() {
  const survey = new Model({
    title: "Review of the national statistical system of Papua New Guinea – Self-assessment questionnaire",
    pages: [
      ...intro.pages,
      ...contributorInfo.pages,
      ...legalFramework.pages,
      ...subjectAreas.pages,
      ...documents.pages,
    ],
  });

  survey.showTOC = true;
  survey.tocLocation = "left";
  survey.showProgressBar = "top";
  survey.progressBarType = "pages";

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

  // ✅ Load shared data
  useEffect(() => {
    fetch("http://localhost:3001/load")
      .then((res) => res.json())
      .then((data) => {
        survey.data = data || {};

        // initialise status
        const areas = survey.getValue("subject_areas");

        if (Array.isArray(areas)) {
          const updated = areas.map((d) => ({
            ...d,
            _status: getDomainStatus(d),
          }));

          survey.setValue("subject_areas", updated);
        }
      })
      .catch((err) => {
        console.error("Error loading data:", err);
      });
  }, []);

  // ✅ Save + update status
  survey.onValueChanged.add((sender, options) => {
    // save to server
    fetch("http://localhost:3001/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [options.name]: options.value,
      }),
    });

    // update status
    const areas = sender.getValue("subject_areas");

    if (!Array.isArray(areas)) return;

    const updated = areas.map((d) => {
      const status = getDomainStatus(d);

      let label = "";
      if (status === "empty") label = "empty";
      else if (status === "started") label = "in progress";
      else label = "completed";

      return {
        ...d,
        _status: label,
      };
    });

    if (JSON.stringify(areas) !== JSON.stringify(updated)) {
      sender.setValue("subject_areas", updated);
    }
  });

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <Survey model={survey} />
    </div>
  );
}
