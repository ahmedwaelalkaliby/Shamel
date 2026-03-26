import React from 'react'
import { Camera, Video , Plus } from 'lucide-react';

export default function AdForm() {
  return (
    <form className='space-y-4 md:space-y-8'>
        {/* title section */}
        <div className='space-y-4'>
            <label htmlFor="title" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                عنوان الإعلان
            </label>
            <input type="text" id="title" placeholder='أدخل عنوان الإعلان' className='w-full bg-white border-lg  border-primary-500 rounded-lg p-4' />
          </div>

          {/* category section */}
          <div className='space-y-4'>
              <label htmlFor="category" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                  قسم الإعلان
              </label>
              <select id="category" className='w-full bg-white border-lg  border-primary-500 rounded-lg p-4' >
                <option value="">اختر القسم</option>
                <option value="">القسم 1</option>
                <option value="">القسم 2</option>
                <option value="">القسم 3</option>
              </select>
          </div>

          {/* city section */}
          <div className='space-y-4'>
              <label htmlFor="category" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                  المدينة   
              </label>
              <select id="category" className='w-full bg-white border-lg  border-primary-500 rounded-lg p-4' >
                  <option value="">اختر المدينة</option>
                  <option value="">الرياض</option>
                  <option value="">جدة</option>
                  <option value="">الدمام</option>
              </select>
          </div>

          {/* description section */}
          <div className='space-y-4'>
              <label htmlFor="description" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                  وصف الإعلان
              </label>
              <p className='text-sm md:text-base text-primary-600'>
                  لمشاهدات أكثر للإعلان: أدخل تفاصيل ومعلومات أكثر
                  عن المنتج أو الخدمة لتزيد من ترويج الإعلان
              </p>
              <textarea id="description" placeholder='أدخل وصف الإعلان' className='w-full bg-white border-lg  border-primary-500 rounded-lg p-4' />
          </div>

          {/* images section */}
          <div className='space-y-4'>
              <label htmlFor="images" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                  صور الخدمة أو المنتج
              </label>
              <p className='text-sm md:text-base text-primary-600'>
                  لمشاهدات أكثر للإعلان: أدخل صور وفيديو واضح للمنتج أو الخدمة، صور من زوايا مختلفة.
              </p>
              <div className='flex flex-row  gap-4 mt-2'>
                  {/* Photo Upload */}
                  <label htmlFor="image-upload" className="cursor-pointer group">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-3xl flex flex-col items-center justify-center shadow-sm border border-gray-100 transition-all hover:border-secondary">
                          <div className="relative">
                              <Plus className="text-secondary absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 font-bold" strokeWidth={3} />
                              <Camera className="text-secondary w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
                          </div>
                      </div>
                      <input type="file" id="image-upload" multiple className="hidden" accept="image/*" />
                  </label>

                  {/* Video Upload */}
                  <label htmlFor="video-upload" className="cursor-pointer group">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-3xl flex flex-col items-center justify-center shadow-sm border border-gray-100 transition-all hover:border-secondary">
                          <div className="relative">
                              <div className="absolute -bottom-1 -left-1 w-full h-full border-b-4 border-l-4 border-secondary rounded-bl-lg -z-10"></div>
                              <Video className="text-secondary w-8 h-8 md:w-12 md:h-12 fill-secondary" />
                          </div>
                      </div>
                      <input type="file" id="video-upload" className="hidden" accept="video/*" />
                  </label>
              </div>
          </div>

          {/* location section */}
          <div className='space-y-4'>
              <label htmlFor="location" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                موقع المنتج أو الخدمه
              </label>
              <p className='text-sm md:text-base text-primary-600'>
                هل ترغب في إضافة موقع المنتج أو الخدمة؟ يفضل المستهلكين وضوح موقع المنتج أو الخدمة.
              </p>
              <div className='flex flex-row items-center justify-center  gap-4 mt-2'>
                  <button className='bg-secondary text-white text-lg md:text-xl font-bold px-12 py-4 md:px-20 cursor-pointer hover:bg-secondary/80 active:scale-95 rounded-lg'>
                      إضافة موقع
                  </button>
              </div>
          </div>

          {/* price section */}
          <div className='space-y-4'>
              <label htmlFor="price" className='text-lg md:text-xl text-primary-900 font-bold mb-2'>
                السعر
              </label>
              <p className='text-sm md:text-base text-primary-600'>
               أدخل سعر المنتج أو الخدمة
              </p>
              <div className='flex flex-row items-center justify-center  gap-4 mt-2'>
                <input type="number" id="price" placeholder='أدخل السعر' className='w-1/3 bg-white border-lg  border-primary-500 rounded-lg p-4' />
              </div>
          </div>

          <hr  className='w-full border-primary-900'/>
         
          {/* contact section */}
          <div className='space-y-4  md:space-y-6'>
              <h2 className='text-lg md:text-xl text-primary-900 font-bold mb-2 md:mb-4'>
                 وسائل الاتصال
              </h2>

              <div className="relative group">
                  <label className={`absolute -top-3 right-6 bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                     البريد الالكتروني
                  </label>
                  <input
                      type="text"
                      className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4 px-6 text-right text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                      placeholder='أدخل البريد الالكتروني'
                  />
              </div>
              
              <div className="relative group">
                  <label className={`absolute -top-3 right-6 bg-primary-200 px-2 text-[13px] text-secondary font-bold z-10`}>
                      رقم الموبايل
                  </label>
                  <input
                      type="text"
                      className={`w-full rounded-xl border-2 border-secondary bg-transparent py-4 px-6 text-right text-gray-700 text-lg outline-none focus:ring-0 placeholder-gray-400 font-medium`}
                      placeholder='أدخل رقم الموبايل'
                  />
              </div>    
          </div>
           
          {/* publish button */}
          <div className='space-y-4 mt-10 md:mt-20'>
              {/* checkbox */}
            <div className='flex flex-row items-center gap-2'>
                <input type="checkbox" id="contact" className='w-6 h-6 cursor-pointer' />
                <label htmlFor="contact" className='text-lg md:text-xl text-primary-900 font-bold'>التواصل عبر رسائل التطبيق فقط</label>
              </div>
              
            <div className='flex flex-row items-center justify-center  gap-4 mt-2'>
                <button className='bg-secondary text-white text-lg md:text-xl font-bold px-12 py-4 md:px-20 cursor-pointer hover:bg-secondary/80 active:scale-95 rounded-lg'>
                    نشر الإعلان
                </button>
            </div>
        </div>
    </form>
  )
}