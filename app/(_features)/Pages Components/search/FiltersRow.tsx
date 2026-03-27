"use client";
import React from "react";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import SortDropdown from "./SortDropdown";

export default function FiltersRow() {
  const t = useTranslations("Search");
  const {
    showCommercial,
    setShowCommercial,
    setFilterModalOpen,
    getActiveFiltersCount,
  } = useSearchStore();

  const activeCount = getActiveFiltersCount();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Filter Button */}
      <button
        id="filter-button"
        onClick={() => setFilterModalOpen(true)}
        className="
          relative flex items-center gap-1.5 px-4 py-2
          bg-white rounded-xl border border-primary-100
          text-sm font-semibold text-foreground
          hover:bg-primary-50 active:scale-[0.97]
          transition-all duration-200 shadow-sm
          cursor-pointer
        "
      >
        <SlidersHorizontal size={16} />
        <span>{t("filter")}</span>
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -end-1.5 min-w-[20px] h-5 flex items-center justify-center bg-secondary text-white text-[10px] font-bold rounded-full px-1">
            {activeCount}
          </span>
        )}
      </button>

      {/* Sort Dropdown */}
      <SortDropdown />

      {/* Commercial Activities Checkbox */}
      <label
        htmlFor="commercial-checkbox"
        className="
          flex items-center gap-2 px-4 py-2
          bg-white rounded-xl border border-primary-100
          text-sm font-medium text-foreground
          cursor-pointer select-none
          hover:bg-primary-50
          transition-all duration-200 shadow-sm
        "
      >
        <input
          id="commercial-checkbox"
          type="checkbox"
          checked={showCommercial}
          onChange={(e) => setShowCommercial(e.target.checked)}
          className="w-4 h-4 rounded border-primary-300 text-secondary focus:ring-secondary/30 cursor-pointer accent-secondary"
        />
        <span>{t("show_commercial")}</span>
      </label>
    </div>
  );
}
