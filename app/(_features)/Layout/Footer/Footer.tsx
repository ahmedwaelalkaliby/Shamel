"use client";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-white text-primary-900 mt-20 pb-25 sm:pb-5 rounded-t-2xl">

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

                    <ul className="space-y-2 text-primary-900 flex flex-col">
                        <li>
                            <Link href="/categories/cars" className="hover:text-secondary transition-colors">{t("footer_cars")}</Link>
                        </li>
                        <li>
                            <Link href="/categories/real-estate" className="hover:text-secondary transition-colors">{t("footer_real_estate")}</Link>
                        </li>
                        <li>
                            <Link href="/categories/mobiles" className="hover:text-secondary transition-colors">{t("footer_mobiles")}</Link>
                        </li>
                        <li>
                            <Link href="/categories/furniture" className="hover:text-secondary transition-colors">{t("footer_furniture")}</Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">
                        {t("footer_follow_us")}
                    </h3>

                    <div className="flex gap-4">
                        <Facebook className="cursor-pointer hover:text-secondary" />
                        <Instagram className="cursor-pointer hover:text-secondary" />
                        <Twitter className="cursor-pointer hover:text-secondary" />
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
