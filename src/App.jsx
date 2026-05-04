import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "./styles/survey.css";   // or modern.css / default.css

export default function App() {
  const survey = new Model({
    title: "SurveyJS sanity check",
    elements: [
      {
        type: "comment",
        name: "test",
        title: "If you can see this styled textarea, everything works."
      }
    ]
  });

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <Survey model={survey} />
    </div>
  );
}
