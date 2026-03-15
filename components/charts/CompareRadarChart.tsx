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

interface CompareRadarChartProps {
    analysisA: RegionAnalysis;
    analysisB?: RegionAnalysis | null;
}

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

export default function CompareRadarChart({
    analysisA,
    analysisB,
}: CompareRadarChartProps) {
    const c = useThemeColors();
    const labels = Object.keys(analysisA.factors).map(formatFactorLabel);

    const datasets = [
        {
            label: analysisA.slug.charAt(0).toUpperCase() + analysisA.slug.slice(1),
            data: Object.values(analysisA.factors),
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
    ];

    if (analysisB) {
        datasets.push({
            label: analysisB.slug.charAt(0).toUpperCase() + analysisB.slug.slice(1),
            data: Object.values(analysisB.factors),
            backgroundColor: `${c.chart2}1a`,
            borderColor: c.chart2,
            borderWidth: 2,
            pointBackgroundColor: c.chart2,
            pointBorderColor: "var(--background)",
            pointHoverBackgroundColor: "var(--background)",
            pointHoverBorderColor: c.chart2,
            pointRadius: 4,
            pointHoverRadius: 6,
        });
    }

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
                    color: `${c.border}`,
                    circular: true,
                },
                angleLines: {
                    color: `${c.border}`,
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
                position: "top" as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: { family: "'DM Sans', sans-serif", size: 12 },
                    color: c.fg,
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) =>
                        ` ${context.dataset.label}: ${context.raw}/100`,
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
        <div className="w-full h-full min-h-100 group relative inline-flex items-center justify-center">
            <Radar data={{ labels, datasets }} options={options} />
        </div>
    );
}
