"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface AdBigCardProps {
    id?: number | string;
    title?: string;
    price?: string;
    description?: string;
    imageUrl?: string;
    locale?: 'ar' | 'en';
}

export default function AdBigCard({
    id,
    title,
    price,
    description,
    imageUrl,
    locale
}: AdBigCardProps) {
    const isRtl = locale === 'ar';

    const getFullImageUrl = (url?: string) => {
        if (!url) return '/logo.svg';
        if (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) {
            return url;
        }
        return `https://souqshamel.com/storage/app/public/${url}`;
    };

    const finalImageUrl = getFullImageUrl(imageUrl);

    return (
        <Link 
            href={`/${locale || 'en'}/ads/${id || ''}`}
            className="w-full min-w-[350px] max-w-[450px] mx-auto bg-white rounded-t-3xl shadow-lg overflow-hidden border border-gray-100 mb-6 group transition-all duration-300 hover:shadow-xl block"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* 1. Image Section */}
            <div className="relative aspect-[16/12] bg-primary-500 w-full overflow-hidden flex items-center justify-center">
                <Image
                    src={finalImageUrl}
                    alt={title || "Image"}
                        width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    priority
                />
            </div>

            {/* 2. Content Section */}
            <div className="p-2 md:p-4 space-y-4 min-h-[100px]">
                {/* Header: Title and Price */}
                <div className="flex flex-row justify-between items-baseline gap-2 ">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight line-clamp-1">
                        {title}
                    </h2>
                    <span className="text-lg md:text-xl font-black text-gray-900 whitespace-nowrap">
                        {price}
                    </span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg font-bold text-gray-700 leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </Link>
    );
}