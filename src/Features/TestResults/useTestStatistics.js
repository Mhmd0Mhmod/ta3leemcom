import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { getStudentStatistics } from "./helpers";
import { useQuery } from "@tanstack/react-query";

function useTestStatistics() {
  const token = useAuthHeader();
  const { testId } = useParams();
  const {
    data: testStatistics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testStatistics", testId],
    queryFn: () => getStudentStatistics(testId, token),
  });
  return {
    testStatistics,
    isLoading,
    isError,
  };
}
export { useTestStatistics };
