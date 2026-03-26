"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductSwiperProps {
    images?: string[];
}

export default function ProductSwiper({ images = [] }: ProductSwiperProps) {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="relative w-full max-w-md mx-auto select-none">
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
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    centeredSlides
                    loop={images.length > 1}
                    breakpoints={{
                        768: {
                            slidesPerView: 1,
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
                            <div className="relative w-full bg-primary-500 rounded-t-3xl overflow-hidden cursor-zoom-in"
                                style={{ aspectRatio: '1 / 1' }}
                                onClick={() => setSelectedIndex(index)}>
                                <Image
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Dot Pagination */}
            <div className="custom-pagination flex items-center justify-center gap-2 mt-4" />

            {/* Fullscreen Image Overlay */}
            {selectedIndex !== null && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-[110] transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex(null);
                        }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Left Modal Arrow */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center w-12 h-12 text-white hover:text-gray-300 transition-colors"
                            aria-label="Previous image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Right Modal Arrow */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center w-12 h-12 text-white hover:text-gray-300 transition-colors"
                            aria-label="Next image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    <div 
                        className="relative w-full max-w-5xl h-full max-h-[85vh] transition-all duration-300 transform scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt="Full Screen Product"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}

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