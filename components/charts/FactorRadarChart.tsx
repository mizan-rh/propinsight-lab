"use client";

import type { RegionAnalysis } from "@/lib/types";
import { formatFactorLabel } from "@/lib/utils/formatters";
import {
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface FactorRadarChartProps {
    factors: RegionAnalysis["factors"];
}

function useThemeColors() {
    const [colors, setColors] = useState({
        chart1: "#3a81f6",
        fg: "#0a0a0a",
        muted: "#737373",
        border: "#eeeeee",
    });

    useEffect(() => {
        const s = getComputedStyle(document.documentElement);
        setColors({
            chart1: s.getPropertyValue("--chart-2").trim() || "#3a81f6",
            fg: s.getPropertyValue("--foreground").trim() || "#0a0a0a",
            muted: s.getPropertyValue("--muted-foreground").trim() || "#737373",
            border: s.getPropertyValue("--border").trim() || "#eeeeee",
        });
    }, []);

    return colors;
}

export default function FactorRadarChart({ factors }: FactorRadarChartProps) {
    const c = useThemeColors();
    const labels = Object.keys(factors).map(formatFactorLabel);
    const dataValues = Object.values(factors);

    const data = {
        labels,
        datasets: [
            {
                label: "Factor Score",
                data: dataValues,
                backgroundColor: `${c.chart1}1a`,
                borderColor: c.chart1,
                borderWidth: 2,
                pointBackgroundColor: c.chart1,
                pointBorderColor: "var(--background)",
                pointHoverBackgroundColor: "var(--background)",
                pointHoverBorderColor: c.chart1,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    display: false,
                },
                grid: {
                    color: c.border,
                    circular: true,
                },
                angleLines: {
                    color: c.border,
                },
                pointLabels: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 11,
                    },
                    color: c.muted,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) => ` ${context.raw}/100`,
                },
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: { family: "'DM Sans', sans-serif", size: 13 },
                bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
                padding: 10,
                cornerRadius: 8,
            },
        },
    };

    return (
        <div className="w-full h-75 sm:h-100 group relative inline-flex items-center justify-center">
            <Radar data={data} options={options} />
        </div>
    );
}
