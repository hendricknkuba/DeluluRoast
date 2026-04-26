import test from "node:test";
import assert from "node:assert/strict";
import { toApiConfig, type ApiEnv } from "../env.js";
import {
  BLOCKED_TARGET_MESSAGE,
  buildLocalRoast,
  buildRoast,
  NON_KPOP_TARGET_MESSAGE,
} from "./roast.service.js";

const testConfig = toApiConfig({
  APP_ENV: "development",
  OPENAI_API_KEY: "test-key",
  OPENAI_MODEL: "gpt-4o-mini",
  OPENAI_CONTEXT_MODEL: "gpt-4.1-mini",
  OPENAI_MODERATION_MODEL: "omni-moderation-latest",
  OPENAI_REWRITE_ENABLED: true,
  OPENAI_REWRITE_MIN_SEVERITY: "savage",
  OPENAI_REWRITE_REQUIRE_CONTEXT: true,
  ALLOWED_ORIGINS: "http://localhost:5173",
  ALLOWED_ORIGIN: undefined,
  PORT: 3001,
  RATE_LIMIT_MAX: 20,
  RATE_LIMIT_WINDOW_MS: 60_000,
} satisfies ApiEnv);

test("buildLocalRoast injects the subject into the matching template", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast, /TXT/);
  assert.match(roast, /Nobody asked you to|It would be charming if it were not this loud in public/);
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
  assert.match(
    roast,
    /not helping your case|made this even more dramatic|look normal|less defensible|doing absolutely nothing to beat the allegations|turned the volume up|stopped looking accidental|looks wildly unserious/,
  );
});

test("buildLocalRoast does not inject factual artist bio text into the roast", () => {
  const roast = buildLocalRoast({
    mode: "bias",
    severity: "savage",
    subject: "Stray Kids",
    safeContext: "",
  });

  assert.doesNotMatch(roast, /South Korean boy group|JYP Entertainment|formed by/i);
});

test("buildRoast falls back to the local roast when OpenAI is unavailable", async () => {
  const roast = await buildRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  }, undefined, testConfig);

  assert.equal(roast.kind, "roast");

  if (roast.kind === "roast") {
    assert.match(roast.roast, /TXT/);
    assert.match(
      roast.roast,
      /At this point|Be serious|Somehow you managed to|It’s actually impressive how|Nobody asked you to|You really woke up and decided to|No one warned you that/,
    );
    assert.equal(roast.source, "local");
    assert.equal(roast.reason, "local_only_by_policy");
  }
});

test("buildRoast returns the stage-only message for non-K-pop targets", async () => {
  const roast = await buildRoast({
    mode: "bias",
    severity: "mild",
    subject: "Cristiano Ronaldo",
  }, undefined, testConfig);

  assert.equal(roast.kind, "roast");

  if (roast.kind === "roast") {
    assert.equal(roast.roast, NON_KPOP_TARGET_MESSAGE);
    assert.equal(roast.reason, "blocked_non_kpop");
  }
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
        reason: "enhanced",
      }),
    },
    testConfig,
  );

  assert.equal(roast.kind, "roast");

  if (roast.kind === "roast") {
    assert.equal(roast.roast, BLOCKED_TARGET_MESSAGE);
    assert.equal(roast.reason, "blocked_moderation");
  }
});

test("buildRoast returns disambiguation options for ambiguous names", async () => {
  const result = await buildRoast({
    mode: "bias",
    severity: "mild",
    subject: "Mark",
  }, undefined, testConfig);

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
    testConfig,
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
  let rewriteCalled = false;

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
    {
      ...testConfig,
      OPENAI_REWRITE_MIN_SEVERITY: "savage",
      OPENAI_REWRITE_REQUIRE_CONTEXT: true,
    },
  );

  assert.equal(result.kind, "roast");

  if (result.kind === "roast") {
    assert.equal(rewriteCalled, false);
    assert.equal(result.source, "local");
    assert.equal(result.reason, "local_only_by_policy");
    assert.match(result.roast, /Jungkook/);
  }
});
