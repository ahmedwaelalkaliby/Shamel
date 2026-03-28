"use client";

import React, { useState } from "react";
import { Heart, Bell, Search, Globe, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "@/src/hooks/useAuth";
import LanguageModal from "../../Global Components/Language Modal/LanguageModal";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const tProfile = useTranslations("Profile");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const isHomePage = pathname === "/";
    const isSearchPage = pathname.startsWith("/search");

    const getPageTitle = () => {
        if (pathname.startsWith("/profile")) return tProfile("profile_title");
        if (pathname.startsWith("/ads")) return t("ads");
        if (pathname.startsWith("/categories")) return t("categories");
        if (pathname.startsWith("/favorites")) return t("favorites");
        if (pathname.startsWith("/notifications")) return t("notifications");
        if (pathname.startsWith("/add-ad")) return t("add_ad");
        return "";
    };

    const pageTitle = getPageTitle();

    return (
        <nav className="bg-white rounded-b-2xl shadow-xl sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4 mx-auto">
                {/* Logo - First in JSX means Right in RTL */}
                <Link href="/">
                    <Image src="/Logo.svg" alt="Logo" width={50} height={50} className="cursor-pointer" />
                </Link>

                {/* Links (Desktop) */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className="hover:text-secondary transition-colors">{t("home")}</Link>
                    <Link href="/categories" className="hover:text-secondary transition-colors">{t("categories")}</Link>
                    <Link href="/ads" className="hover:text-secondary transition-colors">{t("ads")}</Link>
                    <Link href="/favorites" className="flex items-center gap-1 hover:text-secondary transition-colors">
                        <Heart size={18} />
                        {t("favorites")}
                    </Link>
                </div>

                {/* Search (Desktop) */}
                {!isSearchPage && (
                    <div 
                        className="hidden lg:flex items-center border rounded-lg px-3 py-2 w-[300px] bg-white cursor-text"
                        onClick={() => router.push("/search")}
                    >
                        <Search size={18} className="text-primary-500" />
                        <input
                            type="text"
                            placeholder={t("search_placeholder")}
                            className="outline-none px-2 w-full bg-transparent cursor-pointer"
                            onFocus={() => router.push("/search")}
                            readOnly
                        />
                    </div>
                )}

                {/* Actions - Last in JSX means Left in RTL */}
                <div className="flex items-center gap-4">
                    {/* Homepage Title for Mobile */}
                    {isHomePage && (
                        <span className="text-xl font-black text-primary-900 leading-tight md:hidden">
                            {t("home_title")}
                        </span>
                    )}

                    {/* Back Button and Page Name for sub-pages on Mobile */}
                    {!isHomePage && (
                        <div className="flex flex-col items-start md:hidden">
                            <span className="text-xl font-black text-primary-900 leading-tight">{pageTitle}</span>
                            <button
                                onClick={() => router.back()}
                                className="flex items-center text-sm font-bold gap-1 mt-1 hover:text-secondary transition-colors"
                            >
                                <span className="text-primary-900">{t("back")}</span>
                                <ChevronLeft size={20} className="text-secondary stroke-[3px]" />
                            </button>
                        </div>
                    )}

                    {/* Language Switcher - Visible on desktop only */}
                    <button
                        onClick={() => setIsLangModalOpen(true)}
                        className="hidden md:flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-secondary cursor-pointer transition-colors"
                    >
                        <Globe size={18} />
                        {locale === "ar" ? "English" : "العربية"}
                    </button>
                    <Link
                        href="/add-ad"
                        className="hidden md:block bg-secondary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors active:scale-95"
                    >
                        {t("add_ad")}
                    </Link>
                    <Link
                        href="/notifications"
                        className=" cursor-pointer transition-colors active:scale-95"
                    >
                        <Bell size={22} className="cursor-pointer hidden md:block" />
                    </Link>
                    <Link
                        href={isAuthenticated ? "/profile" : "/sign-in"}
                        className=" cursor-pointer transition-colors hover:text-secondary active:scale-95"
                    >
                        <AiOutlineUser size={30} className="border-2 rounded-full p-1 cursor-pointer hidden md:block" />
                    </Link>
                </div>
            </div>
            
            <LanguageModal 
                isOpen={isLangModalOpen} 
                onClose={() => setIsLangModalOpen(false)} 
            />
        </nav>
    );
}
