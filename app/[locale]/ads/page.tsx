"use client";
import React, { useEffect, useState } from 'react';
import AdBigCard from '../../(_features)/Pages Components/Ads/AdBigCard';
import { Ad, AdsResponse } from '@/src/types/ad';
import { adService } from '@/src/services/adService';
import { useLocale } from 'next-intl';

export default function AdsPage() {
    const locale = useLocale();
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAds() {
            try {
                const response: AdsResponse = await adService.getLatestAds(locale);

                if (response.status) {
                    setAds(response.data);
                }
            } catch (error: any) {
                console.error('Error fetching ads:', error);
            } finally {
                setLoading(false);
            }
        }
        loadAds();
    }, [locale]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[50vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <main className="container px-4 max-w-7xl mx-auto py-8 font-sans">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 px-2" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                {locale === 'ar' ? 'الإعلانات' : 'Ads'}
            </h1>
            
            {ads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ads.map((ad) => (
                        <AdBigCard
                            key={ad.id}
                            title={ad.title}
                            price={`${ad.price} ${locale === 'ar' ? 'درهم' : 'AED'}`}
                            description={ad.description}
                            imageUrl={ad.images?.[0]?.image_path || '/repair-service.png'}
                            locale={locale as 'ar' | 'en'}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center py-10 text-gray-500 font-bold text-lg" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                    {locale === 'ar' ? 'لا توجد إعلانات حاليا' : 'No ads available right now'}
                </div>
            )}
        </main>
    );
}