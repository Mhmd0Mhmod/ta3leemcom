import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";

function useGroups(selectedYear) {
  const token = useAuthHeader();
  let { levelYearId } = useParams();
  levelYearId = selectedYear || levelYearId;
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups", levelYearId],
    queryFn: () => fetchGroups(token, levelYearId),
  });
  return { groups, isLoading, error };
}

export { useGroups };
