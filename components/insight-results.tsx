import { categoryLabels, objectiveLabels, productLabels, segmentLabels } from "@/lib/config";
import type { ExplorerSelection, MockInsight } from "@/lib/types";
import { cn } from "@/lib/utils";

type InsightResultsProps = {
  selection: ExplorerSelection;
  insight: MockInsight;
};

export function InsightResults({ selection, insight }: InsightResultsProps) {
  return (
    <div className="space-y-4">
      <SurfaceCard className="bg-slate-50/80">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {categoryLabels[selection.categoryId]}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {productLabels[selection.productId]} x {segmentLabels[selection.segmentId]}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{insight.overview}</p>
          {insight.categoryId === "marketing-okrs" ? (
            <p className="mt-3 text-sm text-slate-500">
              Structured for {objectiveLabels[selection.objectiveId].toLowerCase()} planning.
            </p>
          ) : null}
        </div>
      </SurfaceCard>

      {renderCategory(selection, insight)}
    </div>
  );
}

function renderCategory(selection: ExplorerSelection, insight: MockInsight) {
  switch (insight.categoryId) {
    case "marketing-okrs":
      return (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
          <div className="grid gap-4 md:grid-cols-3">
            {insight.okrs.map((okr) => (
              <SurfaceCard key={okr.objective}>
                <SectionEyebrow>OKR</SectionEyebrow>
                <h4 className="mt-2 text-base font-semibold text-slate-950">{okr.objective}</h4>
                <p className="mt-3 text-sm font-medium text-slate-800">{okr.target}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{okr.signal}</p>
              </SurfaceCard>
            ))}
          </div>

          <SurfaceCard>
            <SectionEyebrow>Planning Notes</SectionEyebrow>
            <h4 className="mt-2 text-base font-semibold text-slate-950">
              What to watch while pursuing {objectiveLabels[selection.objectiveId].toLowerCase()}
            </h4>
            <BulletList items={insight.watchouts} className="mt-4" />
          </SurfaceCard>
        </div>
      );
    case "strengths":
    case "weaknesses":
    case "opportunities":
    case "threats":
      return (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {insight.groups.map((group) => (
              <SurfaceCard key={group.title}>
                <SectionEyebrow>{group.title}</SectionEyebrow>
                <BulletList items={group.items} className="mt-4" />
              </SurfaceCard>
            ))}
          </div>
          <SurfaceCard className="bg-slate-50">
            <SectionEyebrow>Recommended Move</SectionEyebrow>
            <p className="mt-2 text-sm leading-6 text-slate-800">{insight.recommendation}</p>
          </SurfaceCard>
        </div>
      );
    case "market-positioning":
      return (
        <div className="space-y-4">
          <SurfaceCard className="bg-slate-50">
            <SectionEyebrow>Positioning Statement</SectionEyebrow>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-900">{insight.positioningStatement}</p>
          </SurfaceCard>
          <div className="grid gap-4 xl:grid-cols-3">
            <SurfaceCard>
              <SectionEyebrow>Differentiators</SectionEyebrow>
              <BulletList items={insight.differentiators} className="mt-4" />
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Whitespace</SectionEyebrow>
              <BulletList items={insight.whitespace} className="mt-4" />
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Proof Points</SectionEyebrow>
              <BulletList items={insight.proofPoints} className="mt-4" />
            </SurfaceCard>
          </div>
        </div>
      );
    case "buyer-persona":
      return (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <SurfaceCard>
            <SectionEyebrow>Persona Snapshot</SectionEyebrow>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <FieldBlock label="Archetype" value={insight.archetype} />
              <FieldBlock label="Mindset" value={insight.mindset} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FieldList label="Jobs To Be Done" items={insight.jobsToBeDone} />
              <FieldList label="Decision Triggers" items={insight.triggers} />
            </div>
          </SurfaceCard>
          <SurfaceCard>
            <FieldList label="Primary Objections" items={insight.objections} />
            <FieldList label="Preferred Channels" items={insight.preferredChannels} className="mt-5" />
          </SurfaceCard>
        </div>
      );
    case "investment-opportunities":
      return (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SurfaceCard>
              <SectionEyebrow>Strategic Value</SectionEyebrow>
              <p className="mt-3 text-sm leading-6 text-slate-600">{insight.strategicValue}</p>
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Growth Potential</SectionEyebrow>
              <p className="mt-3 text-sm leading-6 text-slate-600">{insight.growthPotential}</p>
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Monetization Leverage</SectionEyebrow>
              <p className="mt-3 text-sm leading-6 text-slate-600">{insight.monetizationLeverage}</p>
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Strategic Fit</SectionEyebrow>
              <p className="mt-3 text-sm leading-6 text-slate-600">{insight.strategicFit}</p>
            </SurfaceCard>
          </div>

          <SurfaceCard>
            <SectionEyebrow>Why Prioritize Now</SectionEyebrow>
            <BulletList items={insight.whyNow} className="mt-4" />
          </SurfaceCard>
        </div>
      );
    case "channels-distribution":
      return (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {insight.channelPlays.map((play) => (
              <SurfaceCard key={play.channel}>
                <SectionEyebrow>{play.role}</SectionEyebrow>
                <h4 className="mt-2 text-base font-semibold text-slate-950">{play.channel}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-600">{play.tactic}</p>
              </SurfaceCard>
            ))}
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <SurfaceCard>
              <SectionEyebrow>Partnership Opportunities</SectionEyebrow>
              <BulletList items={insight.partnerships} className="mt-4" />
            </SurfaceCard>
            <SurfaceCard>
              <SectionEyebrow>Distribution Risks</SectionEyebrow>
              <BulletList items={insight.risks} className="mt-4" />
            </SurfaceCard>
          </div>
        </div>
      );
  }
}

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

function SurfaceCard({ children, className }: SurfaceCardProps) {
  return <section className={cn("rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</section>;
}

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <div className={cn("text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500", className)}>
      {children}
    </div>
  );
}

type BulletListProps = {
  items: string[];
  className?: string;
};

function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type FieldBlockProps = {
  label: string;
  value: string;
};

function FieldBlock({ label, value }: FieldBlockProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3">
      <SectionEyebrow>{label}</SectionEyebrow>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

type FieldListProps = {
  label: string;
  items: string[];
  className?: string;
};

function FieldList({ label, items, className }: FieldListProps) {
  return (
    <div className={className}>
      <SectionEyebrow>{label}</SectionEyebrow>
      <BulletList items={items} className="mt-4" />
    </div>
  );
}
