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
    behaviorMode:
      | "subjectFirst"
      | "verbFirst"
      | "didQuestion"
      | "accusation";
    text: string;
  }>;
  behaviors: Record<
    RoastMode,
    {
      subjectFirst: string[];
      verbFirst: string[];
      didQuestion: string[];
      accusation: string[];
    }
  >;
  punchlines: Record<RoastSeverity, string[]>;
  contextBridges: string[];
};

const structuredRoastParts: StructuredRoastParts = {
  openers: [
    { behaviorMode: "subjectFirst", text: "At this point," },
    { behaviorMode: "didQuestion", text: "Be serious," },
    { behaviorMode: "verbFirst", text: "Somehow you managed to" },
    { behaviorMode: "accusation", text: "It’s actually impressive how" },
    { behaviorMode: "accusation", text: "Nobody asked you to" },
    { behaviorMode: "verbFirst", text: "You really woke up and decided to" },
    { behaviorMode: "subjectFirst", text: "No one warned you that" },
    { behaviorMode: "didQuestion", text: "Wildly enough," },
    { behaviorMode: "subjectFirst", text: "Against all odds," },
    { behaviorMode: "accusation", text: "Shockingly," },
  ],
  behaviors: {
    bias: {
      subjectFirst: [
        "you treat {target} like it personally owes you a public apology.",
        "you hover over {target} like you were hired for brand protection.",
        "you act like {target} is one post away from needing emergency PR.",
        "you react to {target} like every tiny update deserves a breaking-news banner.",
        "you guard {target} like the fandom accidentally put you on a payroll that does not exist.",
        "you follow {target} with the energy of a crisis monitor nobody asked to turn on.",
        "you talk about {target} like the stock market opens and closes on their selfies.",
        "you treat {target} like one bad headline would personally ruin your week.",
      ],
      verbFirst: [
        "defend {target} like it is your unpaid crisis-management internship.",
        "turn {target} into a public emergency.",
        "make {target} the centerpiece of your emotional support essay.",
        "monitor {target} like your notifications are a government alert system.",
        "explain {target} like the timeline keeps assigning you mandatory office hours.",
        "escort every {target} opinion into the room like it needs legal counsel.",
        "treat every {target} update like a reputational hostage negotiation.",
        "build an entire emergency response unit around {target} and call it normal support.",
      ],
      didQuestion: [
        "did {target} personally assign you to defend them, or did you just start doing it for free?",
        "did {target} leave you in charge of crisis control, or are you just freelancing in every comment section?",
        "did {target} ask for emergency representation, or did you open that office by yourself?",
        "did {target} appoint you as head of damage control, or did you print that title at home?",
        "did {target} hire you to patrol every opinion, or are you just running this department off instinct?",
        "did {target} put you on standby for public relations, or did you volunteer before the form existed?",
        "did {target} ask for a full defense brief, or did you draft one because the silence felt too peaceful?",
        "did {target} personally request twenty-four-hour protection, or did you decide the comment section was your jurisdiction?",
      ],
      accusation: [
        "you really turned {target} into a full-time legal defense that nobody requested.",
        "you somehow made defending {target} sound like a family business you forgot to inherit.",
        "you keep treating {target} like a national emergency with your name on the press release.",
        "you really made supporting {target} sound like a civil service position with no retirement plan.",
        "you somehow treat every {target} mention like a courtroom opening statement.",
        "you keep acting like {target} is one rumor away from needing your personal witness protection plan.",
        "you really turned {target} into a department you insist on running with zero qualifications.",
        "you somehow made being a fan sound like a press conference that only you showed up to.",
      ],
    },
    taste: {
      subjectFirst: [
        "you made {target} feel like a life choice you had to pre-clear with the timeline.",
        "you built your whole vibe around {target} like the fandom group chat needed approval.",
        "you treated {target} like a brand identity instead of a preference.",
        "you made {target} sound like a personality purchase with no refund policy.",
        "you turned {target} into the kind of taste choice people should probably discuss with a group chat first.",
        "you carry {target} around like a public mission statement instead of a simple opinion.",
        "you made {target} feel less like a preference and more like a lifestyle clause hidden in fine print.",
        "you present {target} like your entire aesthetic would collapse without constant maintenance.",
      ],
      verbFirst: [
        "make {target} sound like a life decision you had to pre-clear.",
        "turn {target} into a dramatic playlist and a full-time personality note.",
        "build your entire vibe around {target} like chaos is a required accessory.",
        "treat {target} like a subscription service your whole personality auto-renews every month.",
        "package {target} like a designer label for emotional instability and expensive opinions.",
        "drag {target} into every conversation like your branding team never clocks out.",
        "sell {target} like it is the only available cure for your taste-level identity crisis.",
        "carry {target} around like it came with a mandatory personal statement and three disclaimers.",
      ],
      didQuestion: [
        "did {target} file paperwork to become your entire brand, or was that a decision you made under emotional duress?",
        "did the fandom vote to make {target} your full personality, or did you skip that meeting and do it anyway?",
        "did {target} ask to become your lifestyle choice, or did you assign that job without consent?",
        "did {target} agree to become your whole aesthetic, or did you force that merger through overnight?",
        "did {target} send an invitation to become your personal brand, or did you just show up with the logo already printed?",
        "did anyone approve making {target} your identity package, or was that a solo executive decision?",
        "did {target} request this level of branding commitment, or are you just freelancing in taste management now?",
        "did the timeline elect {target} as your entire vibe, or did you stuff that ballot box yourself?",
      ],
      accusation: [
        "you keep presenting {target} like a personality subscription nobody can cancel.",
        "you somehow made liking {target} feel like a dramatic referendum on your entire taste level.",
        "you are treating {target} like a designer label for emotional instability.",
        "you really made enjoying {target} sound like a legal contract with your self-image on the line.",
        "you somehow turned {target} into a public referendum on whether your playlists deserve adult supervision.",
        "you keep using {target} like a luxury badge for decisions that were clearly made in chaos.",
        "you really act like {target} is premium proof that your taste cannot be questioned in daylight.",
        "you somehow made {target} sound less like music taste and more like a personal rebranding campaign.",
      ],
    },
    personality: {
      subjectFirst: [
        "you turned {target} energy into a vague lyric post with a side of performance anxiety.",
        "your entire {target} personality reads like a teaser poster for drama you absolutely did start.",
        "the amount of {target} energy you carry makes every normal conversation feel one fancam away from becoming a public incident.",
        "your whole {target} personality feels like a countdown teaser for drama that was never delayed enough.",
        "the way you wear {target} energy makes every opinion sound like it arrived with a teaser schedule and no supervision.",
        "your {target} personality keeps entering the room like it expects backup dancers and a smoke machine.",
        "the amount of {target} attitude you carry makes regular conversation sound like a comeback stage with unresolved tension.",
        "your {target} energy has the confidence of a headline act and the planning of a last-minute fanwar thread.",
      ],
      verbFirst: [
        "make {target} the reason your personality needs a backup generator.",
        "turn {target} energy into a vague post and call it character development.",
        "use {target} as the cover story for behavior your playlist would never defend.",
        "build your entire personality around {target} like subtlety was quietly removed from the setlist.",
        "turn {target} into a full emotional operating system and pretend that counts as range.",
        "use {target} energy as a personality patch for chaos that was already in beta.",
        "dress your entire behavior in {target} branding and call it self-discovery.",
        "make {target} the emergency explanation for every dramatic decision your group chat already predicted.",
      ],
      didQuestion: [
        "did {target} tell you to build a personality out of teaser crumbs, or was that your own independent experiment?",
        "did the comeback personally ask to become your character trait, or did you volunteer it for the role?",
        "did {target} authorize this level of personality inflation, or did you just start printing the posters?",
        "did {target} approve becoming your entire character arc, or did you greenlight that season by yourself?",
        "did the teaser schedule ask to run your personality, or did you just hand over the keys without a meeting?",
        "did {target} personally request this much influence over your behavior, or are you freelancing in identity management again?",
        "did the fandom assign {target} to your personality department, or did you appoint them in a closed session?",
        "did {target} sign off on becoming your full emotional blueprint, or did you skip legal review entirely?",
      ],
      accusation: [
        "you really turned {target} into a cover story for behavior that would not survive one honest group chat.",
        "you somehow treat {target} like a personality warranty for chaos that was clearly pre-existing.",
        "you keep using {target} as an alibi for drama that already had your fingerprints all over it.",
        "you really made {target} sound like a personality permit for chaos that already knew your home address.",
        "you somehow keep presenting {target} as proof your drama has artistic direction now.",
        "you really turned {target} into a character reference for behavior that was suspicious long before the fandom arrived.",
        "you somehow use {target} as an emotional passport for scenes nobody asked you to create.",
        "you keep treating {target} like official documentation that your extra behavior is somehow lore-accurate.",
      ],
    },
  },
  punchlines: {
    mild: [
      "That is not dedication. That is performance art with Wi-Fi.",
      "It would be charming if it were not this loud in public.",
      "This would be cute if it did not look like a full-time habit.",
      "That would almost be endearing if it did not sound like a scheduled weekly issue.",
      "The commitment is impressive in the way a public overshare usually is.",
      "It might be harmless if you were not doing all of this at full volume.",
      "That is less a personality quirk and more a recurring event with lighting cues.",
      "It would read softer if the secondhand embarrassment were not doing cardio.",
    ],
    savage: [
      "You are basically the unpaid intern in a fandom crisis team that forgot to hire you.",
      "At some point even the group chat muted you for doing too much.",
      "You turned a normal opinion into a full crisis memo for no reason.",
      "You are doing the job of three overcommitted fan accounts and still asking for more overtime.",
      "At this rate even the timeline filed a noise complaint against your dedication.",
      "You made a regular fan reaction sound like a board meeting with emotional damages attached.",
      "You are one step away from putting this behavior in a slide deck and calling it outreach.",
      "The way you escalate things makes a simple take sound like a live emergency drill.",
    ],
    brutal: [
      "You treat one tiny moment like missing it would erase your entire personality for the week.",
      "The intensity is so dramatic it feels like your self-esteem is running on comeback teaser fumes.",
      "You are acting like a single wink could cancel your whole identity if you blinked.",
      "You cling to every {target} teaser like your whole personality got locked inside it and the comeback has to release you.",
      "It is giving full emotional hostage situation over a teaser image that lasted twelve seconds.",
      "You are one teaser away from acting like the comeback owes you custody of your personality.",
      "You are reacting like one deleted fancam could send your entire identity into witness protection.",
      "The drama level is so high it feels like your self-respect got trapped in a teaser drop and never came back.",
      "You are hanging on so hard it looks like your personality needs life support from the next comeback schedule.",
      "One blurry airport photo should not have this much control over your emotional infrastructure.",
      "The obsession is so specific it feels like your dignity got rescheduled until after promotions end.",
    ],
  },
  contextBridges: [
    "That whole {context} situation is not helping your case either.",
    "The funniest part is how the {context} angle somehow made this even more dramatic.",
    "Even the entire {context} narrative could not make this look normal.",
    "If anything, the whole {context} detail somehow made this look even less defensible.",
    "The {context} side of this is doing absolutely nothing to beat the allegations.",
    "Adding the {context} angle just turned the volume up on behavior that was already suspicious.",
    "The moment the {context} part entered the chat, this stopped looking accidental.",
    "Even with the full {context} excuse on the table, this still looks wildly unserious.",
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

function selectDeterministicOpener(seed: string) {
  const openers = structuredRoastParts.openers;
  return openers[getDeterministicIndex(seed, openers.length)];
}

export function buildStructuredRoast(input: StructuredRoastInput) {
  const behaviorTemplates = structuredRoastParts.behaviors[input.mode];
  const punchlineTemplates = structuredRoastParts.punchlines[input.severity];

  if (!behaviorTemplates || !punchlineTemplates) {
    return null;
  }

  const opener = selectDeterministicOpener(
    `${input.subject}:${input.mode}:${input.severity}:opener`,
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

  return `${opener.text} ${interpolateTarget(behavior, input.subject)}${contextClause} ${interpolateTarget(punchline, input.subject)}`
    .replace(/\s+/g, " ")
    .trim();
}
