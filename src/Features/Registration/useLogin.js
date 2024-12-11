import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export function useLogin(login) {
  const signIn = useSignIn();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { token, ...user } = data;
      queryClient.setQueryData(["user"], data);
      signIn({
        auth: {
          token,
        },
        userState: user,
      });
    },
  });

  return { login: mutate, isLoading: isPending, error };
}
