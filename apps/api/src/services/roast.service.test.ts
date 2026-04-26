import test from "node:test";
import assert from "node:assert/strict";
import {
  BLOCKED_TARGET_MESSAGE,
  buildLocalRoast,
  buildRoast,
  NON_KPOP_TARGET_MESSAGE,
} from "./roast.service.js";

test("buildLocalRoast injects the subject into the matching template", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast, /TXT/);
  assert.match(roast, /performance art with Wi-Fi|charming if it were not happening/);
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

test("buildLocalRoast uses safeContext to make the draft more specific", () => {
  const roast = buildLocalRoast({
    mode: "bias",
    severity: "savage",
    subject: "Jungkook",
    safeContext: "golden maknae image",
  });

  assert.match(roast, /Jungkook/);
  assert.match(roast, /golden maknae image/);
  assert.doesNotMatch(roast, /aura/);
  assert.match(roast, /not helping your case|made this even more dramatic|look normal/);
});

test("buildRoast falls back to the local roast when OpenAI is unavailable", async () => {
  const originalApiKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;

  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_MODEL;

  const roast = await buildRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast.roast, /TXT/);
  assert.match(roast.roast, /buffering mode|group chat|dramatic playlists/);
  assert.equal(roast.source, "local");
  assert.equal(roast.reason, "local_only_by_policy");

  if (originalApiKey) {
    process.env.OPENAI_API_KEY = originalApiKey;
  }

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  }
});

test("buildRoast returns the stage-only message for non-K-pop targets", async () => {
  const roast = await buildRoast({
    mode: "bias",
    severity: "mild",
    subject: "Cristiano Ronaldo",
  });

  assert.equal(roast.roast, NON_KPOP_TARGET_MESSAGE);
  assert.equal(roast.reason, "blocked_non_kpop");
});

test("buildRoast blocks flagged targets before classification", async () => {
  const roast = await buildRoast(
    {
      mode: "bias",
      severity: "mild",
      subject: "some target",
    },
    {
      moderateTargetInput: async () => true,
      classifyKpopTarget: async () => ({
        isKpopRelated: true,
        entityType: "idol",
        safeContext: "",
      }),
      resolveTargetResolution: async () => ({
        isAmbiguous: false,
        resolvedTarget: null,
        candidates: [],
      }),
      rewriteRoastWithOpenAI: async () => ({
        roast: "should not reach rewrite",
        source: "openai",
      }),
    },
  );

  assert.equal(roast.roast, BLOCKED_TARGET_MESSAGE);
  assert.equal(roast.reason, "blocked_moderation");
});

test("buildRoast returns disambiguation options for ambiguous names", async () => {
  const result = await buildRoast({
    mode: "bias",
    severity: "mild",
    subject: "Mark",
  });

  assert.equal(result.kind, "ambiguous");

  if (result.kind === "ambiguous") {
    assert.equal(result.reason, "needs_disambiguation");
    assert.deepEqual(result.options, [
      {
        id: "mark_nct",
        label: "Mark — NCT",
        name: "Mark",
        group: "NCT",
      },
      {
        id: "mark_got7",
        label: "Mark — GOT7",
        name: "Mark",
        group: "GOT7",
      },
    ]);
  }
});

test("buildRoast uses the resolved target when context resolution succeeds", async () => {
  let classifiedSubject = "";
  let rewrittenSubject = "";

  const result = await buildRoast(
    {
      mode: "bias",
      severity: "savage",
      subject: "Mark (NCT)",
    },
    {
      moderateTargetInput: async () => false,
      resolveTargetResolution: async () => ({
        isAmbiguous: false,
        resolvedTarget: "Mark from NCT",
        candidates: [],
      }),
      classifyKpopTarget: async (subject) => {
        classifiedSubject = subject;

        return {
          isKpopRelated: true,
          entityType: "idol",
          safeContext: "NCT member",
        };
      },
      rewriteRoastWithOpenAI: async ({ subject, draftRoast }) => {
        rewrittenSubject = subject;

        return {
          roast: draftRoast,
          source: "local",
          reason: "fallback_error",
        };
      },
    },
  );

  assert.equal(result.kind, "roast");

  if (result.kind === "roast") {
    assert.equal(classifiedSubject, "Mark from NCT");
    assert.equal(rewrittenSubject, "Mark from NCT");
    assert.match(result.roast, /Mark from NCT/);
    assert.equal(result.reason, "fallback_error");
  }
});

test("buildRoast skips OpenAI rewrite for mild requests under the cost gate", async () => {
  const originalMinSeverity = process.env.OPENAI_REWRITE_MIN_SEVERITY;
  const originalRequireContext = process.env.OPENAI_REWRITE_REQUIRE_CONTEXT;
  let rewriteCalled = false;

  process.env.OPENAI_REWRITE_MIN_SEVERITY = "savage";
  process.env.OPENAI_REWRITE_REQUIRE_CONTEXT = "true";

  const result = await buildRoast(
    {
      mode: "bias",
      severity: "mild",
      subject: "Jungkook",
    },
    {
      moderateTargetInput: async () => false,
      resolveTargetResolution: async () => ({
        isAmbiguous: false,
        resolvedTarget: null,
        candidates: [],
      }),
      classifyKpopTarget: async () => ({
        isKpopRelated: true,
        entityType: "idol",
        safeContext: "golden maknae image",
      }),
      rewriteRoastWithOpenAI: async () => {
        rewriteCalled = true;

        return {
          roast: "should not be used",
          source: "openai",
          reason: "enhanced",
        };
      },
    },
  );

  assert.equal(result.kind, "roast");

  if (result.kind === "roast") {
    assert.equal(rewriteCalled, false);
    assert.equal(result.source, "local");
    assert.equal(result.reason, "local_only_by_policy");
    assert.match(result.roast, /Jungkook/);
  }

  if (originalMinSeverity) {
    process.env.OPENAI_REWRITE_MIN_SEVERITY = originalMinSeverity;
  } else {
    delete process.env.OPENAI_REWRITE_MIN_SEVERITY;
  }

  if (originalRequireContext) {
    process.env.OPENAI_REWRITE_REQUIRE_CONTEXT = originalRequireContext;
  } else {
    delete process.env.OPENAI_REWRITE_REQUIRE_CONTEXT;
  }
});
