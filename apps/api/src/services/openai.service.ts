import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  client ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return client;
}

type RewriteRoastInput = {
  subject: string;
  draftRoast: string;
};

export async function rewriteRoastWithOpenAI(input: RewriteRoastInput) {
  const openAIClient = getOpenAIClient();

  if (!openAIClient || !process.env.OPENAI_MODEL) {
    return input.draftRoast;
  }

  return input.draftRoast;
}
