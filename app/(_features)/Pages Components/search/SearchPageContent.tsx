"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchStore } from "@/src/store/useSearchStore";
import { adService, SearchAdsParams } from "@/src/services/adService";
import { categoryService } from "@/src/services/categoryService";
import { Ad } from "@/src/types/category";
import { Category } from "@/src/types/category";
import SearchBar from "./SearchBar";
import FiltersRow from "./FiltersRow";
import FilterModal from "./FilterModal";
import AdsList from "./AdsList";

export default function SearchPageContent() {
  const locale = useLocale();
  const t = useTranslations("Search");

  const {
    searchQuery,
    selectedCategory,
    selectedCity,
    priceMin,
    priceMax,
    todayOffersOnly,
    showCommercial,
    sortOption,
  } = useSearchStore();

  const [ads, setAds] = useState<Ad[]>([]);
  const [commercialStores, setCommercialStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories once
  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesResponse = await categoryService.getCategories(locale);
        if (categoriesResponse.status) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, [locale]);

  // Fetch commercial stores when checkbox is checked
  useEffect(() => {
    if (!showCommercial) {
      setCommercialStores([]);
      return;
    }

    async function loadCommercialStores() {
      setLoading(true);
      try {
        const params: SearchAdsParams = { type: "commercial" };
        if (debouncedQuery) params.search = debouncedQuery;
        if (selectedCategory) params.category_id = selectedCategory;
        if (selectedCity) params.city_id = selectedCity;
        if (priceMin) params.min_price = priceMin;
        if (priceMax) params.max_price = priceMax;

        const response = await adService.searchAds(locale, params);
        console.log("Commercial Stores Response:", response);

        // Normalize: handle different response shapes
        let stores: any[] = [];
        if (response.status) {
          if (Array.isArray((response as any).commercials)) {
            stores = (response as any).commercials;
          } else {
            const rawData = response.data;
            if (Array.isArray(rawData)) {
              stores = rawData;
            } else if (
              rawData &&
              typeof rawData === "object" &&
              "data" in rawData
            ) {
              stores = Array.isArray((rawData as any).data) ? (rawData as any).data : [];
            }
          }
        }
        setCommercialStores(stores);
      } catch (error) {
        console.error("Error fetching commercial stores:", error);
        setCommercialStores([]);
      } finally {
        setLoading(false);
      }
    }
    loadCommercialStores();
  }, [
    locale,
    showCommercial,
    debouncedQuery,
    selectedCategory,
    selectedCity,
    priceMin,
    priceMax,
  ]);

  // Fetch regular ads when NOT in commercial mode
  useEffect(() => {
    if (showCommercial) return;

    async function loadAds() {
      setLoading(true);
      try {
        // Fetch all latest ads, or today's offers if checked
        // This ensures we always have data we can combine and filter locally
        const adsResponse = todayOffersOnly
          ? await adService.getTodayOffers(locale)
          : await adService.getLatestAds(locale);

        if (adsResponse.status) {
          const rawData = adsResponse.data;
          let adsArray: Ad[];

          if (Array.isArray(rawData)) {
            adsArray = rawData as unknown as Ad[];
          } else if (
            rawData &&
            typeof rawData === "object" &&
            "data" in rawData
          ) {
            adsArray = (rawData as unknown as { data: Ad[] }).data;
          } else {
            adsArray = [];
          }
          setAds(adsArray);
        } else {
          setAds([]);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setAds([]);
      } finally {
        setLoading(false);
      }
    }
    loadAds();
  }, [
    locale,
    showCommercial,
    todayOffersOnly, // Fetch different base data if Today Offers is clicked
  ]);

  // Apply filters and sorting locally
  const filteredAndSortedAds = useMemo(() => {
    let result = [...ads];

    // 1. Text Search
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase();
      result = result.filter(
        (ad) =>
          ad.title.toLowerCase().includes(q) ||
          (ad.description && ad.description.toLowerCase().includes(q)),
      );
    }

    // 2. Category
    if (selectedCategory) {
      result = result.filter(
        (ad) => String(ad.category_id) === selectedCategory,
      );
    }

    // 3. City
    if (selectedCity) {
      result = result.filter((ad) => String(ad.city_id) === selectedCity);
    }

    // 4. Price Min
    if (priceMin) {
      const min = parseFloat(priceMin);
      if (!isNaN(min)) {
        result = result.filter((ad) => parseFloat(ad.price) >= min);
      }
    }

    // 5. Price Max
    if (priceMax) {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) {
        result = result.filter((ad) => parseFloat(ad.price) <= max);
      }
    }

    // 6. Sort
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "price_asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price_desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
    }

    return result;
  }, [
    ads,
    debouncedQuery,
    selectedCategory,
    selectedCity,
    priceMin,
    priceMax,
    sortOption,
  ]);

  return (
    <main className="container max-w-5xl mx-auto px-4 py-6 space-y-5">
      {/* Search Bar */}
      <SearchBar />
      {/* Filters Row */}
      <FiltersRow />
      {/* Show commercial stores or regular ads */}
      {showCommercial ? (
        <AdsList
          ads={commercialStores}
          loading={loading}
          locale={locale}
          showCommercial={true}
        />
      ) : (
        <AdsList
          ads={filteredAndSortedAds}
          loading={loading}
          locale={locale}
          showCommercial={false}
        />
      )}
      {/* Filter Modal */}
      <FilterModal categories={categories} />
    </main>
  );
}
