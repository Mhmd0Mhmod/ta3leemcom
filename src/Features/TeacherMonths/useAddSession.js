import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSession as addSessionAPI } from "./helpers.js";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useAddSession() {
  const token = useAuthHeader() || null;
  const [searchParam] = useSearchParams();
  const monthId = searchParam.get("m");
  const queryClient = useQueryClient();
  const {
    mutate: addSession,
    isPending,
    error,
  } = useMutation({
    mutationFn: (day) =>
      addSessionAPI(token, {
        monthId: monthId,
        date: day,
      }),
    onSuccess: () => {
      toast.success("تمت اضافة الحصه بنجاح");
      queryClient.refetchQueries(["month", monthId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addSession, isPending, error };
}
