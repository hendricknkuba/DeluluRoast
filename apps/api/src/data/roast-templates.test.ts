import test from "node:test";
import assert from "node:assert/strict";
import { buildStructuredRoast } from "./roast-templates.js";

const bannedOpeners = ["Be honest,", "Your taste says", "Your personality says"];

test("buildStructuredRoast avoids repeated sentence starters", () => {
  const samples = [
    buildStructuredRoast({
      mode: "bias",
      severity: "savage",
      subject: "Jungkook",
    }),
    buildStructuredRoast({
      mode: "taste",
      severity: "mild",
      subject: "TXT",
    }),
    buildStructuredRoast({
      mode: "personality",
      severity: "brutal",
      subject: "IU",
    }),
  ].filter((value): value is string => Boolean(value));

  assert.equal(samples.length, 3);

  for (const roast of samples) {
    for (const bannedOpener of bannedOpeners) {
      assert.equal(roast.startsWith(bannedOpener), false);
    }
  }
});

test("buildStructuredRoast is deterministic for the same input", () => {
  const first = buildStructuredRoast({
    mode: "bias",
    severity: "savage",
    subject: "Jungkook",
  });
  const second = buildStructuredRoast({
    mode: "bias",
    severity: "savage",
    subject: "Jungkook",
  });

  assert.ok(first);
  assert.ok(second);
  assert.equal(first, second);
});

test("buildStructuredRoast ends with a strong punchline", () => {
  const roast = buildStructuredRoast({
    mode: "taste",
    severity: "savage",
    subject: "TXT",
  });

  assert.ok(roast);
  assert.match(
    roast ?? "",
    /unpaid intern|muted you|crisis memo|cancel your whole identity|comeback teaser fumes|full-time habit|this loud in public|locked inside it|custody of your personality|full emotional hostage situation|noise complaint|slide deck|emergency drill|recurring event|secondhand embarrassment/,
  );
});

test("buildStructuredRoast mixes statement, question, accusation, and comparison shapes", () => {
  const subjects = [
    "Jungkook",
    "TXT",
    "IU",
    "Felix",
    "Taemin",
    "Jennie",
    "Karina",
    "Seventeen",
    "Sana",
    "BTS",
    "Hanni",
    "Yeonjun",
  ];

  const samples = subjects
    .map((subject, index) =>
      buildStructuredRoast({
        mode: (["bias", "taste", "personality"] as const)[index % 3],
        severity: (["mild", "savage", "brutal"] as const)[index % 3],
        subject,
      }),
    )
    .filter((value): value is string => Boolean(value));

  assert.ok(samples.some((roast) => roast.includes("?")));
  assert.ok(samples.some((roast) => /you really|you somehow|nobody asked you to/i.test(roast)));
  assert.ok(samples.some((roast) => /\blike\b/i.test(roast)));
});

test("buildStructuredRoast does not leak raw target placeholders", () => {
  const roast = buildStructuredRoast({
    mode: "bias",
    severity: "brutal",
    subject: "Jungkook",
  });

  assert.ok(roast);
  assert.doesNotMatch(roast ?? "", /\{target\}/);
  assert.match(roast ?? "", /Jungkook/);
});
