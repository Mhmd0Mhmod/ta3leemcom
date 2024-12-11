import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup as deleteGroupAPI } from "./helpers.js";

export const useDeleteGroup = () => {
  const token = useAuthHeader() || null;
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: deleteGroup,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteGroupAPI(token, id || groupId),
    onSuccess: () => {
      queryClient.removeQueries(["group", groupId]);
    },
  });
  return { deleteGroup, isPending, error };
};
