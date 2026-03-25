"use client";

import CustomModal from "../Custom Modal/CustomModal";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Check } from "lucide-react";

export default function LanguageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("Profile");
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { name: "Arabic", code: "ar", label: "العربية" },
    { name: "English", code: "en", label: "English" },
  ];

  const handleLanguageChange = (code: string) => {
    if (code !== locale) {
      router.replace(pathname, { locale: code as any });
    }
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={t("select_language")}>
      <div className="flex flex-col gap-4 py-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 ${
              locale === lang.code
                ? "border-secondary bg-secondary/5 ring-1 ring-secondary/20"
                : "border-primary-50 bg-white hover:border-primary-100 hover:bg-primary-50/30"
            }`}
          >
            <span className={`text-lg font-bold ${locale === lang.code ? "text-primary-900" : "text-primary-600"}`}>
              {lang.label}
            </span>
            {locale === lang.code && (
              <div className="bg-secondary p-1 rounded-full text-white">
                <Check size={18} strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>
    </CustomModal>
  );
}
