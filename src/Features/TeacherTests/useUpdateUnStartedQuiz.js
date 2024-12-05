import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { updateNotStartedQuiz } from "./helpers";
import { useSelector } from "react-redux";

function useUpdateUnStartedQuiz() {
  const token = useAuthHeader() || null;

  const queryClient = useQueryClient();
  const test = useSelector((state) => state.test);
  const {
    mutate: updateNotStartedTest,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => updateNotStartedQuiz(test, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["test", String(test.id)], data);
    },
  });
  return { updateNotStartedTest, isPending, error };
}
export { useUpdateUnStartedQuiz };
