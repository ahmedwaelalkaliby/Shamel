"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";

interface AdCardProps {
  id: number;
  title: string;
  category?: string;
  price?: string;
  imageUrl?: string;
  userName?: string;
  location?: string | null;
  showCommercial?: boolean;
}

export default function AdCard({
  id,
  title,
  category,
  price,
  imageUrl,
  userName,
  location,
  showCommercial,
}: AdCardProps) {
  const locale = useLocale();

  const getFullImageUrl = (url?: string) => {
    if (!url) return "/logo.svg";
    if (url.startsWith("http") || url.startsWith("/") || url.startsWith("data:")) {
      return url;
    }
    return `https://souqshamel.com/storage/app/public/${url}`;
  };

  const finalImageUrl = getFullImageUrl(imageUrl);

  // Commercial cards link to the commercial profile, regular ads link to ad detail
  const href = showCommercial
    ? `/${locale}/commercial/${id}`
    : `/${locale}/ads/${id}`;

  return (
    <Link
      href={href}
      id={`ad-card-${id}`}
      className="
        group flex items-stretch
        bg-white rounded-2xl
        border border-primary-100
        shadow-sm hover:shadow-md
        overflow-hidden
        transition-all duration-300
        w-full
      "
    >
      {/* Text Content */}
      <div className="flex-1 p-4 flex flex-col justify-center min-w-0 gap-1">
        <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2">
          {title}
        </h3>
        {category && (
          <span className="text-xs font-medium text-primary-500">
            {category}
          </span>
        )}

        {/* Price — shown for regular ads */}
        {!showCommercial && price && (
          <span className="text-sm font-black text-secondary mt-1">
            {price}
          </span>
        )}

        {/* Location — shown for commercial activities */}
        {showCommercial && location && (
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={14} className="text-secondary flex-shrink-0" />
            <span className="text-xs text-primary-400 line-clamp-1">
              {location}
            </span>
          </div>
        )}

        {userName && (
          <span className="text-xs text-primary-400 mt-0.5">
            {userName}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative w-[120px] min-h-[110px] flex-shrink-0 bg-primary-100">
        <Image
          src={finalImageUrl}
          alt={title}
          fill
          className="object-contain bg-primary-500 group-hover:scale-105 transition-transform duration-500"
          sizes="120px"
        />
      </div>
    </Link>
  );
}
