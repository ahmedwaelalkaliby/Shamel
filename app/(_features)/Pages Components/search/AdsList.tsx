"use client";
import React from "react";
import { useTranslations } from "next-intl";
import AdCard from "./AdCard";
import { Ad } from "@/src/types/category";

interface AdsListProps {
  ads: Ad[];
  loading: boolean;
  locale: string;
  showCommercial?: boolean;
}

export default function AdsList({ ads, loading, locale, showCommercial }: AdsListProps) {
  const t = useTranslations("Search");

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary" />
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold text-foreground">
          {showCommercial ? t("companies_title") : t("ads_title")}
        </h2>
        <span className="text-sm text-primary-400 font-medium">
          ({ads.length} {t("result_count")})
        </span>
      </div>

      {/* Cards */}
      {ads.length > 0 ? (
        <div className="flex flex-col gap-3">
          {ads.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              category={undefined}
              price={showCommercial ? undefined : `${t("currency")} ${ad.price}`}
              imageUrl={ad.images?.[0]?.image_path}
              userName={undefined}
              location={ad.location}
              showCommercial={showCommercial}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-primary-400">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-base font-semibold">{t("no_results")}</p>
        </div>
      )}
    </div>
  );
}
