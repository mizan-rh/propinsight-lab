"use client";

import FactorBarChart from "@/components/charts/FactorBarChart";
import FactorRadarChart from "@/components/charts/FactorRadarChart";
import PriceTrendChart from "@/components/charts/PriceTrendChart";
import { ExplainerPanel } from "@/components/explainer/ExplainerPanel";
import PageShell from "@/components/layout/PageShell";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RiskBadge from "@/components/warnings/RiskBadge";
import { WarningBanner } from "@/components/warnings/WarningBanner";
import { WarningDetail } from "@/components/warnings/WarningDetail";
import {
    getRegionAnalysis,
    getRegionBySlug,
} from "@/lib/services/regionService";
import type { Region, RegionAnalysis } from "@/lib/types";
import { formatChange, formatPrice, formatYield } from "@/lib/utils/formatters";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

// Define strict types for the page props
interface RegionPageProps {
    params: Promise<{ slug: string }>;
}

export default function RegionAnalysisPage({ params }: RegionPageProps) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;
    const [data, setData] = useState<{
        region: Region;
        analysis: RegionAnalysis;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFoundState, setNotFoundState] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [regionData, analysisData] = await Promise.all([
                    getRegionBySlug(slug),
                    getRegionAnalysis(slug),
                ]);

                if (!regionData || !analysisData) {
                    setNotFoundState(true);
                    return;
                }

                setData({ region: regionData, analysis: analysisData });
            } catch {
                setNotFoundState(true);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [slug]);

    if (notFoundState) {
        notFound();
    }

    return (
        <PageShell>
            {loading || !data ? (
                <PageSkeleton />
            ) : (
                <div className="max-w-6xl mx-auto pb-12">
                    {/* ─── 1. Hero Header ────────────────────────── */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-3">
                            <h1 className="font-serif text-[40px] tracking-tight text-foreground">
                                {data.region.name}
                            </h1>
                            <RiskBadge level={data.region.riskLevel} />
                        </div>

                        <p className="font-sans text-base leading-relaxed mb-6 max-w-3xl text-muted-foreground">
                            {data.analysis.explanation.summary}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <StatPill label="Overall Score">
                                <div className="flex items-center gap-2">
                                    <Tooltip>
                                        <TooltipTrigger render={
                                            <div className="cursor-help relative">
                                                <AnimatedScore value={data.region.overallScore} />
                                            </div>
                                        } />
                                        <TooltipContent>
                                            <p>Weighted aggregate of all 8 economic, demographic, and market factors.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <span
                                        className="text-sm font-mono flex items-center gap-0.5 font-medium"
                                        style={{
                                            color:
                                                data.region.scoreChange >= 0
                                                    ? "var(--success)"
                                                    : "var(--destructive)",
                                        }}
                                    >
                                        {data.region.scoreChange >= 0 ? (
                                            <ArrowUpIcon />
                                        ) : (
                                            <ArrowDownIcon />
                                        )}
                                        {formatChange(data.region.scoreChange)}
                                    </span>
                                </div>
                            </StatPill>
                            <StatPill label="Avg Price">
                                <span className="font-mono text-xl font-medium text-foreground tracking-tight">
                                    {formatPrice(
                                        data.analysis.priceHistory[
                                            data.analysis.priceHistory.length - 1
                                        ].avgPrice
                                    )}
                                </span>
                            </StatPill>
                            <StatPill label="Rental Yield">
                                <span className="font-mono text-xl font-medium text-foreground tracking-tight">
                                    {formatYield(
                                        data.analysis.priceHistory[
                                            data.analysis.priceHistory.length - 1
                                        ].rentalYield
                                    )}
                                </span>
                            </StatPill>
                        </div>
                    </div>

                    {/* ─── 2. Warning Banner ─────────────────────── */}
                    <WarningBanner warnings={data.analysis.warnings} />

                    {/* ─── 3. Factor Analysis ────────────────────── */}
                    <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <div className="bg-card border border-border rounded-lg p-5 md:p-8 flex flex-col items-center justify-center">
                            <h3 className="font-serif text-xl mb-6 self-start w-full border-b border-border pb-3 text-foreground">
                                Factor Blueprint
                            </h3>
                            <ErrorBoundary>
                                <FactorRadarChart factors={data.analysis.factors} />
                            </ErrorBoundary>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-5 md:p-8 flex flex-col">
                            <h3 className="font-serif text-xl mb-6 border-b border-border pb-3 text-foreground">
                                Detailed Scores
                            </h3>
                            <div className="flex-1 overflow-y-auto pr-2 hidden-scrollbar">
                                <ErrorBoundary>
                                    <FactorBarChart factors={data.analysis.factors} />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </section>

                    {/* ─── 4. Explainer Panel ────────────────────── */}
                    <section className="mb-10">
                        <ExplainerPanel explanation={data.analysis.explanation} />
                    </section>

                    {/* ─── 5. Price History ──────────────────────── */}
                    <section className="mb-10">
                        <div className="bg-card border border-border rounded-lg p-5 md:p-8">
                            <h3 className="font-serif text-xl mb-6 border-b border-border pb-3 text-foreground">
                                10-Year Trend
                            </h3>
                            <div className="h-100">
                                <ErrorBoundary>
                                    <PriceTrendChart history={data.analysis.priceHistory} />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </section>
                    {/* ─── 6. Warning Details ────────────────────── */}
                    <section id="warnings" className="scroll-mt-24 pt-6">
                        <h3 className="font-serif text-xl mb-4 text-foreground">Early Warning Signals</h3>
                        {data.analysis.warnings.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {data.analysis.warnings.map((warning, i) => (
                                    <WarningDetail key={i} warning={warning} />
                                ))}
                            </div>
                        ) : (
                            <div
                                className="p-6 rounded-lg border flex items-center gap-3"
                                style={{
                                    background: "var(--success-pale)",
                                    borderColor: "color-mix(in srgb, var(--success) 20%, transparent)",
                                    color: "var(--success)",
                                }}
                            >
                                <CheckShieldIcon />
                                <span className="font-medium text-sm">
                                    No significant risk signals detected for this region based on
                                    current indicators.
                                </span>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </PageShell>
    );
}

/* ─── Internal Components ──────────────────────────────────────── */

function StatPill({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className="px-5 py-3 rounded-lg border bg-card border-border hover:border-ring transition-colors min-w-40"
        >
            <div
                className="text-xs font-medium uppercase tracking-widest mb-1 text-muted-foreground"
            >
                {label}
            </div>
            <div>{children}</div>
        </div>
    );
}

function AnimatedScore({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 1200; // ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = value / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.round(current * 10) / 10);
            }
        }, stepTime);
        return () => clearInterval(timer);
    }, [value]);

    return (
        <span
            className="font-mono text-2xl font-medium tracking-tight text-primary"
        >
            {displayValue.toFixed(1).replace(".0", "")}
        </span>
    );
}

function PageSkeleton() {
    return (
        <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-1/3 mb-4 rounded-lg" />
            <Skeleton className="h-6 w-2/3 mb-6 rounded-lg" />
            <div className="flex gap-4 mb-10">
                <Skeleton className="h-20 w-40 rounded-lg" />
                <Skeleton className="h-20 w-40 rounded-lg" />
                <Skeleton className="h-20 w-40 rounded-lg" />
            </div>
            <Skeleton className="h-16 w-full mb-10 rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <Skeleton className="h-100 w-full rounded-lg" />
                <Skeleton className="h-100 w-full rounded-lg" />
            </div>
        </div>
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function ArrowUpIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
        </svg>
    );
}

function ArrowDownIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function CheckShieldIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
