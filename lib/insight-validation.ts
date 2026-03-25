import { categories, objectives, products, segments } from "@/lib/config";
import type { ExplorerSelection, InsightGenerationRequest } from "@/lib/types";

const productIds = new Set(products.map((item) => item.id));
const objectiveIds = new Set(objectives.map((item) => item.id));
const segmentIds = new Set(segments.map((item) => item.id));
const categoryIds = new Set(categories.map((item) => item.id));

export function parseInsightGenerationRequest(value: unknown): InsightGenerationRequest {
  if (!value || typeof value !== "object") {
    throw new Error("Request body must be an object.");
  }

  const candidate = value as Partial<ExplorerSelection>;

  if (!candidate.productId || !productIds.has(candidate.productId)) {
    throw new Error("Invalid product.");
  }

  if (!candidate.objectiveId || !objectiveIds.has(candidate.objectiveId)) {
    throw new Error("Invalid objective.");
  }

  if (!candidate.segmentId || !segmentIds.has(candidate.segmentId)) {
    throw new Error("Invalid segment.");
  }

  if (!candidate.categoryId || !categoryIds.has(candidate.categoryId)) {
    throw new Error("Invalid category.");
  }

  return {
    productId: candidate.productId,
    objectiveId: candidate.objectiveId,
    segmentId: candidate.segmentId,
    categoryId: candidate.categoryId
  };
}
