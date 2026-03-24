import Image from 'next/image';
import Link from 'next/link';

interface AdCardProps {
    id: number | string;
    title: string;
    price: string;
    imageUrl: string;
    locale?: string;
}

export const AdCard = ({ id, title, price, imageUrl, locale }: AdCardProps) => {
    const fullImageUrl = imageUrl.startsWith('http')
        ? imageUrl
        : `https://souqshamel.com/storage/app/public/${imageUrl}`;

    return (
        <Link href={`/${locale || 'en'}/ads/${id}`} className="block h-full group">
            <div className="bg-white rounded-[15px] md:rounded-[25px] overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col p-2 md:p-4 transition-all duration-300 hover:shadow-md h-full">
                {/* Image Container - Aspect ratio is key for consistency */}
                <div className="relative aspect-[4/5] w-full mb-2 md:mb-4">
                    <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden">
                        <Image
                            src={fullImageUrl}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col gap-1.5 md:gap-2 mt-auto">
                    {/* Title Bar */}
                    <div className="bg-primary-200 py-2 md:py-3 px-2 rounded-lg md:rounded-xl text-center">
                        <h3 className="text-gray-900 font-bold text-[10px] xs:text-xs sm:text-sm md:text-base line-clamp-1">
                            {title}
                        </h3>
                    </div>
                    {/* Price Bar */}
                    <div className="bg-primary-200 py-2 md:py-3 px-2 rounded-lg md:rounded-xl text-center">
                        <p className="text-gray-900 font-bold text-xs sm:text-sm md:text-lg whitespace-nowrap">
                            {price}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};