"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { categoryService } from "@/src/services/categoryService";
import { Category } from "@/src/types/category";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getCategories(locale);
                if (response.status) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error loading categories for footer:", error);
            }
        };
        fetchCategories();
    }, [locale]);

    return (
        <footer className="bg-white text-primary-900 pb-25 sm:pb-5 rounded-t-2xl">

            <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-12">

                {/* Logo + About */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        {t("footer_title")}
                    </h2>

                    <Image src="./Logo.svg" alt="Logo" className="w-20 h-20" width={100} height={100} />

                    <p className="text-sm text-primary-900 leading-6">
                        {t("footer_about")}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">
                        {t("footer_quick_links")}
                    </h3>

                    <ul className="space-y-2 text-primary-900 flex flex-col">
                        <li>
                            <Link href="/" className="hover:text-secondary transition-colors">{t("home")}</Link>
                        </li>

                        <li>
                            <Link href="/ads" className="hover:text-secondary transition-colors">{t("ads")}</Link>
                        </li>

                        <li>
                            <Link href="/categories" className="hover:text-secondary transition-colors">{t("categories")}</Link>
                        </li>

                        <li>
                            <Link href="/favorites" className="hover:text-secondary transition-colors">{t("favorites")}</Link>
                        </li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">
                        {t("footer_popular_categories")}
                    </h3>

                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-primary-900">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link 
                                    href={`/${category.id}`} 
                                    className="hover:text-secondary transition-colors text-sm line-clamp-1"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div className="flex flex-col items-center md:items-start gap-4">

                    {/* Social Media Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-semibold text-lg">
                            {t("footer_follow_us")}
                        </h3>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, color: "hover:bg-blue-600" },
                                { Icon: Instagram, color: "hover:bg-pink-600" },
                                { Icon: Twitter, color: "hover:bg-sky-500" },
                            ].map(({ Icon, color }, index) => (
                                <div
                                    key={index}
                                    className="p-2.5 text-primary-900 transition-all duration-300 hover:text-secondary  cursor-pointer"
                                >
                                    <Icon size={20} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* App Download Section */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h3 className="font-semibold text-lg ">
                            {t("download_app")}
                        </h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.shamel.souq"
                                className="transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md rounded-lg overflow-hidden"
                            >
                                <Image
                                    src="/GooglePlay.svg"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className="h-10 w-auto object-contain bg-black"
                                />
                            </Link>
                            <Link
                                href="https://apps.apple.com/us/app/souq-shamel/id6748286431"
                                className="transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md rounded-lg overflow-hidden"
                            >
                                <Image
                                    src="/AppStore.svg"
                                    alt="Download on the App Store"
                                    width={135}
                                    height={40}
                                    className="h-10 w-auto object-contain bg-black"
                                />
                            </Link>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto border-t border-primary-800 text-center py-4 text-sm text-primary-800">
                © <span className="text-secondary font-semibold ">{new Date().getFullYear()}</span> {t("footer_rights")}
            </div>

        </footer>
    );
}
