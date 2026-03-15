"use client";

import { getAllRegions } from "@/lib/services/regionService";
import type { Region } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    CircleMarker,
    MapContainer,
    TileLayer,
    Tooltip,
} from "react-leaflet";

const UK_CENTER: [number, number] = [53.5, -1.8];
const UK_ZOOM = 6;

function getRiskColor(level: Region["riskLevel"]): string {
    if (typeof window === "undefined") {
        // SSR fallback
        return level === "low" ? "#1A7F4B" : level === "medium" ? "#A35C00" : "#e7000b";
    }
    const styles = getComputedStyle(document.documentElement);
    if (level === "low") return styles.getPropertyValue("--success").trim() || "#1A7F4B";
    if (level === "medium") return styles.getPropertyValue("--warning").trim() || "#A35C00";
    return styles.getPropertyValue("--destructive").trim() || "#e7000b";
}

export default function RegionMapClient() {
    const router = useRouter();
    const [regions, setRegions] = useState<Region[]>([]);

    useEffect(() => {
        getAllRegions().then(setRegions);
    }, []);

    return (
        <MapContainer
            center={UK_CENTER}
            zoom={UK_ZOOM}
            scrollWheelZoom={true}
            className="w-full h-full rounded-xl"
            style={{ minHeight: 480, background: "var(--muted)" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {regions.map((region) => {
                const color = getRiskColor(region.riskLevel);
                return (
                    <CircleMarker
                        key={region.slug}
                        center={region.coordinates}
                        radius={10}
                        pathOptions={{
                            color,
                            fillColor: color,
                            fillOpacity: 0.7,
                            weight: 2,
                        }}
                        eventHandlers={{
                            click: () => router.push(`/region/${region.slug}`),
                        }}
                    >
                        <Tooltip direction="top" offset={[0, -8]}>
                            <span className="font-sans text-sm">
                                <strong>{region.name}</strong>
                                <span className="font-mono ml-1.5 opacity-70">
                                    {region.overallScore}
                                </span>
                            </span>
                        </Tooltip>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
