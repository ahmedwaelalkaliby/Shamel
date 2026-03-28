import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation';
import AdForm from '../../(_features)/Pages Components/Ad-Add/Ad Form/AdForm';
import { useTranslations, useLocale } from 'next-intl';

export default function Page() {
    const t = useTranslations('AddAd');
    const locale = useLocale();

    return (
        <main className={`min-h-screen container px-4 max-w-5xl mx-auto py-8 space-y-8 md:space-y-16 ${locale === 'ar' ? 'dir-rtl' : 'dir-ltr'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {/* header section*/}
            <div className='max-w-3xl mx-auto flex flex-col items-center'>
                <Image src="/microphone.svg" alt="microphone" width={100} height={100} />
                <h2 className='text-lg md:text-xl text-primary-500 font-bold'>
                    {t('header_sub')}
                </h2>
                <h2 className='text-2xl md:text-3xl text-primary-900 font-bold'>
                    {t('header_main')}
                </h2>
            </div>  
            
            {/* tips section*/}
            <div >
                <h2 className='text-lg md:text-xl text-primary-500 font-bold'>
                    {t('tips_question')}
                </h2>
                <Link href="/ad-tips" className='text-lg md:text-xl text-secondary font-bold underline cursor-pointer'>
                    {t('click_here')}
                </Link>
            </div>

            {/* form section*/}
            <div>
                <AdForm />
            </div>

      </main>
    )
}