import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";
import intro from "./survey/intro_guidance.json";
import legalFramework from "./survey/part1_legal_framework.json";
import subjectAreas from "./survey/part2_subject_areas.json";
import part3Documents from "./survey/part3_supporting_documents.json";


export default function App() {
  const survey = new Model({
    title: "Global Assessment – Self-Assessment Questionnaire",
    pages: [
      ...intro.pages,
      ...legalFramework.pages,
      ...subjectAreas.pages,
      ...part3Documents.pages
    ]
  });

survey.showTOC = true;
survey.tocLocation = "left";
survey.showProgressBar = "top";
survey.progressBarType = "pages";
  
  survey.onComplete.add((sender) => {
    console.log("Survey results:", sender.data);
  });

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <Survey model={survey} />
    </div>
  );
}
