import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveChanges as saveChangesAPI } from "./helpers";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
export function useSaveChanges() {
  const token = useAuthHeader();
  const [searchParam] = useSearchParams();
  const monthId = searchParam.get("m");
  const queryClient = useQueryClient();
  const {
    mutate: saveChanges,
    isPending,
    error,
  } = useMutation({
    mutationFn: (bodyData) => saveChangesAPI(token, bodyData),
    onSuccess: () => {
      queryClient.invalidateQueries(["month", monthId]);
      toast.success("تم حفظ التغييرات بنجاح");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { saveChanges, isPending, error };
}
