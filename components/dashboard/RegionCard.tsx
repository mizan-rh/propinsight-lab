"use client";

import RiskBadge from "@/components/warnings/RiskBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Region, RegionAnalysis } from "@/lib/types";
import {
    formatChange,
    formatPrice,
    formatYield,
} from "@/lib/utils/formatters";
import { motion } from "framer-motion";
import Link from "next/link";

interface RegionCardProps {
    region: Region;
    analysis: RegionAnalysis | undefined;
    index: number;
}

export default function RegionCard({
    region,
    analysis,
    index,
}: RegionCardProps) {
    const latestPrice =
        analysis?.priceHistory[analysis.priceHistory.length - 1];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                delay: index * 0.08,
                ease: "easeOut",
            }}
            className="h-full"
        >
            <Tooltip>
                <TooltipTrigger render={
                    <Link
                        href={`/region/${region.slug}`}
                        className="block no-underline h-full outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg cursor-pointer"
                    />
                }>
                    <div className="h-full flex flex-col justify-between group relative overflow-hidden bg-card border border-border rounded-lg p-6 transition-colors duration-200 hover:border-ring hover:bg-muted">

                        <div>
                            {/* ─── Header ──────────────────────────── */}
                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <h3 className="font-serif text-xl font-semibold text-foreground tracking-tight transition-colors">
                                    {region.name}
                                </h3>
                                <RiskBadge level={region.riskLevel} />
                            </div>

                            {/* ─── Score Row ────────────────────────── */}
                            <div className="flex items-end gap-3 mb-8 relative z-10">
                                <span className="font-mono text-4xl font-medium leading-none text-foreground tracking-tighter">
                                    {region.overallScore}
                                </span>
                                <span className="font-sans text-sm text-muted-foreground pb-1 font-medium">
                                    / 100
                                </span>
                                <span
                                    className="font-mono text-sm ml-auto flex items-center gap-1 font-medium px-2 py-1 rounded-lg border"
                                    style={{
                                        color: region.scoreChange >= 0 ? "var(--success)" : "var(--destructive)",
                                        background: region.scoreChange >= 0 ? "var(--success-pale)" : "var(--destructive-pale)",
                                        borderColor: region.scoreChange >= 0
                                            ? "color-mix(in srgb, var(--success) 20%, transparent)"
                                            : "color-mix(in srgb, var(--destructive) 20%, transparent)",
                                    }}
                                >
                                    {region.scoreChange >= 0 ? (
                                        <ArrowUpIcon />
                                    ) : (
                                        <ArrowDownIcon />
                                    )}
                                    {formatChange(region.scoreChange)}
                                </span>
                            </div>
                        </div>

                        {/* ─── Stats Row ────────────────────────── */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border relative z-10 mt-auto">
                            <StatItem
                                label="Avg Price"
                                value={
                                    latestPrice
                                        ? formatPrice(latestPrice.avgPrice)
                                        : "—"
                                }
                            />
                            <StatItem
                                label="Yield"
                                value={
                                    latestPrice
                                        ? formatYield(latestPrice.rentalYield)
                                        : "—"
                                }
                            />
                            <StatItem
                                label="Employment"
                                value={
                                    analysis
                                        ? `${analysis.factors.employmentRate}%`
                                        : "—"
                                }
                            />
                        </div>
                    </div>
                </TooltipTrigger>
                {analysis && (
                    <TooltipContent side="right" align="start" sideOffset={12} className="w-75 p-4 hidden lg:block z-50">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-serif text-base mb-1.5 text-foreground">Market Context</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {analysis.explanation.summary.length > 140 
                                      ? `${analysis.explanation.summary.substring(0, 140)}...` 
                                      : analysis.explanation.summary}
                                </p>
                            </div>
                            
                            {analysis.warnings.length > 0 && (
                                <div className="p-3 bg-destructive-pale rounded-lg border border-destructive/20" style={{
                                    background: "var(--destructive-pale)",
                                    borderColor: "color-mix(in srgb, var(--destructive) 20%, transparent)",
                                }}>
                                    <p className="text-xs font-medium text-destructive flex items-center gap-1.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                                        {analysis.warnings.length} Risk Signal{analysis.warnings.length > 1 ? "s" : ""}
                                    </p>
                                    <p className="text-xs text-destructive/80 mt-1 pl-5">
                                        {analysis.warnings[0].title}
                                    </p>
                                </div>
                            )}
                        </div>
                    </TooltipContent>
                )}
            </Tooltip>
        </motion.div>
    );
}

/* ─── Internal Components ──────────────────────────────────────── */

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider leading-none">
                {label}
            </p>
            <p className="font-mono font-medium text-foreground tracking-tight leading-none" style={{ fontSize: "13px" }}>
                {value}
            </p>
        </div>
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function ArrowUpIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="18 15 12 9 6 15" />
        </svg>
    );
}

function ArrowDownIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}
