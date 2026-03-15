"use client";

import type { RegionAnalysis } from "@/lib/types";
import { formatPrice, formatYield } from "@/lib/utils/formatters";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    annotationPlugin
);

interface PriceTrendChartProps {
    history: RegionAnalysis["priceHistory"];
}

type Mode = "price" | "yield" | "both";

function useThemeColors() {
    const [colors, setColors] = useState({
        chart1: "#3a81f6",
        chart2: "#91c5ff",
        fg: "#0a0a0a",
        muted: "#737373",
        border: "#eeeeee",
    });

    useEffect(() => {
        const s = getComputedStyle(document.documentElement);
        setColors({
            chart1: s.getPropertyValue("--chart-2").trim() || "#3a81f6",
            chart2: s.getPropertyValue("--chart-1").trim() || "#91c5ff",
            fg: s.getPropertyValue("--foreground").trim() || "#0a0a0a",
            muted: s.getPropertyValue("--muted-foreground").trim() || "#737373",
            border: s.getPropertyValue("--border").trim() || "#eeeeee",
        });
    }, []);

    return colors;
}

export default function PriceTrendChart({ history }: PriceTrendChartProps) {
    const [mode, setMode] = useState<Mode>("both");
    const c = useThemeColors();

    const labels = history.map((h) => h.year.toString());
    const prices = history.map((h) => h.avgPrice);
    const yields = history.map((h) => h.rentalYield);

    const covidIndex = history.findIndex((h) => h.year === 2020);

    const data = {
        labels,
        datasets: [
            {
                label: "Average Price",
                data: prices,
                borderColor: c.chart1,
                backgroundColor: `${c.chart1}14`,
                yAxisID: "y-price",
                tension: 0.4,
                fill: true,
                hidden: mode === "yield",
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Rental Yield (%)",
                data: yields,
                borderColor: c.chart2,
                backgroundColor: "transparent",
                yAxisID: "y-yield",
                tension: 0.4,
                hidden: mode === "price",
                pointRadius: 4,
                pointHoverRadius: 6,
                borderDash: [5, 5],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: { family: "'DM Sans', sans-serif", size: 13 },
                bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) => {
                        const val = context.raw as number;
                        if (context.datasetIndex === 0) {
                            return ` Price: ${formatPrice(val)}`;
                        }
                        return ` Yield: ${formatYield(val)}`;
                    },
                },
            },
            annotation: {
                annotations:
                    covidIndex !== -1
                        ? {
                            covidLine: {
                                type: "line" as const,
                                xMin: labels[covidIndex],
                                xMax: labels[covidIndex],
                                borderColor: `${c.muted}44`,
                                borderWidth: 1,
                                borderDash: [4, 4],
                                label: {
                                    display: true,
                                    content: "COVID",
                                    position: "start" as const,
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    color: "white",
                                    font: { family: "'DM Sans', sans-serif", size: 10 },
                                    yAdjust: 10,
                                },
                            },
                        }
                        : {},
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { family: "'DM Sans', sans-serif" }, color: c.muted },
            },
            "y-price": {
                type: "linear" as const,
                display: mode !== "yield",
                position: "left" as const,
                grid: { color: c.border },
                ticks: {
                    callback: (value: number | string) => formatPrice(Number(value)),
                    font: { family: "'JetBrains Mono', monospace" },
                    color: c.muted,
                },
            },
            "y-yield": {
                type: "linear" as const,
                display: mode !== "price",
                position: "right" as const,
                grid: { drawOnChartArea: false },
                ticks: {
                    callback: (value: number | string) => formatYield(Number(value)),
                    font: { family: "'JetBrains Mono', monospace" },
                    color: c.muted,
                },
            },
        },
    };

    return (
        <div className="w-full min-h-100 flex flex-col h-full">
            {/* Controls */}
            <div className="flex justify-end gap-2 mb-4 shrink-0">
                <ToggleButton
                    active={mode === "price"}
                    onClick={() => setMode("price")}
                    label="Price"
                />
                <ToggleButton
                    active={mode === "yield"}
                    onClick={() => setMode("yield")}
                    label="Yield"
                />
                <ToggleButton
                    active={mode === "both"}
                    onClick={() => setMode("both")}
                    label="Both"
                />
            </div>

            {/* Chart */}
            <div className="flex-1 w-full min-h-75">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

function ToggleButton({
    active,
    onClick,
    label,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active
                    ? "bg-accent text-accent-foreground border-border"
                    : "bg-transparent text-muted-foreground border-border hover:bg-muted"
            }`}
        >
            {label}
        </button>
    );
}
