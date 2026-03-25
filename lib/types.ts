export type ProductId = "electric-cars" | "coffee" | "project-management-software";

export type ObjectiveId = "increase-awareness" | "increase-consideration" | "increase-sales";

export type SegmentId =
  | "gen-z-creators"
  | "urban-climate-advocates"
  | "cost-sensitive-smb-owners"
  | "retired-diyers"
  | "enterprise-it-leaders";

export type CategoryId =
  | "marketing-okrs"
  | "strengths"
  | "weaknesses"
  | "opportunities"
  | "threats"
  | "market-positioning"
  | "buyer-persona"
  | "investment-opportunities"
  | "channels-distribution";

export type ExplorerOptionId = ProductId | ObjectiveId | SegmentId | CategoryId;

export type SelectOption<T extends ExplorerOptionId> = {
  id: T;
  label: string;
};

export type ExplorerSelection = {
  productId: ProductId;
  objectiveId: ObjectiveId;
  segmentId: SegmentId;
  categoryId: CategoryId;
};

export type MarketingOkr = {
  objective: string;
  target: string;
  signal: string;
};

export type MarketingOkrsInsight = {
  categoryId: "marketing-okrs";
  overview: string;
  okrs: MarketingOkr[];
  watchouts: string[];
};

export type SwotInsight = {
  categoryId: "strengths" | "weaknesses" | "opportunities" | "threats";
  overview: string;
  groups: Array<{
    title: string;
    items: string[];
  }>;
  recommendation: string;
};

export type MarketPositioningInsight = {
  categoryId: "market-positioning";
  overview: string;
  positioningStatement: string;
  differentiators: string[];
  whitespace: string[];
  proofPoints: string[];
};

export type BuyerPersonaInsight = {
  categoryId: "buyer-persona";
  overview: string;
  archetype: string;
  mindset: string;
  jobsToBeDone: string[];
  triggers: string[];
  objections: string[];
  preferredChannels: string[];
};

export type InvestmentOpportunitiesInsight = {
  categoryId: "investment-opportunities";
  overview: string;
  priorities: Array<{
    title: string;
    rationale: string;
    horizon: string;
  }>;
  guardrails: string[];
};

export type ChannelsDistributionInsight = {
  categoryId: "channels-distribution";
  overview: string;
  channelPlays: Array<{
    channel: string;
    role: string;
    tactic: string;
  }>;
  partnerships: string[];
  risks: string[];
};

export type MockInsight =
  | MarketingOkrsInsight
  | SwotInsight
  | MarketPositioningInsight
  | BuyerPersonaInsight
  | InvestmentOpportunitiesInsight
  | ChannelsDistributionInsight;

export type InsightGenerationRequest = ExplorerSelection;

export type InsightGenerationResponse = {
  insight: MockInsight;
  selection: ExplorerSelection;
};

export type InsightGenerationErrorResponse = {
  error: {
    code: "INVALID_REQUEST" | "MISSING_API_KEY" | "GENERATION_FAILED";
    message: string;
  };
};
