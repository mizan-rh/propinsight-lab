import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RiskBadgeProps {
    level: "low" | "medium" | "high";
}

const labelMap: Record<RiskBadgeProps["level"], string> = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
};

const mapLevelToDescription = {
    low: "Strong fundamentals with minimal warning signals.",
    medium: "Mixed conditions. Careful asset selection required.",
    high: "Significant structural risks detected. Speculative.",
};

export default function RiskBadge({ level }: RiskBadgeProps) {
    const colorVar = level === "low" ? "--success" : level === "medium" ? "--warning" : "--destructive";
    const paleVar = level === "low" ? "--success-pale" : level === "medium" ? "--warning-pale" : "--destructive-pale";

    return (
        <Tooltip>
            <TooltipTrigger render={
                <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full border uppercase tracking-widest font-medium transition-colors cursor-help"
                    style={{
                        fontSize: "10.5px",
                        color: `var(${colorVar})`,
                        background: `var(${paleVar})`,
                        borderColor: `color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                    }}
                >
                    <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: "currentColor" }}
                        aria-hidden="true"
                    />
                    {labelMap[level]}
                </span>
            } />
            <TooltipContent>
                <p>{mapLevelToDescription[level]}</p>
            </TooltipContent>
        </Tooltip>
    );
}
