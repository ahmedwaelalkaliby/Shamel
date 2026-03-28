"use client";
import React from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useTranslations } from "next-intl";

export default function SearchBar() {
  const t = useTranslations("Search");
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
    <div className="relative w-full">
      <input
        id="search-input"
        type="text"
        autoFocus
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t("search_placeholder")}
        className="
          w-full py-3 px-4 pe-12
          bg-white rounded-xl
          border border-primary-100
          text-base text-foreground
          placeholder:text-primary-400
          focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40
          transition-all duration-200
          shadow-sm
        "
      />
      <Search
        className="absolute top-1/2 -translate-y-1/2 end-4 text-primary-400 pointer-events-none"
        size={20}
      />
    </div>
  );
}
