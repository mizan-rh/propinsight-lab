import type { Warning } from "@/lib/types/warning";

export function WarningBanner({ warnings }: { warnings: Warning[] }) {
    if (warnings.length === 0) return null;

    const hasHigh = warnings.some((w) => w.severity === "high");
    const hasMedium = warnings.some((w) => w.severity === "medium");

    let colorVar = "--success";
    let paleVar = "--success-pale";

    if (hasHigh) {
        colorVar = "--destructive";
        paleVar = "--destructive-pale";
    } else if (hasMedium) {
        colorVar = "--warning";
        paleVar = "--warning-pale";
    }

    return (
        <div
            className="w-full flex items-center justify-between p-4 rounded-lg mb-8 border"
            style={{
                backgroundColor: `var(${paleVar})`,
                color: `var(${colorVar})`,
                borderColor: `color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
            }}
        >
            <div className="flex items-center gap-3">
                <span>
                    <AlertTriangleIcon />
                </span>
                <span className="font-medium text-sm">
                    {warnings.length} Active {warnings.length === 1 ? "Warning" : "Warnings"} Detected
                </span>
            </div>
            <a
                href="#warnings"
                className="text-sm font-semibold flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
            >
                View Details <ArrowDownRightIcon />
            </a>
        </div>
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function AlertTriangleIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

function ArrowDownRightIcon() {
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
            <line x1="7" y1="7" x2="17" y2="17" />
            <polyline points="17 7 17 17 7 17" />
        </svg>
    );
}
