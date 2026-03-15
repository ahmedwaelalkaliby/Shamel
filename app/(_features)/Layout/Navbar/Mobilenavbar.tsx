"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Bell, Search, Home } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useTranslations } from "next-intl";

export default function MobileNavbar() {
    const pathname = usePathname();
    const t = useTranslations("Navigation");

    const navItems = [
        { href: "/sign-in", icon: <AiOutlineUser size={30} />, label: t("my_account") },
        { href: "/notifications", icon: <Bell size={30} />, label: t("notifications") },
        { href: "/add-ad", icon: <IoMdAdd size={30} />, label: t("add_ad") },
        { href: "/search", icon: <Search size={30} />, label: t("search") },
        { href: "/", icon: <Home size={30} />, label: t("home") },
    ];

    return (
        <div className="md:hidden bg-white fixed bottom-0 left-0 right-0 text-white p-5 flex justify-between items-center z-50 rounded-t-2xl">
            {navItems.map(({ href, icon, label }) => {
                const isActive = pathname === href;
                return (
                    <Link key={href} href={href} className="flex flex-col items-center gap-1">
                        <div className={`bg-white p-1 rounded-full text-secondary border-2 transition-colors duration-200 ${isActive ? "border-secondary" : "border-transparent"}`}>
                            {icon}
                        </div>
                        <span className={`text-sm transition-colors duration-200 ${isActive ? "text-secondary font-semibold" : "text-primary-900"}`}>
                            {label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}