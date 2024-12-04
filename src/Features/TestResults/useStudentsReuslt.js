import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudentResults } from "./helpers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function useStudentsReuslt() {
  const token = useAuthHeader();
  const { testId } = useParams();
  const {
    data: studentsAnswers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentsAnswers", testId],
    queryFn: () => getStudentResults(testId, token),
  });
  return { studentsAnswers, isLoading, error };
}
export { useStudentsReuslt };
