"use client";

import Link from "next/link";
import { Bell, Search, Home } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/profile", icon: <AiOutlineUser size={30} />, label: "حسابي" },
        { href: "/notifications", icon: <Bell size={30} />, label: "تنبيهات" },
        { href: "/add-ad", icon: <IoMdAdd size={30} />, label: "أضف إعلان" },
        { href: "/search", icon: <Search size={30} />, label: "البحث" },
        { href: "/", icon: <Home size={30} />, label: "الرئيسية" },
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