import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { removeQuestionEnded } from "./helpers";
import { useParams } from "react-router-dom";
function useRemoveQuestion() {
  const token = useAuthHeader() || null;
  const { testId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: deleteQuestion,
    error,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: (id) => removeQuestionEnded(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["test", testId]);
    },
  });
  return { deleteQuestion, error, isLoading };
}
export { useRemoveQuestion };
