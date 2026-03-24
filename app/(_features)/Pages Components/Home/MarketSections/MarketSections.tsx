"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Category } from '@/src/types/category';
import { categoryService } from '@/src/services/categoryService';
import { useRouter } from 'next/navigation';

export default function MarketSections() {
  const t = useTranslations("MarketSections");
  const locale = useLocale();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await categoryService.getCategories(locale);
        if (result.status) {
          setCategories(result.data);
        }
      } catch (error: any) {
        if (error?.response?.status === 429 || error?.status === 429) {
          console.warn("Rate limit reached for categories API. Too many requests.");
        } else {
          console.error("Error fetching categories:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <section className=" py-8 px-4 font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 md:text-2xl mb-6 px-2">
          {t("title")}
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow aspect-[4/5] border border-gray-100 cursor-pointer"
              onClick={() => router.push(`/${locale}/${category.id}`)}
            >
              <div className="relative w-full h-12 mb-3">
                <Image
                  src={`https://souqshamel.com/public/${category.image}`}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm md:text-lg font-bold text-gray-900 text-center leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}