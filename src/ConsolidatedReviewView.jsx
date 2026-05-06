export default function ConsolidatedReviewView({ data }) {

  const renderText = (value) => {
    if (!value || !value.toString().trim()) {
      return "—";
    }
    return value;
  };

  // ---- Part 1 renderer ----
  const renderPart1Field = (responses) => {
    if (!responses || responses.length === 0) {
      return <p>—</p>;
    }

    return responses.map((r, idx) => (
      <div key={idx} style={{ marginBottom: "12px" }}>
        <p style={{ margin: 0 }}>
          <strong>{r.contributor}</strong>
        </p>
        <p style={{ marginTop: "4px" }}>
          {renderText(r.value)}
        </p>
      </div>
    ));
  };

  // ---- Part 2 renderer ----
  const renderResponses = (responses, field) => {
    if (!responses || responses.length === 0) {
      return <p>—</p>;
    }

    return responses.map((r, idx) => (
      <div key={idx} style={{ marginBottom: "12px" }}>
        <p style={{ margin: 0 }}>
          <strong>{r.contributor}</strong>
        </p>
        <p style={{ marginTop: "4px" }}>
          {renderText(r[field])}
        </p>
      </div>
    ));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", lineHeight: "1.6" }}>

      {/* Header */}
      <h1>Global Assessment – Consolidated Review</h1>
      <h2>Papua New Guinea</h2>

      <hr />

      {/* Contributors */}
      <h2>Contributors</h2>
      {data.contributors && data.contributors.length > 0 ? (
        data.contributors.map((c, i) => (
          <p key={i}>
            <strong>{renderText(c.name)}</strong> – {renderText(c.organisation)}
          </p>
        ))
      ) : (
        <p>—</p>
      )}

      <hr />

      {/* PART 1 */}
      <h2>Part 1 – Institutional Issues</h2>

      <section>
        <h3>Legal framework and professional independence</h3>

        <div>
          <strong>Main legislation:</strong>
          {renderPart1Field(data.part1?.legislation_overview)}
        </div>

        <div>
          <strong>Professional independence:</strong>
          {renderPart1Field(data.part1?.independence_appointment_dismissal)}
        </div>

        <div>
          <strong>Methodological autonomy:</strong>
          {renderPart1Field(data.part1?.methodology_and_sources)}
        </div>

        <div>
          <strong>Budget autonomy:</strong>
          {renderPart1Field(data.part1?.budget_autonomy)}
        </div>

        <div>
          <strong>Changes since last assessment:</strong>
          {renderPart1Field(data.part1?.changes_since_last_ga)}
        </div>

        <div>
          <strong>Areas for improvement:</strong>
          {renderPart1Field(data.part1?.areas_for_improvement)}
        </div>

        <div>
          <strong>Support needed:</strong>
          {renderPart1Field(data.part1?.support_needed)}
        </div>
      </section>

      <hr />

      {/* PART 2 */}
      <h2>Part 2 – Main Statistical Domains</h2>

      {data.subject_areas ? (
        Object.entries(data.subject_areas).map(([domain, responses]) => (
          <section key={domain} style={{ marginBottom: "32px" }}>
            <h3>{domain}</h3>

            <div>
              <strong>Main developments:</strong>
              {renderResponses(responses, "developments")}
            </div>

            <div>
              <strong>International standards:</strong>
              {renderResponses(responses, "standards")}
            </div>

            <div>
              <strong>Data sources / registers:</strong>
              {renderResponses(responses, "data_sources")}
            </div>

            <div>
              <strong>Main challenges:</strong>
              {renderResponses(responses, "challenges")}
            </div>

            <div>
              <strong>Future developments:</strong>
              {renderResponses(responses, "future_plans")}
            </div>

            <div>
              <strong>Support needed:</strong>
              {renderResponses(responses, "support_needed")}
            </div>
          </section>
        ))
      ) : (
        <p>—</p>
      )}

      <hr />

      {/* Raw JSON (optional for debugging) */}
      <h2>Raw merged data</h2>
      <pre style={{ background: "#f6f6f6", padding: "12px", overflowX: "auto" }}>
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );
}
