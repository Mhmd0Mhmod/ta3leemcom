import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { updateQuestionEnded } from "./helpers";
import { useParams } from "react-router-dom";

function useUpdateQuestion() {
  const token = useAuthHeader() || null;
  const { testId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: editQuestion,
    isPending,
    error,
  } = useMutation({
    mutationFn: (question) => updateQuestionEnded(question, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["test", testId]);
    },
  });
  return {
    editQuestion,
    isPending,
    error,
  };
}
export { useUpdateQuestion };
