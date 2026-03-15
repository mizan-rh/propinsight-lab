"use client";

import CompareRadarChart from "@/components/charts/CompareRadarChart";
import PageShell from "@/components/layout/PageShell";
import RiskBadge from "@/components/warnings/RiskBadge";
import {
    getAllRegions,
    getRegionAnalysis,
} from "@/lib/services/regionService";
import type { Region, RegionAnalysis } from "@/lib/types";
import { formatFactorLabel } from "@/lib/utils/formatters";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComparePage() {
    const { compareRegions, setCompareRegion } = useAppStore();
    const [regionsList, setRegionsList] = useState<Region[]>([]);

    const [regionA, setRegionA] = useState<Region | null>(null);
    const [regionB, setRegionB] = useState<Region | null>(null);

    const [analysisA, setAnalysisA] = useState<RegionAnalysis | null>(null);
    const [analysisB, setAnalysisB] = useState<RegionAnalysis | null>(null);

    const [loading, setLoading] = useState(true);

    // Load all regions for dropdowns
    useEffect(() => {
        getAllRegions().then((list) => {
            setRegionsList(list);
            // set defaults if none configured in store
            if (!compareRegions[0]) {
                setCompareRegion(0, "manchester");
            }
            if (!compareRegions[1]) {
                setCompareRegion(1, "birmingham");
            }
        });
    }, [compareRegions, setCompareRegion]);

    // Load active comparison data when store slugs change
    useEffect(() => {
        async function fetchComparisonData() {
            setLoading(true);
            const [slugA, slugB] = compareRegions;

            const pA = slugA
                ? Promise.all([
                    getRegionAnalysis(slugA),
                    getAllRegions().then((rs) => rs.find((r) => r.slug === slugA)),
                ])
                : Promise.resolve([null, null]);

            const pB = slugB
                ? Promise.all([
                    getRegionAnalysis(slugB),
                    getAllRegions().then((rs) => rs.find((r) => r.slug === slugB)),
                ])
                : Promise.resolve([null, null]);

            const [resA, resB] = await Promise.all([pA, pB]);

            setAnalysisA(resA[0] as RegionAnalysis | null);
            setRegionA(resA[1] as Region | null);

            setAnalysisB(resB[0] as RegionAnalysis | null);
            setRegionB(resB[1] as Region | null);

            setLoading(false);
        }

        if (regionsList.length > 0) {
            fetchComparisonData();
        }
    }, [compareRegions, regionsList]);

    const generateSummaryText = () => {
        if (!analysisA || !analysisB || !regionA || !regionB) return null;

        const factorsA = analysisA.factors;
        const factorsB = analysisB.factors;

        const aWins: string[] = [];
        const bWins: string[] = [];

        (Object.keys(factorsA) as Array<keyof typeof factorsA>).forEach((key) => {
            if (factorsA[key] > factorsB[key]) aWins.push(formatFactorLabel(key));
            else if (factorsB[key] > factorsA[key]) bWins.push(formatFactorLabel(key));
        });

        const formatList = (list: string[]) => {
            if (list.length === 0) return "none";
            if (list.length === 1) return list[0];
            if (list.length === 2) return `${list[0]} and ${list[1]}`;
            return `${list.slice(0, 2).join(", ")} and ${list.length - 2} others`;
        };

        return (
            <div className="p-6 rounded-lg mt-8 bg-muted border border-border relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                <p className="text-[15px] leading-relaxed text-muted-foreground pl-2">
                    <strong className="text-foreground font-medium">{regionA.name}</strong> leads in{" "}
                    <span className="font-medium text-foreground">{formatList(aWins)}</span>.
                    <br />
                    <strong className="text-foreground font-medium">{regionB.name}</strong> shows stronger{" "}
                    <span className="font-medium text-foreground">{formatList(bWins)}</span>.
                </p>
            </div>
        );
    };

    return (
        <PageShell>
            <div className="max-w-6xl mx-auto pb-12">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="font-serif text-4xl tracking-tight mb-3 text-foreground">
                        Compare Regions
                    </h1>
                    <p className="font-sans text-base text-muted-foreground text-balance">
                        Select two regions to evaluate investment conditions and risk factors side-by-side.
                    </p>
                </div>

                {/* Region Selectors */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-card border border-border rounded-lg p-6">
                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-medium uppercase tracking-widest leading-none text-muted-foreground mb-2">
                            Region A
                        </label>
                        <select
                            value={compareRegions[0] || ""}
                            onChange={(e) => setCompareRegion(0, e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-0 focus:border-ring transition-all cursor-pointer font-medium text-foreground appearance-none text-sm"
                        >
                            <option value="" disabled>Select Region A</option>
                            {regionsList.map((r) => (
                                <option key={r.slug} value={r.slug} disabled={compareRegions[1] === r.slug}>
                                    {r.name} (Score: {r.overallScore})
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute right-4 bottom-3.5 pointer-events-none text-muted-foreground" />
                    </div>

                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 bg-muted text-muted-foreground font-serif italic text-base">
                        vs
                    </div>

                    <div className="flex-1 w-full relative">
                        <label className="block text-xs font-medium uppercase tracking-widest leading-none text-muted-foreground mb-2">
                            Region B
                        </label>
                        <select
                            value={compareRegions[1] || ""}
                            onChange={(e) => setCompareRegion(1, e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-0 focus:border-ring transition-all cursor-pointer font-medium text-foreground appearance-none text-sm"
                        >
                            <option value="" disabled>Select Region B</option>
                            <option value="none">-- None (Single view) --</option>
                            {regionsList.map((r) => (
                                <option key={r.slug} value={r.slug} disabled={compareRegions[0] === r.slug}>
                                    {r.name} (Score: {r.overallScore})
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute right-4 bottom-3.5 pointer-events-none text-muted-foreground" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <Skeleton className="h-125 flex-1 rounded-lg" />
                        <Skeleton className="h-125 flex-1 rounded-lg" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left: Radar Chart */}
                        {analysisA && (
                            <div className="bg-card p-8 flex flex-col justify-center border border-border rounded-lg">
                                <ErrorBoundary>
                                    <CompareRadarChart analysisA={analysisA} analysisB={analysisB} />
                                </ErrorBoundary>
                            </div>
                        )}

                        {/* Right: Data Table */}
                        {regionA && analysisA && (
                            <div className="bg-card border border-border rounded-lg w-full overflow-x-auto hidden-scrollbar">
                                <div className="min-w-150 rounded-lg">
                                    <div className="grid grid-cols-[1fr_minmax(80px,1fr)_60px_minmax(80px,1fr)] bg-muted border-b border-border text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                        <div className="p-4">Factor</div>
                                        <div className="p-4 text-center border-l border-border font-semibold text-foreground">{regionA.name}</div>
                                        <div className="p-4 text-center border-l border-r border-border shrink-0 opacity-50">vs</div>
                                        <div className="p-4 text-center font-semibold text-foreground">
                                            {regionB ? regionB.name : "N/A"}
                                        </div>
                                    </div>

                                    <div className="divide-y divide-border bg-card">
                                        {(Object.keys(analysisA.factors) as Array<keyof typeof analysisA.factors>).map((key) => {
                                            const scoreA = analysisA.factors[key];
                                            const scoreB = analysisB?.factors[key] ?? null;
                                            const diff = scoreB !== null ? scoreA - scoreB : null;

                                            return (
                                                <div key={key} className="grid grid-cols-[1fr_minmax(80px,1fr)_60px_minmax(80px,1fr)] transition-colors hover:bg-muted">
                                                    <div className="px-4 py-3 text-sm font-medium text-muted-foreground flex items-center">
                                                        {formatFactorLabel(key)}
                                                    </div>

                                                    <div
                                                        className="px-4 py-3 text-center border-l border-border font-mono flex flex-col items-center justify-center font-medium"
                                                        style={{
                                                            background: diff !== null && diff > 0 ? "var(--success-pale)" : undefined,
                                                            color: diff !== null && diff > 0 ? "var(--success)" : (diff !== null && diff < 0 ? "var(--muted-foreground)" : "var(--foreground)")
                                                        }}
                                                    >
                                                        {scoreA}
                                                    </div>

                                                    <div className="px-4 py-3 text-center border-l border-r border-border font-mono text-xs flex items-center justify-center font-medium">
                                                        {diff !== null ? (
                                                            <span style={{ color: diff > 0 ? "var(--success)" : (diff < 0 ? "var(--destructive)" : "var(--muted-foreground)") }}>
                                                                {diff > 0 ? `+${diff}` : diff}
                                                            </span>
                                                        ) : "—"}
                                                    </div>

                                                    <div
                                                        className="px-4 py-3 text-center font-mono flex flex-col items-center justify-center font-medium"
                                                        style={{
                                                            background: diff !== null && diff < 0 ? "var(--warning-pale)" : undefined,
                                                            color: diff !== null && diff < 0 ? "var(--warning)" : (diff !== null && diff > 0 ? "var(--muted-foreground)" : "var(--foreground)")
                                                        }}
                                                    >
                                                        {scoreB !== null ? scoreB : "—"}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Overall Score Row */}
                                        <div className="grid grid-cols-[1fr_minmax(80px,1fr)_60px_minmax(80px,1fr)] bg-muted border-t border-border">
                                            <div className="p-4 text-xs font-semibold text-foreground uppercase tracking-wider flex items-center">
                                                Overall Score
                                            </div>

                                            <div className="p-4 text-center border-l border-border flex flex-col items-center justify-center gap-2">
                                                <span className="font-mono font-medium text-xl text-foreground leading-none">{regionA.overallScore}</span>
                                                <RiskBadge level={regionA.riskLevel} />
                                            </div>

                                            <div className="p-4 text-center border-l border-r border-border font-mono text-sm flex items-center justify-center font-medium">
                                                {regionB ? (
                                                    <span style={{ color: regionA.overallScore - regionB.overallScore > 0 ? "var(--success)" : (regionA.overallScore - regionB.overallScore < 0 ? "var(--destructive)" : "var(--muted-foreground)") }}>
                                                        {regionA.overallScore - regionB.overallScore > 0 ? `+${(regionA.overallScore - regionB.overallScore).toFixed(1)}` : (regionA.overallScore - regionB.overallScore).toFixed(1)}
                                                    </span>
                                                ) : "—"}
                                            </div>

                                            <div className="p-4 text-center flex flex-col items-center justify-center gap-2">
                                                {regionB ? (
                                                    <>
                                                        <span className="font-mono font-medium text-xl text-foreground leading-none">{regionB.overallScore}</span>
                                                        <RiskBadge level={regionB.riskLevel} />
                                                    </>
                                                ) : <span className="text-muted-foreground">—</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* Generated Summary */}
                {!loading && generateSummaryText()}

                {/* Empty State / Single Selection */}
                {!loading && regionA && !regionB && (
                    <div className="mt-8 p-10 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-border bg-transparent rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border">
                            <PlusIcon />
                        </div>
                        <div>
                            <h4 className="font-serif text-lg font-medium text-foreground mb-1 tracking-tight">Select a secondary region</h4>
                            <p className="font-sans text-[15px] text-muted-foreground max-w-sm mx-auto text-balance">Choose another region from the dropdown menu above to begin a side-by-side comparison of investment factors.</p>
                        </div>
                    </div>
                )}
            </div>
        </PageShell>
    );
}

function PlusIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
}

function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
}
