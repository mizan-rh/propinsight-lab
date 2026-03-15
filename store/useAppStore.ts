import { create } from "zustand";

interface AppState {
    selectedRegion: string | null;
    compareRegions: [string | null, string | null];
    setSelectedRegion: (slug: string) => void;
    setCompareRegion: (index: 0 | 1, slug: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedRegion: null,
    compareRegions: [null, null],

    setSelectedRegion: (slug) =>
        set({ selectedRegion: slug }),

    setCompareRegion: (index, slug) =>
        set((state) => {
            const next: [string | null, string | null] = [...state.compareRegions];
            next[index] = slug;
            return { compareRegions: next };
        }),
}));
