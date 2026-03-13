import { useTranslations } from "next-intl";
import HeroSection from "../(_features)/Pages Components/Home/HeroSection/HeroSection";
import MarketSections from "../(_features)/Pages Components/Home/MarketSections/MarketSections";

export default function Home() {
  const t = useTranslations("HomePage");
  
  return (
    <main className="min-h-screen space-y-0">
      <HeroSection />
      <MarketSections />
    </main>
  );
}
