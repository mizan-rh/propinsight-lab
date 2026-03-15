"use client";

import RegionCard from "@/components/dashboard/RegionCard";
import PageShell from "@/components/layout/PageShell";
import { getAllRegions, getRegionAnalysis } from "@/lib/services/regionService";
import type { Region, RegionAnalysis } from "@/lib/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const RegionMap = dynamic(
  () => import("@/components/dashboard/RegionMap"),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

export default function HomePage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [analyses, setAnalyses] = useState<Record<string, RegionAnalysis>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const regionList = await getAllRegions();
      setRegions(regionList);

      const analysisEntries = await Promise.all(
        regionList.map(async (r) => {
          const analysis = await getRegionAnalysis(r.slug);
          return [r.slug, analysis] as const;
        })
      );

      const analysisMap: Record<string, RegionAnalysis> = {};
      for (const [slug, analysis] of analysisEntries) {
        if (analysis) {
          analysisMap[slug] = analysis;
        }
      }
      setAnalyses(analysisMap);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <PageShell>
      {/* ─── Page Header ───────────────────────────── */}
      <div className="mb-12 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-4xl tracking-tight mb-4 leading-tight text-foreground">
          UK Property Investment Analysis
        </h1>
        <p className="font-sans text-base text-muted-foreground text-balance mb-6 leading-relaxed">
          Transparent, explainable assessments of residential investment conditions across regions to help you make informed decisions.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
            <DotIcon /> 8 Regions
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
            <DotIcon /> Last updated: 2024
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
            <DotIcon /> Data: ONS
          </span>
        </div>
      </div>

      {/* ─── Two Column Layout ─────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ─── Left: Map ─────────────────────────── */}
        <div className="w-full lg:w-[45%] shrink-0">
          <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-24 h-125 lg:h-155">
            <RegionMap />
          </div>
        </div>

        {/* ─── Right: Region Cards ───────────────── */}
        <div className="flex-1 w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regions.map((region, i) => (
                <RegionCard
                  key={region.slug}
                  region={region}
                  analysis={analyses[region.slug]}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

/* ─── Skeleton Components ──────────────────────────────────────── */

function MapSkeleton() {
  return (
    <div className="w-full h-full bg-muted animate-pulse inset-0 absolute" />
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-4">
          <div className="h-6 w-32 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="flex items-end gap-3 mb-8">
          <div className="h-10 w-16 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-10 bg-muted rounded-lg pb-1 animate-pulse" />
          <div className="h-6 w-14 bg-muted rounded-lg ml-auto animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border mt-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function DotIcon() {
  return (
    <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
  );
}
