import React from 'react'
import Image from 'next/image'
export default function HeroSection() {
    return (
        <section className='container max-w-4xl mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <div className='flex justify-center items-center'>
                    <Image src="/Logo.svg" alt="Logo" className="w-full h-full" width={100} height={100} />
                </div>
                <div className='flex justify-center items-center max-w-xs mx-auto'>
                    <h1 className='text-3xl font-bold '>إعلن واطلب
                        كل شيء في الإمارات
                        من مكان واحد</h1>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <Image src="/HeroImage.svg" alt="HeroImage" className="w-full h-full" width={100} height={100} />
            </div>

        </section>
    )
}
