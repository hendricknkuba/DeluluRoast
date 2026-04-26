import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveAmbiguousTargetOptions,
  classifyKpopTarget,
  normalizeTargetInput,
  resolveExplicitTargetContext,
  resolveTargetResolution,
  rewriteRoastWithOpenAI,
} from "./openai.service.js";

test("rewriteRoastWithOpenAI falls back to the local draft when OpenAI is unavailable", async () => {
  const originalApiKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;

  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_MODEL;

  const roast = await rewriteRoastWithOpenAI({
    subject: "IU",
    draftRoast:
      "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
  });

  assert.deepEqual(roast, {
    roast:
      "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    source: "local",
    reason: "unavailable",
  });

  if (originalApiKey) {
    process.env.OPENAI_API_KEY = originalApiKey;
  }

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  }
});

test("rewriteRoastWithOpenAI falls back to the local draft when the OpenAI call fails", async () => {
  const originalModel = process.env.OPENAI_MODEL;
  process.env.OPENAI_MODEL = "gpt-4o-mini";

  const roast = await rewriteRoastWithOpenAI(
    {
      subject: "IU",
      draftRoast:
        "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    },
    {
      client: {
        responses: {
          create: async () => {
            throw new Error("network failed");
          },
        },
      },
    },
  );

  assert.deepEqual(roast, {
    roast:
      "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    source: "local",
    reason: "fallback_error",
  });

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  } else {
    delete process.env.OPENAI_MODEL;
  }
});

test("rewriteRoastWithOpenAI tells the model to preserve structure and specific details", async () => {
  const originalModel = process.env.OPENAI_MODEL;
  process.env.OPENAI_MODEL = "gpt-4o-mini";

  let capturedParams:
    | {
        input: Array<{
          role: "developer" | "user";
          content: string;
        }>;
      }
    | undefined;

  await rewriteRoastWithOpenAI(
    {
      subject: "Jungkook",
      draftRoast:
        "Be serious, Jungkook has you reacting like every minor facial expression deserves a full emergency panel discussion. The funniest part is how the golden maknae image angle somehow made this even more dramatic. It is giving unpaid intern for a fandom crisis team that never asked for your resume.",
    },
    {
      client: {
        responses: {
          create: async (params) => {
            capturedParams = params;

            return {
              output_text:
                "Be serious, Jungkook has the whole timeline acting like one eyebrow raise deserves a shareholder meeting.",
            };
          },
        },
      },
    },
  );

  assert.ok(capturedParams);
  assert.match(capturedParams.input[0].content, /Do not repeat common openings/);
  assert.match(capturedParams.input[0].content, /Avoid generic phrasing/);
  assert.match(capturedParams.input[0].content, /Make it more absurd and specific to fandom behavior/);
  assert.match(capturedParams.input[0].content, /Keep it to ONE - TWO sentence/);
  assert.match(capturedParams.input[0].content, /End with a strong punchline/);
  assert.match(capturedParams.input[0].content, /Keep the existing joke structure/);
  assert.match(capturedParams.input[1].content, /golden maknae image angle/);

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  } else {
    delete process.env.OPENAI_MODEL;
  }
});

test("rewriteRoastWithOpenAI falls back to the local draft when the model output is unsafe", async () => {
  const originalModel = process.env.OPENAI_MODEL;
  process.env.OPENAI_MODEL = "gpt-4o-mini";

  const roast = await rewriteRoastWithOpenAI(
    {
      subject: "IU",
      draftRoast:
        "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    },
    {
      client: {
        responses: {
          create: async () => ({
            output_text: "This is playful. Add a phone number. Make it harsher.",
          }),
        },
      },
    },
  );

  assert.deepEqual(roast, {
    roast:
      "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    source: "local",
    reason: "fallback_rejected_output",
  });

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  } else {
    delete process.env.OPENAI_MODEL;
  }
});

test("rewriteRoastWithOpenAI falls back to the local draft when the model output is too generic", async () => {
  const originalModel = process.env.OPENAI_MODEL;
  process.env.OPENAI_MODEL = "gpt-4o-mini";

  const roast = await rewriteRoastWithOpenAI(
    {
      subject: "TXT",
      draftRoast:
        "Be serious, stanning TXT this hard makes it seem like one bad take online could send your entire personality into buffering mode. It would be charming if it were not happening so loudly in public.",
    },
    {
      client: {
        responses: {
          create: async () => ({
            output_text: "Your taste in TXT says you really like them.",
          }),
        },
      },
    },
  );

  assert.deepEqual(roast, {
    roast:
      "Be serious, stanning TXT this hard makes it seem like one bad take online could send your entire personality into buffering mode. It would be charming if it were not happening so loudly in public.",
    source: "local",
    reason: "fallback_rejected_output",
  });

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  } else {
    delete process.env.OPENAI_MODEL;
  }
});

test("classifyKpopTarget uses the local K-pop fallback when OpenAI is unavailable", async () => {
  const originalApiKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;

  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_MODEL;

  const result = await classifyKpopTarget("BTS");

  assert.deepEqual(result, {
    isKpopRelated: true,
    entityType: "group",
    safeContext: "",
  });

  if (originalApiKey) {
    process.env.OPENAI_API_KEY = originalApiKey;
  }

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  }
});

test("normalizeTargetInput lowercases and collapses extra spaces", () => {
  assert.equal(normalizeTargetInput("  Mark   from   NCT  "), "mark from nct");
});

test("resolveExplicitTargetContext detects the 'from' pattern", () => {
  assert.deepEqual(resolveExplicitTargetContext("Mark from NCT"), {
    original: "Mark from NCT",
    normalized: "mark from nct",
    name: "Mark",
    group: "Nct",
    resolvedTarget: "Mark from Nct",
  });
});

test("resolveExplicitTargetContext detects the parenthesis pattern", () => {
  assert.deepEqual(resolveExplicitTargetContext("V (BTS)"), {
    original: "V (BTS)",
    normalized: "v (bts)",
    name: "V",
    group: "Bts",
    resolvedTarget: "V from Bts",
  });
});

test("resolveExplicitTargetContext detects a trailing known group", () => {
  assert.deepEqual(resolveExplicitTargetContext("Lisa Blackpink"), {
    original: "Lisa Blackpink",
    normalized: "lisa blackpink",
    name: "Lisa",
    group: "Blackpink",
    resolvedTarget: "Lisa from Blackpink",
  });
});

test("resolveAmbiguousTargetOptions returns choices for ambiguous names", () => {
  assert.deepEqual(resolveAmbiguousTargetOptions("Mark"), [
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
});

test("resolveTargetResolution resolves unique K-pop names directly", async () => {
  const result = await resolveTargetResolution("BTS");

  assert.deepEqual(result, {
    isAmbiguous: false,
    resolvedTarget: "BTS",
    candidates: [],
  });
});

test("resolveTargetResolution falls back to a direct resolution for clean inputs", async () => {
  const result = await resolveTargetResolution("NMIXX");

  assert.deepEqual(result, {
    isAmbiguous: false,
    resolvedTarget: "NMIXX",
    candidates: [],
  });
});

test("resolveTargetResolution returns model-backed ambiguity options when available", async () => {
  const originalContextModel = process.env.OPENAI_CONTEXT_MODEL;
  process.env.OPENAI_CONTEXT_MODEL = "gpt-4.1-mini";

  const result = await resolveTargetResolution("Mark", {
    client: {
      responses: {
        parse: async () => ({
          output_parsed: {
            isAmbiguous: true,
            resolvedTarget: null,
            candidates: [
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
            ],
          },
        }),
        create: async () => ({
          output_text: "",
        }),
      },
    },
  });

  assert.deepEqual(result, {
    isAmbiguous: true,
    resolvedTarget: null,
    candidates: [
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
    ],
  });

  if (originalContextModel) {
    process.env.OPENAI_CONTEXT_MODEL = originalContextModel;
  } else {
    delete process.env.OPENAI_CONTEXT_MODEL;
  }
});
