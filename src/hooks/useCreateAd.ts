import { useMutation } from "@tanstack/react-query";
import { adService } from "../services/adService";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";

export const useCreateAd = () => {
  const router = useRouter();
  const locale = useLocale();

  return useMutation({
    mutationFn: (formData: FormData) => adService.createAd(formData, locale),
    onSuccess: (data: any) => {
      toast.success(data.message || "Ad created successfully!");
      router.push("/ads");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create ad. Please try again.");
    },
  });
};
