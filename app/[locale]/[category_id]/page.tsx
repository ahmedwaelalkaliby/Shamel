
import { categoryService } from '@/src/services/categoryService';
import { Link } from '@/i18n/navigation';

export default async function CategoryPage({
  params
}: {
  params: Promise<{ locale: string, category_id: string }>
}) {
  const { locale, category_id } = await params;

  try {
    const response = await categoryService.getCategoryDetails(locale, category_id);

    if (!response.status || !response.data) {
      return (
        <div className="flex justify-center items-center p-10 bg-red-50 min-h-screen ">
          <p className="text-red-500 font-bold text-xl">
            {locale === 'ar' ? 'القسم غير موجود' : 'Category not found'}
          </p>
        </div>
      );
    }

    const { data } = response;
    const { details} = data;

    return (
      <main className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto px-4 pt-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-900 mb-6 px-2">
            {locale === 'ar' ? data.name_ar : data.name_en}
          </h1>

          {/* Subcategories (Details) */}
          {details && details.length > 0 && (
            <div className="space-y-4 mb-8">
              {details.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/${category_id}/${subCategory.id}`}
                  className="group flex items-center bg-tertiary p-5 rounded-2xl shadow-md hover:bg-tertiary/80 transition-all duration-200 active:scale-[0.98] border border-white/20"
                >
                  <div className="flex-1 flex items-center justify-start gap-3">
                    <span className="text-xl font-extrabold text-primary-900">
                      {locale === 'ar' ? subCategory.name_ar : subCategory.name_en}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen ">
        <p className="text-red-500 font-bold text-xl">
          {locale === 'ar' ? 'حدث خطأ أثناء تحميل تفاصيل القسم' : 'Error loading  Sub-categories'}
        </p>
      </div>
    );
  }
}