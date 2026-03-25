'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/src/hooks/useAuth';
import Image from 'next/image';
import LanguageModal from '@/app/(_features)/Global Components/Language Modal/LanguageModal';
import { 
  Pencil, 
  LogOut, 
  Wallet, 
  Settings, 
  Bell, 
  Languages, 
  MapPin, 
  FileText, 
  Headset,
  Megaphone
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  subtext?: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function ProfilePage() {
  const t = useTranslations('Profile');
  const locale = useLocale();
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, loading, router]);

  // If loading and we don't have a user yet, show initial loader
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // If we've finished loading and aren't authenticated, the useEffect will redirect us
  if (!isAuthenticated) {
    return null;
  }

  const menuItems: MenuItem[] = [
    {
      id: 'my_ads',
      label: t('my_ads'),
      icon: <Megaphone className="w-6 h-6" />,
      href: '/profile/my-ads',
    },
    {
      id: 'wallet',
      label: t('wallet'),
      icon: <Wallet className="w-6 h-6" />,
      href: '/profile/wallet',
    },
    {
      id: 'account_settings',
      label: t('account_settings'),
      icon: <Settings className="w-6 h-6" />,
      href: '/profile/settings',
    },
    {
      id: 'notifications_settings',
      label: t('notifications_settings'),
      icon: <Bell className="w-6 h-6" />,
      href: '/profile/notifications',
    },
    {
      id: 'language',
      label: t('language'),
      icon: <Languages className="w-6 h-6" />,
      onClick: () => setIsLanguageModalOpen(true),
    },
    {
      id: 'city',
      label: t('city'),
      subtext: t('city_subtext'),
      icon: <MapPin className="w-6 h-6" />,
      href: '/profile/city',
    },
    {
      id: 'terms',
      label: t('terms_and_conditions'),
      icon: <FileText className="w-6 h-6" />,
      href: '/terms',
    },
    {
      id: 'support',
      label: t('technical_support'),
      icon: <Headset className="w-6 h-6" />,
      href: '/support',
    },
  ];

  const getImageUrl = (path: string | undefined | null) => {
    if (!path || path === "null") return "/profile.svg";
    if (path.startsWith("http")) return path;
    const storageUrl = "https://souqshamel.com/storage/";
    return `${storageUrl}${path.startsWith("/") ? path.slice(1) : path}`;
  };

  return (
    <main className="min-h-screen pb-10">
      <div className="container md:max-w-5xl  mx-auto px-4 pt-8">
        
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-6 mb-8 relative border border-primary-50">
          {/* Avatar Area - Forced to stay on the left in RTL by using order-2 */}
          <div className="relative order-2">
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-inner bg-primary-100">
              <Image 
                src={getImageUrl(user?.image)} 
                alt={user?.username || "User"} 
                width={112} 
                height={112}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-1 left-[-4px] bg-white p-2 rounded-full shadow-md border border-primary-100 hover:bg-primary-50 transition-colors">
              <Pencil className="w-4 h-4 text-primary-900" />
            </button>
          </div>
          
          {/* Text Area - Forced to stay on the right in RTL by using order-1 */}
          <div className="flex-1 text-right order-1">
            <div className="flex flex-col items-end gap-1">
              <h1 className="text-2xl font-extrabold text-primary-900 mb-1">{user?.username || "User Name"}</h1>
              
              <div className="mb-2">
                <span className="text-xs font-bold px-4 py-1.5 rounded-lg border border-primary-800 text-primary-800">
                  {t('personal_profile')}
                </span>
              </div>
              
              <div className="mt-1 text-right">
                <p className="text-primary-500 font-bold text-sm">{t('business_question')}</p>
                <Link href="/profile/switch-to-business" className="text-secondary font-black text-sm hover:underline">
                  {t('switch_to_business')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item) => {
            if (item.onClick) {
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full group flex items-center bg-tertiary p-5 rounded-2xl shadow-md hover:bg-tertiary/80 transition-all duration-200 active:scale-[0.98] border border-white/20"
                >
                   <div className="flex-1 flex items-center justify-start gap-4">
                      <div className="bg-white p-2 rounded-xl text-primary-700 group-hover:text-secondary transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-lg font-extrabold text-primary-900">{item.label}</span>
                        {item.subtext && (
                          <span className="text-[11px] text-primary-500 font-bold opacity-80">{item.subtext}</span>
                        )}
                      </div>
                    </div>
                </button>
              );
            }
            return (
              <Link 
                key={item.id} 
                href={item.href || '#'}
                className="group flex items-center bg-tertiary p-5 rounded-2xl shadow-md hover:bg-tertiary/80 transition-all duration-200 active:scale-[0.98] border border-white/20"
              >
                <div className="flex-1 flex items-center justify-start gap-4">
                  <div className="bg-white p-2 rounded-xl text-primary-700 group-hover:text-secondary transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-extrabold text-primary-900">{item.label}</span>
                    {item.subtext && (
                      <span className="text-[11px] text-primary-500 font-bold opacity-80">{item.subtext}</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}

          {/* Logout Button */}
          <button 
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 bg-white text-secondary p-5 rounded-2xl shadow-sm border border-[#E30512]/10 hover:bg-[#E30512] hover:text-white transition-all duration-300 font-black text-lg active:scale-[0.98] mt-8"
          >
            <LogOut className="w-6 h-6" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>

      <LanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)} 
      />
    </main>
  );
}