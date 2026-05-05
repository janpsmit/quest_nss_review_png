import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";
import legalFramework from "./survey/part1_legal_framework.json";

export default function App() {
  const survey = new Model({
    title: "Global Assessment – Self-Assessment Questionnaire",
    pages: [
      ...legalFramework.pages
    ]
  });

  survey.onComplete.add((sender) => {
    console.log("Survey results:", sender.data);
  });

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <Survey model={survey} />
    </div>
  );
}
