import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStudent as editStudentAPI } from "./helpers.js";

export const useEditStudent = () => {
  const token = useAuthHeader();
  const { studentId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: editStudent,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => editStudentAPI(token, { ...data, Id: studentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["student", studentId]);
      navigate(`/TDashboard/student/${studentId}`);
    },
  });
  return { editStudent, isPending, error };
};
