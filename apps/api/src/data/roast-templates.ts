import type { RoastMode, RoastSeverity } from "@delulu-roast/shared";

type RoastTemplate = {
  mode: RoastMode;
  severity: RoastSeverity;
  text: string;
};

export const roastTemplates: RoastTemplate[] = [

  // BIAS
  {
    mode: "bias",
    severity: "mild",
    text: "{target} is so babied by this fandom they could miss a whole step on stage and you would call it a bold new performance choice.",
  },
  {
    mode: "bias",
    severity: "savage",
    text: "Be honest, did {target} personally assign you as their spokesperson, or did you just volunteer for unpaid crisis management on the timeline?",
  },
  {
    mode: "bias",
    severity: "brutal",
    text: "{target} hits one two-second wink and suddenly you are typing essays like missing it would cancel your entire personality for the week.",
  },
    {
    mode: "bias",
    severity: "mild",
    text: "{target} could forget their own lyrics mid-performance and you would call it a creative remix moment.",
  },
  {
    mode: "bias",
    severity: "savage",
    text: "At this point, defending {target} is less of a hobby and more of a full-time position with zero benefits.",
  },
  {
    mode: "bias",
    severity: "brutal",
    text: "{target} breathes slightly different one day and suddenly you are writing think pieces like your reputation depends on it.",
  },

  // TASTE

  {
    mode: "taste",
    severity: "mild",
    text: "Your taste in {target} says you love chaos, but only after checking Twitter first to see whether it is safe to agree out loud.",
  },
  {
    mode: "taste",
    severity: "savage",
    text: "Choosing {target} as your entire brand explains why your playlists feel like a dramatic exit scene followed by three emergency fancams.",
  },
  {
    mode: "taste",
    severity: "brutal",
    text: "The way you defend {target} makes it seem like a wrong opinion online could personally repossess your lightstick and your last ounce of peace.",
  },
    {
    mode: "taste",
    severity: "mild",
    text: "Your taste in {target} says you love a little chaos, as long as someone else explains it first.",
  },
  {
    mode: "taste",
    severity: "savage",
    text: "Your entire vibe built around {target} feels like a dramatic intro followed by emotional damage and a fancam outro.",
  },
  {
    mode: "taste",
    severity: "brutal",
    text: "The way you defend {target} makes it seem like a bad take online could personally evict you from your own personality.",
  },

  // PERSONALITY

  {
    mode: "personality",
    severity: "mild",
    text: "Your {target} energy says you would lose an argument, disappear for ten minutes, then come back with a fancam and act like that settled everything.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Why does your {target} personality always feel one vague lyric post away from demanding the whole timeline decode your emotional damage?",
  },
  {
    mode: "personality",
    severity: "brutal",
    text: "Your {target} personality has the confidence of a comeback teaser, the volume of a fanwar thread, and absolutely none of the rehearsal time to back it up.",
  },
    {
    mode: "personality",
    severity: "mild",
    text: "Your {target} energy says you lose arguments, disappear, then return with a perfectly timed fancam like it proves a point.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Why does your {target} personality feel like one vague post away from starting a full investigation on your own feelings?",
  },
  {
    mode: "personality",
    severity: "brutal",
    text: "Your {target} personality has the energy of a comeback teaser, the chaos of a fanwar thread, and zero preparation behind it.",
  },

  // EXTRA VARIANTION/STRUCTURE MIXES

  {
    mode: "bias",
    severity: "savage",
    text: "Be serious, nobody told you to make {target} your entire personality, yet here you are defending them like it's a final exam.",
  },
  {
    mode: "taste",
    severity: "brutal",
    text: "Your taste in {target} feels like emotional instability dressed up as good music and questionable decisions.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Not you using {target} energy as an excuse for behavior that even your own playlist can't justify.",
  }
];

type StructuredRoastInput = {
  mode: RoastMode;
  severity: RoastSeverity;
  subject: string;
  safeContext?: string;
};

type StructuredRoastParts = {
  openers: string[];
  behaviors: Record<RoastMode, string[]>;
  punchlines: Record<RoastSeverity, string[]>;
  contextBridges: string[];
};

const structuredRoastParts: StructuredRoastParts = {
  openers: [
    "Be serious,",
    "Be honest,",
    "No because",
    "At this point,",
  ],
  behaviors: {
    bias: [
      "{target} has you reacting like every minor facial expression deserves a full emergency panel discussion.",
      "supporting {target} stopped being a preference and turned into unpaid reputation management three scandals ago.",
      "the way you hover over {target} makes it feel like you were personally assigned to protect their brand image.",
    ],
    taste: [
      "your taste in {target} feels less like confidence and more like checking the fandom group chat before forming an opinion.",
      "building your whole vibe around {target} has the energy of dramatic playlists, shaky fancams, and zero emotional regulation.",
      "stanning {target} this hard makes it seem like one bad take online could send your entire personality into buffering mode.",
    ],
    personality: [
      "your {target} energy feels like posting one vague lyric and expecting the whole timeline to treat it as character development.",
      "your entire {target} personality reads like a teaser poster for drama you absolutely did start.",
      "the amount of {target} energy you carry makes every normal conversation feel one fancam away from becoming a public incident.",
    ],
  },
  punchlines: {
    mild: [
      "That is not dedication. That is performance art with Wi-Fi.",
      "It would be charming if it were not happening so loudly in public.",
    ],
    savage: [
      "It is giving unpaid intern for a fandom crisis team that never asked for your resume.",
      "At some point even the group chat muted you for doing too much.",
    ],
    brutal: [
      "You treat one tiny moment like missing it would erase your entire emotional support system for the week.",
      "The intensity is so dramatic it feels like your self-esteem is running on comeback teaser fumes.",
    ],
  },
  contextBridges: [
    "That whole {context} situation is not helping your case either.",
    "The funniest part is how the {context} angle somehow made this even more dramatic.",
    "Even the entire {context} narrative could not make this look normal.",
  ],
};

function getDeterministicIndex(seed: string, size: number) {
  let hash = 0;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return size === 0 ? 0 : hash % size;
}

function interpolateTarget(template: string, target: string) {
  return template.replace(/\{target\}/g, target);
}

function interpolateContext(template: string, context: string) {
  return template.replace(/\{context\}/g, context);
}

export function buildStructuredRoast(input: StructuredRoastInput) {
  const opener =
    structuredRoastParts.openers[
      getDeterministicIndex(`${input.subject}:${input.mode}:opener`, structuredRoastParts.openers.length)
    ];
  const behaviorTemplates = structuredRoastParts.behaviors[input.mode];
  const punchlineTemplates = structuredRoastParts.punchlines[input.severity];

  if (!behaviorTemplates || !punchlineTemplates) {
    return null;
  }

  const behavior =
    behaviorTemplates[
      getDeterministicIndex(
        `${input.subject}:${input.mode}:${input.severity}:behavior`,
        behaviorTemplates.length,
      )
    ];
  const punchline =
    punchlineTemplates[
      getDeterministicIndex(
        `${input.subject}:${input.mode}:${input.severity}:punchline`,
        punchlineTemplates.length,
      )
    ];
  const contextBridge = input.safeContext
    ? structuredRoastParts.contextBridges[
        getDeterministicIndex(
          `${input.subject}:${input.mode}:${input.safeContext}:context`,
          structuredRoastParts.contextBridges.length,
        )
      ]
    : null;
  const contextClause = input.safeContext
    ? ` ${interpolateContext(contextBridge ?? "", input.safeContext)}`
    : "";

  return `${opener} ${interpolateTarget(behavior, input.subject)}${contextClause} ${punchline}`
    .replace(/\s+/g, " ")
    .trim();
}
