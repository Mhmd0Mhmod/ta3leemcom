import { useParams } from "react-router-dom";
import { getTest } from "./helpers";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";

export function useTest() {
  const { testId } = useParams();
  const token = useAuthHeader() || null;

  let {
    data: test,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["test", testId || 0],
    queryFn: () => getTest(testId, token),
  });

  return { test, isLoading, error };
}
