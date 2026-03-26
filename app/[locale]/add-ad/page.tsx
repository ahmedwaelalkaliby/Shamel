import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation';
import AdForm from '@/app/(_features)/Pages Components/Ad-Add/Ad Form/AdForm';
export default function page() {
  return (
      <main className='min-h-screen container px-4 max-w-5xl mx-auto py-8 space-y-8 md:space-y-16 dir-rtl' dir='rtl'>
          {/* header section*/}
          <div className='max-w-3xl mx-auto flex flex-col items-center'>
              <Image src="/microphone.svg" alt="microphone" width={100} height={100} />
              <h2 className='text-lg md:text-xl text-primary-500 font-bold'>
                  فرصتك للبيع تبدأ هنا
              </h2>
              <h2 className='text-2xl md:text-3xl text-primary-900 font-bold'>
                  أضف إعلانك الآن
              </h2>
          </div>  
          
          {/* tips section*/}
          <div >
              <h2 className='text-lg md:text-xl text-primary-500 font-bold'>
                  تريد نصائح للحصول على أفضل نتيجة لإعلانك؟
              </h2>
              <Link href="/ad-tips" className='text-lg md:text-xl text-secondary font-bold underline cursor-pointer'>
                  أنقر هنا
              </Link>
          </div>

          {/* form section*/}
          <div>
              <AdForm />
          </div>

    </main>
  )
}