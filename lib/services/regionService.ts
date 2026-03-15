import { mockAnalysis } from "@/lib/mock/analysis";
import { mockRegions } from "@/lib/mock/regions";
import type { Region, RegionAnalysis, Warning } from "@/lib/types";

const USE_MOCK = true;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

// ─── Region Queries ─────────────────────────────────────────────

export async function getAllRegions(): Promise<Region[]> {
    if (USE_MOCK) {
        return mockRegions;
    }
    const res = await fetch(`${API_BASE}/api/regions`);
    if (!res.ok) throw new Error(`Failed to fetch regions: ${res.statusText}`);
    return res.json() as Promise<Region[]>;
}

export async function getRegionBySlug(
    slug: string
): Promise<Region | undefined> {
    if (USE_MOCK) {
        return mockRegions.find((r) => r.slug === slug);
    }
    const res = await fetch(`${API_BASE}/api/regions/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch region: ${res.statusText}`);
    return res.json() as Promise<Region>;
}

// ─── Analysis Queries ───────────────────────────────────────────

export async function getRegionAnalysis(
    slug: string
): Promise<RegionAnalysis | undefined> {
    if (USE_MOCK) {
        return mockAnalysis[slug];
    }
    const res = await fetch(`${API_BASE}/api/regions/${slug}/analysis`);
    if (!res.ok) throw new Error(`Failed to fetch analysis: ${res.statusText}`);
    return res.json() as Promise<RegionAnalysis>;
}

// ─── Warning Queries ────────────────────────────────────────────

export async function getRegionWarnings(slug: string): Promise<Warning[]> {
    if (USE_MOCK) {
        const analysis = mockAnalysis[slug];
        return analysis?.warnings ?? [];
    }
    const res = await fetch(`${API_BASE}/api/regions/${slug}/warnings`);
    if (!res.ok) throw new Error(`Failed to fetch warnings: ${res.statusText}`);
    return res.json() as Promise<Warning[]>;
}

// ─── Comparison ─────────────────────────────────────────────────

export async function compareRegions(
    slugA: string,
    slugB: string
): Promise<{ a: RegionAnalysis; b: RegionAnalysis }> {
    if (USE_MOCK) {
        const a = mockAnalysis[slugA];
        const b = mockAnalysis[slugB];
        if (!a || !b) {
            throw new Error(
                `Region not found: ${!a ? slugA : slugB}`
            );
        }
        return { a, b };
    }
    const res = await fetch(
        `${API_BASE}/api/regions/compare?a=${slugA}&b=${slugB}`
    );
    if (!res.ok)
        throw new Error(`Failed to compare regions: ${res.statusText}`);
    return res.json() as Promise<{ a: RegionAnalysis; b: RegionAnalysis }>;
}
