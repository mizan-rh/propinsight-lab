"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { RegionAnalysis } from "@/lib/types";
import { formatFactorLabel } from "@/lib/utils/formatters";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FactorBarChartProps {
    factors: RegionAnalysis["factors"];
}

const factorExplanations: Record<keyof RegionAnalysis["factors"], string> = {
    employmentRate: "High employment stability correlates with reliable rental demand and lower void periods.",
    incomeLevel: "Local income levels dictate the affordability ceiling for both rental and purchase prices.",
    populationGrowth: "Population growth, particularly in the critical 25-34 rental demographic, drives sustained demand.",
    rentalYield: "Strong yields provide operational cash flow resilience, even during periods of low capital growth.",
    priceGrowth: "Historical and projected capital appreciation driven by supply-demand imbalances.",
    industryDiversity: "A diverse local economy protects against sector-specific downturns and structural job losses.",
    demandStrength: "High tenant inquiries and low void times indicate a deeply undersupplied local market.",
    affordability: "The ratio of local incomes to property prices; improved affordability suggests room for growth.",
};

export default function FactorBarChart({ factors }: FactorBarChartProps) {
    const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

    const sortedFactors = Object.entries(factors).sort((a, b) => b[1] - a[1]);

    return (
        <div className="flex flex-col gap-4">
            {sortedFactors.map(([key, score], index) => {
                const factorKey = key as keyof RegionAnalysis["factors"];
                const isExpanded = expandedFactor === factorKey;

                return (
                    <div key={factorKey} className="flex flex-col">
                        <div
                            className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 cursor-pointer"
                            onClick={() => setExpandedFactor(isExpanded ? null : factorKey)}
                        >
                            <div className="w-full sm:w-32 shrink-0">
                                <Tooltip>
                                    <TooltipTrigger render={
                                        <div
                                            className="text-xs font-medium uppercase tracking-widest truncate text-muted-foreground transition-colors group-hover:text-foreground cursor-help"
                                        >
                                            {formatFactorLabel(factorKey)}
                                        </div>
                                    } />
                                    <TooltipContent>
                                        <p>{factorExplanations[factorKey]}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-muted flex items-center">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: "var(--chart-2)",
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                                />
                            </div>
                            <div className="w-10 shrink-0 text-sm font-mono font-medium text-muted-foreground">
                                {score}%
                            </div>
                        </div>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className="mt-2 pl-0 sm:pl-36 leading-relaxed text-sm text-muted-foreground"
                                    >
                                        {factorExplanations[factorKey]}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
