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
    text: "No one warned you that {target} would turn you into an unpaid spokesperson with a timeline full of emergency press releases.",
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
    text: "At this point, defending {target} is less of a hobby and more of a full-time role with no benefits and terrible hours.",
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
    text: "Somehow you managed to make {target} sound like a life choice you had to pre-clear with the timeline first.",
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
    text: "It’s actually impressive how {target} became your excuse for loving chaos only after somebody else explains it to you.",
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
    text: "At this point, your {target} energy is basically a disappearing act followed by a fancam and false confidence.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Somehow you managed to turn {target} into a personality trait that still expects the whole timeline to decode your emotional damage.",
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
    text: "It’s actually impressive how your {target} personality can sound like a vague post, a full investigation, and a fake apology draft all at once.",
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
    text: "No one warned you that making {target} your entire personality would turn every comment section into a rescue mission.",
  },
  {
    mode: "taste",
    severity: "brutal",
    text: "Your taste in {target} feels like emotional instability dressed up as good music and questionable decisions.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Somehow you managed to use {target} energy as an excuse for behavior that even your own playlist would side-eye.",
  }
];

type StructuredRoastInput = {
  mode: RoastMode;
  severity: RoastSeverity;
  subject: string;
  safeContext?: string;
};

type StructuredRoastParts = {
  openers: Array<{
    behaviorMode: "subjectFirst" | "verbFirst";
    text: string;
  }>;
  behaviors: Record<
    RoastMode,
    {
      subjectFirst: string[];
      verbFirst: string[];
    }
  >;
  punchlines: Record<RoastSeverity, string[]>;
  contextBridges: string[];
};

const structuredRoastParts: StructuredRoastParts = {
  openers: [
    { behaviorMode: "subjectFirst", text: "At this point," },
    { behaviorMode: "subjectFirst", text: "Be serious," },
    { behaviorMode: "verbFirst", text: "Somehow you managed to" },
    { behaviorMode: "subjectFirst", text: "It’s actually impressive how" },
    { behaviorMode: "verbFirst", text: "Nobody asked you to" },
    { behaviorMode: "verbFirst", text: "You really woke up and decided to" },
    { behaviorMode: "subjectFirst", text: "No one warned you that" },
    { behaviorMode: "subjectFirst", text: "Wildly enough," },
    { behaviorMode: "subjectFirst", text: "Against all odds," },
    { behaviorMode: "subjectFirst", text: "Shockingly," },
  ],
  behaviors: {
    bias: {
      subjectFirst: [
        "you treat {target} like it personally owes you a public apology.",
        "you hover over {target} like you were hired for brand protection.",
        "you act like {target} is one post away from needing emergency PR.",
      ],
      verbFirst: [
        "defend {target} like it is your unpaid crisis-management internship.",
        "turn {target} into a public emergency.",
        "make {target} the centerpiece of your emotional support essay.",
      ],
    },
    taste: {
      subjectFirst: [
        "you made {target} feel like a life choice you had to pre-clear with the timeline.",
        "you built your whole vibe around {target} like the fandom group chat needed approval.",
        "you treated {target} like a brand identity instead of a preference.",
      ],
      verbFirst: [
        "make {target} sound like a life decision you had to pre-clear.",
        "turn {target} into a dramatic playlist and a full-time personality note.",
        "build your entire vibe around {target} like chaos is a required accessory.",
      ],
    },
    personality: {
      subjectFirst: [
        "you turned {target} energy into a vague lyric post with a side of performance anxiety.",
        "your entire {target} personality reads like a teaser poster for drama you absolutely did start.",
        "the amount of {target} energy you carry makes every normal conversation feel one fancam away from becoming a public incident.",
      ],
      verbFirst: [
        "make {target} the reason your personality needs a backup generator.",
        "turn {target} energy into a vague post and call it character development.",
        "use {target} as the cover story for behavior your playlist would never defend.",
      ],
    },
  },
  punchlines: {
    mild: [
      "That is not dedication. That is performance art with Wi-Fi.",
      "It would be charming if it were not this loud in public.",
      "This would be cute if it did not look like a full-time habit.",
    ],
    savage: [
      "You are basically the unpaid intern in a fandom crisis team that forgot to hire you.",
      "At some point even the group chat muted you for doing too much.",
      "You turned a normal opinion into a full crisis memo for no reason.",
    ],
    brutal: [
      "You treat one tiny moment like missing it would erase your entire personality for the week.",
      "The intensity is so dramatic it feels like your self-esteem is running on comeback teaser fumes.",
      "You are acting like a single wink could cancel your whole identity if you blinked.",
      "You cling to every {target} teaser like your whole personality got locked inside it and the comeback has to release you.",
      "It is giving full emotional hostage situation over a teaser image that lasted twelve seconds.",
      "You are one teaser away from acting like the comeback owes you custody of your personality.",
    ],
  },
  contextBridges: [
    "That whole {context} situation is not helping your case either.",
    "The funniest part is how the {context} angle somehow made this even more dramatic.",
    "Even the entire {context} narrative could not make this look normal.",
  ],
};

let lastStructuredOpener: string | null = null;

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

function selectNonRepeatingOpener(seed: string) {
  const openers = structuredRoastParts.openers;
  const initialIndex = getDeterministicIndex(seed, openers.length);
  const initialOpener = openers[initialIndex];

  if (initialOpener.text !== lastStructuredOpener) {
    lastStructuredOpener = initialOpener.text;
    return initialOpener;
  }

  const fallbackIndex = (initialIndex + 1) % openers.length;
  const fallbackOpener = openers[fallbackIndex];
  lastStructuredOpener = fallbackOpener.text;

  return fallbackOpener;
}

export function buildStructuredRoast(input: StructuredRoastInput) {
  const behaviorTemplates = structuredRoastParts.behaviors[input.mode];
  const punchlineTemplates = structuredRoastParts.punchlines[input.severity];

  if (!behaviorTemplates || !punchlineTemplates) {
    return null;
  }

  const opener = selectNonRepeatingOpener(
    `${input.subject}:${input.mode}:opener`,
  );
  const behavior =
    behaviorTemplates[opener.behaviorMode][
      getDeterministicIndex(
        `${input.subject}:${input.mode}:${input.severity}:behavior`,
        behaviorTemplates[opener.behaviorMode].length,
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

  return `${opener.text} ${interpolateTarget(behavior, input.subject)}${contextClause} ${punchline}`
    .replace(/\s+/g, " ")
    .trim();
}
