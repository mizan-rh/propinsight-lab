"use client";

import { getAllRegions } from "@/lib/services/regionService";
import type { Region } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

export default function TopBar() {
    const pathname = usePathname();
    const breadcrumbs = buildBreadcrumbs(pathname);

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-10 h-12 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                {/* ─── Breadcrumb ──────────────────────────── */}
                <nav className="hidden sm:flex items-center gap-2" style={{ fontSize: "13.5px" }} aria-label="Breadcrumb">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={`${crumb.href}-${i}`} className="flex items-center gap-2">
                            {i > 0 && <ChevronIcon />}
                            {i < breadcrumbs.length - 1 ? (
                                <Link
                                    href={crumb.href}
                                    className="tracking-tight transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="font-medium tracking-tight text-foreground">
                                    {crumb.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            {/* ─── Right side ──────────────────────────────── */}
            <div className="flex items-center gap-3">
                <SearchInput />
                <ThemeToggle />
            </div>
        </header>
    );
}

/* ─── Theme Toggle ─────────────────────────────────────────────── */

function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    function toggle() {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {dark ? (
                /* Sun icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            ) : (
                /* Moon icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}

/* ─── Search Component ─────────────────────────────────────────── */

function SearchInput() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [regions, setRegions] = useState<Region[]>([]);
    const [results, setResults] = useState<Region[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllRegions().then(setRegions);
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([]);
            setIsOpen(false);
            return;
        }
        const q = query.toLowerCase();
        const filtered = regions.filter((r) =>
            r.name.toLowerCase().includes(q)
        );
        setResults(filtered);
        setIsOpen(filtered.length > 0);
        setActiveIndex(-1);
    }, [query, regions]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function navigate(slug: string) {
        setQuery("");
        setIsOpen(false);
        router.push(`/region/${slug}`);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!isOpen) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            navigate(results[activeIndex].slug);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    }

    return (
        <div ref={containerRef} className="relative hidden md:block w-full sm:w-60">
            <div className="relative group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-foreground transition-colors" />
                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-controls="search-dropdown"
                    aria-activedescendant={
                        activeIndex >= 0 ? `search-item-${activeIndex}` : undefined
                    }
                    placeholder="Search regions..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-card border border-border hover:border-ring focus:border-ring text-foreground transition-all outline-none placeholder:text-muted-foreground"
                    style={{ fontSize: "13px" }}
                />
            </div>

            {/* ─── Autocomplete Dropdown ─────────── */}
            {isOpen && query && (
                <div
                    id="search-dropdown"
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+8px)] w-full sm:w-[320px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 text-popover-foreground"
                >
                    {results.length > 0 ? (
                        results.map((region, i) => (
                            <button
                                key={region.slug}
                                id={`search-item-${i}`}
                                role="option"
                                aria-selected={i === activeIndex}
                                onClick={() => navigate(region.slug)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer transition-colors ${i === activeIndex
                                    ? "bg-muted"
                                    : "bg-transparent hover:bg-muted"
                                    }`}
                                style={{ fontSize: "13px" }}
                            >
                                <span className="font-medium">{region.name}</span>
                                <span className="font-mono bg-background px-2 py-0.5 border border-border rounded-full text-muted-foreground" style={{ fontSize: "11px" }}>
                                    {region.overallScore}
                                </span>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-center">
                            <div className="text-sm text-muted-foreground">No regions found matching &quot;{query}&quot;</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ─── Breadcrumb Builder ───────────────────────────────────────── */

function buildBreadcrumbs(
    pathname: string
): { label: string; href: string }[] {
    const crumbs: { label: string; href: string }[] = [
        { label: "Home", href: "/" },
    ];

    if (pathname.startsWith("/region/")) {
        const slug = pathname.replace("/region/", "");
        const name = slug.charAt(0).toUpperCase() + slug.slice(1);
        crumbs.push({ label: "Region", href: "/" });
        crumbs.push({ label: name, href: pathname });
    } else if (pathname === "/compare") {
        crumbs.push({ label: "Compare", href: "/compare" });
    }

    return crumbs;
}

/* ─── Icons ────────────────────────────────────────────────────── */

function SearchIcon({ size = 14, className = "" }: { size?: number, className?: string }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}
