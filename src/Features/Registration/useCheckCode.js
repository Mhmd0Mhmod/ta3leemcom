import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkCode as checkCodeAPI } from "./authHelpers.js";

export function useCheckCode() {
  const { mutate: checkCode, isPending } = useMutation({
    mutationFn: (bodyData) => checkCodeAPI(bodyData),
  });
  return { checkCode, isLoading: isPending };
}
