import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export function useLogin(login) {
  const signIn = useSignIn();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { token, ...user } = data;
      signIn({
        auth: {
          token,
        },
        userState: user,
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data || "حدث خطأ ما , يرجى المحاولة مرة أخرى");
    },
  });

  return { login: mutate, isLoading: isPending, error };
}
