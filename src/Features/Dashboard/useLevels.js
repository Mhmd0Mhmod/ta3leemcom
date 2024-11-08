import { useQuery } from "@tanstack/react-query";
import { fetchLevels } from "./helpers.js";
import { useUserContext } from "../../Context/UserProvider.jsx";

function useLevels() {
  const { useUser } = useUserContext();
  const { token } = useUser();
  const {
    data: levels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: () => fetchLevels(token),
  });
  return { levels, isLoading, error };
}

export { useLevels };
