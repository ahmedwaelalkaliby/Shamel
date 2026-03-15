import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/auth";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";

export const useRegister = () => {
  const router = useRouter();
  const locale = useLocale();

  return useMutation({
    mutationFn: (formData: FormData) => registerUser(formData, locale),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful!");
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};
