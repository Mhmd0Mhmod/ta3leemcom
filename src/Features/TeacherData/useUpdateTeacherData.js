import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherData } from "./helpers";
import toast from "react-hot-toast";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function useUpdateTeacherData() {
  const queryClient = useQueryClient();
  const token = useAuthHeader();
  const user = useAuthUser();
  const { teacherId } = user;
  const login = useSignIn();
  const {
    mutate: updateData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => updateTeacherData({ ...data, teacherId }, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      login({
        auth: {
          token: token.split(" ")[1],
        },
        userState: {
          ...user,
          ...data,
        },
      });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "حدث خطأ ما , يرجى المحاولة مرة أخرى";
      toast.error(errorMessage);
      return { message: errorMessage };
    },
  });
  return { updateData, isPending, error };
}
export { useUpdateTeacherData };
