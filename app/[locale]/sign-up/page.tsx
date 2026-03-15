"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Page() {
    const t = useTranslations("SignUp");
    const locale = useLocale();
    const isRtl = locale === "ar";

    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    return (
        <main className="min-h-screen flex flex-col items-center font-sans overflow-x-hidden">
            {/* Bottom Section: Form Card */}
            <div className="w-full max-w-4xl bg-primary-200 rounded-t-3xl py-10 px-2 flex flex-col flex-1 gap-10">
                <div className="flex items-center justify-between mb-2">
                    <div className=" flex-1">
                        <h1 className="text-2xl font-extrabold text-primary-800 leading-tight">
                            {t("title")}
                        </h1>
                        <p className="text-sm text-primary-500 mt-1">
                            {t("description")}
                        </p>
                    </div>
                    <div className="w-20 h-16 flex-shrink-0">
                        <Image
                            src="/Logo.svg"
                            alt="Souq Shamel Logo"
                            width={80}
                            height={64}
                            className="object-contain"
                        />
                    </div>
                </div>
                {/* user name */}
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("username")}
                    </label>
                    <input
                        type="text"
                        className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("username")}
                    />
                </div>

                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("account_type")}
                    </label>
                    <input
                        type="text"
                        className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("personal_commercial")}
                    />
                </div>
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("city")}
                    </label>
                    <input
                        type="text"
                        className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("city")}
                    />
                </div>
                {/* Email Input */}
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("email")}
                    />
                </div>

                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("mobile")}
                    </label>
                    <input
                        type="phone"
                        className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right' : 'text-left'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                        placeholder={t("mobile")}
                    />
                </div>

                {/* Password Input */}
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("password")}
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right pr-6 pl-14' : 'text-left pl-6 pr-14'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'} text-gray-400 hover:text-gray-600 focus:outline-none`}
                        >
                            {showPassword ? <EyeOff size={24} strokeWidth={2.5} /> : <Eye size={24} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>

                
                {/* Retype Password */}
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-secondary font-bold z-10`}>
                        {t("confirm_password")}
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4.5 px-6 ${isRtl ? 'text-right pr-6 pl-14' : 'text-left pl-6 pr-14'} text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                            placeholder={t("confirm_password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'} text-gray-400 hover:text-gray-600 focus:outline-none`}
                        >
                            {showPassword ? <EyeOff size={24} strokeWidth={2.5} /> : <Eye size={24} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>

                
                {/* Login Action */}
                <div className="text-center">
                    <button className=" md:w-[30%] w-[50%] px-12 bg-secondary hover:bg-secondary/80 cursor-pointer active:scale-95 transition-all text-white text-xl md:text-3xl font-semibold rounded-2xl p-4 shadow-lg">
                        {t("signup_btn")}
                    </button>
                </div>
                
                
                {/* رابط تسجيل الدخول */}
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
                
                <div className="text-center">
                    <button className=" md:w-[30%] w-[50%] px-12 bg-secondary hover:bg-secondary/80 cursor-pointer active:scale-95 transition-all text-white text-xl md:text-3xl font-semibold rounded-2xl p-4 shadow-lg">
                        {t("as_guest")}
                    </button>
                </div>
            </div>
        </main>
    );
}
