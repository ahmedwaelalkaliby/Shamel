"use client";

import Link from "next/link";
import { Heart, Bell, Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white rounded-b-2xl shadow-xl sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4 mx-auto">
                {/* Logo */}
                <Image src="/Logo.svg" alt="Logo" width={50} height={50} />

                {/* Links */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/">الرئيسية</Link>
                    <Link href="/categories">الأقسام</Link>
                    <Link href="/ads">الإعلانات</Link>
                    <Link href="/favorites" className="flex items-center gap-1">
                        <Heart size={18} />
                        المفضلة
                    </Link>
                </div>

                {/* Search */}
                <div className="hidden lg:flex items-center border rounded-lg px-3 py-2 w-[300px] bg-white">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="ابحث عن إعلان..."
                        className="outline-none px-2 w-full bg-transparent"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/add-ad"
                        className="hidden md:block bg-secondary text-white px-4 py-2 rounded-lg"
                    >
                        + أضف إعلان
                    </Link>
                    <Bell size={22} className="cursor-pointer hidden md:block" />
                </div>
            </div>
        </nav>
    );
}