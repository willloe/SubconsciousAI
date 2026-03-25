"use client";

import { BarChart3, Compass, PanelLeft, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PanelSelect } from "@/components/ui/panel-select";
import { cn } from "@/lib/utils";

const PRODUCTS = ["Electric Cars", "Coffee", "Project Management Software"];

const OBJECTIVES = ["Increase Awareness", "Increase Consideration", "Increase Sales"];

const SEGMENTS = [
  "Gen Z Creators",
  "Urban Climate Advocates",
  "Cost-Sensitive SMB Owners",
  "Retired DIYers",
  "Enterprise IT Leaders"
];

const CATEGORIES = [
  "Marketing OKRs",
  "Strengths",
  "Weaknesses",
  "Opportunities",
  "Threats",
  "Market Positioning",
  "Buyer Persona",
  "Investment Opportunities",
  "Channels & Distribution"
];

export function SwotExplorerShell() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedObjective, setSelectedObjective] = useState(OBJECTIVES[0]);
  const [selectedSegment, setSelectedSegment] = useState(SEGMENTS[0]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-col gap-4 px-6 py-4 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <BarChart3 className="size-4" />
                  <span>Decision Support Workspace</span>
                </div>
                <div>
                  <h1 className="text-[26px] font-semibold tracking-tight text-slate-950">SWOT Prompt Explorer</h1>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    Explore strategic prompt categories across products, objectives, and target market segments.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:flex xl:flex-wrap xl:items-end">
                <PanelSelect
                  label="Product"
                  options={PRODUCTS}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                />
                <PanelSelect
                  label="Business Objective"
                  options={OBJECTIVES}
                  value={selectedObjective}
                  onChange={setSelectedObjective}
                />
                <Button size="lg" className="w-full rounded-lg xl:w-auto">
                  <Sparkles className="mr-2 size-4" />
                  Generate insights
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="border-b border-slate-200 bg-white lg:w-[272px] lg:border-b-0 lg:border-r">
            <div className="flex h-full flex-col px-4 py-4 lg:px-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <PanelLeft className="size-4 text-slate-400" />
                <span>Market Segments</span>
              </div>

              <div className="space-y-1.5">
                {SEGMENTS.map((segment) => {
                  const isActive = segment === selectedSegment;

                  return (
                    <button
                      key={segment}
                      type="button"
                      onClick={() => setSelectedSegment(segment)}
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
                      <span className="text-sm font-medium leading-5">{segment}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className="flex min-h-[600px] flex-1 flex-col">
            <div className="border-b border-slate-200 bg-white">
              <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-3 lg:px-6">
                {CATEGORIES.map((category) => {
                  const isActive = category === selectedCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                        isActive
                          ? "border-slate-300 bg-slate-100 text-slate-950 shadow-sm"
                          : "border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-1 p-5 lg:p-6">
              <div className="flex w-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Compass className="size-6" />
                    </div>
                    <h2 className="mt-5 text-[28px] font-semibold tracking-tight text-slate-950">
                      Results workspace is ready
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                      Select the planning inputs you want to explore, then generate insights to populate this workspace
                      with category-specific output.
                    </p>
                  </div>

                  <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Current selection
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      <SummaryTile label="Product" value={selectedProduct} />
                      <SummaryTile label="Objective" value={selectedObjective} />
                      <SummaryTile label="Segment" value={selectedSegment} />
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Category
                      </div>
                      <div className="mt-1.5 text-sm font-semibold text-slate-900">{selectedCategory}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)]">
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Insight output
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-700">Generated analysis will render here</div>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                        Awaiting run
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <SkeletonBlock className="h-4 w-40" />
                      <SkeletonBlock className="h-16 w-full" />
                      <SkeletonBlock className="h-4 w-28" />
                      <div className="grid gap-3 md:grid-cols-2">
                        <SkeletonBlock className="h-24 w-full" />
                        <SkeletonBlock className="h-24 w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Workspace notes
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      This panel is intentionally prepared for structured outputs such as strengths, risks, audience
                      themes, and channel recommendations once generation is connected.
                    </div>

                    <div className="mt-5 space-y-3">
                      <PlaceholderRow label="Prompt status" value="Not generated yet" />
                      <PlaceholderRow label="Source segment" value={selectedSegment} />
                      <PlaceholderRow label="Focus area" value={selectedCategory} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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

type SkeletonBlockProps = {
  className?: string;
};

function SkeletonBlock({ className }: SkeletonBlockProps) {
  return <div className={cn("rounded-xl bg-slate-200/80", className)} />;
}

type PlaceholderRowProps = {
  label: string;
  value: string;
};

function PlaceholderRow({ label, value }: PlaceholderRowProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1.5 text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}
