const fs = require("fs");

// ✅ List your input files here
const files = [
  "data/submission1.json",
  "data/submission2.json"
];

// Load submissions
const submissions = files.map((file) =>
  JSON.parse(fs.readFileSync(file, "utf-8"))
);

// Initialise merged structure
const merged = {
  contributors: [],
  part1: {},
  subject_areas: {}
};

// ✅ Define Part 1 fields (important)
const part1Fields = [
  "legislation_overview",
  "independence_appointment_dismissal",
  "methodology_and_sources",
  "budget_autonomy",
  "changes_since_last_ga",
  "areas_for_improvement",
  "support_needed"
];

// ✅ Main loop — THIS is the loop I mentioned earlier
submissions.forEach((s) => {

  // ---- Contributors ----
  merged.contributors.push({
    name: s.contributor_name,
    organisation: s.contributor_organisation
  });

  // ---- Part 1 merge ----
  part1Fields.forEach((field) => {
    if (s[field] && s[field].trim() !== "") {

      if (!merged.part1[field]) {
        merged.part1[field] = [];
      }

      merged.part1[field].push({
        contributor: s.contributor_organisation,
        value: s[field]
      });
    }
  });

  // ---- Part 2 merge ----
  if (Array.isArray(s.subject_areas)) {
    s.subject_areas.forEach((domain) => {
      const key = domain.domain;

      if (!merged.subject_areas[key]) {
        merged.subject_areas[key] = [];
      }

      merged.subject_areas[key].push({
        contributor: s.contributor_organisation,
        developments: domain.developments,
        standards: domain.standards,
        data_sources: domain.data_sources,
        challenges: domain.challenges,
        future_plans: domain.future_plans,
        support_needed: domain.support_needed
      });
    });
  }

});

// ✅ Write output to file
fs.writeFileSync(
  "data/merged_output.json",
  JSON.stringify(merged, null, 2)
);

console.log("Merged output written to data/merged_output.json");
