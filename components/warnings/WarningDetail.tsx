"use client";

import type { Warning } from "@/lib/types/warning";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import RiskBadge from "./RiskBadge";

export function WarningDetail({ warning }: { warning: Warning }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="border rounded-lg mb-4 overflow-hidden transition-colors bg-card border-border"
        >
            {/* ─── Header (Clickable) ────────────────────── */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                        <RiskBadge level={warning.severity} />
                    </div>
                    <h3 className="text-[15px] font-medium text-foreground leading-snug sm:pr-2">
                        {warning.title}
                    </h3>
                </div>
                <div
                    className="self-end sm:self-auto mt-3 sm:mt-0 flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0"
                >
                    {warning.type.toUpperCase()}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDownIcon />
                    </motion.div>
                </div>
            </button>

            {/* ─── Expandable Content ────────────────────── */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div
                            className="p-5 pt-0 text-sm leading-relaxed text-muted-foreground"
                        >
                            <p className="mb-4">{warning.narrative}</p>

                            <div
                                className="p-4 rounded-r-lg bg-muted"
                                style={{
                                    borderLeft: `4px solid var(${warning.severity === "high" ? "--destructive" : "--warning"})`,
                                }}
                            >
                                <p
                                    className="text-xs font-medium mb-1 uppercase tracking-widest text-muted-foreground"
                                >
                                    Historical Context
                                </p>
                                <p className="italic text-sm">{warning.historicalContext}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function ChevronDownIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}
