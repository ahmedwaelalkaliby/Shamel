import { categoryService } from '@/src/services/categoryService';
import AdBigCard from '../../../(_features)/Pages Components/Ads/AdBigCard';

export default async function SubCategoryDetailPage({
  params
}: {
  params: Promise<{ locale: string, category_id: string, category_detail_id: string }>
}) {
  const { locale, category_id, category_detail_id } = await params;
  try {
    const response = await categoryService.getCategoryDetails(locale, category_id);

    if (!response.status || !response.data) {
      return (
        <div className="flex justify-center items-center p-10 bg-red-50 min-h-screen">
          <p className="text-red-500 font-bold text-xl">
            {locale === 'ar' ? 'القسم غير موجود' : 'Category not found'}
          </p>
        </div>
      );
    }

    const { data } = response;
    const { details = [], ads = [] } = data;

    // Find the specific subcategory name
    const currentSubCategory = details.find(sub => sub.id === parseInt(category_detail_id));
    const subCategoryName = currentSubCategory 
      ? (locale === 'ar' ? currentSubCategory.name_ar : currentSubCategory.name_en)
      : (locale === 'ar' ? 'تفاصيل القسم' : 'Category Details');

    // Filter ads by subcategory (category_detail_id)
    const filteredAds = ads.filter(ad => ad.category_detail_id === parseInt(category_detail_id));

    return (
      <main className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto px-4 pt-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-900 mb-6 px-2">
            {subCategoryName}
          </h1>

          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <AdBigCard
                  key={ad.id}
                  id={ad.id}
                  title={ad.title}
                  price={ad.price}
                  description={ad.description}
                  imageUrl={ad.images && ad.images.length > 0 ? ad.images[0].image_path : undefined}
                  locale={locale as 'ar' | 'en'}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-bold text-xl">
                {locale === 'ar' ? 'لا توجد إعلانات في هذا القسم حالياً' : 'No ads in this category at the moment'}
              </p>
            </div>
          )}
        </div>
      </main>
    );

  } catch (error) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <p className="text-red-500 font-bold text-xl">
          {locale === 'ar' ? 'حدث خطأ أثناء تحميل تفاصيل القسم' : 'Error loading category details'}
        </p>
      </div>
    );
  }
}