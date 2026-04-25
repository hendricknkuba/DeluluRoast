import test from "node:test";
import assert from "node:assert/strict";
import { buildLocalRoast } from "./roast.service.js";

test("buildLocalRoast injects the subject into the matching template", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast, /TXT/);
  assert.match(roast, /photocard set/);
});

test("buildLocalRoast returns a fallback when no template exists", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "missing" as never,
    subject: "TXT",
  });

  assert.equal(
    roast,
    "That comeback exists, but this roast template does not yet.",
  );
});
