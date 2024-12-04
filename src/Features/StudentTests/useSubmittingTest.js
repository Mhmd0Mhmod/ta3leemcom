import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitSolve as submitSolveAPI } from "./helpers.js";
import { useParams } from "react-router-dom";

function useSubmittingTest() {
  const token = useAuthHeader() || null;
  const { studentId } = useAuthUser() || {};
  const { testId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: submitSolve,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => {
      const bodyData = { ...data, studentId, quizId: testId, submitAnswersDateTime: new Date().toISOString() };
      return submitSolveAPI(bodyData, token);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["studentTests"]);
    },
  });
  return { submitSolve, isPending, error };
}

export { useSubmittingTest };
