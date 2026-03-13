import HeroSection from "../(_features)/Pages Components/Home/HeroSection/HeroSection";
import MarketSections from "../(_features)/Pages Components/Home/MarketSections/MarketSections";
import AdsSection from "../(_features)/Pages Components/Home/AdsSection/AdsSection";
import { getLatestAds, getTodayOffers, getFavorites } from "@/lib/api";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <main className="min-h-screen space-y-0">
      <HeroSection />
      <MarketSections />
      
      {/* Latest Ads */}
      <AdsSection 
        title={isAr ? 'الإعلانات الجديدة' : 'New Ads'} 
        type="latest" 
      />

    </main>
  );
}
