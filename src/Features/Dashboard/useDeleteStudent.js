import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGroup = () => {
  const token = useAuthHeader();
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: deleteStudent,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => deleteStudent(token, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries(["group", groupId]);
    },
  });
  return { deleteStudent, isPending, error };
};
