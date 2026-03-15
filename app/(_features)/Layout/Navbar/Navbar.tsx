"use client";

import { Heart, Bell, Search, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === "ar" ? "en" : "ar";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className="bg-white rounded-b-2xl shadow-xl sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4 mx-auto">
                {/* Logo */}
                <Link href="/">
                    <Image src="/Logo.svg" alt="Logo" width={50} height={50} className="cursor-pointer" />
                </Link>

                {/* Links */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className="hover:text-secondary transition-colors">{t("home")}</Link>
                    <Link href="/categories" className="hover:text-secondary transition-colors">{t("categories")}</Link>
                    <Link href="/ads" className="hover:text-secondary transition-colors">{t("ads")}</Link>
                    <Link href="/favorites" className="flex items-center gap-1 hover:text-secondary transition-colors">
                        <Heart size={18} />
                        {t("favorites")}
                    </Link>
                </div>

                {/* Search */}
                <div className="hidden lg:flex items-center border rounded-lg px-3 py-2 w-[300px] bg-white">
                    <Search size={18} className="text-primary-500" />
                    <input
                        type="text"
                        placeholder={t("search_placeholder")}
                        className="outline-none px-2 w-full bg-transparent"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-secondary cursor-pointer transition-colors"
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
                        href="/sign-in"
                        className=" cursor-pointer transition-colors hover:text-secondary active:scale-95"
                    >
                        <AiOutlineUser size={30} className="border-2 rounded-full p-1 cursor-pointer hidden md:block" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
