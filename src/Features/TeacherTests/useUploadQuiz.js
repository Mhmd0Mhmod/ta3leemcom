import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { addOnlineQuiz } from "./helpers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate, useParams } from "react-router-dom";

export function useUploadQuiz() {
  const token = useAuthHeader();
  const naviate = useNavigate();
  const { groupsId, levelYearId } = useParams();
  const groupsIds = groupsId?.split(",");
  const queryClient = useQueryClient();
  const test = useSelector((state) => state.test);

  const {
    mutate: uploadQuiz,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => addOnlineQuiz(test, token),
    onSettled: () => {
      queryClient.refetchQueries(["groupsTests", ...groupsIds]);
    },
    onSuccess: () => {
      naviate(`/TDashboard/tests/${levelYearId}/${groupsId}`, { replace: true });
    },
  });
  return { uploadQuiz, isPending, error };
}
