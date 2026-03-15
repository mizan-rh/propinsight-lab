export interface Warning {
    type:
    | "industry_dependency"
    | "price_divergence"
    | "demand_fragility"
    | "none";
    severity: "low" | "medium" | "high";
    title: string;
    narrative: string;
    historicalContext: string;
}
