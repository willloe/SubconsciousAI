import "server-only";

import { buildInsightPrompt } from "@/lib/insight-prompts";
import type { ExplorerSelection, MockInsight } from "@/lib/types";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";

type OpenAIResponse = {
  error?: {
    message?: string;
  };
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export class MissingApiKeyError extends Error {
  constructor() {
    super("Server configuration is incomplete. OPENAI_API_KEY is not set.");
    this.name = "MissingApiKeyError";
  }
}

export class InsightGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsightGenerationError";
  }
}

type OpenAIConfig = {
  apiKey: string;
  model: string;
};

export async function generateInsight(selection: ExplorerSelection): Promise<MockInsight> {
  const config = getOpenAIConfig();
  const { instructions, input, schemaName, schema } = buildInsightPrompt(selection);

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      input: [
        { role: "system", content: instructions },
        { role: "user", content: input }
      ],
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          schema,
          strict: true
        }
      }
    }),
    cache: "no-store"
  });

  const payload = (await readJsonSafely(response)) as OpenAIResponse | null;

  if (!response.ok) {
    throw new InsightGenerationError(payload?.error?.message ?? "Insight generation request failed.");
  }

  const text = payload ? extractOutputText(payload) : null;

  if (!text) {
    throw new InsightGenerationError("The model returned no structured output.");
  }

  try {
    return JSON.parse(text) as MockInsight;
  } catch {
    throw new InsightGenerationError("The model returned invalid JSON.");
  }
}

function getOpenAIConfig(): OpenAIConfig {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new MissingApiKeyError();
  }

  return {
    apiKey,
    model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL
  };
}

async function readJsonSafely(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

function extractOutputText(payload: OpenAIResponse) {
  for (const item of payload.output ?? []) {
    if (item.type !== "message") {
      continue;
    }

    for (const contentItem of item.content ?? []) {
      if (contentItem.type === "output_text" && typeof contentItem.text === "string") {
        return contentItem.text;
      }
    }
  }

  return null;
}
