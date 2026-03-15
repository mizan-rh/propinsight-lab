"use client";

import type { RegionAnalysis } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ExplainerPanel({
    explanation,
}: {
    explanation: RegionAnalysis["explanation"];
}) {
    const [showAssumptions, setShowAssumptions] = useState(false);

    return (
        <div className="bg-card border border-border rounded-lg p-5 md:p-8">
            <h3
                className="font-serif text-xl mb-4 text-foreground tracking-tight"
            >
                Why this score?
            </h3>

            {/* ─── Summary ───────────────────────────────── */}
            <p
                className="font-sans text-[15px] leading-relaxed mb-8 text-muted-foreground"
            >
                {explanation.summary}
            </p>

            {/* ─── Columns (Strengths vs Concerns) ───────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4
                        className="text-xs font-medium uppercase tracking-widest mb-3 flex items-center gap-2"
                        style={{ color: "var(--success)" }}
                    >
                        <CheckCircleIcon /> Strengths
                    </h4>
                    <ul className="flex flex-col gap-2">
                        {explanation.strengths.map((s, i) => (
                            <li
                                key={i}
                                className="text-sm text-muted-foreground"
                            >
                                • {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4
                        className="text-xs font-medium uppercase tracking-widest mb-3 flex items-center gap-2"
                        style={{ color: "var(--warning)" }}
                    >
                        <AlertCircleIcon /> Concerns
                    </h4>
                    <ul className="flex flex-col gap-2">
                        {explanation.concerns.map((c, i) => (
                            <li
                                key={i}
                                className="text-sm text-muted-foreground"
                            >
                                • {c}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ─── Trade-offs ────────────────────────────── */}
            <div
                className="p-4 rounded-lg mb-8 bg-muted border border-border"
            >
                <p
                    className="text-sm font-medium mb-1 text-foreground"
                >
                    Investment Trade-offs
                </p>
                <p
                    className="text-sm text-muted-foreground leading-relaxed"
                >
                    {explanation.tradeoffs}
                </p>
            </div>

            {/* ─── Assumptions & Limitations (Collapsible) ─ */}
            <div>
                <button
                    onClick={() => setShowAssumptions(!showAssumptions)}
                    className="flex items-center gap-2 text-sm font-medium w-full text-left transition-colors text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                >
                    <motion.div
                        animate={{ rotate: showAssumptions ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRightIcon />
                    </motion.div>
                    Assumptions & Limitations
                </button>

                <AnimatePresence>
                    {showAssumptions && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 pb-2 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border mt-4">
                                <div>
                                    <h5
                                        className="text-xs font-medium mb-2 text-foreground"
                                    >
                                        Assumptions
                                    </h5>
                                    <ul className="flex flex-col gap-1">
                                        {explanation.assumptions.map((a, i) => (
                                            <li
                                                key={i}
                                                className="text-xs text-muted-foreground"
                                            >
                                                - {a}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5
                                        className="text-xs font-medium mb-2 text-foreground"
                                    >
                                        Limitations
                                    </h5>
                                    <ul className="flex flex-col gap-1">
                                        {explanation.limitations.map((l, i) => (
                                            <li
                                                key={i}
                                                className="text-xs text-muted-foreground"
                                            >
                                                - {l}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function CheckCircleIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function AlertCircleIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}
