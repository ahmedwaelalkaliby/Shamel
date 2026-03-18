"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { AdCard } from './AdCard';
import { adService } from '@/src/services/adService';
import { favoriteService } from '@/src/services/favoriteService';
import { Ad, AdsResponse } from '@/src/types/ad';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';

interface AdsSectionProps {
    title: string;
    type: 'latest' | 'today' | 'favorites';
}

export default function AdsSection({ title, type }: AdsSectionProps) {
    const locale = useLocale();
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAds() {
            try {
                let response: AdsResponse;
                if (type === 'latest') {
                    response = await adService.getLatestAds(locale);
                } else if (type === 'today') {
                    response = await adService.getTodayOffers(locale);
                } else {
                    response = await favoriteService.getFavorites(locale);
                }

                if (response.status) {
                    setAds(response.data);
                }
            } catch (error: any) {
                if (error?.message?.includes('401') || error?.message?.includes('Unauthorized')) {
                    setAds([]);
                } else if (error?.response?.status === 429 || error?.status === 429) {
                    console.warn(`Rate limit reached for ads: ${title}. Too many requests.`);
                } else {
                    console.error(`Error fetching ads for ${title}:`, error);
                }
            } finally {
                setLoading(false);
            }
        }
        loadAds();
    }, [locale, type, title]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (ads.length === 0) return null;

    return (
        <section className="py-8 px-4 font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-xl font-bold text-primary-800 md:text-3xl">
                        {title}
                    </h2>
                    <Link href="/ads" className="text-blue-900 font-bold text-sm md:text-xl underline">
                        {locale === 'ar' ? 'المزيد' : 'More'}
                    </Link>
                </div>

                <div className="w-full mx-auto">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={12}
                        slidesPerView={2.5}
                        centeredSlides={false}
                        loop={ads.length > 4}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 3.2, spaceBetween: 16 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                            1280: { slidesPerView: 5, spaceBetween: 24 },
                        }}
                        className="w-full"
                    >
                        {ads.slice(0, 6).map((ad) => (
                            <SwiperSlide key={ad.id} className="h-auto">
                                <AdCard
                                    title={ad.title}
                                    price={`${ad.price} ${locale === 'ar' ? 'درهم' : 'AED'}`}
                                    imageUrl={ad.images?.[0]?.image_path || ''}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}