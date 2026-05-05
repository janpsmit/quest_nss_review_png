export default function ReviewView({ data, onDownload }) {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>Self‑Assessment Questionnaire – Review</h1>

      <p>
        Below is a read‑only review of the submitted responses.
      </p>

      <button
        onClick={onDownload}
        style={{
          margin: "20px 0",
          padding: "10px 16px",
          fontSize: "14px",
          cursor: "pointer"
        }}
      >
        Download responses (JSON)
      </button>

      <h2>Part 1 – Institutional issues</h2>

      <section>
        <h3>Legal framework and professional independence</h3>

        <p>
          <strong>Main legislation:</strong><br />
          {data.legislation_overview || "—"}
        </p>

        <p>
          <strong>Professional independence:</strong><br />
          {data.independence_appointment_dismissal || "—"}
        </p>

        <p>
          <strong>Methodological autonomy:</strong><br />
          {data.methodology_and_sources || "—"}
        </p>

        <p>
          <strong>Budget autonomy:</strong><br />
          {data.budget_autonomy || "—"}
        </p>
      </section>

      <h2>Part 2 – Main statistical domains</h2>

      {Array.isArray(data.subject_areas) &&
        data.subject_areas.map((domain, index) => (
          <section key={index} style={{ marginBottom: "24px" }}>
            <h3>{domain.domain}</h3>

            <p><strong>Developments:</strong><br />{domain.developments || "—"}</p>
            <p><strong>Standards:</strong><br />{domain.standards || "—"}</p>
            <p><strong>Data sources:</strong><br />{domain.data_sources || "—"}</p>
            <p><strong>Challenges:</strong><br />{domain.challenges || "—"}</p>
            <p><strong>Future plans:</strong><br />{domain.future_plans || "—"}</p>
            <p><strong>Support needed:</strong><br />{domain.support_needed || "—"}</p>
          </section>
        ))}

      <h2>Part 3 – Supporting documents</h2>

      <pre style={{ background: "#f6f6f6", padding: "12px" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
