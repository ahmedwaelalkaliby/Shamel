import React from 'react'
import { Link } from '@/i18n/navigation';

interface ListLinkProps {
    href: string;
    name: string;
    icon?: React.ReactNode;
    locale?: string;
}

export default function ListLink({ href, name, icon, locale }: ListLinkProps) {
    const isRtl = locale === 'ar';
    
    return (
        <Link
            href={href}
            className="group flex items-center bg-tertiary p-5 rounded-2xl shadow-md hover:bg-tertiary/80 transition-all duration-200 active:scale-[0.98] border border-white/20"
        >
            <div className="flex-1 flex items-center justify-start gap-4">
                {icon && (
                    <div className="w-10 h-10 flex items-center justify-center bg-white/50 rounded-xl group-hover:bg-white/80 transition-colors">
                        {icon}
                    </div>
                )}
                <span className="text-lg md:text-xl font-extrabold text-primary-900 line-clamp-1">
                    {name}
                </span>
            </div>
        </Link>
    )
}