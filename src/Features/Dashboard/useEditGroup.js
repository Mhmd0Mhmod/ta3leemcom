import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGroup as editGroupAPI } from "./helpers.js";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const useEditGroup = () => {
  const token = useAuthHeader();
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const { teacherId } = useAuthUser();
  const navigate = useNavigate();
  const {
    mutate: editGroup,
    isPending,
    error,
  } = useMutation({
    mutationFn: (bodyData) => editGroupAPI(token, { ...bodyData, Id: groupId, teacherId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["group", groupId]);
      navigate(-1);
    },
  });
  return { editGroup, isPending, error };
};
