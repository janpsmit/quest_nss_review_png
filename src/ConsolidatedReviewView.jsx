export default function ConsolidatedReviewView({ data }) {
  const renderText = (value) =>
    value && value.trim() ? value : "—";

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
      
      <h1>Global Assessment – Consolidated Review</h1>
      <h2>Papua New Guinea</h2>

      <hr />

      {/* Contributors */}
      <h2>Contributors</h2>
      {data.contributors?.map((c, i) => (
        <p key={i}>
          <strong>{c.name}</strong> – {c.organisation}
        </p>
      ))}

      <hr />

      {/* PART 2 – MAIN FOCUS */}
      <h2>Part 2 – Main Statistical Domains</h2>

      {Object.entries(data.subject_areas || {}).map(
        ([domain, responses]) => (
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
        )
      )}

      <hr />

      {/* RAW VIEW (optional but useful) */}
      <h2>Raw merged data</h2>
      <pre style={{ background: "#f6f6f6", padding: "12px" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
