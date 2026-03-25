import { objectives, products, segments } from "@/lib/config";
import type { InsightGenerationRequest, InsightRequestSelection } from "@/lib/types";

const productIds = new Set(products.map((item) => item.id));
const objectiveIds = new Set(objectives.map((item) => item.id));
const segmentIds = new Set(segments.map((item) => item.id));

export function parseInsightGenerationRequest(value: unknown): InsightGenerationRequest {
  if (!value || typeof value !== "object") {
    throw new Error("Request body must be an object.");
  }

  const candidate = value as Partial<InsightRequestSelection>;

  if (!candidate.productId || !productIds.has(candidate.productId)) {
    throw new Error("Invalid product.");
  }

  if (!candidate.objectiveId || !objectiveIds.has(candidate.objectiveId)) {
    throw new Error("Invalid objective.");
  }

  if (!candidate.segmentId || !segmentIds.has(candidate.segmentId)) {
    throw new Error("Invalid segment.");
  }

  return {
    productId: candidate.productId,
    objectiveId: candidate.objectiveId,
    segmentId: candidate.segmentId
  };
}
