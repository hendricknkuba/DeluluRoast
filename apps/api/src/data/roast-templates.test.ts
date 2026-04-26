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

test("buildStructuredRoast does not repeat the same opener twice in a row", () => {
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
  assert.notEqual(first?.split(" ")[0] + " " + first?.split(" ")[1], second?.split(" ")[0] + " " + second?.split(" ")[1]);
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
    /unpaid intern|muted you|crisis memo|cancel your whole identity|comeback teaser fumes|full-time habit|this loud in public|locked inside it|custody of your personality|full emotional hostage situation/,
  );
});
