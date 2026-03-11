import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-3xl text-red-500">{t("title")}</h1>
      <h1 className="text-3xl " style={{fontFamily:"DynaPuff",fontWeight:"bold"}}>{t("description")}</h1>
    </div>
  );
}
