import { create } from "zustand";

export type SortOption = "newest" | "oldest" | "price_asc" | "price_desc";

interface SearchState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedCity: string | null;
  priceMin: string;
  priceMax: string;
  todayOffersOnly: boolean;
  showCommercial: boolean;
  sortOption: SortOption;
  isFilterModalOpen: boolean;
  isSortDropdownOpen: boolean;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedCity: (city: string | null) => void;
  setPriceMin: (price: string) => void;
  setPriceMax: (price: string) => void;
  setTodayOffersOnly: (value: boolean) => void;
  setShowCommercial: (value: boolean) => void;
  setSortOption: (option: SortOption) => void;
  setFilterModalOpen: (open: boolean) => void;
  setSortDropdownOpen: (open: boolean) => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchQuery: "",
  selectedCategory: null,
  selectedCity: null,
  priceMin: "",
  priceMax: "",
  todayOffersOnly: false,
  showCommercial: false,
  sortOption: "newest",
  isFilterModalOpen: false,
  isSortDropdownOpen: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setPriceMin: (price) => set({ priceMin: price }),
  setPriceMax: (price) => set({ priceMax: price }),
  setTodayOffersOnly: (value) => set({ todayOffersOnly: value }),
  setShowCommercial: (value) => set({ showCommercial: value }),
  setSortOption: (option) => set({ sortOption: option, isSortDropdownOpen: false }),
  setFilterModalOpen: (open) => set({ isFilterModalOpen: open }),
  setSortDropdownOpen: (open) => set({ isSortDropdownOpen: open }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      selectedCity: null,
      priceMin: "",
      priceMax: "",
      todayOffersOnly: false,
    }),
  getActiveFiltersCount: () => {
    const state = get();
    let count = 0;
    if (state.selectedCategory) count++;
    if (state.selectedCity) count++;
    if (state.priceMin || state.priceMax) count++;
    if (state.todayOffersOnly) count++;
    return count;
  },
}));
