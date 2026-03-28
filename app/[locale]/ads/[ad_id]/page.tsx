import ProductSwiper from '@/app/(_features)/Pages Components/Ad Details/ProductSwiper'
import AdDetails from '@/app/(_features)/Pages Components/Ad Details/AdDetails';
import { Phone, MessageSquareText, Share2, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export default async function AdDetailsPage({ params }: { params: Promise<{ ad_id: string; locale: string }> }) {
    const { ad_id, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AdDetails' });

    const res = await fetch(`https://souqshamel.com/api/ads/${ad_id}`, { 
        next: { revalidate: 60 },
        headers: {
            'Accept-Language': locale || 'ar',
            'Accept': 'application/json'
        }
    });
    const data = await res.json();

    if (!res.ok || !data.status || !data.ad) {
        return notFound();
    }

    const { ad } = data;
    const notSpecified = t('not_specified');
    
    const images = ad.images && ad.images.length > 0 
        ? ad.images.map((img: any) => {
            const path = img.image_path;
            if (!path) return '/logo.svg';
            if (path.startsWith('http')) return path;
            return `https://souqshamel.com/storage/app/public/${path.startsWith('/') ? path.slice(1) : path}`;
        })
        : ['/logo.svg'];

    return (
        <main className='container md:max-w-5xl mx-auto py-10 px-4 space-y-6 md:space-y-10' dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <ProductSwiper images={images} />
            
            {/* title and price section */}
            <div className='flex items-center justify-between gap-4'>
                <h2 className='text-xl md:text-2xl font-bold'>
                    {ad.title}
                </h2>
                <p className=' text-lg md:text-2xl font-bold whitespace-nowrap text-primary' dir='ltr'>
                    {ad.price} {t('currency')}
                </p>
            </div>

            {/* description section */}
            <div className='p-4 min-h-50 flex justify-center items-center bg-white rounded-t-3xl shadow-sm border border-gray-100'>
                <p className='text-center text-lg md:text-xl font-medium whitespace-pre-wrap leading-relaxed'>
                    {ad.description}
                </p>
            </div>

            {/* ad details section */}
            <div>
                <h2 className='text-xl md:text-2xl font-bold mb-4 text-start'>
                    {t('title')}
                </h2>
                <AdDetails ad={{ 
                    name: ad.user_name || notSpecified, 
                    location: ad.city_name || notSpecified, 
                    mobile: ad.phone || notSpecified, 
                    advertiserType: notSpecified, 
                    workingHours: notSpecified, 
                    category: ad.category_name || notSpecified 
                }} />
            </div>

            {/*  icons buttons section  */}
            <div className="p-6 flex flex-col items-center gap-6">
                {/* Date Text */}
                <div className="w-full text-center">
                    <span className="text-primary font-bold md:text-xl">
                        {t('published_at')} 
                        {ad.created_at ? new Date(ad.created_at).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </span>
                </div>

                {/* Icon Buttons */}
                <div className="flex items-center justify-center gap-4">
                    {/* Phone Button */}
                    <a href={`tel:${ad.phone}`} className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                        <Phone className="text-secondary w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                    </a>

                    {/* Message/Chat Button */}
                    <a href={`https://wa.me/${ad.phone?.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                        <MessageSquareText className="text-secondary w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                    </a>

                    {/* Share Button */}
                    <button className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                        <Share2 className="text-secondary w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                    </button>

                    {/* Favorite Button */}
                    <button className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                        <Heart className="text-secondary w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* block user section */}
            <div className="p-6 flex flex-col items-center gap-6">
                <button className="px-6 py-3 bg-secondary text-white rounded-xl flex items-center justify-center shadow-sm hover:bg-secondary/80 active:scale-95 transition-colors">
                    <p className='text-xl md:text-2xl font-medium'>
                        {t('report_ad')}
                    </p>
                </button>
            </div>
        </main>
    )
}