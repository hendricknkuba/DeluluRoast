import { RoastModes, RoastSeverities } from "./roast.constants.js";

export type RoastMode = (typeof RoastModes)[number];
export type RoastSeverity = (typeof RoastSeverities)[number];

export type RoastRequest = {
  mode: RoastMode;
  severity: RoastSeverity;
  subject: string;
};
