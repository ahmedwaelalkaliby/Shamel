import { useTranslations } from "next-intl";
import HeroSection from "../(_features)/Pages Components/Home/HeroSection/HeroSection";
export default function Home() {
  const t = useTranslations("HomePage");
  
  return (
    <main className="min-h-screen space-y-20">
      <HeroSection />
    </main>
  );
}
