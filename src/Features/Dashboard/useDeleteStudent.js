import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent as deleteStudentAPI } from "./helpers";

export const useDeleteStudent = () => {
  const token = useAuthHeader() || null;
  const { studentId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: deleteStudent,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteStudentAPI(token, id || studentId),
    onSuccess: () => {
      queryClient.removeQueries(["student", studentId]);
    },
  });
  return { deleteStudent, isPending, error };
};
