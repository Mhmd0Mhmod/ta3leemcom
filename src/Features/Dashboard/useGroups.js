import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function useGroups(selectedYear) {
  const token = useAuthHeader();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups", selectedYear],
    queryFn: () => fetchGroups(token, selectedYear),
  });
  return { groups, isLoading, error };
}

export { useGroups };
