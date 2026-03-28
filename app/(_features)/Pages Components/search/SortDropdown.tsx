"use client";
import React, { useRef, useEffect } from "react";
import { useSearchStore, SortOption } from "@/src/store/useSearchStore";
import { useTranslations } from "next-intl";
import { ArrowDownUp } from "lucide-react";

export default function SortDropdown() {
  const t = useTranslations("Search");
  const {
    sortOption,
    setSortOption,
    isSortDropdownOpen,
    setSortDropdownOpen,
  } = useSearchStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions: { value: SortOption; labelKey: string }[] = [
    { value: "newest", labelKey: "sort_newest" },
    { value: "oldest", labelKey: "sort_oldest" },
    { value: "price_asc", labelKey: "sort_price_low" },
    { value: "price_desc", labelKey: "sort_price_high" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false);
      }
    }
    if (isSortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortDropdownOpen, setSortDropdownOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="sort-button"
        onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
        className="
          flex items-center gap-1.5 px-4 py-2
          bg-white rounded-xl border border-primary-100
          text-sm font-semibold text-foreground
          hover:bg-primary-50 active:scale-[0.97]
          transition-all duration-200 shadow-sm
          cursor-pointer
        "
      >
        <ArrowDownUp size={16} />
        <span>{t("sort")}</span>
      </button>

      {isSortDropdownOpen && (
        <div
          className="
            absolute top-full mt-2 start-0
            min-w-[220px] bg-white rounded-xl
            border border-primary-100 shadow-lg
            z-50 overflow-hidden
            animate-in fade-in slide-in-from-top-2
          "
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortOption(option.value)}
              className={`
                w-full text-start px-4 py-3 text-sm font-medium
                transition-colors duration-150 cursor-pointer
                ${
                  sortOption === option.value
                    ? "bg-secondary/10 text-secondary font-bold"
                    : "text-foreground hover:bg-primary-50"
                }
              `}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
