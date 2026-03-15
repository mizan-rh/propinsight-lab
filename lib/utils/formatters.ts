/**
 * Format a number as a GBP price string.
 * @example formatPrice(245000) → "£245,000"
 */
export function formatPrice(n: number): string {
    return `£${n.toLocaleString("en-GB")}`;
}

/**
 * Format a score to one decimal place.
 * @example formatScore(74.23) → "74.2"
 */
export function formatScore(n: number): string {
    return n.toFixed(1);
}

/**
 * Format a number as a signed percentage change.
 * @example formatChange(3.2) → "+3.2%"
 * @example formatChange(-1.4) → "-1.4%"
 */
export function formatChange(n: number): string {
    const sign = n >= 0 ? "+" : "";
    return `${sign}${n.toFixed(1)}%`;
}

/**
 * Format a number as a yield percentage.
 * @example formatYield(5.8) → "5.8%"
 */
export function formatYield(n: number): string {
    return `${n.toFixed(1)}%`;
}

/**
 * Get the CSS variable name for a risk level colour.
 * @example getRiskColor("low") → "var(--color-success-val)"
 */
export function getRiskColor(
    level: "low" | "medium" | "high"
): string {
    const colorMap: Record<"low" | "medium" | "high", string> = {
        low: "var(--color-success-val)",
        medium: "var(--color-warning-val)",
        high: "var(--color-danger-val)",
    };
    return colorMap[level];
}

/**
 * Get the light background CSS variable for a risk level.
 * @example getRiskBgColor("high") → "var(--color-danger-light-val)"
 */
export function getRiskBgColor(
    level: "low" | "medium" | "high"
): string {
    const colorMap: Record<"low" | "medium" | "high", string> = {
        low: "var(--color-success-light-val)",
        medium: "var(--color-warning-light-val)",
        high: "var(--color-danger-light-val)",
    };
    return colorMap[level];
}

/**
 * Convert a camelCase factor key to a human-readable label.
 * @example formatFactorLabel("employmentRate") → "Employment Rate"
 */
export function formatFactorLabel(key: string): string {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
}
