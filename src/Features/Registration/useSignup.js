import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupAPI } from "./authHelpers.js";

export function useSignup() {
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success("تم انشاء الحساب بنجاح تابع ايميلك لتفعيل الحساب", {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data || "حدث خطأ ما , يرجى المحاولة مرة أخرى");
    },
  });
  return { signup, isLoading: isPending, error };
}
