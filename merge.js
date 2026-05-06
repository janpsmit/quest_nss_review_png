const fs = require("fs");

// Load all submissions
const files = ["submission1.json", "submission2.json"];

const submissions = files.map(f => JSON.parse(fs.readFileSync(f)));

// Start merged object
const merged = {
  contributors: [],
  subject_areas: {}
};

// Collect contributors
submissions.forEach(s => {
  merged.contributors.push({
    name: s.contributor_name,
    organisation: s.contributor_organisation
  });

  // Merge Part 2
  if (Array.isArray(s.subject_areas)) {
    s.subject_areas.forEach(domain => {
      const key = domain.domain;

      if (!merged.subject_areas[key]) {
        merged.subject_areas[key] = [];
      }

      merged.subject_areas[key].push({
        contributor: s.contributor_organisation,
        ...domain
      });
    });
  }
});

console.log(JSON.stringify(merged, null, 2));
