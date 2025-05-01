import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
  setSearchQuery: (searchQuery: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setSelectedTag: (selectedTag: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: new URLSearchParams(window.location.search).get("search") || "",
  sortBy: new URLSearchParams(window.location.search).get("sortBy") || "",
  sortOrder: new URLSearchParams(window.location.search).get("sortOrder") || "asc",
  selectedTag: new URLSearchParams(window.location.search).get("tag") || "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
}));