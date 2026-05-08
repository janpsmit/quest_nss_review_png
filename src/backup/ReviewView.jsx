export default function ReviewView({ data, onDownload }) {
  const renderText = (value) => value && value.trim() ? value : "—";

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", lineHeight: "1.6" }}>
      
      {/* Header */}
      <h1>Global Assessment – Self‑Assessment</h1>
      <h2>Papua New Guinea</h2>

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

      {/* Contributor Info */}
      <hr />
      <h2>Contributor Information</h2>

      <p><strong>Name:</strong> {renderText(data.contributor_name)}</p>
      <p><strong>Organisation:</strong> {renderText(data.contributor_organisation)}</p>
      <p><strong>Position:</strong> {renderText(data.contributor_position)}</p>
      <p><strong>Email:</strong> {renderText(data.contributor_email)}</p>

      {data.contribution_areas && (
        <p>
          <strong>Contribution areas:</strong>{" "}
          {data.contribution_areas.join(", ")}
        </p>
      )}

      <hr />

      {/* PART 1 */}
      <h2>Part 1 – Institutional Issues</h2>

      <section>
        <h3>Legal framework and professional independence</h3>

        <p><strong>Main legislation:</strong></p>
        <p>{renderText(data.legislation_overview)}</p>

        <p><strong>Professional independence:</strong></p>
        <p>{renderText(data.independence_appointment_dismissal)}</p>

        <p><strong>Methodological autonomy:</strong></p>
        <p>{renderText(data.methodology_and_sources)}</p>

        <p><strong>Budget autonomy:</strong></p>
        <p>{renderText(data.budget_autonomy)}</p>

        <p><strong>Changes since last assessment:</strong></p>
        <p>{renderText(data.changes_since_last_ga)}</p>

        <p><strong>Areas for improvement:</strong></p>
        <p>{renderText(data.areas_for_improvement)}</p>

        <p><strong>Support needed:</strong></p>
        <p>{renderText(data.support_needed)}</p>
      </section>

      <hr />

      {/* PART 2 */}
      <h2>Part 2 – Main Statistical Domains</h2>

      {Array.isArray(data.subject_areas) &&
        data.subject_areas.map((domain, index) => (
          <section key={index} style={{ marginBottom: "32px" }}>
            <h3>{domain.domain}</h3>

            <p><strong>Main developments:</strong></p>
            <p>{renderText(domain.developments)}</p>

            <p><strong>International standards:</strong></p>
            <p>{renderText(domain.standards)}</p>

            <p><strong>Data sources / registers:</strong></p>
            <p>{renderText(domain.data_sources)}</p>

            <p><strong>Main challenges:</strong></p>
            <p>{renderText(domain.challenges)}</p>

            <p><strong>Future developments:</strong></p>
            <p>{renderText(domain.future_plans)}</p>

            <p><strong>Support needed:</strong></p>
            <p>{renderText(domain.support_needed)}</p>
          </section>
        ))}

      <hr />

      {/* PART 3 */}
      <h2>Part 3 – Supporting Documents</h2>

      <section>
        <h3>Law on Official Statistics</h3>
        <p><strong>Link:</strong> {renderText(data.law_statistics_link)}</p>

        <h3>Organisation Chart</h3>
        <p><strong>Link:</strong> {renderText(data.org_chart_link)}</p>

        <h3>Strategy Documents</h3>
        <p><strong>Link:</strong> {renderText(data.strategy_link)}</p>

        <h3>Annual Work Programme</h3>
        <p><strong>Link:</strong> {renderText(data.work_programme_link)}</p>

        <h3>Staff Overview</h3>
        <p><strong>Link:</strong> {renderText(data.staff_overview_link)}</p>

        <h3>Budget Overview</h3>
        <p><strong>Link:</strong> {renderText(data.budget_overview_link)}</p>

        <h3>Release Calendar</h3>
        <p><strong>Link:</strong> {renderText(data.release_calendar_link)}</p>

        <h3>Policy Documents</h3>
        <p><strong>Link:</strong> {renderText(data.policy_documents_link)}</p>
      </section>

    </div>
  );
}
