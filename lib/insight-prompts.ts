import { categoryLabels, objectiveLabels, productLabels, segmentLabels } from "@/lib/config";
import type { CategoryId, ExplorerSelection } from "@/lib/types";

type JsonSchema = Record<string, unknown>;

type PromptSpec = {
  instructions: string;
  input: string;
  schemaName: string;
  schema: JsonSchema;
};

const baseInstructions =
  "You are a senior strategy analyst helping an internal planning team. Return concise, professional, decision-support output only. Avoid hype, filler, markdown, and disclaimers. Every point should be specific, credible, and easy to scan.";

export function buildInsightPrompt(selection: ExplorerSelection): PromptSpec {
  const context = [
    `Product: ${productLabels[selection.productId]}`,
    `Business objective: ${objectiveLabels[selection.objectiveId]}`,
    `Market segment: ${segmentLabels[selection.segmentId]}`,
    `Category: ${categoryLabels[selection.categoryId]}`
  ].join("\n");

  const input = `${context}\n\nCreate the requested planning output as valid JSON matching the schema exactly. Keep the content concise, strategy-oriented, and useful for an internal decision-support tool.`;

  switch (selection.categoryId) {
    case "marketing-okrs":
      return {
        instructions: `${baseInstructions} Focus on measurable marketing planning outcomes and practical watchouts.`,
        input,
        schemaName: "marketing_okrs",
        schema: {
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
            watchouts: {
              type: "array",
              items: { type: "string" },
              minItems: 3,
              maxItems: 3
            }
          },
          required: ["categoryId", "overview", "okrs", "watchouts"],
          additionalProperties: false
        }
      };
    case "strengths":
    case "weaknesses":
    case "opportunities":
    case "threats":
      return {
        instructions: `${baseInstructions} Focus on concise SWOT analysis with grouped bullets and one recommended move.`,
        input,
        schemaName: `${toSchemaName(selection.categoryId)}_analysis`,
        schema: buildSwotSchema(selection.categoryId)
      };
    case "market-positioning":
      return {
        instructions: `${baseInstructions} Focus on positioning clarity, differentiation, and whitespace in the market.`,
        input,
        schemaName: "market_positioning",
        schema: {
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
        }
      };
    case "buyer-persona":
      return {
        instructions: `${baseInstructions} Focus on a realistic planning persona for strategy and messaging decisions.`,
        input,
        schemaName: "buyer_persona",
        schema: {
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
        }
      };
    case "investment-opportunities":
      return {
        instructions: `${baseInstructions} Focus on practical investment priorities with rationale and guardrails.`,
        input,
        schemaName: "investment_opportunities",
        schema: {
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
        }
      };
    case "channels-distribution":
      return {
        instructions: `${baseInstructions} Focus on channel roles, tactics, partnership opportunities, and risks.`,
        input,
        schemaName: "channels_distribution",
        schema: {
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
        }
      };
  }
}

function buildSwotSchema(categoryId: CategoryId): JsonSchema {
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
}

function stringArraySchema(minItems: number, maxItems: number): JsonSchema {
  return {
    type: "array",
    items: { type: "string" },
    minItems,
    maxItems
  };
}

function toSchemaName(value: string) {
  return value.replace(/-/g, "_");
}
