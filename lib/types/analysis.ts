import type { Warning } from "./warning";

export interface RegionAnalysis {
    slug: string;
    factors: {
        employmentRate: number;
        incomeLevel: number;
        populationGrowth: number;
        rentalYield: number;
        priceGrowth: number;
        industryDiversity: number;
        demandStrength: number;
        affordability: number;
    };
    factorWeights: Record<string, number>;
    priceHistory: {
        year: number;
        avgPrice: number;
        rentalYield: number;
    }[];
    explanation: {
        summary: string;
        strengths: string[];
        concerns: string[];
        tradeoffs: string;
        assumptions: string[];
        limitations: string[];
    };
    warnings: Warning[];
}
