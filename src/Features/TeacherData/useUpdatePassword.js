import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { updateTeacherPassword } from "./helpers";

function useUpdatePassword() {
  const token = useAuthHeader() || null;
  const { teacherId } = useAuthUser() || {};

  const {
    mutate: updatePassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => updateTeacherPassword({ ...data, id: teacherId }, token),
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error?.message || "حدث خطأ ما , يرجى المحاولة مرة أخرى";
      return { message: errorMessage };
    },
  });
  return { updatePassword, isPending, error };
}
export { useUpdatePassword };
