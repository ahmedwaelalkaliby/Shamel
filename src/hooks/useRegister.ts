import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService"; // Point to the new service
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";

export const useRegister = () => {
  const router = useRouter();
  const locale = useLocale();

  return useMutation({
    mutationFn: (formData: FormData) => authService.register(formData), // the register in authService already exists
    onSuccess: (data: any) => {
      toast.success(data.message || "Registration successful!");
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};
