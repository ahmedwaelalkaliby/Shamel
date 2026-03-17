"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { useState, useRef } from "react";
import { Eye, EyeOff, Camera, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/src/lib/validations/auth";
import { useRegister } from "@/src/hooks/useRegister";

export default function Page() {
    const t = useTranslations("SignUp");
    const locale = useLocale();
    const isRtl = locale === "ar";
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: register, isPending } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            type: "personal",
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: RegisterFormData) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("city", data.city);
        formData.append("type", data.type);
        if (data.image) {
            formData.append("image", data.image);
        }

        register(formData);
    };

    return (
        <main className="min-h-screen flex flex-col items-center font-sans overflow-x-hidden ">
            {/* Form Card */}
            <div className="w-full max-w-4xl bg-primary-200 py-10 px-6 md:px-10 flex flex-col flex-1 gap-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-800 leading-tight">
                            {t("title")}
                        </h1>
                        <p className="text-sm md:text-base text-primary-500 mt-1">
                            {t("description")}
                        </p>
                    </div>
                    <div className="w-20 h-16 flex-shrink-0">
                        <Image
                            src="/Logo.svg"
                            alt="Souq Shamel Logo"
                            width={80}
                            height={64}
                            style={{ height: 'auto' }}
                            className="object-contain"
                        />

                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center gap-2">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-24 h-24 rounded-full border-2 border-dashed border-secondary flex items-center justify-center cursor-pointer overflow-hidden bg-white/50 hover:bg-white/80 transition-colors"
                        >
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-secondary">
                                    <Camera size={24} />
                                    <span className="text-[10px] font-bold">Upload Image</span>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* username */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("username")}
                        </label>
                        <input
                            {...registerField("username")}
                            type="text"
                            className={`w-full rounded-xl border-2 ${errors.username ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("username")}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1 px-2">{errors.username.message}</p>}
                    </div>

                    {/* Account Type */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("account_type")}
                        </label>
                        <select
                            {...registerField("type")}
                            className={`w-full rounded-xl border-2 ${errors.type ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 font-medium appearance-none`}
                        >
                            <option value="personal">{t("personal")}</option>
                            <option value="commercial">{t("commercial")}</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-xs mt-1 px-2">{errors.type.message}</p>}
                    </div>

                    {/* City */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("city")}
                        </label>
                        <input
                            {...registerField("city")}
                            type="text"
                            className={`w-full rounded-xl border-2 ${errors.city ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("city")}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1 px-2">{errors.city.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("email")}
                        </label>
                        <input
                            {...registerField("email")}
                            type="email"
                            className={`w-full rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 px-2">{errors.email.message}</p>}
                    </div>

                    {/* Mobile Input */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("mobile")}
                        </label>
                        <input
                            {...registerField("phone")}
                            type="tel"
                            className={`w-full rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("mobile")}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 px-2">{errors.phone.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("password")}
                        </label>
                        <div className="relative">
                            <input
                                {...registerField("password")}
                                type={showPassword ? "text" : "password"}
                                className={`w-full rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right pr-6 pl-14' : 'text-left pl-6 pr-14'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                                placeholder={t("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'} text-gray-400 hover:text-gray-600 focus:outline-none`}
                            >
                                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 px-2">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative group">
                        <label className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                            {t("confirm_password")}
                        </label>
                        <div className="relative">
                            <input
                                {...registerField("password_confirmation")}
                                type={showPassword ? "text" : "password"}
                                className={`w-full rounded-xl border-2 ${errors.password_confirmation ? 'border-red-500' : 'border-secondary'} bg-transparent py-4 px-6 ${isRtl ? 'text-right pr-6 pl-14' : 'text-left pl-6 pr-14'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                                placeholder={t("confirm_password")}
                            />
                        </div>
                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 px-2">{errors.password_confirmation.message}</p>}
                    </div>

                    {/* Action Bulletins */}
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit"
                            disabled={isPending}
                            className="md:w-2/3 lg:w-1/2 px-12 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/50 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all text-white text-xl font-bold rounded-2xl py-4 shadow-lg flex items-center justify-center gap-2"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : null}
                            {t("signup_btn")}
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-700 font-bold text-base">
                            {t("have_account")}
                        </p>
                        <Link
                            href="/sign-in"
                            className="text-secondary font-bold text-sm hover:underline"
                        >
                            {t("click_login")}
                        </Link>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => router.push("/")}
                            className="md:w-2/3 lg:w-1/2 px-12 bg-gray-100 hover:bg-gray-200 cursor-pointer active:scale-95 transition-all text-gray-700 text-lg font-bold rounded-2xl py-4 shadow-sm"
                        >
                            {t("as_guest")}
                        </button>
                    </div>
                    
                </form>
            </div>
        </main>
    );
}
