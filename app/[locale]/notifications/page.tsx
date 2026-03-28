import { RefreshCcw } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function NotificationsPage() {
    const t = useTranslations('Notifications');
    const locale = useLocale();

    return (
        <main className="min-h-screen container px-4 max-w-5xl mx-auto py-8 space-y-8 md:space-y-16" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex flex-col items-center justify-center py-20">
                <RefreshCcw size={48} className="text-primary-500 mb-4 animate-spin-slow" />
                <h2 className="text-xl md:text-2xl text-primary-900 font-bold">
                    {t('no_notifications')}
                </h2>
            </div>
        </main>
    )
}