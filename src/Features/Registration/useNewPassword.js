import { resetPassword } from "./authHelpers.js";
import { useMutation } from "@tanstack/react-query";

export function useNewPassword() {
  const { mutate: newPassword, isPending } = useMutation({
    mutationFn: resetPassword,
  });
  return { newPassword, isLoading: isPending };
}
