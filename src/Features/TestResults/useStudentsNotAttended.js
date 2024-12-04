import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { getStudentNotAttendedTest } from "./helpers";

function useStudentsNotAttended() {
  const token = useAuthHeader();
  const { testId } = useParams();
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentsNotAttended", testId],
    queryFn: () => getStudentNotAttendedTest(testId, token),
  });
  return { students, isLoading, error };
}
export { useStudentsNotAttended };
