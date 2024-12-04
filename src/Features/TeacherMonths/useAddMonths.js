import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { addMonths as addMonthsAPI } from "./helpers.js";
export const useAddMonths = () => {
  const token = useAuthHeader() || null;
  const [searchParam] = useSearchParams();
  const groupId = searchParam.get("sg");
  const queryClient = useQueryClient();
  const { mutate: addMonths } = useMutation({
    mutationFn: (months) => addMonthsAPI(token, groupId, months),
    onSuccess: () => {
      queryClient.invalidateQueries(["months", groupId]);
    },
  });
  return { addMonths };
};
