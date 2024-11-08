import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "./useCookies.js";

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
      console.log(error);
    },
  });
  return { mutate, isLoading: isPending, error };
}
