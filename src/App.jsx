import { useState } from "react";
import ReviewView from "./ReviewView";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";
import intro from "./survey/intro_guidance.json";
import contributorInfo from "./survey/contributor_info.json";
import legalFramework from "./survey/part1_legal_framework.json";
import subjectAreas from "./survey/part2_subject_areas.json";
import part3Documents from "./survey/part3_supporting_documents.json";
import consolidatedData from "./data/merged_output.json";
import ConsolidatedReviewView from "./ConsolidatedReviewView";

export default function App() {
  const [reviewData, setReviewData] = useState(null);
  const survey = new Model({
    title: "Global Assessment – Self-Assessment Questionnaire",
    pages: [
      ...intro.pages,
      ...contributorInfo.pages,
      ...legalFramework.pages,
      ...subjectAreas.pages,
      ...part3Documents.pages
    ]
  });

survey.showTOC = true;
survey.tocLocation = "left";
survey.showProgressBar = "top";
survey.progressBarType = "pages";

const STORAGE_KEY = "nss_ga_survey_draft";

// Restore saved data (if any)
const savedState = localStorage.getItem(STORAGE_KEY);
if (savedState) {
  const parsed = JSON.parse(savedState);
  survey.data = parsed.data || {};
  survey.currentPageNo = parsed.currentPageNo || 0;
}

// Auto-save on every change
survey.onValueChanged.add(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      data: survey.data,
      currentPageNo: survey.currentPageNo
    })
  );
});
  
survey.onCurrentPageChanged.add(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      data: survey.data,
      currentPageNo: survey.currentPageNo
    })
  );
});

survey.onComplete.add((sender) => {
  // Clear saved draft so the survey doesn't reopen as completed
  localStorage.removeItem(STORAGE_KEY);

  // Final results (for now just log them)
  console.log("Final survey results:", sender.data);
});

  return <ConsolidatedReviewView data={consolidatedData} />;
}
