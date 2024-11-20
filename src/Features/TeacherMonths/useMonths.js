import { useQuery } from "@tanstack/react-query";
import { getGroupMonths } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useMonths() {
  const token = useAuthHeader();
  const [searchParam, setSearchParam] = useSearchParams();
  const groupId = searchParam.get("sg");
  const {
    data: months,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["months", groupId],
    queryFn: () => getGroupMonths(token, groupId),
  });
  useEffect(() => {
    if (months && !searchParam.get("m")) {
      const monthId = months?.at(-1).monthId;
      if (!monthId) return;
      searchParam.set("m", monthId);
      setSearchParam(searchParam);
    }
  }, [months, setSearchParam, searchParam]);
  const selectedMonth = months?.find((month) => month.monthId === Number(searchParam.get("m")));
  return { months, selectedMonth, isLoading, error };
}
