import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { deleteQuiz as deleteQuizAPI } from "./helpers";
import { useParams } from "react-router-dom";

function useDeleteTest() {
  const queryClient = useQueryClient();
  const { groupsId } = useParams();
  const groupsIds = groupsId.split(",");
  const token = useAuthHeader();
  const {
    mutate: deleteTest,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteQuizAPI(id, token),
    onSuccess: () => {
      queryClient.refetchQueries(["groupsTests", ...groupsIds]);
    },
  });
  return { deleteTest, isPending, error };
}
export { useDeleteTest };
