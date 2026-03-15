"use client";

import { mockRegions } from "@/lib/mock/regions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
    const pathname = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();

    const mainNavLinks = [
        { href: "/", label: "Overview", icon: GridIcon },
        { href: "/compare", label: "Compare Regions", icon: ColumnsIcon },
    ];

    return (
        <Sidebar className="border-r border-sidebar-border" variant="sidebar" collapsible="offcanvas">
            {/* ─── Logo / Header ─────────────────────────── */}
            <SidebarHeader className="p-4 mb-2">
                <Link
                    href="/"
                    onClick={() => {
                        if (isMobile) setOpenMobile(false);
                    }}
                    className="flex items-center gap-2 px-2 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg shrink-0"
                >
                    <span
                        className="font-serif tracking-tight text-foreground"
                        style={{ fontSize: "19px", lineHeight: "1" }}
                    >
                        PropInsight
                    </span>
                    <span
                        className="font-sans font-normal text-muted-foreground"
                        style={{ fontSize: "11.5px", lineHeight: "1" }}
                    >
                        UK
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="hidden-scrollbar px-2 gap-6">
                {/* ─── Main Nav ───────────────────────────────── */}
                <SidebarGroup className="p-0">
                    <SidebarMenu>
                        {mainNavLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <SidebarMenuItem key={link.href}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        size="lg"
                                        className="h-10"
                                        render={
                                            <Link
                                                href={link.href}
                                                aria-label={link.label}
                                                onClick={() => {
                                                    if (isMobile) setOpenMobile(false);
                                                }}
                                                style={{ fontSize: "13.5px" }}
                                            />
                                        }
                                    >
                                        <span className={isActive ? "opacity-100" : "opacity-70"}>
                                            <link.icon />
                                        </span>
                                        <span>{link.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>

                {/* ─── Region Quick Select ────────────────────── */}
                <SidebarGroup className="p-0 mt-2">
                    <SidebarGroupLabel
                        className="uppercase tracking-widest font-medium px-2 mb-2 text-muted-foreground h-auto"
                        style={{ fontSize: "10.5px" }}
                    >
                        Regions
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {mockRegions.map((region) => {
                            const isActive = pathname === `/region/${region.slug}`;
                            return (
                                <SidebarMenuItem key={region.slug}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        size="lg"
                                        className="w-full justify-between h-auto py-2 px-2"
                                        render={
                                            <Link
                                                href={`/region/${region.slug}`}
                                                aria-label={`View ${region.name} analysis`}
                                                onClick={() => {
                                                    if (isMobile) setOpenMobile(false);
                                                }}
                                                style={{ fontSize: "13.5px" }}
                                            />
                                        }
                                    >
                                        <div className="truncate pr-2">{region.name}</div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span
                                                className="font-mono transition-colors"
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    color: isActive
                                                        ? "var(--sidebar-accent-foreground)"
                                                        : "var(--muted-foreground)",
                                                }}
                                            >
                                                {region.overallScore}
                                            </span>
                                            <RiskDot level={region.riskLevel} />
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* ─── Footer ─────────────────────────────── */}
            <SidebarFooter className="p-4 mt-auto">
                <div className="h-px bg-sidebar-border w-full mb-4"></div>
                <div className="px-2 text-muted-foreground" style={{ fontSize: "10.5px" }}>
                    For professional use.
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

/* ─── Internal Components ──────────────────────────────────────── */

function RiskDot({ level }: { level: "low" | "medium" | "high" }) {
    let color = "var(--success)";
    if (level === "medium") color = "var(--warning)";
    if (level === "high") color = "var(--destructive)";

    return (
        <div
            className="w-1.75 h-1.75 rounded-full"
            style={{ backgroundColor: color }}
            title={`Risk Level: ${level}`}
        />
    );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function GridIcon() {
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
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    );
}

function ColumnsIcon() {
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
            <rect x="3" y="3" width="7" height="18" rx="1.5" />
            <rect x="14" y="3" width="7" height="18" rx="1.5" />
        </svg>
    );
}
