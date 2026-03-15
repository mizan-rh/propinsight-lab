"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PageShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex-1 min-w-0 flex flex-col bg-background relative overflow-hidden">
                <TopBar />
                <div className="flex-1 p-4 sm:p-6 md:p-8 w-full mx-auto">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
