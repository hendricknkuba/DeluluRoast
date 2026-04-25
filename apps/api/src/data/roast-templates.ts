import type { RoastMode, RoastSeverity } from "@delulu-roast/shared";

type RoastTemplate = {
  mode: RoastMode;
  severity: RoastSeverity;
  text: string;
};

export const roastTemplates: RoastTemplate[] = [
  {
    mode: "bias",
    severity: "mild",
    text: "{target} is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
  },
  {
    mode: "bias",
    severity: "savage",
    text: "{target} has you fighting for your life in group chats like you are on unpaid PR duty.",
  },
  {
    mode: "bias",
    severity: "brutal",
    text: "{target} has you writing think pieces over a two-second wink like the electric bill is due.",
  },
  {
    mode: "taste",
    severity: "mild",
    text: "Your taste in {target} says you enjoy chaos, but only if it comes with a photocard set.",
  },
  {
    mode: "taste",
    severity: "savage",
    text: "Choosing {target} as your whole personality is exactly why your playlists feel like emotional whiplash.",
  },
  {
    mode: "taste",
    severity: "brutal",
    text: "The way you defend {target} like a full-time job deserves overtime pay and a wellness check.",
  },
  {
    mode: "personality",
    severity: "mild",
    text: "Your {target} energy says you would lose an argument, then make a fancam to recover.",
  },
  {
    mode: "personality",
    severity: "savage",
    text: "Your {target} personality type is posting cryptic lyrics and expecting the timeline to solve the mystery.",
  },
  {
    mode: "personality",
    severity: "brutal",
    text: "Your {target} personality has the confidence of a center line with none of the rehearsal time.",
  },
];

