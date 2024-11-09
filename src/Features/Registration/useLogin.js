import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "../../Hooks/useCookies.js";
import toast from "react-hot-toast";

export function useLogin(login) {
  const queryClient = useQueryClient();
  const { set } = useCookies();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      set("user", JSON.stringify(data));
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      toast.error(error?.response?.data || "حدث خطأ ما , يرجى المحاولة مرة أخرى");
    },
  });

  return { mutate, isLoading: isPending, error };
}
