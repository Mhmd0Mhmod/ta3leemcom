import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useSearchParams } from "react-router-dom";
import { getMonthData } from "./helpers";

export function useMonthData() {
  const token = useAuthHeader() || null;
  const [searchParam] = useSearchParams();
  const monthId = searchParam.get("m");
  const {
    data: monthData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["month", monthId],
    queryFn: () => getMonthData(token, monthId),
  });
  return { monthData, isLoading, error };
}
