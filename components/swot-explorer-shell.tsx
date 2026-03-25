"use client";

import { Compass, PanelLeft, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { InsightResults } from "@/components/insight-results";
import { Button } from "@/components/ui/button";
import { PanelSelect } from "@/components/ui/panel-select";
import { categories, objectiveLabels, objectives, productLabels, products, segmentLabels, segments } from "@/lib/config";
import type {
  CategoryId,
  ExplorerSelection,
  InsightGenerationErrorResponse,
  InsightGenerationResponse,
  InsightPack,
  InsightRequestSelection,
  ObjectiveId,
  ProductId,
  SegmentId
} from "@/lib/types";
import { cn } from "@/lib/utils";

export function SwotExplorerShell() {
  const [selectedProduct, setSelectedProduct] = useState<ProductId>(products[0].id);
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveId>(objectives[0].id);
  const [selectedSegment, setSelectedSegment] = useState<SegmentId>(segments[0].id);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(categories[0].id);
  const [generatedSelection, setGeneratedSelection] = useState<InsightRequestSelection | null>(null);
  const [generatedInsights, setGeneratedInsights] = useState<InsightPack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestSelection: InsightRequestSelection = {
    productId: selectedProduct,
    objectiveId: selectedObjective,
    segmentId: selectedSegment
  };

  const hasSelectionChanges = useMemo(() => {
    if (!generatedSelection) {
      return false;
    }

    return JSON.stringify(generatedSelection) !== JSON.stringify(requestSelection);
  }, [generatedSelection, requestSelection]);

  const activeInsight = generatedInsights?.[selectedCategory] ?? null;
  const displayedSelection: ExplorerSelection | null = generatedSelection
    ? {
        ...generatedSelection,
        categoryId: selectedCategory
      }
    : null;

  async function handleGenerateInsights() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestSelection)
      });

      const payload = await readInsightResponse(response);

      if (!response.ok) {
        const errorPayload = payload as InsightGenerationErrorResponse | null;
        throw new Error(getUserFacingErrorMessage(errorPayload));
      }

      const successPayload = payload as InsightGenerationResponse | null;

      if (!successPayload?.insights || !successPayload.selection) {
        throw new Error("We couldn’t load the insight pack.");
      }

      setGeneratedInsights(successPayload.insights);
      setGeneratedSelection(successPayload.selection);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We couldn’t generate insights right now.");
    } finally {
      setIsLoading(false);
    }
  }

  async function readInsightResponse(response: Response) {
    try {
      return (await response.json()) as InsightGenerationResponse | InsightGenerationErrorResponse;
    } catch {
      return null;
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white lg:w-[272px] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col px-4 py-5 lg:px-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <PanelLeft className="size-4 text-slate-400" />
              <span>Market Segments</span>
            </div>

            <div className="space-y-1.5">
              {segments.map((segment) => {
                const isActive = segment.id === selectedSegment;

                return (
                  <button
                    key={segment.id}
                    type="button"
                    onClick={() => setSelectedSegment(segment.id)}
                    className={cn(
                      "flex w-full items-center rounded-xl border px-3.5 py-2.5 text-left transition",
                      isActive
                        ? "border-slate-300 bg-slate-100 text-slate-950 shadow-sm"
                        : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span
                      className={cn(
                        "mr-3 h-2 w-2 rounded-full transition",
                        isActive ? "bg-slate-900" : "bg-slate-200"
                      )}
                    />
                    <span className="text-sm font-medium leading-5">{segment.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="flex min-h-[700px] flex-1 p-5 lg:p-6">
          <div className="flex w-full flex-col rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-6 lg:px-7">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-2xl">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Compass className="size-6" />
                  </div>
                  <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-slate-950">Strategy Explorer</h1>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    Generate one structured insight pack for the selected product, business objective, and market
                    segment, then use the category tabs to review each section.
                  </p>
                </div>

                <div className="w-full max-w-3xl space-y-4">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_minmax(220px,1fr)_auto]">
                    <PanelSelect
                      label="Product"
                      options={products}
                      value={selectedProduct}
                      onChange={setSelectedProduct}
                    />
                    <PanelSelect
                      label="Business Objective"
                      options={objectives}
                      value={selectedObjective}
                      onChange={setSelectedObjective}
                    />
                    <Button
                      size="lg"
                      className="w-full rounded-lg self-end xl:w-auto"
                      onClick={handleGenerateInsights}
                      disabled={isLoading}
                    >
                      <Sparkles className="mr-2 size-4" />
                      {isLoading ? "Generating..." : "Generate insights"}
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Current selection
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      <SummaryTile label="Product" value={productLabels[selectedProduct]} />
                      <SummaryTile label="Objective" value={objectiveLabels[selectedObjective]} />
                      <SummaryTile label="Segment" value={segmentLabels[selectedSegment]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
              <div className="scrollbar-none flex gap-2 overflow-x-auto">
                {categories.map((category) => {
                  const isActive = category.id === selectedCategory;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                        isActive
                          ? "border-slate-300 bg-slate-100 text-slate-950 shadow-sm"
                          : "border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 p-6 lg:p-7">
              <div className="space-y-4">
                {errorMessage ? (
                  <WorkspaceBanner
                    tone="error"
                    message={errorMessage}
                    helperText="Your previous results will stay in place."
                  />
                ) : null}

                {isLoading ? (
                  <WorkspaceBanner
                    tone="loading"
                    message={
                      generatedInsights
                        ? "Refreshing the full insight pack for the latest selection."
                        : "Generating the full insight pack."
                    }
                  />
                ) : null}

                {!isLoading && !errorMessage && generatedInsights && hasSelectionChanges ? (
                  <WorkspaceBanner
                    tone="neutral"
                    message="Selections changed. Generate insights again to refresh all categories."
                  />
                ) : null}

                {activeInsight && displayedSelection ? (
                  <InsightResults selection={displayedSelection} insight={activeInsight} />
                ) : (
                  <EmptyWorkspace />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type SummaryTileProps = {
  label: string;
  value: string;
};

function SummaryTile({ label, value }: SummaryTileProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1.5 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

type WorkspaceBannerProps = {
  tone: "loading" | "error" | "neutral";
  message: string;
  helperText?: string;
};

function WorkspaceBanner({ tone, message, helperText }: WorkspaceBannerProps) {
  const toneClasses = {
    loading: "border-blue-200 bg-blue-50 text-blue-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
    neutral: "border-slate-200 bg-slate-50 text-slate-700"
  } as const;

  return (
    <div className={cn("rounded-xl border px-4 py-3", toneClasses[tone])}>
      <div className="text-sm font-medium">{message}</div>
      {helperText ? <div className="mt-1 text-xs opacity-80">{helperText}</div> : null}
    </div>
  );
}

function getUserFacingErrorMessage(errorPayload: InsightGenerationErrorResponse | null) {
  switch (errorPayload?.error.code) {
    case "MISSING_API_KEY":
      return "Insight generation isn’t available in this environment yet.";
    case "INVALID_REQUEST":
      return "We couldn’t generate insights from that selection.";
    case "GENERATION_FAILED":
      return "We couldn’t generate insights right now. Please try again in a moment.";
    default:
      return "We couldn’t generate insights right now. Please try again.";
  }
}

function EmptyWorkspace() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)]">
      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Ready to Generate</div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          Generate a complete strategy pack
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Use the workspace controls to generate all nine strategy categories at once. After the pack is ready, the
          tabs above let you browse each section without triggering another request.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Included Categories</div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <li>Marketing OKRs, SWOT, and market positioning</li>
          <li>Buyer persona, investment opportunities, and channels</li>
          <li>One request, one result set, browsed through the category tabs</li>
        </ul>
      </section>
    </div>
  );
}
