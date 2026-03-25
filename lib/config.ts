import type { CategoryId, ExplorerOptionId, ObjectiveId, ProductId, SegmentId, SelectOption } from "@/lib/types";

export const products: SelectOption<ProductId>[] = [
  { id: "electric-cars", label: "Electric Cars" },
  { id: "coffee", label: "Coffee" },
  { id: "project-management-software", label: "Project Management Software" }
];

export const objectives: SelectOption<ObjectiveId>[] = [
  { id: "increase-awareness", label: "Increase Awareness" },
  { id: "increase-consideration", label: "Increase Consideration" },
  { id: "increase-sales", label: "Increase Sales" }
];

export const segments: SelectOption<SegmentId>[] = [
  { id: "gen-z-creators", label: "Gen Z Creators" },
  { id: "urban-climate-advocates", label: "Urban Climate Advocates" },
  { id: "cost-sensitive-smb-owners", label: "Cost-Sensitive SMB Owners" },
  { id: "retired-diyers", label: "Retired DIYers" },
  { id: "enterprise-it-leaders", label: "Enterprise IT Leaders" }
];

export const categories: SelectOption<CategoryId>[] = [
  { id: "marketing-okrs", label: "Marketing OKRs" },
  { id: "strengths", label: "Strengths" },
  { id: "weaknesses", label: "Weaknesses" },
  { id: "opportunities", label: "Opportunities" },
  { id: "threats", label: "Threats" },
  { id: "market-positioning", label: "Market Positioning" },
  { id: "buyer-persona", label: "Buyer Persona" },
  { id: "investment-opportunities", label: "Investment Opportunities" },
  { id: "channels-distribution", label: "Channels & Distribution" }
];

function toLabelMap<T extends ExplorerOptionId>(options: Array<SelectOption<T>>) {
  return Object.fromEntries(options.map((option) => [option.id, option.label])) as Record<T, string>;
}

export const productLabels = toLabelMap(products);
export const objectiveLabels = toLabelMap(objectives);
export const segmentLabels = toLabelMap(segments);
export const categoryLabels = toLabelMap(categories);
