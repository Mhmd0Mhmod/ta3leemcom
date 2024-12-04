import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getTests } from "./helpers";

function useAllStudentTests() {
  const token = useAuthHeader() || null;
  const { studentId } = useAuthUser() || {};

  const { data, isLoading, error } = useQuery({
    queryKey: ["studentTests"],
    queryFn: () => getTests(token, studentId),
  });
  return { tests: data, isLoading, error };
}
export { useAllStudentTests };
