import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "./helpers.js";
import { useUserContext } from "../../Context/UserProvider.jsx";

function useGroups(selectedYear) {
  const { useUser } = useUserContext();
  const { token } = useUser();

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
