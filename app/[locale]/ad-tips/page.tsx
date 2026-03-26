import React from 'react'
import { useLocale, useTranslations } from 'next-intl';

interface TipItem {
  category: string;
  items: string[];
}

export default function page() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const t = useTranslations('AdTips');
  const tipsData = t.raw('tipsData') as TipItem[];

  return (
    <main className={`min-h-screen container px-4 max-w-5xl mx-auto py-8 space-y-8 md:space-y-16 ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <h1 className='text-xl md:text-3xl text-primary-900 text-center font-bold'>
        {t('title')}
      </h1>
      <div className='space-y-8'>
        {tipsData.map((tip, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg p-6 border border-gray-100'>
            <h2 className='text-xl font-bold text-primary-800 mb-4 border-b pb-2'>{tip.category}</h2>
            <ul className={`list-disc list-outside ${isAr ? 'mr-5' : 'ml-5'} space-y-2 text-gray-700 text-sm md:text-base leading-relaxed`}>
              {tip.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}