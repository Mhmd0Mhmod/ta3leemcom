import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { getTestDesc } from "./helpers";

function useTestDesc() {
  const token = useAuthHeader();
  const { testId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["testDesc", testId],
    queryFn: () => getTestDesc(testId, token),
  });
  return { testDesc: data, isLoading, error };
}
export { useTestDesc };
