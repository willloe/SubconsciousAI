import { objectiveLabels, productLabels, segmentLabels } from "@/lib/config";
import type { CategoryId, InsightRequestSelection } from "@/lib/types";

type JsonSchema = Record<string, unknown>;

type PromptSpec = {
  instructions: string;
  input: string;
  schemaName: string;
  schema: JsonSchema;
};

const ALL_CATEGORIES: CategoryId[] = [
  "marketing-okrs",
  "strengths",
  "weaknesses",
  "opportunities",
  "threats",
  "market-positioning",
  "buyer-persona",
  "investment-opportunities",
  "channels-distribution"
];

const baseInstructions =
  "You are a senior strategy analyst helping an internal planning team. Return concise, professional, decision-support output only. Avoid hype, filler, markdown, and disclaimers. Be specific, credible, and easy to scan. Generate a complete insight pack covering every requested category in one response.";

export function buildInsightPackPrompt(selection: InsightRequestSelection): PromptSpec {
  const context = [
    `Product: ${productLabels[selection.productId]}`,
    `Business objective: ${objectiveLabels[selection.objectiveId]}`,
    `Market segment: ${segmentLabels[selection.segmentId]}`,
    `Required categories: ${ALL_CATEGORIES.join(", ")}`
  ].join("\n");

  return {
    instructions: `${baseInstructions} Each category should be useful on its own, but the full pack should feel internally consistent.`,
    input: `${context}\n\nReturn one valid JSON object keyed by category. The response must include all required categories and match the schema exactly.`,
    schemaName: "insight_pack",
    schema: {
      type: "object",
      properties: Object.fromEntries(ALL_CATEGORIES.map((categoryId) => [categoryId, buildCategorySchema(categoryId)])),
      required: ALL_CATEGORIES,
      additionalProperties: false
    }
  };
}

function buildCategorySchema(categoryId: CategoryId): JsonSchema {
  switch (categoryId) {
    case "marketing-okrs":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: "marketing-okrs" },
          overview: { type: "string" },
          okrs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                objective: { type: "string" },
                target: { type: "string" },
                signal: { type: "string" }
              },
              required: ["objective", "target", "signal"],
              additionalProperties: false
            },
            minItems: 3,
            maxItems: 3
          },
          watchouts: stringArraySchema(3, 3)
        },
        required: ["categoryId", "overview", "okrs", "watchouts"],
        additionalProperties: false
      };
    case "strengths":
    case "weaknesses":
    case "opportunities":
    case "threats":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: categoryId },
          overview: { type: "string" },
          groups: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                items: stringArraySchema(2, 3)
              },
              required: ["title", "items"],
              additionalProperties: false
            },
            minItems: 3,
            maxItems: 3
          },
          recommendation: { type: "string" }
        },
        required: ["categoryId", "overview", "groups", "recommendation"],
        additionalProperties: false
      };
    case "market-positioning":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: "market-positioning" },
          overview: { type: "string" },
          positioningStatement: { type: "string" },
          differentiators: stringArraySchema(3, 4),
          whitespace: stringArraySchema(3, 4),
          proofPoints: stringArraySchema(3, 4)
        },
        required: ["categoryId", "overview", "positioningStatement", "differentiators", "whitespace", "proofPoints"],
        additionalProperties: false
      };
    case "buyer-persona":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: "buyer-persona" },
          overview: { type: "string" },
          archetype: { type: "string" },
          mindset: { type: "string" },
          jobsToBeDone: stringArraySchema(3, 4),
          triggers: stringArraySchema(3, 4),
          objections: stringArraySchema(3, 4),
          preferredChannels: stringArraySchema(3, 4)
        },
        required: [
          "categoryId",
          "overview",
          "archetype",
          "mindset",
          "jobsToBeDone",
          "triggers",
          "objections",
          "preferredChannels"
        ],
        additionalProperties: false
      };
    case "investment-opportunities":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: "investment-opportunities" },
          overview: { type: "string" },
          priorities: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                rationale: { type: "string" },
                horizon: { type: "string" }
              },
              required: ["title", "rationale", "horizon"],
              additionalProperties: false
            },
            minItems: 3,
            maxItems: 3
          },
          guardrails: stringArraySchema(3, 4)
        },
        required: ["categoryId", "overview", "priorities", "guardrails"],
        additionalProperties: false
      };
    case "channels-distribution":
      return {
        type: "object",
        properties: {
          categoryId: { type: "string", const: "channels-distribution" },
          overview: { type: "string" },
          channelPlays: {
            type: "array",
            items: {
              type: "object",
              properties: {
                channel: { type: "string" },
                role: { type: "string" },
                tactic: { type: "string" }
              },
              required: ["channel", "role", "tactic"],
              additionalProperties: false
            },
            minItems: 3,
            maxItems: 3
          },
          partnerships: stringArraySchema(2, 4),
          risks: stringArraySchema(2, 4)
        },
        required: ["categoryId", "overview", "channelPlays", "partnerships", "risks"],
        additionalProperties: false
      };
  }
}

function stringArraySchema(minItems: number, maxItems: number): JsonSchema {
  return {
    type: "array",
    items: { type: "string" },
    minItems,
    maxItems
  };
}
