import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession as deleteSessionAPI } from "./helpers.js";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export function useDeleteSession() {
  const token = useAuthHeader() || null;
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const monthId = searchParam.get("m");
  const {
    mutate: deleteSession,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteSessionAPI(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["month", monthId]);
      toast.success("تم حذف الحصة بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteSession, isPending, error };
}
