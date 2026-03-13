"use client";

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="py-12 px-6 flex flex-col items-center text-center font-sans lg:max-w-7xl lg:mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      
          {/* 1. Logo Section */}
          
          
      <div className="mb-10 flex flex-col items-center">
        <Image 
          src="/Logo.svg" 
          alt="Souq Shamel Logo" 
          width={280} 
          height={280} 
          className="h-auto w-56 md:w-72"
          priority
        />
      </div>

      {/* 2. Main Headline */}
      <div className="mb-10 text-center">
        <h1 className="text-[2.2rem] md:text-5xl lg:text-6xl font-semibold text-black leading-[1.2] tracking-tight whitespace-nowrap">
          {t("headline_main")} <br />
          {t("headline_sub")} <br />
          {t("headline_footer")}
        </h1>
      </div>

      {/* 3. Hero Image (The group of people) */}
      <div className="w-full max-w-5xl mb-14 drop-shadow-sm">
        <Image 
          src="/HeroImage.svg" 
          alt="People" 
          width={1200} 
          height={600} 
          className="w-full h-auto mx-auto"
          priority
        />
      </div>

      {/* 4. CTA Section */}
      <div className="flex flex-col items-center gap-6 mb-20 w-full">
        <h2 className="text-2xl font-black text-black mb-2">{t("try_it")}</h2>
        <div className="flex flex-col gap-4 items-center">
          <a href="#" className="transform transition hover:scale-105 active:scale-95">
            <Image src="/GooglePlay.svg" alt="Google Play" width={240} height={80} className="w-56 md:w-64 h-auto shadow-sm rounded-xl" />
          </a>
          <a href="#" className="transform transition hover:scale-105 active:scale-95">
            <Image src="/AppStore.svg" alt="App Store" width={240} height={80} className="w-56 md:w-64 h-auto shadow-sm rounded-xl" />
          </a>
        </div>
      </div>

      {/* 5. Features Section */}
          {/* The container uses flex-row-reverse on desktop for RTL if needed, 
    but Tailwind's 'start' and 'end' utilities are better for i18n */}
          <div className='flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-12 px-6 py-10 lg:py-20' dir={t("direction")}>

              {/* Text Content Column */}
              {/* lg:items-start aligns to the right in Arabic and left in English */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start space-y-6">

                  <div className="space-y-3">
                      <h2 className="text-2xl md:text-4xl font-black text-black leading-tight">
                          {t("no_complexity_title")}
                      </h2>
                      <p className="text-lg md:text-2xl font-bold text-gray-800">
                          {t("one_app")} <br className="hidden md:block" />
                          {t("services")}
                      </p>
                  </div>

                  {/* Feature List */}
                  <div className="flex flex-col gap-4 w-full">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                          <div
                              key={num}
                              className="flex items-center justify-center lg:justify-start gap-3 text-lg md:text-xl font-bold text-black"
                          >
                              {/* Icon stays on the "start" side (right for AR, left for EN) */}
                              <span className="text-green-500 flex-shrink-0">✅</span>
                              <span className="leading-snug">{t(`feature_${num}`)}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Image Column */}
              <div className="flex-1 w-full flex items-center justify-center">
                  <div className="relative w-full max-w-md lg:max-w-xl">
                      <Image
                          src="/HeroImage2.svg"
                          alt="Categories"
                          width={800}
                          height={400}
                          className="w-full h-auto object-contain"
                          priority
                      />
                  </div>
              </div>
          </div>
    </section>
  );
}