"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Page() {
    const t = useTranslations("ForgetPassword");
    const locale = useLocale();
    const isRtl = locale === "ar";

    return (
        <main className="min-h-screen flex flex-col items-center overflow-x-hidden">
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

                
                {/* Recovery Action */}
                <div className="text-center">
                    <button className=" md:w-[50%] w-[60%] px-5 bg-secondary hover:bg-secondary/80 cursor-pointer active:scale-95 transition-all text-white text-xl md:text-3xl font-semibold rounded-2xl p-4 shadow-lg">
                        {t("recover_btn")}
                    </button>
                </div>
                
            </div>
        </main>
    );
}
