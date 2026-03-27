"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Video, Plus, X, Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdSchema, type CreateAdFormData } from "@/src/lib/validations/ad";
import { useCreateAd } from "@/src/hooks/useCreateAd";
import { useCategories, useCategoryDetails } from "@/src/hooks/useCategories";
import Image from 'next/image';

export default function AdForm() {
    const t = useTranslations("AdForm");
    const locale = useLocale();
    const isRtl = locale === "ar";
    
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const { mutate: createAd, isPending } = useCreateAd();
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        resetField,
        formState: { errors },
    } = useForm<CreateAdFormData>({
        resolver: zodResolver(createAdSchema) as any,
        defaultValues: {
            images: [],
            is_featured: false,
        }
    });

    const selectedCategoryId = watch("category_id");
    const { data: categoryDetailsData, isLoading: detailsLoading } = useCategoryDetails(selectedCategoryId);

    // Reset sub-category when category changes
    useEffect(() => {
        resetField("category_detail_id");
    }, [selectedCategoryId, resetField]);

    const selectedImages = watch("images") || [];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newImages = [...selectedImages, ...files];
            setValue("images", newImages); 
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setValue("images", newImages);
        const newPreviews = [...imagePreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("video", file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setValue("video", undefined);
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        setVideoPreview(null);
    };

    const onSubmit: SubmitHandler<CreateAdFormData> = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category_id", data.category_id);
        formData.append("category_detail_id", data.category_detail_id);
        formData.append("city_id", data.city_id);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("is_featured", data.is_featured ? "1" : "0");
        if (data.location) formData.append("location", data.location);
        formData.append("phone", data.phone);
        if (data.email) formData.append("email", data.email);
        
        if (data.images && Array.isArray(data.images)) {
            data.images.forEach((image) => {
                formData.append("images[]", image);
            });
        }

        if (data.video) {
            formData.append("video", data.video);
        }

        createAd(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit as any)} className='space-y-4 md:space-y-8'>
            {/* title section */}
            <div className='space-y-4'>
                <label htmlFor="title" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                    {t("title")}
                </label>
                <input 
                    {...register("title")}
                    type="text" 
                    id="title" 
                    placeholder={t("title_placeholder")} 
                    className={`w-full bg-white border-2 ${errors.title ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-primary-500'} rounded-lg p-4 outline-none focus:border-secondary transition-colors`} 
                />
                {errors.title && <p className="text-red-500 text-sm font-medium">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* category section */}
                <div className='space-y-4'>
                    <label htmlFor="category_id" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                        {t("category")}
                    </label>
                    <select 
                        {...register("category_id")}
                        id="category_id" 
                        disabled={categoriesLoading}
                        className={`w-full bg-white border-2 ${errors.category_id ? 'border-red-500' : 'border-primary-500'} rounded-lg p-4 outline-none focus:border-secondary transition-colors appearance-none disabled:bg-gray-100`}
                    >
                        <option value="">{categoriesLoading ? "Loading..." : t("category_placeholder")}</option>
                        {categoriesData?.data?.map((cat: any) => (
                            <option key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500 text-sm font-medium">{errors.category_id.message}</p>}
                </div>

                {/* sub-category section (category_detail_id) */}
                <div className='space-y-4'>
                    <label htmlFor="category_detail_id" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                        {locale === "ar" ? "القسم الفرعي" : "Sub-Category"}
                    </label>
                    <select 
                        {...register("category_detail_id")}
                        id="category_detail_id" 
                        disabled={!selectedCategoryId || detailsLoading}
                        className={`w-full bg-white border-2 ${errors.category_detail_id ? 'border-red-500' : 'border-primary-500'} rounded-lg p-4 outline-none focus:border-secondary transition-colors appearance-none disabled:bg-gray-100`}
                    >
                        <option value="">{detailsLoading ? "Loading..." : (locale === "ar" ? "اختر القسم الفرعي" : "Select Sub-Category")}</option>
                        {categoryDetailsData?.data?.details?.map((detail: any) => (
                            <option key={detail.id} value={detail.id.toString()}>
                                {locale === "ar" ? detail.name_ar : detail.name_en}
                            </option>
                        ))}
                    </select>
                    {errors.category_detail_id && <p className="text-red-500 text-sm font-medium">{errors.category_detail_id.message}</p>}
                </div>
            </div>

            {/* city section */}
            <div className='space-y-4'>
                <label htmlFor="city_id" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                    {t("city")}
                </label>
                <select 
                    {...register("city_id")}
                    id="city_id" 
                    className={`w-full bg-white border-2 ${errors.city_id ? 'border-red-500' : 'border-primary-500'} rounded-lg p-4 outline-none focus:border-secondary transition-colors appearance-none`}
                >
                    <option value="">{t("city_placeholder")}</option>
                    <option value="1">أبو ظبي</option>
                    <option value="2">دبي</option>
                    <option value="3">الشارقة</option>
                    <option value="4">عجمان</option>
                    <option value="5">أم القيوين</option>
                    <option value="6">رأس الخيمة</option>
                    <option value="7">الفجيرة</option>
                    <option value="8">العين</option>
                    <option value="9">الظفرة</option>
                </select>
                {errors.city_id && <p className="text-red-500 text-sm font-medium">{errors.city_id.message}</p>}
            </div>

            {/* description section */}
            <div className='space-y-4'>
                <label htmlFor="description" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                    {t("description")}
                </label>
                <p className='text-sm md:text-base text-primary-600 font-medium'>
                    {t("description_subtext")}
                </p>
                <textarea 
                    {...register("description")}
                    id="description" 
                    placeholder={t("description_placeholder")} 
                    className={`w-full bg-white border-2 ${errors.description ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-primary-500'} rounded-lg p-4 h-32 outline-none focus:border-secondary transition-colors resize-none`} 
                />
                {errors.description && <p className="text-red-500 text-sm font-medium">{errors.description.message}</p>}
            </div>

            {/* images section */}
            <div className='space-y-4'>
                <label className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                    {t("images_title")}
                </label>
                <p className='text-sm md:text-base text-primary-600 font-medium'>
                    {t("images_subtext")}
                </p>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {/* Photo Upload */}
                    <label htmlFor="image-upload" className="cursor-pointer group">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl flex flex-col items-center justify-center shadow-md border-2 border-dashed border-primary-500 transition-all hover:border-secondary hover:shadow-secondary/20">
                            <div className="relative">
                                <Plus className="text-secondary absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 font-bold" strokeWidth={3} />
                                <Camera className="text-secondary w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
                            </div>
                        </div>
                        <input 
                            type="file" 
                            id="image-upload" 
                            multiple 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageChange}
                        />
                    </label>

                    {/* Image Previews */}
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-md border-2 border-white group">
                            <Image src={preview} alt={`Preview ${index}`} fill className="object-cover" />
                            <button 
                                type="button" 
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    {/* Video Upload */}
                    {!videoPreview ? (
                        <label htmlFor="video-upload" className="cursor-pointer group">
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl flex flex-col items-center justify-center shadow-md border-2 border-dashed border-primary-500 transition-all hover:border-secondary hover:shadow-secondary/20">
                                <div className="relative">
                                    <div className="absolute -bottom-1 -left-1 w-full h-full border-b-4 border-l-4 border-secondary rounded-bl-lg -z-10"></div>
                                    <Video className="text-secondary w-10 h-10 md:w-14 md:h-14 fill-secondary" />
                                </div>
                            </div>
                            <input 
                                type="file" 
                                id="video-upload" 
                                className="hidden" 
                                accept="video/*" 
                                onChange={handleVideoChange}
                            />
                        </label>
                    ) : (
                        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-md border-2 border-white bg-gray-100 flex items-center justify-center group">
                            <video src={videoPreview} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <Video className="text-white w-10 h-10" />
                            </div>
                            <button 
                                type="button" 
                                onClick={removeVideo}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
                {errors.images && <p className="text-red-500 text-sm font-medium">{errors.images.message}</p>}
            </div>

            {/* price section */}
            <div className='space-y-4'>
                <label htmlFor="price" className='text-lg md:text-xl text-primary-900 font-bold mb-2 block'>
                    {t("price")}
                </label>
                <p className='text-sm md:text-base text-primary-600 font-medium'>
                    {t("price_subtext")}
                </p>
                <div className={`flex flex-row items-center gap-4 mt-2 ${isRtl ? 'justify-start' : 'justify-start'}`}>
                    <div className="relative w-full md:w-1/3">
                        <input 
                            {...register("price")}
                            type="number" 
                            id="price" 
                            placeholder={t("price_placeholder")} 
                            className={`w-full bg-white border-2 ${errors.price ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-primary-500'} rounded-lg p-4 outline-none focus:border-secondary transition-colors`} 
                        />
                        <span className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'} text-primary-900 font-bold`}>
                            AED
                        </span>
                    </div>
                </div>
                {errors.price && <p className="text-red-500 text-sm font-medium">{errors.price.message}</p>}
            </div>

            <hr  className='w-full border-primary-900/10'/>
            
            {/* contact section */}
            <div className='space-y-4  md:space-y-6'>
                <h2 className='text-lg md:text-xl text-primary-900 font-bold mb-2 md:mb-4'>
                    {t("contact_methods")}
                </h2>

                <div className="relative group">
                    <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                        {t("email")}
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className={`w-full rounded-xl border-2 ${errors.email ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("email_placeholder")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email.message}</p>}
                </div>
                
                <div className="relative group">
                    <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                        {t("phone")}
                    </label>
                    <input
                        {...register("phone")}
                        type="text"
                        className={`w-full rounded-xl border-2 ${errors.phone ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("phone_placeholder")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone.message}</p>}
                </div>    
            </div>
               
            {/* publish button */}
            <div className='space-y-4 mt-10 md:mt-20'>
                {/* Featured checkbox */}
                <div className='flex flex-row items-center gap-2'>
                    <input 
                        {...register("is_featured")}
                        type="checkbox" 
                        id="is_featured" 
                        className='w-6 h-6 cursor-pointer accent-secondary border-2 border-secondary rounded' 
                    />
                    <label htmlFor="is_featured" className='text-lg md:text-xl text-primary-900 font-bold cursor-pointer select-none'>
                        إعلان مميز (Featured Ad)
                    </label>
                </div>
                
                <div className='flex flex-row items-center justify-center  gap-4 mt-2'>
                    <button 
                        type="submit"
                        disabled={isPending}
                        className='bg-secondary text-white text-lg md:text-xl font-bold px-12 py-4 md:px-20 cursor-pointer hover:bg-secondary/90 active:scale-95 rounded-2xl flex items-center gap-3 shadow-xl disabled:bg-secondary/60 transition-all min-w-[200px] justify-center'
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : null}
                        {t("publish_btn")}
                    </button>
                </div>
            </div>
        </form>
    );
}