import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "./helpers.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function UseGroups(selectedYear) {
  const Authorization = useAuthHeader();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups", selectedYear],
    queryFn: () => fetchGroups(Authorization, selectedYear),
  });
  return { groups, isLoading, error };
}

export default UseGroups;
