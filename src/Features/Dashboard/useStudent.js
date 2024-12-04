import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudent } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function useStudent() {
  const { studentId } = useParams();
  const token = useAuthHeader() || null;
  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudent(token, studentId),
  });

  return { student, isLoading, error };
}
