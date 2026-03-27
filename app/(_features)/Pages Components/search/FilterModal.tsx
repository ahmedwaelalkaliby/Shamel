"use client";
import React, { useState, useEffect } from "react";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useTranslations } from "next-intl";
import CustomModal from "@/app/(_features)/Global Components/Custom Modal/CustomModal";
import { Category } from "@/src/types/category";

interface FilterModalProps {
  categories: Category[];
}

const CITIES = [
  { key: "abu_dhabi", id: "1" },
  { key: "dubai", id: "2" },
  { key: "sharjah", id: "3" },
  { key: "ajman", id: "4" },
  { key: "umm_al_quwain", id: "5" },
  { key: "ras_al_khaimah", id: "6" },
  { key: "fujairah", id: "7" },
] as const;

export default function FilterModal({ categories }: FilterModalProps) {
  const t = useTranslations("Search");
  const {
    isFilterModalOpen,
    setFilterModalOpen,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    todayOffersOnly,
    setTodayOffersOnly,
    resetFilters,
  } = useSearchStore();

  // Local state — mirrors the store but only committed on "Apply"
  const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory);
  const [localCity, setLocalCity] = useState<string | null>(selectedCity);
  const [localPriceMin, setLocalPriceMin] = useState(priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(priceMax);
  const [localTodayOffers, setLocalTodayOffers] = useState(todayOffersOnly);

  // Sync local state from store whenever the modal opens
  useEffect(() => {
    if (isFilterModalOpen) {
      setLocalCategory(selectedCategory);
      setLocalCity(selectedCity);
      setLocalPriceMin(priceMin);
      setLocalPriceMax(priceMax);
      setLocalTodayOffers(todayOffersOnly);
    }
  }, [isFilterModalOpen]);

  const handleApply = () => {
    // Commit local state to the global store
    setSelectedCategory(localCategory);
    setSelectedCity(localCity);
    setPriceMin(localPriceMin);
    setPriceMax(localPriceMax);
    setTodayOffersOnly(localTodayOffers);
    setFilterModalOpen(false);
  };

  const handleReset = () => {
    // Reset local state
    setLocalCategory(null);
    setLocalCity(null);
    setLocalPriceMin("");
    setLocalPriceMax("");
    setLocalTodayOffers(false);
    // Also reset the global store
    resetFilters();
  };

  return (
    <CustomModal
      isOpen={isFilterModalOpen}
      onClose={() => setFilterModalOpen(false)}
      title={t("filter")}>
      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-3">
            {t("category")}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setLocalCategory(null)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${
                  !localCategory
                    ? "bg-secondary text-white shadow-md"
                    : "bg-primary-50 text-foreground hover:bg-primary-100 border border-primary-100"
                }
              `}>
              {t("all_categories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setLocalCategory(String(cat.id))}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    localCategory === String(cat.id)
                      ? "bg-secondary text-white shadow-md"
                      : "bg-primary-50 text-foreground hover:bg-primary-100 border border-primary-100"
                  }
                `}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        <div>
          <label
            htmlFor="city-select"
            className="block text-sm font-bold text-foreground mb-3">
            {t("city")}
          </label>
          <select
            id="city-select"
            value={localCity || ""}
            onChange={(e) => setLocalCity(e.target.value || null)}
            className="
              w-full py-3 px-4 bg-white rounded-xl
              border border-primary-100 text-sm text-foreground
              focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40
              transition-all duration-200 cursor-pointer
              appearance-none
            ">
            <option value="">{t("all_cities")}</option>
            {CITIES.map((city) => (
              <option key={city.id} value={city.id}>
                {t(`cities.${city.key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-3">
            {t("price_range")}
          </label>
          <div className="flex items-center gap-3">
            <input
              id="price-min"
              type="number"
              min="0"
              value={localPriceMin}
              onChange={(e) => setLocalPriceMin(e.target.value)}
              placeholder={t("price_min")}
              className="
                flex-1 py-3 px-4 bg-white rounded-xl
                border border-primary-100 text-sm text-foreground
                placeholder:text-primary-400
                focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40
                transition-all duration-200
              "
            />
            <span className="text-primary-400 font-bold">–</span>
            <input
              id="price-max"
              type="number"
              min="0"
              value={localPriceMax}
              onChange={(e) => setLocalPriceMax(e.target.value)}
              placeholder={t("price_max")}
              className="
                flex-1 py-3 px-4 bg-white rounded-xl
                border border-primary-100 text-sm text-foreground
                placeholder:text-primary-400
                focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* Today's Offers Checkbox */}
        <label
          htmlFor="today-offers-checkbox"
          className="
            flex items-center gap-3 px-4 py-3
            bg-primary-50 rounded-xl
            cursor-pointer select-none
            hover:bg-primary-100
            transition-all duration-200
          ">
          <input
            id="today-offers-checkbox"
            type="checkbox"
            checked={localTodayOffers}
            onChange={(e) => setLocalTodayOffers(e.target.checked)}
            className="w-4 h-4 rounded border-primary-300 text-secondary focus:ring-secondary/30 cursor-pointer accent-secondary"
          />
          <span className="text-sm font-medium text-foreground">
            {t("today_offers")}
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            id="apply-filters-btn"
            onClick={handleApply}
            className="
              flex-1 py-3 px-6 
              bg-secondary text-white 
              rounded-xl text-sm font-bold
              hover:bg-secondary/90 active:scale-[0.97]
              transition-all duration-200 
              shadow-md cursor-pointer
            ">
            {t("apply_filters")}
          </button>
          <button
            id="reset-filters-btn"
            onClick={handleReset}
            className="
              flex-1 py-3 px-6 
              bg-white text-foreground 
              rounded-xl text-sm font-bold
              border border-primary-200
              hover:bg-primary-50 active:scale-[0.97]
              transition-all duration-200 
              shadow-sm cursor-pointer
            ">
            {t("reset_filters")}
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
