"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error in component:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center h-full min-h-70">
                    <div className="text-destructive mb-4">
                        <WarningIcon />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        Unable to load this chart
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                        There was an issue rendering this visualization. Please try refreshing.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-muted hover:bg-accent transition-colors border border-border rounded-lg text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

function WarningIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}
