"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Page() {
    const t = useTranslations("MyAccount");
    const locale = useLocale();
    const isRtl = locale === "ar";

    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);

    return (
        <main className="min-h-screen flex flex-col items-center font-sans overflow-x-hidden">
            {/* Top Section: Logo and Tagline */}
            <div className="w-full pt-12 flex flex-col items-center px-6">
                <Image
                    src="/Logo.svg"
                    alt="Souq Shamel Logo"
                    width={220}
                    height={220}
                    className="h-auto w-44 md:w-56 mb-8"
                    priority
                />
                <h1 className="text-2xl md:text-4xl font-black text-black text-center leading-tight">
                    {t("tagline")}
                </h1>
            </div>

            {/* Middle Section: Hero Image */}
            <div className="w-full max-w-4xl px-4 relative z-10 mt-4">
                <Image
                    src="/HeroImage.svg"
                    alt="Community"
                    width={1200}
                    height={600}
                    className="w-full h-auto mx-auto"
                    priority
                />
            </div>

            {/* Bottom Section: Form Card */}
            <div className="w-full max-w-4xl bg-primary-200 rounded-t-3xl py-10 px-2 flex flex-col flex-1 gap-10">

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

                {/* Password Input */}
                <div className="relative group">
                    <label className={`absolute -top-3.5 ${isRtl ? 'right-6' : 'left-6'} bg-primary-200 px-2 text-[15px] text-[#CC0000] font-bold z-10`}>
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

                {/* Terms and Conditions Agreement */}
                <div className={`flex items-center gap-3 mt-1 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                    {isRtl ? (
                        <>
                            <span className="text-sm font-bold text-secondary text-right">
                                {t("terms")}
                            </span>
                            <button
                                onClick={() => setAgreed(!agreed)}
                                className={`w-8 h-8 rounded-full border-2 border-secondary flex flex-shrink-0 items-center justify-center transition-all ${agreed ? 'bg-secondary shadow-md' : 'bg-transparent'}`}
                                aria-label="Agree to terms"
                            >
                                {agreed && <Check size={20} className="text-white" strokeWidth={3} />}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setAgreed(!agreed)}
                                className={`w-8 h-8 rounded-full border-2 border-secondary flex flex-shrink-0 items-center justify-center transition-all ${agreed ? 'bg-secondary shadow-md' : 'bg-transparent'}`}
                                aria-label="Agree to terms"
                            >
                                {agreed && <Check size={20} className="text-white" strokeWidth={3} />}
                            </button>
                            <span className="text-sm font-bold text-secondary text-left">
                                {t("terms")}
                            </span>
                        </>
                    )}
                </div>

                {/* Login Action */}
                <button className="w-full bg-secondary hover:bg-secondary/80 cursor-pointer active:scale-95 transition-all text-white text-3xl font-bold rounded-2xl py-4 shadow-lg">
                    {t("login")}
                </button>
             
                
                <div className="flex flex-col items-center gap-5">
                {/* Password Recovery */}
                <Link href="#" className="text-center text-lg font-bold text-gray-600 hover:text-gray-800 transition-colors">
                    {t("forgot_password")}
                </Link>

                {/* Social Authentication */}
                <div className="flex flex-col items-center gap-3">
                    <p className="text-xl font-black text-black">{t("continue_with")}</p>
                    <div className="flex gap-6">
                        <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer transition-transform">
                            <Image src="/apple.svg" alt="Apple" width={55} height={57} />
                        </button>
                        <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer transition-transform">
                            <Image src="/google.svg" alt="Google" width={48} height={49} />
                        </button>
                    </div>
                </div>

                {/* Footer Engagement Links */}
                <div className="text-center">
                    <p className="text-lg text-black font-bold">
                        {t("no_account")}{" "}
                        <Link href="/register" className="text-secondary font-black hover:underline">
                            {t("signup")}
                        </Link>
                        {" "} {t("or")} {" "}
                        <Link href="/guest" className="text-secondary font-black hover:underline">
                            {t("guest")}
                        </Link>
                    </p>
                    </div>
                    

                </div>
            </div>
        </main>
    );
}
