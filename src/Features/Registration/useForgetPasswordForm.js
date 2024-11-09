import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgetPassword as forgetPasswordAPI } from "./authHelpers.js";

export function useForgetPasswordForm() {
  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: forgetPasswordAPI,
  });
  return { forgetPassword, isLoading: isPending };
}
