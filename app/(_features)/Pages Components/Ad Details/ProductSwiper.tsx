"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductSwiperProps {
    images?: string[];
}

export default function ProductSwiper({
    images = ["/swiper.jpg", "/swiper.jpg", "/swiper.jpg", "/swiper.jpg"],
}: ProductSwiperProps) {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

    return (
        <div className="relative w-full max-w-md md:max-w-5xl mx-auto select-none">
            {/* Left Arrow */}
            <button
                onClick={() => swiperRef?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Previous slide"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                >
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => swiperRef?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Next slide"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                >
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Swiper */}
            <div className="px-8">
                <Swiper
                    onSwiper={setSwiperRef}
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={1}
                    centeredSlides
                    loop={images.length > 1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                            centeredSlides: false,
                        },
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                        bulletClass: 'custom-bullet',
                        bulletActiveClass: 'custom-bullet-active',
                    }}
                    className="rounded-t-3xl shadow-lg overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full bg-white rounded-t-3xl overflow-hidden"
                                style={{ aspectRatio: '1 / 1' }}>
                                <Image
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Dot Pagination */}
            <div className="custom-pagination flex items-center justify-center gap-2 mt-4" />

            <style jsx global>{`
                .custom-bullet {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background: transparent;
                    border: 1.5px solid #9ca3af;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }
                .custom-bullet-active {
                    background: #dc2626;
                    border-color: #dc2626;
                    width: 8px;
                    height: 8px;
                }
            `}</style>
        </div>
    );
}