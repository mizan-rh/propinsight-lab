export interface Region {
    slug: string;
    name: string;
    coordinates: [number, number];
    overallScore: number; // 0-100
    riskLevel: "low" | "medium" | "high";
    scoreChange: number; // vs last year, e.g. +3.2
}
