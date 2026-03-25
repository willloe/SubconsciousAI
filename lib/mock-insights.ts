import { objectiveLabels, productLabels, segmentLabels } from "@/lib/config";
import type {
  ExplorerSelection,
  MockInsight,
  ObjectiveId,
  ProductId,
  SegmentId,
  SwotInsight
} from "@/lib/types";

type ProductProfile = {
  marketFrame: string;
  promise: string;
  proofPoints: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  investments: string[];
};

type ObjectiveProfile = {
  emphasis: string;
  primaryMetric: string;
  actionBias: string;
  risk: string;
};

type SegmentProfile = {
  archetype: string;
  mindset: string;
  motivations: string[];
  barriers: string[];
  triggers: string[];
  channels: string[];
  jobs: string[];
};

const productProfiles: Record<ProductId, ProductProfile> = {
  "electric-cars": {
    marketFrame: "high-consideration consumer mobility category",
    promise: "make lower-emission mobility feel practical, aspirational, and economically sensible",
    proofPoints: [
      "total cost of ownership narrative",
      "software-enabled ownership experience",
      "modern design and performance perception"
    ],
    strengths: [
      "High-visibility category with built-in cultural relevance",
      "Strong demo value through product experience and feature storytelling",
      "Clear sustainability and long-term savings narrative"
    ],
    weaknesses: [
      "Range and charging anxiety still create purchase hesitation",
      "Upfront pricing can limit relevance outside premium consideration sets",
      "Policy changes can quickly shift buyer sentiment"
    ],
    opportunities: [
      "Translate abstract climate benefits into daily ownership confidence",
      "Use calculators and test-drive experiences to reduce perceived risk",
      "Partner with charging, energy, and urban mobility ecosystems"
    ],
    threats: [
      "Aggressive competitive launch cycles and price compression",
      "Negative news around infrastructure reliability",
      "Skepticism from buyers who compare against hybrid alternatives"
    ],
    investments: [
      "ownership ROI tools",
      "creator-led test-drive programs",
      "charging reassurance partnerships"
    ]
  },
  coffee: {
    marketFrame: "habit-driven consumer packaged goods category",
    promise: "turn a routine purchase into a distinctive ritual with reliable quality and identity value",
    proofPoints: [
      "repeat purchase potential",
      "sensory brand storytelling",
      "merchandising and bundle flexibility"
    ],
    strengths: [
      "High-frequency usage supports repetition and memory building",
      "Brand story can travel through taste, ritual, and lifestyle cues",
      "Flexible price ladders allow premium and everyday positioning"
    ],
    weaknesses: [
      "Low switching costs make loyalty fragile",
      "Claims can blur together in a crowded shelf and DTC environment",
      "Quality perception can drop quickly if fulfillment or freshness slips"
    ],
    opportunities: [
      "Build stronger ritual ownership through routines and pairings",
      "Use sampling and subscriptions to accelerate habit formation",
      "Differentiate with origin, craft, and functional benefit narratives"
    ],
    threats: [
      "Commodity pricing and margin pressure",
      "Retail shelf competition and promotional clutter",
      "Consumer trade-down behavior during cost pressure"
    ],
    investments: [
      "subscription retention journeys",
      "sampling and referral loops",
      "retail storytelling assets"
    ]
  },
  "project-management-software": {
    marketFrame: "multi-stakeholder B2B software category",
    promise: "help teams align work, visibility, and execution without adding operational friction",
    proofPoints: [
      "cross-functional workflow visibility",
      "clear ROI from coordination efficiency",
      "expandability across teams and use cases"
    ],
    strengths: [
      "Strong land-and-expand potential inside organizations",
      "Clear value story around coordination, accountability, and visibility",
      "Multiple personas can advocate once adoption proves useful"
    ],
    weaknesses: [
      "Crowded market with similar feature claims",
      "Implementation and change management can slow deals",
      "Procurement and security reviews extend evaluation cycles"
    ],
    opportunities: [
      "Differentiate with clearer workflow outcomes instead of generic productivity language",
      "Package proof for both practitioner and executive buyers",
      "Win through templates, migration support, and adoption enablement"
    ],
    threats: [
      "Incumbent platforms bundling adjacent capabilities",
      "Tool fatigue among teams already using multiple systems",
      "Longer budget scrutiny for non-mission-critical software"
    ],
    investments: [
      "ROI calculators for leadership buyers",
      "migration and onboarding offers",
      "verticalized use-case packs"
    ]
  }
};

const objectiveProfiles: Record<ObjectiveId, ObjectiveProfile> = {
  "increase-awareness": {
    emphasis: "maximize qualified reach and category memory",
    primaryMetric: "share of qualified audience reached",
    actionBias: "top-of-funnel education and distinctiveness",
    risk: "creating attention without enough message retention"
  },
  "increase-consideration": {
    emphasis: "convert passive familiarity into active evaluation",
    primaryMetric: "lift in solution shortlist intent",
    actionBias: "proof, comparison, and buyer confidence",
    risk: "adding information without reducing uncertainty"
  },
  "increase-sales": {
    emphasis: "move high-intent buyers into conversion",
    primaryMetric: "pipeline or purchase conversion rate",
    actionBias: "clear offer framing and friction removal",
    risk: "pushing too hard before the buyer sees enough proof"
  }
};

const segmentProfiles: Record<SegmentId, SegmentProfile> = {
  "gen-z-creators": {
    archetype: "Trend-sensitive maker",
    mindset: "Looks for products that signal taste, momentum, and personal leverage.",
    motivations: ["identity expression", "social proof", "tools that generate shareable moments"],
    barriers: ["skepticism toward polished claims", "low patience for generic messaging"],
    triggers: ["creator validation", "clear distinctiveness", "formats that feel current"],
    channels: ["TikTok", "YouTube", "Instagram"],
    jobs: ["stand out to an audience", "move fast without looking outdated"]
  },
  "urban-climate-advocates": {
    archetype: "Values-led modernizer",
    mindset: "Wants practical choices that align with environmental values and public credibility.",
    motivations: ["sustainability credibility", "community impact", "low-friction adoption"],
    barriers: ["greenwashing concerns", "mistrust of convenience trade-offs"],
    triggers: ["evidence-based impact", "credible partnerships", "city-friendly utility"],
    channels: ["podcasts", "community newsletters", "LinkedIn"],
    jobs: ["act consistently with values", "justify choices with evidence"]
  },
  "cost-sensitive-smb-owners": {
    archetype: "Pragmatic operator",
    mindset: "Buys when value is concrete, risk is low, and implementation is manageable.",
    motivations: ["efficiency", "cash flow discipline", "simple operating gains"],
    barriers: ["budget pressure", "fear of wasted spend", "complex onboarding"],
    triggers: ["fast payback", "practical demos", "clear cost savings"],
    channels: ["search", "YouTube", "industry forums"],
    jobs: ["protect margin", "save time across a small team"]
  },
  "retired-diyers": {
    archetype: "Independent optimizer",
    mindset: "Responds to reliability, usefulness, and confidence that the decision will hold up over time.",
    motivations: ["self-sufficiency", "quality", "peace of mind"],
    barriers: ["technology friction", "confusing options", "low trust in hype"],
    triggers: ["hands-on proof", "clarity", "reassurance around support"],
    channels: ["YouTube", "email", "specialty publications"],
    jobs: ["make smart long-term purchases", "avoid avoidable hassle"]
  },
  "enterprise-it-leaders": {
    archetype: "Risk-conscious systems steward",
    mindset: "Prioritizes control, integration, security, and stakeholder alignment before scale decisions.",
    motivations: ["governance", "operational visibility", "vendor reliability"],
    barriers: ["integration risk", "security review complexity", "change management burden"],
    triggers: ["technical proof", "peer references", "clear rollout control"],
    channels: ["LinkedIn", "analyst content", "peer communities"],
    jobs: ["reduce operational complexity", "back decisions with defensible proof"]
  }
};

export function getMockInsight(selection: ExplorerSelection): MockInsight {
  switch (selection.categoryId) {
    case "marketing-okrs":
      return {
        categoryId: "marketing-okrs",
        overview: `For ${segmentLabels[selection.segmentId]}, the plan should ${objectiveProfiles[selection.objectiveId].emphasis} while positioning ${productLabels[selection.productId]} as a solution that can ${productProfiles[selection.productId].promise}.`,
        okrs: [
          {
            objective: `Increase qualified engagement from ${segmentLabels[selection.segmentId]}`,
            target: `Lift ${objectiveProfiles[selection.objectiveId].primaryMetric} by 15-20% within one planning cycle.`,
            signal: `Measure response to messages built around ${segmentProfiles[selection.segmentId].motivations[0]} and ${segmentProfiles[selection.segmentId].motivations[1]}.`
          },
          {
            objective: `Strengthen credibility during ${objectiveLabels[selection.objectiveId].toLowerCase()}`,
            target: `Improve engagement with proof-led assets tied to ${productProfiles[selection.productId].proofPoints[0]}.`,
            signal: `Use content that turns ${segmentProfiles[selection.segmentId].barriers[0]} into a confidence-building moment.`
          },
          {
            objective: "Create repeatable conversion paths",
            target: `Establish two to three reusable journeys tailored to ${segmentProfiles[selection.segmentId].channels.join(" / ")}.`,
            signal: `Tie every journey to ${objectiveProfiles[selection.objectiveId].actionBias} rather than broad awareness alone.`
          }
        ],
        watchouts: [
          `Avoid over-indexing on messaging that sounds generic in a ${productProfiles[selection.productId].marketFrame}.`,
          `Watch for ${objectiveProfiles[selection.objectiveId].risk} when assets prioritize polish over clarity.`,
          `Keep segmentation tight so creative does not dilute around ${segmentProfiles[selection.segmentId].archetype.toLowerCase()} needs.`
        ]
      };
    case "strengths":
    case "weaknesses":
    case "opportunities":
    case "threats":
      return createSwotInsight(selection);
    case "market-positioning":
      return {
        categoryId: "market-positioning",
        overview: `The positioning should make ${productLabels[selection.productId]} feel like the most credible way for ${segmentLabels[selection.segmentId]} to achieve a desired outcome without unnecessary complexity.`,
        positioningStatement: `${productLabels[selection.productId]} is the choice for ${segmentLabels[selection.segmentId]} who want to ${segmentProfiles[selection.segmentId].jobs[0]} because it helps them ${productProfiles[selection.productId].promise} with stronger emphasis on ${objectiveProfiles[selection.objectiveId].actionBias}.`,
        differentiators: [
          `Lead with ${productProfiles[selection.productId].proofPoints[0]} instead of generic category superiority claims.`,
          `Translate the offer into the segment's language around ${segmentProfiles[selection.segmentId].motivations[0]} and ${segmentProfiles[selection.segmentId].motivations[1]}.`,
          "Use proof that makes the plan feel dependable under real-world evaluation."
        ],
        whitespace: [
          `Own the intersection of ${segmentProfiles[selection.segmentId].triggers[0]} and practical decision confidence.`,
          `Show how the product supports ${segmentProfiles[selection.segmentId].jobs[1]} without introducing extra friction.`,
          "Make the value story feel operational, not aspirational-only."
        ],
        proofPoints: [
          productProfiles[selection.productId].proofPoints[0],
          productProfiles[selection.productId].proofPoints[1],
          `${objectiveProfiles[selection.objectiveId].primaryMetric} improvement signal that matters to the current objective`
        ]
      };
    case "buyer-persona":
      return {
        categoryId: "buyer-persona",
        overview: `This persona snapshot captures how ${segmentLabels[selection.segmentId]} is likely to evaluate ${productLabels[selection.productId]} in a planning context.`,
        archetype: segmentProfiles[selection.segmentId].archetype,
        mindset: segmentProfiles[selection.segmentId].mindset,
        jobsToBeDone: [
          `Use ${productLabels[selection.productId]} to ${segmentProfiles[selection.segmentId].jobs[0]}.`,
          `Make a choice that supports ${segmentProfiles[selection.segmentId].jobs[1]} over time.`,
          "Reduce the feeling of risk before fully committing."
        ],
        triggers: [
          `Clear proof related to ${productProfiles[selection.productId].proofPoints[0]}.`,
          `Messaging that respects ${segmentProfiles[selection.segmentId].motivations[0]} rather than flattening it into a generic benefit.`,
          "Real examples that show the offer working in context."
        ],
        objections: [
          `Concern that the promise will not hold up against ${segmentProfiles[selection.segmentId].barriers[0]}.`,
          "Fear that adoption will create more hassle than value.",
          "Skepticism toward claims that feel too broad or overly polished."
        ],
        preferredChannels: segmentProfiles[selection.segmentId].channels
      };
    case "investment-opportunities":
      return {
        categoryId: "investment-opportunities",
        overview: `This segment is attractive when the business needs a focused audience with credible demand signals, measurable upside, and a story that supports ${objectiveProfiles[selection.objectiveId].actionBias}.`,
        strategicValue: `The segment already cares about ${segmentProfiles[selection.segmentId].motivations[0]} and ${segmentProfiles[selection.segmentId].motivations[1]}, giving ${productLabels[selection.productId]} a sharper strategic wedge than a broad-market approach.`,
        growthPotential: `There is room to expand by translating ${productProfiles[selection.productId].proofPoints[0]} into a clearer segment-specific value story that compounds awareness and consideration over time.`,
        monetizationLeverage: `If the offer earns trust with this audience, it can convert through stronger repeat usage, higher-value packages, or broader account expansion tied to ${productProfiles[selection.productId].promise}.`,
        strategicFit: `The segment is a strong fit because its needs map well to ${productProfiles[selection.productId].proofPoints[1]} and to the current objective of ${objectiveLabels[selection.objectiveId].toLowerCase()}.`,
        whyNow: [
          `The category is still open enough to claim relevance before competitors fully own the ${segmentProfiles[selection.segmentId].triggers[0]} narrative.`,
          `This audience offers a practical route to momentum because it is already active in channels like ${segmentProfiles[selection.segmentId].channels[0]} and ${segmentProfiles[selection.segmentId].channels[1]}.`,
          `Prioritizing now helps the team build proof and message discipline before broadening into lower-fit segments.`
        ]
      };
    case "channels-distribution":
      return {
        categoryId: "channels-distribution",
        overview: `Channel strategy should meet ${segmentLabels[selection.segmentId]} where they already evaluate options, while tailoring the role of each channel to a specific stage in the decision journey.`,
        channelPlays: [
          {
            channel: segmentProfiles[selection.segmentId].channels[0],
            role: "Primary discovery",
            tactic: `Lead with a concise story around ${productProfiles[selection.productId].proofPoints[0]} and why it matters in practice.`
          },
          {
            channel: segmentProfiles[selection.segmentId].channels[1],
            role: "Confidence building",
            tactic: `Use side-by-side proof and practical examples that address ${segmentProfiles[selection.segmentId].barriers[0]}.`
          },
          {
            channel: segmentProfiles[selection.segmentId].channels[2],
            role: "Conversion support",
            tactic: `Retarget with sharper calls to action built around ${segmentProfiles[selection.segmentId].triggers[1]} and clear next steps.`
          }
        ],
        partnerships: [
          `Identify credible partners who already influence ${segmentLabels[selection.segmentId]}.`,
          `Package co-marketing themes around ${productProfiles[selection.productId].opportunities[2].toLowerCase()}.`
        ],
        risks: [
          "Channel mix will underperform if the same message is copied into every format.",
          "Distribution should not outpace the team's ability to support follow-up questions with proof."
        ]
      };
  }
}

function createSwotInsight(selection: ExplorerSelection): SwotInsight {
  const product = productProfiles[selection.productId];
  const objective = objectiveProfiles[selection.objectiveId];
  const segment = segmentProfiles[selection.segmentId];
  const category = selection.categoryId as SwotInsight["categoryId"];

  const swotTemplates: Record<SwotInsight["categoryId"], SwotInsight> = {
    strengths: {
      categoryId: "strengths",
      overview: `${productLabels[selection.productId]} can earn attention with ${segmentLabels[selection.segmentId]} because the offer naturally supports ${segment.motivations[0]} and ${objective.actionBias}.`,
      groups: [
        {
          title: "Category leverage",
          items: [product.strengths[0], `The story aligns well with ${segment.motivations[0]} and ${segment.motivations[1]}.`]
        },
        {
          title: "Message resonance",
          items: [
            `Proof around ${product.proofPoints[0]} supports ${objectiveLabels[selection.objectiveId].toLowerCase()}.`,
            `The segment already values ${segment.triggers[0]}, which makes the narrative easier to land.`
          ]
        },
        {
          title: "Execution advantage",
          items: [product.strengths[2], `Creative can map directly to ${segment.channels[0]} and ${segment.channels[1]} consumption habits.`]
        }
      ],
      recommendation: `Lead with the strongest proof point early and translate it into the language ${segmentLabels[selection.segmentId]} already uses when evaluating options.`
    },
    weaknesses: {
      categoryId: "weaknesses",
      overview: `The main risk is not lack of value, but friction between the story being told and the reassurance ${segmentLabels[selection.segmentId]} needs before acting.`,
      groups: [
        {
          title: "Adoption friction",
          items: [product.weaknesses[0], `This matters more when buyers are sensitive to ${segment.barriers[0]}.`]
        },
        {
          title: "Message gaps",
          items: [product.weaknesses[1], `The current story may underserve the segment's need for ${segment.triggers[1]}.`]
        },
        {
          title: "Commercial drag",
          items: [
            `The route to ${objective.primaryMetric} could slow if the buyer still needs more practical proof.`,
            `Complexity may reduce response quality in channels like ${segment.channels[0]}.`
          ]
        }
      ],
      recommendation: "Simplify the first message, then add proof that directly resolves the highest-friction buyer objection before asking for a deeper commitment."
    },
    opportunities: {
      categoryId: "opportunities",
      overview: `There is room to build a more differentiated plan by combining ${product.proofPoints[0]} with a segment-specific route to confidence.`,
      groups: [
        {
          title: "Message whitespace",
          items: [product.opportunities[0], `Most competitors underplay how the offer helps with ${segment.jobs[0]}.`]
        },
        {
          title: "Go-to-market bets",
          items: [
            `Build assets designed specifically for ${segment.channels[0]} and ${segment.channels[1]}.`,
            `Frame the value around ${objective.actionBias} instead of broad category language.`
          ]
        },
        {
          title: "Partnership potential",
          items: [product.opportunities[2], `Pair the offer with voices trusted by ${segment.archetype.toLowerCase()} audiences.`]
        }
      ],
      recommendation: "Prioritize one wedge narrative that feels uniquely relevant to this segment rather than trying to cover every benefit at once."
    },
    threats: {
      categoryId: "threats",
      overview: "The competitive threat is less about raw awareness and more about other options feeling easier, cheaper, or more familiar at the moment of decision.",
      groups: [
        {
          title: "Competitive pressure",
          items: [product.threats[0], `Adjacent alternatives may feel safer to buyers with ${segment.barriers[0]}.`]
        },
        {
          title: "Buyer resistance",
          items: [product.threats[2], `The segment may dismiss claims that do not visibly address ${segment.jobs[1]}.`]
        },
        {
          title: "Execution risk",
          items: [
            `The plan could miss ${objective.primaryMetric} if the journey asks for too much too quickly.`,
            `Overly polished creative may reduce trust with ${segmentLabels[selection.segmentId]}.`
          ]
        }
      ],
      recommendation: "Counter threats with sharper comparison proof and a simpler path from first exposure to confident next step."
    }
  };

  return swotTemplates[category];
}
